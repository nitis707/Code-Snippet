import express from "express";
import cors from "cors";
import snippetRouter from "./routes/snippet.js"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


app.post("/events", (req, res) => {
    console.log("Received event", req.body.type);
    return res.status(200).json({});
})

app.use("/api/v1/snippet", snippetRouter);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server listen at port ${PORT}`);
});