import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import Logo from "./Logo";
import NavAuthorized from "./NavAuthorized";

const Header = () => {
  const userContext = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3334/profile", {
          withCredentials: true,
        });
        const userInfo = response.data;
        setUserInfo(userInfo);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!userContext) return null;
  const { setUserInfo, userInfo } = userContext;

  const email = userInfo?.email;

  return (
    <header className="bg-slate-500 shadow-xl">
      <div className="container flex mx-auto justify-around py-2 items-center h-13 ">
        <Logo />
        {(email && <NavAuthorized />) || (
          <nav className="flex text-base sm:text-xl text-slate-200 items-center gap-5 ">
            <Link to="/auth" className=" hover:text-slate-50">
              Sign In
            </Link>
            <Link
              to="/registration"
              className=" text-slate-50 bg-yellow-500 hover:bg-yellow-400 px-2 rounded-md font-bold"
            >
              Sign Up
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
