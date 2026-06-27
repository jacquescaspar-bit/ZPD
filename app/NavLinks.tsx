const NAV_FONT_STYLE = {
  fontFamily: "var(--font-antipasto)",
  letterSpacing: "0.1em",
} as const;

const navLinkClass = (active: boolean, size: "desktop" | "mobile") => {
  const base =
    size === "desktop"
      ? "text-lg md:text-xl leading-snug relative transition-colors duration-300 text-center"
      : "text-xl leading-snug relative transition-colors duration-300";
  const activeClass =
    "font-bold text-gray-800 dark:text-gray-200 after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[1px] after:bg-gray-800 dark:after:bg-gray-200 after:transform after:scale-x-100 after:transition-transform after:duration-300 after:ease-out after:origin-center";
  const inactiveClass =
    "font-light text-gray-900 dark:text-gray-100 hover:text-gray-900 dark:hover:text-gray-200 after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[1px] after:bg-gray-900 dark:after:bg-gray-200 after:transform after:scale-x-0 after:transition-transform after:duration-300 after:ease-out after:origin-center";
  return `${base} ${active ? activeClass : inactiveClass}`;
};

export const NAV_ITEMS = [
  { href: "/about", label: "About" },
  { href: "/tutors", label: "Tutors" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

interface NavLinkProps {
  href: string;
  label: string;
  pathname: string;
  size: "desktop" | "mobile";
  onNavigate?: () => void;
}

export const NavLink = ({
  href,
  label,
  pathname,
  size,
  onNavigate,
}: NavLinkProps) => (
  <a
    className={navLinkClass(pathname === href, size)}
    href={href}
    style={NAV_FONT_STYLE}
    onClick={onNavigate}
  >
    {label}
  </a>
);
