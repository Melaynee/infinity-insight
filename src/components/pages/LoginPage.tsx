import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext, UserContextProps } from "../../UserContext";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext) as UserContextProps;

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:3334/auth",
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((userInfo) => {
        setUserInfo(userInfo.data);
        toast.success("Login confirmed!");
        setTimeout(() => setRedirect(true), 1000);
      })
      .catch((error) => {
        toast.error("Login failed! " + error.response.data.message);
      });
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <Toaster />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-700">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST" onSubmit={login}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6 pl-2"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  to="#"
                  className="font-semibold text-yellow-500 hover:text-yellow-400"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6 pl-2"
              />
            </div>
          </div>

          {/* Button */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-slate-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            to="/registration"
            className="font-semibold leading-6 text-yellow-500 hover:text-yellow-400"
          >
            Start a 14 day free trial
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
