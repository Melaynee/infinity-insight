import { Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";

const Post = ({ _id, title, summary, cover, createdAt, author }) => {
  const img = cover;
  return (
    <div className="items-start grid gap-5 mx-auto justify-items-start font-poppins my-7 sm:flex ">
      <div className="w-[280px] sm:max-w-72 max-h-64 overflow-hidden">
        <Link to={`/post/${_id}`}>
          <img
            src={"http://localhost:3334/" + img}
            alt="cover"
            className="object-fill rounded cursor-pointer"
          />
        </Link>
      </div>
      <div className="w-[280px] lg:w-[600px]">
        <Link to={`/post/${_id}`}>
          <h3 className="text-lg lg:text-2xl font-semibold cursor-pointer">
            {title}
          </h3>
        </Link>
        <p className="text-sm lg:text-base mt-2 font-light">{summary}</p>
        <p className="text-xs lg:text-sm font-extralight mt-1 justify-end flex gap-2 items-center">
          <Link to="/author" className="cursor-pointer block italic">
            {author.username}
          </Link>
          <time className="text-xs">{formatISO9075(new Date(createdAt))}</time>
        </p>
      </div>
    </div>
  );
};

export default Post;
