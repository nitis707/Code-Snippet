import express from "express";
import cors from "cors";
import commentRouter from "./routes/comment.js"

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/snippet", commentRouter);


const PORT = 8001;
app.listen(PORT, () => {
    console.log(`Server listen at port ${PORT}`);
});