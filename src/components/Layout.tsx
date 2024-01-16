import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
