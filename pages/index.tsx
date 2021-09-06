import Head from "next/head";
import style from "../styles/index.module.scss";
import Body from "../components/home_page/body";
import MainLayout from "../components/global/main-layout";

const Home = () => {
  return (
    <div id={style.container}>
      <Head>
        <title>code-rainbow</title>

        <meta
          name="description"
          content="A blog dedicated in providing free education to everyone in various fields of computer science"
        />
        <meta
          name="keywords"
          content="learning, courses, education, tutorial, web development, flutter, javascript, blog"
        />
        <meta name="robots" content="all" />
        <meta name="robots" content="index" />
      </Head>
      <MainLayout>
        <Body />
      </MainLayout>
    </div>
  );
};

export default Home;
