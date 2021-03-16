import style from "../../../styles/footer.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div id={style.footer}>
      <div id={style.footer_content}>
        <p>
          Find an issue on this web app?{" "}
          <Link href="https://github.com/ANORAK-MATTFLY/perceptron-Ln">
            <a target="_blank">Become a contributor!</a>
          </Link>
          <span>🥳</span>
        </p>
        <p>Copyright &copy; 2021 code-rainbow.io</p>
        <p>Created with NextJS, Rust</p>
        <div id={style.socials}>
          <Link href="#">
            <FontAwesomeIcon icon={faTwitter} id="search-bar-icon" />
          </Link>
          <Link href="#">
            <FontAwesomeIcon icon={faFacebook} id="search-bar-icon" />
          </Link>
          <Link href="#">
            <FontAwesomeIcon icon={faGithub} id="search-bar-icon" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
