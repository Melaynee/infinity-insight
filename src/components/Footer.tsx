import { Link } from "react-router-dom";
import {
  SlSocialGithub,
  SlSocialInstagram,
  SlSocialSpotify,
  SlSocialTwitter,
} from "react-icons/sl";

const Footer = () => {
  return (
    <div className="bg-slate-500 mt-16">
      <div className="container mx-auto text-slate-50 p-8 md:p-2">
        <div className="grid grid-cols-1 items-center md:grid-cols-2 mb-10">
          <div className="flex justify-around md:grid grid-cols-2 gap-4 items-center">
            <Link target="_blank" to="https://github.com/Melaynee">
              <SlSocialGithub className="block mx-auto" size={26} />
            </Link>
            <Link
              target="_blank"
              to="https://www.instagram.com/illusion_of_pain/"
            >
              <SlSocialInstagram className="block mx-auto" size={26} />
            </Link>
            <Link
              target="_blank"
              to="https://open.spotify.com/user/ufalriw5hzo6w232jr2vxec57?si=a334aeed4f7a4da5"
            >
              <SlSocialSpotify className="block mx-auto" size={26} />
            </Link>
            <Link target="_blank" to="https://twitter.com/melayneeXreze">
              <SlSocialTwitter className="block mx-auto" size={26} />
            </Link>
          </div>
          <div className="my-6 grid text-center font-poppins md:flex-col gap-4">
            <Link to={"/about"}>About</Link>
            <Link to={"/"}>Contact us</Link>
          </div>
        </div>
        <h3 className="text-center">©2024 Infinity Insight Hub</h3>
      </div>
    </div>
  );
};

export default Footer;
