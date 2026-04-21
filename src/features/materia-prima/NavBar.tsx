const formatCurrentDate = () =>
  new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  }).format(new Date())

export default function NavBar() {
    return (
        <header className="w-full bg-white px-3 py-2 text-black md:px-4 md:py-2.5">
            <div className="mx-auto flex w-full max-w-375 items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                    <img
                        className="h-8 w-auto max-w-36 shrink-0 cursor-pointer object-contain sm:h-9 sm:max-w-44 md:h-10 md:max-w-52"
                        src="/logo.svg"
                        alt="MarBran"
                    />
                </div>

                <div className="shrink-0 text-base font-extrabold leading-none text-black sm:text-lg md:text-xl">
                    {formatCurrentDate()}
                </div>
            </div>
        </header>
    )
}