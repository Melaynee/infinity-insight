import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("http://localhost:3334/profile", { withCredentials: true })
      .then((userInfo) => {
        setUserInfo(userInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const email = userInfo?.email;

  const logout = () => {
    axios.post("http://localhost:3334/logout", {}, { withCredentials: true });
    setUserInfo(null);
  };

  return (
    <header className="bg-slate-500 shadow-xl">
      <div className="container flex mx-auto justify-around py-2 items-center h-13 ">
        <Link
          to="/"
          className="logo text-base md:text-2xl text-slate-100 font-bold"
        >
          Infinity Insight
        </Link>
        {(email && (
          <nav className="flex text-base sm:text-xl text-slate-200 items-center gap-5 ">
            <Link to={"/create"}>Create new post</Link>
            <button onClick={logout}>Logout</button>
          </nav>
        )) || (
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
