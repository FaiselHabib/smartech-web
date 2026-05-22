import { Badge } from "@/components/ui/Badge";

export function PageHero({
  eyebrow,
  title,
  description,
  variant = "light",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  variant?: "light" | "dark";
}) {
  const dark = variant === "dark";
  return (
    <section
      className={`relative overflow-hidden pt-[140px] pb-16 sm:pb-20 ${
        dark ? "bg-brand-teal text-white" : ""
      }`}
    >
      {!dark && <div className="absolute inset-0 -z-10 bg-hero-radial" />}
      <div className="absolute inset-0 -z-10 grid-bg opacity-50 mask-fade-b" />
      {dark && (
        <>
          <div className="absolute -top-40 right-0 -z-0 size-[460px] rounded-full bg-brand-mint/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-20 -z-0 size-[380px] rounded-full bg-brand-mint/10 blur-3xl" />
        </>
      )}

      <div className="container-pad relative">
        <div className="max-w-3xl">
          {eyebrow && (
            <Badge variant={dark ? "solid" : "soft"} className="mb-5">
              <span className="size-1.5 rounded-full bg-brand-teal/70" />
              {eyebrow}
            </Badge>
          )}
          <h1
            className={`text-4xl sm:text-5xl lg:text-[64px] font-extrabold leading-[1.05] tracking-tight text-balance ${
              dark ? "text-white" : "text-brand-teal"
            }`}
          >
            {title}
          </h1>
          {description && (
            <p
              className={`mt-5 text-base sm:text-lg leading-8 max-w-2xl text-balance ${
                dark ? "text-white/75" : "text-muted-foreground"
              }`}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
