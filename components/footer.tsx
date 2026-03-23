import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-14">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-4">
              <Image
                src="/images/logo.png"
                alt="НМИЦ здоровья детей"
                width={96}
                height={96}
                className="h-20 w-20 object-contain"
              />
              <div>
                <p className="font-semibold text-slate-950">НМИЦ здоровья детей</p>
                <p className="text-sm text-slate-500">Минздрава России</p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-600">
              Цифровой портфель объединяет клинические решения, регистры, аналитику и
              инфраструктурные контуры, формируя единое пространство для развития детского
              здравоохранения.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Навигация
              </p>
              <div className="mt-4 grid gap-3 text-sm text-slate-600">
                <Link href="#platform" className="transition hover:text-slate-950">
                  Платформа
                </Link>
                <Link href="#projects" className="transition hover:text-slate-950">
                  Инициативы
                </Link>
                <Link href="#impact" className="transition hover:text-slate-950">
                  Эффект
                </Link>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Контур
              </p>
              <div className="mt-4 grid gap-3 text-sm text-slate-600">
                <span>Единая ЭМК</span>
                <span>РЭМД / ЕГИСЗ</span>
                <span>Клинические регистры</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} ФГАУ «Национальный медицинский исследовательский центр здоровья детей»</p>
          <p>Москва, Ломоносовский проспект, д. 2, стр. 1</p>
        </div>
      </div>
    </footer>
  )
}
