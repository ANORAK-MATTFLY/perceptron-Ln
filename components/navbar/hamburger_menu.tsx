import style from "../../styles/index.module.scss";
import { useState } from "react";
import Link from "next/link";

const HamburgerMenu: React.FC = () => {
  const [buttonToggle, setButtonToggle] = useState(Boolean);
  return (
    <div
      id={
        buttonToggle == false
          ? style.hamburger_menu
          : style.toggled_hamburger_menu
      }
      onClick={() => setButtonToggle(true)}
    >
      {!buttonToggle ? (
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <ul>
          <li>
            <Link href="#">
              <a href="#">Home</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a href="#">Tags</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a href="#">About_me</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a href="#">
                <button onClick={() => setButtonToggle(!buttonToggle)}>
                  Close
                </button>
              </a>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default HamburgerMenu;
