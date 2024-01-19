import { Link } from "react-router-dom";
import Logo from "./Logo";
import NavAuthorized from "./NavAuthorized";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import { useEffect } from "react";

const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return (
    <header className="bg-slate-500 shadow-xl">
      <div className="container flex mx-auto justify-around py-2 items-center h-13 ">
        <Logo />
        {(isAuth && <NavAuthorized />) || (
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
