import style from "../../../styles/footer.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDev,
  faGithub,
  faTwitter,
  faYoutube,
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
          <Link href="https://www.youtube.com/channel/UCaZslnwpO3OvakjFYWV2uJA">
            <a target="_blank">
              <FontAwesomeIcon icon={faYoutube} id="search-bar-icon" />
            </a>
          </Link>
          <Link href="https://twitter.com/JrMatanda">
            <a target="_blank">
              <FontAwesomeIcon icon={faTwitter} id="search-bar-icon" />
            </a>
          </Link>
          <Link href="https://dev.to/jrmatanda">
            <a target="_blank">
              <FontAwesomeIcon icon={faDev} id="search-bar-icon" />
            </a>
          </Link>
          <Link href="https://github.com/ANORAK-MATTFLY">
            <a target="_blank">
              <FontAwesomeIcon icon={faGithub} id="search-bar-icon" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
