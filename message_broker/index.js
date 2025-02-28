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



app.post("/events", (req, res) => {
    const events = req.body;
    axios.post(`http://localhost:8000/events`, events); // snippet service
    axios.post(`http://localhost:8001/events`, events); // comment service
    axios.post(`http://localhost:8002/events`, events); // query service

    return res.status(200).json({});
})

const PORT = 8005;
app.listen(PORT, () => {
    console.log(`Server listen at port ${PORT}`);
});