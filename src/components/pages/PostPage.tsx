import axios from "axios";
import { formatISO9075 } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext, UserContextProps } from "../../UserContext";
import { PostProps } from "./HomePage";

const PostPage = () => {
  const [info, setInfo] = useState<PostProps | null>(null);
  const { userInfo } = useContext(UserContext) as UserContextProps;

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3334/post/${id}`)
      .then((res) => setInfo(res.data))
      .catch((err) => alert("Error! " + err.response.data.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!info) {
    return (
      <div className="100vw white font-bold text-center text-slate-900">
        Loading...
      </div>
    );
  }
  return (
    <div className="container mx-auto my-10 font-poppins">
      <h1 className="text-3xl font-bold">{info.title}</h1>
      <time className="ml-2 font-extralight italic">
        {formatISO9075(new Date(info.createdAt))}
      </time>
      {userInfo?.id === info.author._id && (
        <button className="ml-10 text-slate-600 hover:text-slate-500 italic bold">
          <Link to={`/edit/${info._id}`}>Edit</Link>
        </button>
      )}
      <h2 className="italic my-10">{info.summary}</h2>
      <div className="sm:w-[664px] lg:w-[964px] border-r-2">
        <img
          src={`http://localhost:3334/${info.cover}`}
          alt=""
          className="sm:h-[400px] lg:h-[632px] mx-auto"
        />
        <div
          className="my-10"
          dangerouslySetInnerHTML={{ __html: info.content }}
        ></div>
      </div>
    </div>
  );
};

export default PostPage;
