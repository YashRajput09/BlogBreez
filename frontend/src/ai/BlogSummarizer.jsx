import { useState } from "react";
import axios from "axios";
import { FilePen } from 'lucide-react';

const BlogSummarization = ({ blogDescription }) => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hovered, setHovered] = useState(false); // State to track hover
  const [showSummary, setShowSummary] = useState(false);

  const summarizeBlog = async () => {
    if (!blogDescription) {
      setError("Blog description is empty.");
      return;
    }

      // If summary already exists, just toggle visibility
      if (summary) {
        setShowSummary(!showSummary);
        return;
      }

      
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/blog/chatbot`, {
        message: blogDescription,
      });

      if (response.data.message) {
        setSummary(response.data.message[0].summary_text); // Extract summary
        setShowSummary(true); // Show summary after fetching
      } else {
        setError("Failed to fetch summary.");
      }
    } catch (err) {
      setError("Error summarizing blog.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="relative inline-block">
      {/* Button with Tooltip */}
      <button
        onClick={() => {summarizeBlog(); showSummaryHandler();}}
        disabled={loading}
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {loading ? "Summarizing..." : <FilePen size={19} />}
      </button>

      {/* Tooltip */}
      {hovered && (
        <div
         className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white text-xs px-2 py-1 rounded-md shadow-lg"
         >
          Summarize Blog
        </div>
      )}

      {/* Display Summary */}
      {summary && showSummary &&(
        <div className="mt-4 p-3 bg-white border rounded-lg">
          <h3 className="text-lg font-medium">Summary:</h3>
          <p>{summary}</p>
        </div>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default BlogSummarization;
