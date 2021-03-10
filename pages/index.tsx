import Head from "next/head";
import style from "../styles/index.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faHome,
  faSearch,
  faTags,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <div id={style.container}>
      <Head>
        <title>Perceptron@Ln</title>
        <meta
          name="description"
          content="A blog to help people interested in computer science"
        />
      </Head>
      <nav>
        {/* Logo side */}
        <Link href="#">
          <a>Perceptron@Ln</a>
        </Link>
        {/* search bar */}
        <div id={style.search_bar_wrapper}>
          <FontAwesomeIcon icon={faSearch} id="search-bar-icon" />
          <input type="text" placeholder="Search" />
        </div>
        {/* navbar links */}
        <ul>
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
      </nav>
    </div>
  );
}
