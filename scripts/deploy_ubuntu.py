from __future__ import annotations

import argparse
import io
import os
import posixpath
import tarfile
import time
from pathlib import Path

import paramiko


EXCLUDED_NAMES = {
    ".git",
    ".next",
    "node_modules",
    "info.pdf",
    "tsconfig.tsbuildinfo",
}

EXCLUDED_SUFFIXES = {".log", ".tmp"}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Deploy the app to an Ubuntu server over SSH.")
    parser.add_argument("--host", required=True)
    parser.add_argument("--user", required=True)
    parser.add_argument("--password", required=True)
    parser.add_argument("--domain", default="nmiczd.ru")
    parser.add_argument("--app-dir", default="/var/www/kid-doctor")
    parser.add_argument("--port", type=int, default=3000)
    parser.add_argument("--local-root", default=str(Path(__file__).resolve().parents[1]))
    parser.add_argument("--env-file", default=".env.local")
    return parser.parse_args()


def should_include(path: Path) -> bool:
    parts = set(path.parts)

    if parts & EXCLUDED_NAMES:
        return False

    if path.name in EXCLUDED_NAMES:
        return False

    if path.suffix in EXCLUDED_SUFFIXES:
        return False

    return True


def build_archive_bytes(root: Path) -> bytes:
    buffer = io.BytesIO()

    with tarfile.open(fileobj=buffer, mode="w:gz") as tar:
        for path in sorted(root.rglob("*")):
            if not path.is_file() or not should_include(path.relative_to(root)):
                continue

            tar.add(path, arcname=path.relative_to(root).as_posix())

    buffer.seek(0)
    return buffer.read()


def load_env_contents(root: Path, env_file: str) -> str:
    env_path = root / env_file
    return env_path.read_text(encoding="utf-8").strip() + "\n"


def ssh_connect(host: str, user: str, password: str) -> paramiko.SSHClient:
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(hostname=host, username=user, password=password, timeout=30)
    return client


def run_remote(client: paramiko.SSHClient, command: str) -> str:
    print(f"$ {command}")
    stdin, stdout, stderr = client.exec_command(command)
    exit_code = stdout.channel.recv_exit_status()
    output = stdout.read().decode("utf-8", errors="replace")
    error = stderr.read().decode("utf-8", errors="replace")

    if output.strip():
        print(output.rstrip().encode("ascii", "replace").decode("ascii"))

    if exit_code != 0:
        if error.strip():
            print(error.rstrip().encode("ascii", "replace").decode("ascii"))
        raise RuntimeError(f"Remote command failed with exit code {exit_code}: {command}")

    if error.strip():
        print(error.rstrip().encode("ascii", "replace").decode("ascii"))

    return output


def upload_bytes(sftp: paramiko.SFTPClient, data: bytes, remote_path: str) -> None:
    with sftp.file(remote_path, "wb") as remote_file:
        remote_file.write(data)


def upload_text(sftp: paramiko.SFTPClient, data: str, remote_path: str) -> None:
    with sftp.file(remote_path, "w") as remote_file:
        remote_file.write(data)


def main() -> None:
    args = parse_args()
    root = Path(args.local_root).resolve()
    archive_bytes = build_archive_bytes(root)
    env_contents = load_env_contents(root, args.env_file)
    timestamp = time.strftime("%Y%m%d%H%M%S")
    remote_archive = f"/root/kid-doctor-{timestamp}.tar.gz"
    remote_env = f"/root/kid-doctor-{timestamp}.env.local"

    client = ssh_connect(args.host, args.user, args.password)
    sftp = client.open_sftp()

    try:
        upload_bytes(sftp, archive_bytes, remote_archive)
        upload_text(sftp, env_contents, remote_env)

        app_dir = args.app_dir.rstrip("/")
        current_dir = posixpath.join(app_dir, "current")

        bootstrap = (
            "export DEBIAN_FRONTEND=noninteractive && "
            "apt-get update && "
            "apt-get install -y curl ca-certificates gnupg git nginx certbot python3-certbot-nginx && "
            "(command -v node >/dev/null 2>&1 && node -v | grep -q '^v22\\.' || "
            "(curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && apt-get install -y nodejs)) && "
            "npm install -g pnpm pm2"
        )
        run_remote(client, bootstrap)

        prepare_dirs = (
            f"mkdir -p {app_dir} && "
            f"rm -rf {current_dir} && "
            f"mkdir -p {current_dir}"
        )
        run_remote(client, prepare_dirs)

        extract = (
            f"tar -xzf {remote_archive} -C {current_dir} && "
            f"cp {remote_env} {current_dir}/.env.local"
        )
        run_remote(client, extract)

        build = (
            f"cd {current_dir} && "
            "pnpm install --frozen-lockfile && "
            "pnpm build"
        )
        run_remote(client, build)

        ecosystem_path = posixpath.join(current_dir, "deploy", "ecosystem.config.cjs")
        nginx_source = posixpath.join(current_dir, "deploy", "nginx.nmiczd.ru.conf")
        nginx_target = f"/etc/nginx/sites-available/{args.domain}"

        start_app = (
            f"sed -i 's/3000/{args.port}/g' {ecosystem_path} && "
            f"cp {nginx_source} {nginx_target} && "
            f"sed -i 's/nmiczd.ru/{args.domain}/g' {nginx_target} && "
            f"sed -i 's/127.0.0.1:3000/127.0.0.1:{args.port}/g' {nginx_target} && "
            f"ln -sfn {nginx_target} /etc/nginx/sites-enabled/{args.domain} && "
            "rm -f /etc/nginx/sites-enabled/default && "
            "nginx -t && systemctl enable --now nginx && systemctl reload nginx && "
            f"pm2 startOrReload {ecosystem_path} --update-env && "
            "pm2 save && pm2 startup systemd -u root --hp /root"
        )
        run_remote(client, start_app)

        cleanup = f"rm -f {remote_archive} {remote_env}"
        run_remote(client, cleanup)

        print(f"Deployment finished: http://{args.domain}")
    finally:
        sftp.close()
        client.close()


if __name__ == "__main__":
    main()
