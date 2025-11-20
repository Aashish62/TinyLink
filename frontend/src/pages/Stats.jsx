import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URLS } from "../utils/Url";

export default function Stats() {
  const { code } = useParams();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URLS.getLinkStats.replace(":code", code));
      setStats(res.data);
    } catch {
      console.log(e);
      toast.error(e.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading)
    return (
      <div className="p-6 text-gray-500 font-500 text-center">Loading...</div>
    );

  if (!stats)
    return (
      <div className="p-6 text-gray-500 font-500 text-center">
        No stats found
      </div>
    );

  const formatedDate = new Date(stats.lastClicked).toLocaleString();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
        Stats for "{code}"
      </h2>
      <p className="mb-3 text-gray-700">
        <span className="font-semibold text-gray-900">URL:</span>{" "}
        {stats?.url || "-"}
      </p>
      <p className="mb-3 text-gray-700">
        <span className="font-semibold text-gray-900">Clicks:</span>{" "}
        {stats?.clicks || 0}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold text-gray-900">Last Clicked:</span>{" "}
        {formatedDate || "-"}
      </p>
    </div>
  );
}
