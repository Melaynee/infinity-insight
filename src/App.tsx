import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import CreatePostPage from "./components/pages/CreatePostPage";
import { UserContextProvider } from "./UserContext";
import PostPage from "./components/pages/PostPage";
import EditPostPage from "./components/pages/EditPostPage";
import AboutPage from "./components/pages/AboutPage";
import ContactPage from "./components/pages/ContactPage";

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/registration" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPostPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
