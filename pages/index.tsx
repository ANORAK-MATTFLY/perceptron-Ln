import Head from "next/head";
import style from "../styles/index.module.scss";
import Body from "../components/home_page/body";
import MainLayout from "../components/global/main-layout";
import axios from "axios";

const Home = () => {
  async function updateVisitCount() {
    await axios({
      url: "https://rainbow-analytics-api.herokuapp.com/",
      method: "post",
      data: {
        query: `
            mutation{
                updatePageVisitById(id:"613f45344950d7c0547a5026")
            }
        `,
      },
    });
  }
  updateVisitCount();
  return (
    <div id={style.container}>
      <Head>
        <title>code-rainbow</title>
        <link rel="icon" href="/icon.svg" />
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
