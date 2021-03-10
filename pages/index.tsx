import Head from 'next/head'
import styles from '../styles/Home.module.css'
import style from '../styles/index.module.scss';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faCoffee, faHome, faTags } from '@fortawesome/free-solid-svg-icons'



export default function Home() {
  return (
    <div id={style.container}>
      <nav>
        {/* Main title */}
        <Link href="#">
        <a>Perceptron@Ln</a>
        </Link>
        {/* navbar links */}
        <ul>
          <li>
            <FontAwesomeIcon icon={faHome} className="LinkIcon" />
            <Link href="#">
              <a href="#">Home</a>
            </Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faTags} className="LinkIcon" />
            <Link href="#">
              <a href="#">Tags</a>
            </Link>
          </li>
          <Link href="#">
          <li>
            <FontAwesomeIcon icon={faAt} className="LinkIcon" />
              <a href="#">About_me</a>
          </li>
          </Link>
        </ul>
      </nav>
    </div>
  )
}
