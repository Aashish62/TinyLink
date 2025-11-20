import { useEffect, useState } from "react";
import axios from "axios";
import AddLinkForm from "../components/AddLinkForm";
import LinkTable from "../components/LinkTable";
import { API_URLS } from "../utils/Url";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URLS.getLinks);
      setLinks(res.data);
    } catch (e) {
      console.log(e);
      toast.error(e.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const filteredLinks = links.filter(
    (l) =>
      l.code.toLowerCase().includes(search.toLowerCase()) ||
      l.url.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <AddLinkForm refresh={fetchLinks} />
      <input
        className="border border-indigo-400 bg-indigo-50 p-1 text-xs xl:text-base rounded mb-4 w-[50%] xl:w-[30%]"
        placeholder="Search by code or URL"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <LinkTable data={filteredLinks} refresh={fetchLinks} loading={loading} />
    </div>
  );
}
