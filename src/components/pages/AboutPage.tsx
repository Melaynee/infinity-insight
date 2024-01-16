import React from "react";
import avatar from "../../assets/photo.jpeg";
import banner from "../../assets/1500x500.jpg";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { BiMessage } from "react-icons/bi";

const AboutPage = () => {
  return (
    <div className="font-poppins container mx-auto">
      <div className="border-b-2">
        <div>
          <div className="">
            <img src={banner} alt="" className="" />
          </div>
          <div className="flex justify-between relative lg:-top-16">
            <img
              src={avatar}
              alt=""
              className="w-28 rounded-full relative -top-12 left-4 border-4 border-white md:w-36 lg:w-72"
            />
            <div className="mr-2 mt-2 items-center flex gap-2 relative -top-8">
              <button className="border-2 rounded-full p-3">
                <BsThreeDots />
              </button>
              <button className="border-2 rounded-full p-3">
                <BiMessage />
              </button>
              <button className="border-2 p-3 w-20 bg-slate-500 text-slate-50 rounded-full md:w-32">
                Follow
              </button>
            </div>
          </div>
        </div>
        <div className="mx-4 relative -top-6">
          <h1 className="text-3xl font-bold">Tkach Illia</h1>
          <div className="mx-2">
            <p className="font-thin italic">Currently i'm free agent</p>
          </div>
          <p className="font-light mt-2">
            Experienced and detail-oriented Frontend Developer with a strong
            background in creating dynamic and responsive web applications.
            Proficient in the MERN stack. Adept at collaborating with
            cross-functional teams to drive project success and passionate about
            staying current with emerging trends and technologies in the
            ever-evolving field of web development.
          </p>
          <div className="flex gap-2 mt-2">
            <MdOutlineLocationOn size={20} />
            <p className="font-light italic">Italy, Novedrate</p>
          </div>
          <div className="flex gap-2 mt-2">
            <FaLink size={20} />
            <a
              href="https://github.com/Melaynee"
              className="font-light italic text-blue-400"
            >
              github.com/Melaynee
            </a>
          </div>
        </div>
      </div>
      <div className="mx-4 my-4">
        <h3 className="text-2xl font-bold">Technical Skills</h3>
        <ul className="mx-2">
          <li>
            <span className="font-bold">Languages:</span> JavaScript (ES6+),
            Python
          </li>
          <li>
            <span className="font-bold">Web Technologies:</span> HTML5, CSS3,
            React.js, Redux, Bootstrap, Tailwind
          </li>
          <li>
            <span className="font-bold">Backend Technologies:</span> Node.js,
            Express.js
          </li>
          <li>
            <span className="font-bold">Database:</span> MongoDB
          </li>
          <li>
            <span className="font-bold">Version Control:</span> Git, GitHub
          </li>
          <li>
            <span className="font-bold">Tools:</span> npm, yarn
          </li>
          <li>
            <span className="font-bold">Other:</span> RESTful API development,
            Webpack, Babel
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;
