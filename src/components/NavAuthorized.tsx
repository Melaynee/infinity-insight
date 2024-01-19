import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/slices/auth";

const NavAuthorized = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.data);

  const handleLogOut = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
  };

  return (
    <nav className="flex text-base sm:text-xl text-slate-200 items-center gap-5 ">
      <Menu as="div" className="container">
        <Menu.Button>{userInfo.username}</Menu.Button>
        <Menu.Items className="absolute text-center right-0 w-36 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-slate-950 flex flex-col p-2 sm:w-40 sm:right-20 md:right-32 md:w-52 lg:right-52 xl:right-60 2xl:right-72">
          <Menu.Item>
            <Link to={"/create"} className="hover:bg-slate-100">
              Create new post
            </Link>
          </Menu.Item>
          <Menu.Item>
            <button onClick={handleLogOut} className="hover:bg-slate-100">
              Logout
            </button>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </nav>
  );
};

export default NavAuthorized;
