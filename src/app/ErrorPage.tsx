import { MobilePageHeader } from "./MobilePageHeader";
import { useMediaQuery } from "./responsive-ui";
import { useEffect, useRef } from "react";
import errorSearchIllustration from "@/assets/error-search-blue.png";
import errorConnectionIllustration from "@/assets/error-connection-blue.png";

export type ErrorPageKind = "not-found" | "something-went-wrong";

interface ErrorPageProps {
  kind: ErrorPageKind;
  onHome: () => void;
}

export function ErrorPage({ kind, onHome }: ErrorPageProps) {
  const compactNavigation = useMediaQuery("(max-width: 1023px)");
  const isNotFound = kind === "not-found";
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [kind]);

  return (
    <>
    <MobilePageHeader title={isNotFound ? "404 — Page not found" : "Something went wrong"} onBack={onHome} titleId="error-page-title" titleRef={headingRef} />
    <section className="dashboard-error-page flex min-h-[calc(100svh-80px)] items-center justify-center rounded-[8px] bg-[#f8f9fb] px-5 py-14 sm:px-8" aria-labelledby="error-page-title">
      <div className="w-full max-w-[640px] origin-center -translate-y-4 text-center">
        <img src={isNotFound ? errorSearchIllustration : errorConnectionIllustration} alt="" aria-hidden="true" draggable={false} width={220} height={176} className="mx-auto mb-5 h-[176px] w-[220px] max-w-full object-contain" />

        <h1 ref={compactNavigation ? undefined : headingRef} id={compactNavigation ? undefined : "error-page-title"} tabIndex={-1} className="hidden lg:block text-[32px] font-bold leading-[1.12] tracking-[-0.035em] text-black outline-none sm:text-[46px]">
          {isNotFound ? "404 — Page not found" : "Something went wrong"}
        </h1>
        <p className="mx-auto mt-4 max-w-[440px] text-[15px] leading-[22px] text-[#626262]">
          {isNotFound
            ? "We couldn’t find the order you’re looking for. Head back home to continue."
            : "We couldn’t load this order right now. Please try again in a moment."}
        </p>

        <button type="button" onClick={onHome} className="mt-6 inline-flex h-11 origin-center items-center justify-center rounded-full border border-[#171717] bg-[#171717] px-6 text-[12px] font-medium text-white shadow-[0_1px_2px_rgba(0,0,0,0.08)] transition-colors hover:border-[#333] hover:bg-[#333] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb]">
          Take me home
        </button>
      </div>
    </section>
    </>
  );
}
