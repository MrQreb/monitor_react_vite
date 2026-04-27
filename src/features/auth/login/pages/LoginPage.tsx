import { Separator } from "@/components/ui/separator";
import { UserAuthForm } from "../components/UserAuthForm";
import { useState } from "react";
import { Button } from '@/components/ui/button';
import { Activity, Moon, Sun } from "lucide-react";

export default function LoginPage() {
  const [dark, setDark] = useState(true);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen w-full bg-background text-foreground font-sans antialiased">

        {/* Theme toggle — top right */}
        <div className="absolute top-4 right-4 z-50">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDark((d) => !d)}
            aria-label="Cambiar tema"
            className="rounded-full text-muted-foreground hover:text-foreground"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex min-h-screen">

          {/* ── Left panel ── */}
          <aside className="hidden lg:flex flex-col justify-between w-[720px] shrink-0 border-r border-border/40 bg-card p-12">

            {/* Logo / brand */}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <Activity className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-semibold tracking-widest uppercase text-foreground">
                Monitor
              </span>
            </div>

            {/* Center text */}
            <div className="space-y-6">
              <div className="space-y-1">
                <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                  Plataforma
                </p>
                <h2 className="text-4xl font-bold tracking-tight text-foreground leading-tight">
                  Monitoreo<br />de procesos<br />en tiempo real.
                </h2>
              </div>
              <Separator className="w-8 h-px bg-primary" />
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Visualiza, analiza y controla todos los procesos de Marbran.
              </p>
            </div>

            {/* Version tag */}
            <p className="text-xs text-muted-foreground/50 tracking-widest">
              v2.0.0 — Producción
            </p>
          </aside>

          {/* ── Right panel ── */}
          <main className="flex flex-1 items-center justify-center p-8">
            <div className="w-full max-w-sm space-y-8">

              {/* Mobile logo */}
              <div className="flex lg:hidden items-center gap-2 justify-center">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
                  <Activity className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
                <span className="text-sm font-semibold tracking-widest uppercase text-foreground">
                  Monitor
                </span>
              </div>

              {/* Heading */}
              <div className="space-y-1.5">
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                  Bienvenido
                </h1>
                <p className="text-sm text-muted-foreground">
                  Ingresa tus credenciales para continuar
                </p>
              </div>

              {/* Form */}
              <UserAuthForm />

              {/* Footer */}
              <p className="text-xs text-muted-foreground/60 text-center leading-relaxed">
                Al continuar aceptas los{" "}
                <a
                  href="/terms"
                  className="underline underline-offset-2 hover:text-muted-foreground transition-colors"
                >
                  Términos de uso
                </a>{" "}
                y la{" "}
                <a
                  href="/privacy"
                  className="underline underline-offset-2 hover:text-muted-foreground transition-colors"
                >
                  Política de privacidad
                </a>
                .
              </p>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
