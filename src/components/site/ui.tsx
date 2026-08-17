import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  ink = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  ink?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "border-b border-border px-5 py-20 sm:px-8 sm:py-28",
        ink && "border-ink-border bg-ink text-ink-foreground",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, ink = false }: { children: ReactNode; ink?: boolean }) {
  return (
    <p className={cn("eyebrow", ink && "text-ink-muted")}>
      <span className="mr-2 text-primary">—</span>
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("mt-5 max-w-4xl text-3xl font-bold sm:text-5xl", className)}>{children}</h2>
  );
}

export function Lead({
  children,
  ink = false,
  className,
}: {
  children: ReactNode;
  ink?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-5 max-w-2xl text-base leading-relaxed sm:text-lg",
        ink ? "text-ink-muted" : "text-muted-foreground",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function CTALink({
  to,
  children,
  variant = "primary",
  className,
}: {
  to: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex items-center justify-center rounded-sm px-5 py-3 text-sm font-medium transition-all",
        variant === "primary" && "bg-primary text-primary-foreground hover:opacity-90",
        variant === "outline" && "border border-border hover:border-primary hover:text-primary",
        variant === "ghost" &&
          "border border-ink-border text-ink-foreground hover:border-primary hover:text-primary",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function NumberedCard({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="group border border-border bg-card p-7 transition-colors hover:border-primary">
      <span className="font-mono text-xs text-primary">{index}</span>
      <h3 className="mt-6 text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-ink-border bg-ink px-5 py-20 text-ink-foreground sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Eyebrow ink>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.05] sm:text-6xl">{title}</h1>
        {lead && <Lead ink>{lead}</Lead>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="border border-dashed border-border bg-card/50 p-10 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
