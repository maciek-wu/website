import { PropsWithChildren } from "react";

export default function Title({ children }: PropsWithChildren) {
  return (
    <h1
      className={`mb-4 font-semibold text-3xl/tight md:text-5xl/tight xl:text-6xl/tight tracking-wider text-slate-100 text-shadow`}
    >
      {children}
    </h1>
  );
}
