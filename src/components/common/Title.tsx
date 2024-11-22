import { cn } from "@nextui-org/react";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  className?: string;
};

export default function Title({ children, className }: Props) {
  return (
    <h1
      className={cn(
        "text-2xl font-extrabold sm:text-3xl text-center md:text-left",
        className,
      )}
    >
      {children}
    </h1>
  );
}
