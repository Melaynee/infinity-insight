import cors from "cors";

const corsMiddleware = cors({
  credentials: true,
  origin: "http://localhost:5173",
});

export default corsMiddleware;
