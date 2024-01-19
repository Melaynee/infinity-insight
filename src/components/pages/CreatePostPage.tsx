import axios from "../axios";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

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

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [redirect, setRedirect] = useState(false);

  const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    if (content.length > 200) data.set("content", content);
    else return alert("Minimum length is 201 symbol.");
    if (files?.length) data.set("file", files[0]);
    else return alert("Image is required.");

    await axios
      .post("http://localhost:3334/post", data, { withCredentials: true })
      .then(() => {
        toast.success("Post created!");
        setTimeout(() => setRedirect(true), 1000);
      })
      .catch((err) => toast.error(err.response.data.message));
  };
  if (redirect) return <Navigate to="/" />;
  return (
    <div className="container mx-auto my-7">
      <Toaster />
      <form className="flex flex-col " onSubmit={createPost}>
        <input
          type="title"
          placeholder="Title"
          className="p-2 my-1"
          minLength={10}
          maxLength={200}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="summary"
          placeholder="Summary"
          className="p-2 my-1"
          value={summary}
          minLength={10}
          maxLength={200}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input
          type="file"
          className="my-2"
          required
          onChange={(e) => setFiles(e.target?.files)}
        />
        <ReactQuill
          modules={modules}
          formats={formats}
          value={content}
          onChange={(e) => setContent(e)}
        />
        <button className="p-2 bg-slate-500 my-2 hover:bg-slate-400">
          <span className="font-bold  text-slate-50">Create post</span>
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
