import Head from "next/head";
import style from "../styles/index.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faCoffee,
  faHome,
  faSearch,
  faTags,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <div id={style.container}>
      <head>
        <title>Perceptron@Ln</title>
        <meta
          name="description"
          content="A blog to help people interested in computer science"
        />
      </head>
      <nav>
        {/* Logo side */}
        <Link href="#">
          <a>Perceptron@Ln</a>
        </Link>

        {/* search bar */}
        <div id="search-bar-container">
          <input type="text" placeholder="Search" />
          <FontAwesomeIcon icon={faSearch} className="LinkIcon" />
        </div>
        {/* navbar links */}
        <ul>
          <li>
            <Link href="#">
              <a href="#">
                <FontAwesomeIcon icon={faHome} className="LinkIcon" />
                Home
              </a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a href="#">
                <FontAwesomeIcon icon={faTags} className="LinkIcon" />
                Tags
              </a>
            </Link>
          </li>
          <Link href="#">
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faAt} className="LinkIcon" />
                About_me
              </a>
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
