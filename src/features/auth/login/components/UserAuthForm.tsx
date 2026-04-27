import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState, type HTMLAttributes } from "react";
import { useLogin } from "../hooks/api/useLogin";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * Formulario de login con los inputs
 */

export function UserAuthForm({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { form, isLoading } = useLogin();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible((v) => !v);

  return (
    <section className={cn("w-full", className)} {...props}>
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="space-y-4">
          {/* Usuario */}
          <form.Field
            name="nombreUsuario"
            children={(field) => (
              <div className="space-y-1.5">
                <Label
                  htmlFor="nombreUsuario"
                  className="text-xs font-medium tracking-widest uppercase text-muted-foreground"
                >
                  Usuario
                </Label>
                <Input
                  id="nombreUsuario"
                  placeholder="nombre de usuario"
                  autoCapitalize="none"
                  autoComplete="nombreUsuario"
                  disabled={isLoading}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className="h-10 bg-background border-border/60 focus-visible:ring-1 focus-visible:ring-primary/50 placeholder:text-muted-foreground/40 text-sm rounded-md"
                />
                {field.state.meta.errors[0] && (
                  <p className="text-xs text-destructive mt-1">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          />

          {/* Contraseña */}
          <form.Field
            name="contrasena"
            children={(field) => (
              <div className="space-y-1.5">
                <Label
                  htmlFor="contrasena"
                  className="text-xs font-medium tracking-widest uppercase text-muted-foreground"
                >
                  Contraseña
                </Label>
                <div className="relative">
                  <Input
                    id="contrasena"
                    placeholder="••••••••"
                    type={isVisible ? "text" : "password"}
                    autoComplete="current-password"
                    disabled={isLoading}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="h-10 pr-10 bg-background border-border/60 focus-visible:ring-1 focus-visible:ring-primary/50 placeholder:text-muted-foreground/40 text-sm rounded-md"
                  />
                  <button
                    type="button"
                    onClick={toggleVisibility}
                    tabIndex={-1}
                    aria-label={isVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {isVisible ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {field.state.meta.errors[0] && (
                  <p className="text-xs text-destructive mt-1">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-10 text-sm font-medium tracking-wide"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Validando...
            </span>
          ) : (
            "Iniciar sesión"
          )}
        </Button>
      </form>
    </section>
  );
}
