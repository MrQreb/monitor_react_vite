import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { LogIn, ArrowLeft, Moon, Sun } from "lucide-react"
import { Link } from "@tanstack/react-router"

export default function Unauthorized() {
    const [isDark, setIsDark] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        setIsDark(document.documentElement.classList.contains("dark"))
    }, [])

    const toggleTheme = () => {
        setIsDark(!isDark)
        document.documentElement.classList.toggle("dark")
    }

    if (!mounted) return null

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden">

            {/* Theme Toggle */}
            <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="absolute top-6 right-6 z-10"
                aria-label="Toggle theme"
            >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Floating background shapes */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Shield */}
                <svg className="absolute top-[8%] left-[5%] w-20 h-20 text-primary/10 animate-bounce" style={{ animationDuration: "4s" }} viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 10 L85 28 L85 58 Q85 82 50 92 Q15 82 15 58 L15 28 Z" />
                </svg>
                {/* Lock */}
                <svg className="absolute top-[20%] right-[8%] w-16 h-16 text-primary/15 animate-bounce" style={{ animationDuration: "5s", animationDelay: "0.8s" }} viewBox="0 0 100 100">
                    <rect x="20" y="50" width="60" height="42" rx="8" fill="currentColor" />
                    <path d="M32 50 V36 Q32 18 50 18 Q68 18 68 36 V50" stroke="currentColor" strokeWidth="10" fill="none" />
                </svg>
                {/* Exclamation circle */}
                <svg className="absolute bottom-[20%] left-[8%] w-12 h-12 text-primary/20 animate-bounce" style={{ animationDuration: "3.5s", animationDelay: "1.2s" }} viewBox="0 0 100 100" fill="currentColor">
                    <circle cx="50" cy="50" r="45" />
                    <rect x="44" y="22" width="12" height="38" rx="4" fill="var(--background)" />
                    <circle cx="50" cy="74" r="7" fill="var(--background)" />
                </svg>
                {/* Star pulse */}
                <svg className="absolute top-[55%] right-[5%] w-9 h-9 text-primary/20 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12,2 15,9 22,9 17,14 19,22 12,17 5,22 7,14 2,9 9,9" />
                </svg>
                {/* Rotating triangle */}
                <svg className="absolute bottom-[30%] right-[25%] w-12 h-12 text-primary/10 animate-spin" style={{ animationDuration: "22s" }} viewBox="0 0 100 100" fill="currentColor">
                    <polygon points="50,10 90,90 10,90" />
                </svg>
                {/* Hexagon reverse spin */}
                <svg className="absolute bottom-[10%] right-[12%] w-11 h-11 text-primary/10 animate-spin" style={{ animationDuration: "18s", animationDirection: "reverse" }} viewBox="0 0 100 100" fill="currentColor">
                    <polygon points="50,8 87,29 87,71 50,92 13,71 13,29" />
                </svg>
            </div>

            {/* Main illustration */}
            <div className="relative mb-2">
                <svg
                    className="w-64 h-56 md:w-80 md:h-64 mx-auto animate-bounce"
                    style={{ animationDuration: "4.5s" }}
                    viewBox="0 0 320 260"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <style>{`
              @keyframes beamPulse { 0%,100%{opacity:.5} 50%{opacity:1} }
              @keyframes lockShake {
                0%,80%,100%{transform:rotate(0deg)}
                84%{transform:rotate(-8deg)} 88%{transform:rotate(8deg)}
                92%{transform:rotate(-5deg)} 96%{transform:rotate(4deg)}
              }
              @keyframes scanMove { 0%{transform:translateY(-60px);opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{transform:translateY(60px);opacity:0} }
              @keyframes dashOffset { from{stroke-dashoffset:0} to{stroke-dashoffset:24} }
              @keyframes warnFlash { 0%,100%{opacity:1} 50%{opacity:.4} }
              .beam { animation: beamPulse 2s ease-in-out infinite; }
              .lock-grp { animation: lockShake 3s ease-in-out infinite 1s; transform-origin: 22px 28px; }
              .scan { animation: scanMove 2.5s linear infinite; }
              .dash-flow { stroke-dasharray:8 4; animation: dashOffset 1.2s linear infinite; }
              .warn { animation: warnFlash 2s ease-in-out infinite .5s; }
            `}</style>
                    </defs>

                    {/* Access panel */}
                    <rect x="220" y="60" width="80" height="130" rx="6" className="stroke-foreground/20" strokeWidth="1.5" />
                    <rect x="228" y="68" width="64" height="114" rx="4" className="stroke-foreground/10" strokeWidth="1" />
                    <line x1="228" y1="90" x2="292" y2="90" className="stroke-foreground/12" strokeWidth="0.5" />
                    <line x1="228" y1="105" x2="292" y2="105" className="stroke-foreground/12" strokeWidth="0.5" />
                    {/* Keypad */}
                    {[239, 247, 255].map(x => [148, 157].map(y =>
                        <circle key={`${x}${y}`} cx={x} cy={y} r="2.5" className="fill-foreground/20" />
                    ))}

                    {/* Floating lock */}
                    <g className="lock-grp" transform="translate(18, 90)">
                        <rect x="0" y="22" width="44" height="34" rx="6" fill="none" className="stroke-foreground/55" strokeWidth="2" />
                        <path d="M9 22 V16 Q9 4 22 4 Q35 4 35 16 V22" className="stroke-foreground/55" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        <circle cx="22" cy="38" r="5" className="fill-foreground/50" />
                        <rect x="20" y="38" width="4" height="7" rx="2" className="fill-foreground/50" />
                    </g>

                    {/* Guard legs */}
                    <rect x="145" y="200" width="20" height="44" rx="7" fill="none" className="stroke-foreground/70" strokeWidth="2" transform="rotate(-6 155 222)" />
                    <rect x="174" y="200" width="20" height="44" rx="7" fill="none" className="stroke-foreground/70" strokeWidth="2" transform="rotate(6 184 222)" />
                    {/* Torso */}
                    <rect x="133" y="140" width="74" height="68" rx="10" fill="none" className="stroke-foreground/70" strokeWidth="2" />
                    <rect x="150" y="154" width="40" height="24" rx="4" fill="none" className="stroke-foreground/45" strokeWidth="1.2" />
                    <line x1="154" y1="162" x2="186" y2="162" className="stroke-foreground/30" strokeWidth="1" />
                    <line x1="154" y1="168" x2="178" y2="168" className="stroke-foreground/25" strokeWidth="1" />
                    {/* Backpack */}
                    <rect x="205" y="148" width="22" height="52" rx="5" fill="none" className="stroke-foreground/40" strokeWidth="1.5" />
                    {/* Arms */}
                    <rect x="207" y="138" width="46" height="17" rx="8" fill="none" className="stroke-foreground/70" strokeWidth="2" transform="rotate(-20 230 146)" />
                    <rect x="90" y="152" width="46" height="17" rx="8" fill="none" className="stroke-foreground/70" strokeWidth="2" transform="rotate(12 113 160)" />
                    {/* Scanner */}
                    <rect x="238" y="108" width="30" height="20" rx="4" fill="none" className="stroke-foreground/70" strokeWidth="1.8" />
                    {/* Denied X */}
                    {/* Floating cable */}
                    <circle cx="308" cy="138" r="5" fill="none" className="stroke-foreground/50" strokeWidth="1.5" />
                    {/* Helmet */}
                    <ellipse cx="160" cy="96" rx="44" ry="48" fill="none" className="stroke-foreground/70" strokeWidth="2.5" />
                    <ellipse cx="160" cy="100" rx="30" ry="32" fill="none" className="stroke-foreground/50" strokeWidth="1.5" />
                    <ellipse cx="160" cy="100" rx="30" ry="32" className="fill-foreground/6" />
                    <ellipse cx="148" cy="90" rx="7" ry="10" className="fill-background/30" />
                    {/* Eyes (stern) */}
                    <line x1="150" y1="99" x2="160" y2="99" className="stroke-foreground/55" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="168" y1="99" x2="176" y2="99" className="stroke-foreground/55" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Flat mouth */}
                    <line x1="154" y1="112" x2="170" y2="112" className="stroke-foreground/45" strokeWidth="1.5" strokeLinecap="round" />

                    {/* Stars */}
                    <circle cx="30" cy="50" r="1.5" className="fill-foreground/40" />
                    <circle cx="300" cy="230" r="1.5" className="fill-foreground/40" />
                    <circle cx="80" cy="240" r="1.5" className="fill-foreground/30" />
                    <circle cx="310" cy="170" r="2" className="fill-foreground/30" />
                    <circle cx="100" cy="22" r="1.5" className="fill-foreground/35" />
                </svg>

                {/* 401 overlay */}
                <div className="absolute inset-0 flex items-end justify-center pb-2">
                    <span className="text-8xl md:text-9xl font-bold text-foreground/10 select-none">401</span>
                </div>
            </div>

            {/* Text */}
            <div className="text-center z-10 space-y-8 max-w-md">
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                        Sin permisos requeridos
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground text-pretty">
                        No tienes permisos para ver este recurso. Inicia sesión con una cuenta autorizada.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <Button asChild size="lg" className="gap-2 min-w-[160px]">
                        <Link to="/">
                            <LogIn className="w-4 h-4" />
                            Iniciar sesión
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="gap-2 min-w-[160px]"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver
                    </Button>
                </div>

                <div className="pt-4">
                    <svg className="w-32 h-8 mx-auto text-muted-foreground/30" viewBox="0 0 200 30" fill="currentColor">
                        <circle cx="20" cy="15" r="4" /><circle cx="50" cy="15" r="3" />
                        <circle cx="75" cy="15" r="2" /><circle cx="95" cy="15" r="1.5" />
                        <circle cx="105" cy="15" r="1.5" /><circle cx="125" cy="15" r="2" />
                        <circle cx="150" cy="15" r="3" /><circle cx="180" cy="15" r="4" />
                    </svg>
                </div>
            </div>

            <style>{`
        @keyframes warnFlash { 0%,100%{opacity:1} 50%{opacity:.4} }
        .warn { animation: warnFlash 2s ease-in-out infinite .5s; }
        @keyframes beamPulse { 0%,100%{opacity:.5} 50%{opacity:1} }
        .beam { animation: beamPulse 2s ease-in-out infinite; }
        @keyframes lockShake {
          0%,80%,100%{transform:rotate(0deg)}
          84%{transform:rotate(-8deg)} 88%{transform:rotate(8deg)}
          92%{transform:rotate(-5deg)} 96%{transform:rotate(4deg)}
        }
        .lock-grp { animation: lockShake 3s ease-in-out infinite 1s; transform-origin: 40px 118px; }
        @keyframes scanMove {
          0%{transform:translateY(-60px);opacity:0} 10%{opacity:1} 90%{opacity:1}
          100%{transform:translateY(60px);opacity:0}
        }
        .scan { animation: scanMove 2.5s linear infinite; }
        @keyframes dashOffset { from{stroke-dashoffset:0} to{stroke-dashoffset:24} }
        .dash-flow { stroke-dasharray:8 4; animation: dashOffset 1.2s linear infinite; }
      `}</style>
        </div>
    )
}