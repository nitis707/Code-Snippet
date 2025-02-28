import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


const snippets = {};

app.get("/snippets", (req, res) => {
    return res.status(200).json(snippets);
})

app.post("/events", (req, res) => {
    const { type, data } = req.body;

    if (type === "SnippetCreated") {
        const { id, title } = data;
        snippets[id] = { id, title, comments: [] };
    }

    if (type === "CommentCreated") {
        const { id, content, snippetId } = data;
        snippets[snippetId].comments.push({ id, content });
    }

    return res.status(200).json({});

});


const PORT = 8002;
app.listen(PORT, () => {
    console.log(`Server listen at port ${PORT}`);
});