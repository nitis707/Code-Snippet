import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateComment from "./CreateComment";

const CreateSnippet = () => {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [snippets, setSnippets] = useState({});

  const createSnippet = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/snippet`, {
        title,
        code,
      });

      setTitle("");
      setCode("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const res = await axios.get(`http://localhost:8002/snippets`);

        setSnippets(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSnippets();
  }, []);

  return (
    <div className="mt-10">
      <div className="">
        <form onSubmit={createSnippet} className="flex flex-col space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded px-2 py-1 w-1/2"
            type="text"
            placeholder="Title"
          />

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="border rounded px-2 py-1"
            name=""
            placeholder="Write a code snippets..."
          />
          <button className="bg-white text-black w-fit px-4 py-1 rounded cursor-pointer">
            Add
          </button>
        </form>
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-2">
        {Object.values(snippets).map((snippet) => (
          <div key={snippet.id} className="p-3 border rounded">
            <h1 className="font-bold text-xl">{snippet.title}</h1>
            <p>{snippet.code}</p>

            <CreateComment snippet={snippet} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateSnippet;
