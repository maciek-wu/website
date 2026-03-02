import { useEffect, useRef } from "react";
import { Link } from "react-router";

interface UnderlineLinkProps {
  label: string;
  fadeIn?: boolean;
  onClick: () => void;
}

export default function UnderlineLink({
  label,
  fadeIn = false,
  onClick,
}: UnderlineLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  async function handleFadeIn() {
    if (!linkRef.current) return;

    linkRef.current.classList.remove("opacity-0");
    linkRef.current.classList.add("opacity-100");
  }

  useEffect(() => {
    if (fadeIn) {
      handleFadeIn();
    }
  }, [linkRef.current]);

  return (
    <Link
      ref={linkRef}
      to={"/"}
      onClick={onClick}
      className={`relative ${fadeIn ? "opacity-0 transition-all duration-500" : "transition-colors duration-200"} before:bg-theme-violet before:absolute before:-bottom-1 before:block before:h-0.5 before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100`}
    >
      {label}
    </Link>
  );
}
