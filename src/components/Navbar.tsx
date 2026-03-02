import { useState } from "react";
import { Link } from "react-router";
import { useUi } from "../hooks/useUi";
import { AppComponents } from "../utils/definitions";
import Logo from "./ui/Logo";
import TopNav from "./ui/TopNav";

interface NavbarProps {
  showNav?: boolean;
}

export default function Navbar({ showNav }: NavbarProps) {
  const { scrollTop } = useUi();
  const [logoHover, setLogoHover] = useState(false);

  return (
    <header
      id={AppComponents.navbar}
      className="fixed top-0 z-20 w-full backdrop-blur-lg"
    >
      <div className="flex min-h-16 w-11/12 xl:w-8/12 mx-auto py-5 justify-between items-start content-center">
        <div className="flex h-full">
          <Link
            to={"/"}
            onClick={() => scrollTop()}
            className="my-auto"
            onMouseOver={() => setLogoHover(true)}
            onMouseOut={() => setLogoHover(false)}
          >
            <Logo style={logoHover ? "light" : "color"} />
          </Link>
        </div>
        <div className="flex h-full">
          <TopNav showNav={showNav} />
        </div>
      </div>
    </header>
  );
}
