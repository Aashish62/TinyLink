import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { API_URLS } from "../utils/Url";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useEffect } from "react";

export default function LinkTable({ data, refresh, loading }) {
  const navigate = useNavigate();
  const handleDelete = async (code) => {
    await axios.delete(API_URLS.deleteLink.replace(":code", code));
    refresh();
    toast.success("Link deleted successfully");
  };

  useEffect(() => {
    const handleFocus = () => refresh();
    window.addEventListener("focus", handleFocus);

    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ background: "#E0E7FF" }}>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Stats</TableCell>
            <TableCell>URL</TableCell>
            <TableCell>Clicks</TableCell>
            <TableCell>Last Clicked</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        {loading && <p className="text-gray-500 font-500">Loading...</p>}
        {!data?.length === 0 && !loading && (
          <p className="text-gray-500 font-500">No links found</p>
        )}
        <TableBody>
          {data?.map((row) => (
            <TableRow key={row.code}>
              <TableCell className="flex items-center gap-2">
                <span
                  onClick={() =>
                    window.open(
                      `${import.meta.env.VITE_BASE_URL}/${row.code}`,
                      "_blank"
                    )
                  }
                  className="text-blue-600 cursor-pointer"
                >
                  {row.code}
                </span>

                <ContentCopyIcon
                  className="cursor-pointer text-indigo-600 hover:text-indigo-400 ml-5"
                  fontSize="small"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${import.meta.env.VITE_BASE_URL}/${row.code}`
                    );
                    toast.success("Short URL copied!");
                  }}
                />
              </TableCell>
              <TableCell>
                <button
                  className="px-2 py-1 bg-indigo-500 hover:bg-indigo-400 text-white rounded cursor-pointer"
                  onClick={() => navigate(`/code/${row.code}`)}
                >
                  Stats
                </button>
              </TableCell>

              <TableCell style={{ maxWidth: "250px" }}>
                <div className="truncate">{row.url}</div>
              </TableCell>
              <TableCell>{row.clicks}</TableCell>
              <TableCell>
                {row.lastClicked
                  ? new Date(row.lastClicked).toLocaleString()
                  : "-"}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleDelete(row.code)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
