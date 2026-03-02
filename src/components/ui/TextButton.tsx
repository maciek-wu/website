import { Link } from "react-router";

interface TextButtonProps {
  label: string;
  onClick: () => void;
  icon?: string;
}

export default function TextButton({ label, icon, onClick }: TextButtonProps) {
  return (
    <Link className="group relative inline-block" to="" onClick={onClick}>
      {label}{" "}
      {icon && (
        <span
          className={`${icon} absolute mt-1 ml-1 transition transform duration-200 group-hover:translate-x-1`}
        ></span>
      )}
    </Link>
  );
}
