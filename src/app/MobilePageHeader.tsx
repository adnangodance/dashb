import { ChevronLeft, Search, X } from "lucide-react";
import { useId, type ButtonHTMLAttributes, type ReactNode, type Ref } from "react";
import { useMediaQuery } from "./responsive-ui";

export function MobileHeaderAction({ children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" {...props} className={`mobile-header-action ${className}`}>{children}</button>;
}

type HeaderSearch = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder: string;
  label?: string;
  id?: string;
  inputRef?: Ref<HTMLInputElement>;
  clearable?: boolean;
};

/** The owner's Catalog geometry, shared at the bottom navigation's breakpoint. */
export function MobilePageHeader({ title, onBack, actions, search, searchRow, filterButton, subtitle, divider = true, children, titleId, titleRef, backDisabled, className = "" }: {
  title: string;
  onBack?: () => void;
  actions?: ReactNode;
  search?: HeaderSearch;
  /** Preserve custom search artwork/handlers, as in the original Catalog. */
  searchRow?: ReactNode;
  filterButton?: ReactNode;
  subtitle?: ReactNode;
  divider?: boolean;
  /** Existing dropdown filters or section tabs, above the shared divider. */
  children?: ReactNode;
  titleId?: string;
  titleRef?: Ref<HTMLHeadingElement>;
  backDisabled?: boolean;
  className?: string;
}) {
  const generatedId = useId();
  const compactNavigation = useMediaQuery("(max-width: 1023px)");
  if (!compactNavigation) return null;
  return <header className={`mobile-page-header lg:hidden ${className}`} data-divider={divider}>
    <div className="mobile-page-heading">
      {onBack && <MobileHeaderAction onClick={onBack} disabled={backDisabled} aria-label="Back"><ChevronLeft size={22} strokeWidth={1.75} aria-hidden="true" /></MobileHeaderAction>}
      <h1 ref={titleRef} tabIndex={-1} id={titleId ?? generatedId} className="mobile-page-title" title={title}>{title}</h1>
      {actions && <div className="mobile-page-actions">{actions}</div>}
    </div>
    {subtitle && <div className="mobile-page-meta">{subtitle}</div>}
    {(search || searchRow) && <div className="mobile-page-search-row">
      {searchRow ?? <label className="mobile-page-search">
        <Search size={19} strokeWidth={1.8} aria-hidden="true" />
        <input ref={search!.inputRef} id={search!.id} type="text" value={search!.value} onChange={event => search!.onChange?.(event.target.value)} placeholder={search!.placeholder} aria-label={search!.label ?? search!.placeholder} />
        {search!.clearable && search!.value && <button type="button" className="mobile-page-search-clear" aria-label="Clear search" onClick={() => search!.onChange?.("")}><X size={16} aria-hidden="true" /></button>}
      </label>}
      {filterButton}
    </div>}
    {children && <div className="mobile-page-header-controls">{children}</div>}
  </header>;
}
