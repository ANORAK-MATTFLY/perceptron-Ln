import style from "../../../styles/global-components-styles/hamburger-menu.module.scss";
import { useState } from "react";
import Link from "next/link";
import { useRouter  } from 'next/router';

const HamburgerMenu: React.FC = () => {
  const [buttonToggle, setButtonToggle] = useState(Boolean);
  const handleClose = () => {
    return useRouter().push("/");
  }
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
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About_me</a>
            </Link>
          </li>
          <li>
            
              <button onClick={() => handleClose}>
                    Close
                </button>
              
          </li>
        </ul>
      )}
    </div>
  );
};

export default HamburgerMenu;
