import Head from "next/head";
import style from "../styles/index.module.scss";
import NavBar from "../components/global/navbar/nav_bar";
import Body from "../components/home_page/body";

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
      <NavBar />
      <Body />
    </div>
  );
}
