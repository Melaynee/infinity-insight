import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import { Menu } from "@headlessui/react";

const NavAuthorized = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    return null;
  }

  const { setUserInfo, userInfo } = userContext;

  const logout = () => {
    axios.post("http://localhost:3334/logout", {}, { withCredentials: true });
    setUserInfo(undefined);
  };

  const username = userInfo?.username;

  return (
    <nav className="flex text-base sm:text-xl text-slate-200 items-center gap-5 ">
      <Menu as="div" className="container">
        <Menu.Button>{username}</Menu.Button>
        <Menu.Items className="absolute text-center right-0 w-36 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-slate-950 flex flex-col p-2 sm:w-40 sm:right-20 md:right-32 md:w-52 lg:right-52 xl:right-60 2xl:right-72">
          <Menu.Item>
            <Link to={"/create"} className="hover:bg-slate-100">
              Create new post
            </Link>
          </Menu.Item>
          <Menu.Item>
            <button onClick={logout} className="hover:bg-slate-100">
              Logout
            </button>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </nav>
  );
};

export default NavAuthorized;
