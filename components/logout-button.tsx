import { LogOut } from "lucide-react"

import { logoutAction } from "@/app/login/actions"
import { Button } from "@/components/ui/button"

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button
        type="submit"
        variant="outline"
        className="h-11 rounded-full border-white/20 bg-white/8 px-5 text-sm font-medium text-white shadow-none backdrop-blur transition hover:bg-white/14"
      >
        <LogOut className="size-4" />
        Выйти
      </Button>
    </form>
  )
}
