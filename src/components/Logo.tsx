import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="logo text-base md:text-2xl text-slate-100 font-bold"
    >
      Infinity Insight
    </Link>
  );
};

export default Logo;
