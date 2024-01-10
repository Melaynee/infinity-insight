import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import { UserContextProvider } from "./UserContext";

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/registration" element={<RegisterPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
