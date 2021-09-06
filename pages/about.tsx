import MainLayout from "../components/global/main-layout";
import AboutBody from "../components/about_page/about_body";
import Head from "next/head";

const About = () => {
  return (
    <div>
      <Head>
        <title>About</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MainLayout>
        <AboutBody />
      </MainLayout>
    </div>
  );
};

export default About;
