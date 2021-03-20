import Head from "next/head";
import style from "../styles/index.module.scss";
import Body from "../components/home_page/body";
import MainLayout from "../components/global/main-layout";

const Home = () => {
  return (
    <div id={style.container}>
      <Head>
        <title>Perceptron@Ln</title>
        <meta
          name="description"
          content="A blog to help people interested in computer science"
        />
      </Head>
      <MainLayout>
        <Body />
      </MainLayout>
    </div>
  );
};

export default Home;
