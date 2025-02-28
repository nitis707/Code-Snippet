import axios from "axios";
import React, { useEffect, useState } from "react";

const CreateComment = ({ snippet }) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8001/api/v1/snippet/${snippet.id}/comment`,
        { text }
      );

      setComments([...comments, res.data.comment]);
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-5">
      {snippet.comments.map((comment, index) => (
        <li className="text-sm" key={index}>
          {comment.content}
        </li>
      ))}

      <form onSubmit={addComment} className="space-x-2 mt-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add comment"
          className="border rounded px-2 text-sm py-2"
        />

        <button className="bg-white text-black w-fit px-2 py-1 rounded cursor-pointer">
          Add
        </button>
      </form>
    </div>
  );
};

export default CreateComment;
