import { commentsdb } from "../database/index.js";
import { randomBytes } from "crypto";
import axios from "axios";

export const createComment = async (req, res) => {
    const commentId = randomBytes(4).toString("hex");
    const { text } = req.body;
    const snippetId = req.params.id;

    const comments = commentsdb[snippetId] || [];

    // create comments
    comments.push({ commentId, text })

    commentsdb[snippetId] = comments;

    // Best place to publish an event
    await axios.post(`http://localhost:8005/events`, {
        type: "CommentCreated",
        data: {
            id: commentId,
            content: text,
            snippetId
        }
    });

    res.status(201).json({
        success: true,
        message: "Comment added.",
        comment: { commentId, text }
    })
}

export const getCommentBySnippetId = (req, res) => {
    const snippetId = req.params.id;

    return res.status(200).json(
        commentsdb[snippetId] || []
    )
}