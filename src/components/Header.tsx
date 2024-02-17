import { useRef } from "react";
import { Link } from "react-router-dom";

import { FaMoon } from "react-icons/fa";
import { FiMoon } from "react-icons/fi";

interface AppRef {
  current: HTMLElement | null;
}

interface HeaderProps {
  appRef: AppRef;
  goHome: number;
  setGoHome: React.Dispatch<React.SetStateAction<number>>;
}

function Header({ appRef, goHome, setGoHome }: HeaderProps) {
  const iconMoonFull = useRef<HTMLSpanElement>(null);
  const iconMoonHollow = useRef<HTMLSpanElement>(null);

  function changeTheme() {
    iconMoonFull.current?.classList.toggle("hidden");
    iconMoonHollow.current?.classList.toggle("hidden");
    appRef.current?.classList.toggle("dark-mode");
  }
  

  function getHome() {
    setGoHome((prevGoHome) => prevGoHome + 1);
  }

  return (
    <div className="header w-full py-6 bg-main-elements z-20 fixed left-0 top-0 px-3 lg:px-0">
      <nav className="navbar flex justify-between items-center lg:max-w-[1100px] lg:mx-auto">
        <Link to="/">
          <h1 onClick={getHome} className="text-md md:text-lg lg:text-xl font-bold">
            Where in the world?
          </h1>
        </Link>

        <div
          onClick={changeTheme}
          className="toggle-mode flex gap-2 items-center justify-center w-[120px] px-2 py-1 rounded-full cursor-pointer"
        >
          <span ref={iconMoonFull} className="">
          <FaMoon />
          </span>
          <span ref={iconMoonHollow} className="hidden">
            <FiMoon />
          </span>
          <span className="font-semibold">Dark Mode</span>
        </div>
      </nav>
    </div>
  );
}

export default Header;
