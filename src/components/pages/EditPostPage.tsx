import axios from "axios";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Navigate, useParams } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const EditPostPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [redirect, setRedirect] = useState(false);

  const updatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData();
    data.set("title", title ?? "");
    data.set("summary", summary ?? "");
    data.set("content", content ?? "");
    data.set("id", id ?? "");

    if (files?.[0]) {
      data.set("file", files[0]);
    }

    e.preventDefault();

    await axios
      .put("http://localhost:3334/post", data, { withCredentials: true })
      .then(() => {
        setRedirect(true);
      })
      .catch((err) => alert("Error! " + err.response.data.message));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3334/post/${id}`)
      .then((postInfo) => {
        setTitle(postInfo.data.title);
        setContent(postInfo.data.content);
        setSummary(postInfo.data.summary);
      })
      .catch((err) => alert("Error! " + err.response.data.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (redirect) return <Navigate to={`/post/${id}`} />;

  return (
    <div className="container mx-auto my-7">
      <form className="flex flex-col " onSubmit={updatePost}>
        <input
          type="title"
          placeholder="Title"
          className="p-2 my-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="summary"
          placeholder="Summary"
          className="p-2 my-1"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input
          type="file"
          className="my-2"
          onChange={(e) => setFiles(e.target.files)}
        />
        <ReactQuill
          modules={modules}
          formats={formats}
          value={content}
          onChange={(e) => setContent(e)}
        />
        <button className="p-2 bg-slate-500 my-2 hover:bg-slate-400">
          <span className="font-bold  text-slate-50">Update post</span>
        </button>
      </form>
    </div>
  );
};

export default EditPostPage;
