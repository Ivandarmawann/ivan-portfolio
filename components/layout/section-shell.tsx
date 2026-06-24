import * as React from "react";

import { cn } from "@/lib/utils";

type SectionShellProps = React.ComponentPropsWithoutRef<"section"> & {
  contained?: boolean;
};

export function SectionShell({
  id,
  children,
  className,
  contained = true,
  ...props
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-28 py-16 sm:py-20 lg:py-24", className)}
      {...props}
    >
      <div className={cn(contained && "mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10")}>
        {children}
      </div>
    </section>
  );
}
