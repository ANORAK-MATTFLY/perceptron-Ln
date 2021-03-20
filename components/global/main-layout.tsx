import NavBar from "./navbar/nav_bar";
import Footer from "./footer/footer";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
