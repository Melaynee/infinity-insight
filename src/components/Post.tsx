import { Link } from "react-router-dom";

const Post = () => {
  return (
    <div className=" flex gap-2 items-start justify-center font-poppins my-7">
      <img
        src="https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure.webp"
        alt="first post"
        className="max-w-64 rounded cursor-pointer"
      />
      <div className="max-w-3xl">
        <h3 className="text-2xl font-semibold cursor-pointer">
          The first post ever!
        </h3>
        <p className=" mt-2 font-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
          suscipit reiciendis recusandae molestiae, assumenda accusamus numquam
          odit quam ullam quod. Similique assumenda magni neque!
        </p>
        <p className="text-sm  font-extralight mt-1 justify-end flex gap-2 items-center">
          <Link to="/author" className="cursor-pointer block italic">
            Author Name
          </Link>
          <time className="text-xs">2024-10-01 14:14</time>
        </p>
      </div>
    </div>
  );
};

export default Post;
