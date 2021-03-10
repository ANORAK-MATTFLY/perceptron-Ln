import Head from 'next/head'
import styles from '../styles/Home.module.css'
import style from '../styles/index.module.scss';

export default function Home() {
  return (
    <div id={style.container}>
      <nav>
        {/* Main title */}
        <h1><a href="#">Perceptron@Ln</a></h1>
        {/* navbar links */}
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Tags</a></li>
          <li><a href="#">About_me</a></li>
        </ul>
      </nav>
    </div>
  )
}
