import type { ComponentPropsWithoutRef, ReactNode } from "react";

type AppScreenProps = Omit<ComponentPropsWithoutRef<"section">, "children"> & {
  children: ReactNode;
};

export function AppScreen({
  children,
  className = "",
  ...props
}: AppScreenProps) {
  const composedClassName = [
    "shell-card overflow-hidden rounded-[32px] shadow-[0_24px_60px_rgba(0,0,0,0.28)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={composedClassName} {...props}>
      {children}
    </section>
  );
}
