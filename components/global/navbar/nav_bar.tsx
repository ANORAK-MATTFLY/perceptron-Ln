import style from "../../../styles/index.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HamburgerMenu from "./hamburger_menu";

import {
  faAt,
  faHome,
  faSearch,
  faTags,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  return (
    <nav>
      {/* Logo side */}
      <Link href="#">
        <a>code-rainbow 🏳️‍🌈</a>
      </Link>
      {/* search bar */}
      <div id={style.search_bar_wrapper}>
        <FontAwesomeIcon icon={faSearch} id="search-bar-icon" />
        <input type="text" placeholder="Search" />
      </div>
      {/* navbar links */}
      <ul id={style.ul}>
        <li>
          <Link href="#">
            <a href="#">
              <FontAwesomeIcon icon={faHome} className="link-icon" />
              Home
            </a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a href="#">
              <FontAwesomeIcon icon={faTags} className="link-icon" />
              Tags
            </a>
          </Link>
        </li>
        <Link href="#">
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faAt} className="link-icon" />
              About_me
            </a>
          </li>
        </Link>
      </ul>

      {/* Hamburger menu */}
      <HamburgerMenu />
    </nav>
  );
};

export default NavBar;
