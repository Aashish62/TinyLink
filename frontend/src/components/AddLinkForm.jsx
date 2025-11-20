import { useState } from "react";
import axios from "axios";
import { API_URLS } from "../utils/Url";
import { toast } from "react-toastify";

export default function AddLinkForm({ refresh }) {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const createLink = async () => {
    setLoading(true);
    try {
      await axios.post(API_URLS.createLink, { url, code });
      setUrl("");
      setCode("");
      refresh();
      toast.success("Link created successfully");
    } catch (err) {
      console.log(err);
      toast.error( err.response?.data?.message|| "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded p-4 shadow mb-4">
      <div className="flex gap-2 flex-col sm:flex-row">
        <input
          className="border p-2 rounded flex-1"
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Custom code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          className="bg-indigo-600 text-white px-4 rounded"
          onClick={createLink}
          disabled={loading}
        >
          {loading ? "..." : "Create"}
        </button>
      </div>
    </div>
  );
}
