import style from "../../../styles/global-components-styles/nav-bar.module.scss";
import AnimatedLogo from "../../../public/lottie-animations/donut.json";
import HamburgerMenu from "./hamburger_menu";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Lottie from "react-lottie";
import { faAt, faHome, faSearch } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const Logo = {
    loop: true,
    autoplay: true,
    animationData: AnimatedLogo,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <nav id={style.nav}>
      {/* Logo side */}
      <Link href="/">
        <a>
          <div id={style.logo_container}>
            <div id={style.logo}>
              <Lottie options={Logo} />
            </div>
            code-rainbow
          </div>
        </a>
      </Link>

      {/* search bar */}
      <div id={style.search_bar_wrapper}>
        <FontAwesomeIcon icon={faSearch} id="search-bar-icon" />
        <input type="text" placeholder="Search" />
      </div>
      {/* navbar links */}
      <ul id={style.ul}>
        <li>
          <Link href="/">
            <a>
              {/* <FontAwesomeIcon icon={faHome} className="link-icon" /> */}
              Blog
            </a>
          </Link>
        </li>

        <li>
          <Link href="/about">
            <a>
              {/* <FontAwesomeIcon icon={faAt} className="link-icon" /> */}
              About_me
            </a>
          </Link>
        </li>
      </ul>

      {/* Hamburger menu */}
      <HamburgerMenu />
    </nav>
  );
};

export default NavBar;
