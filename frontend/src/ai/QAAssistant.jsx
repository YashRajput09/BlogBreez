import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const QAAssistant = ({ blogId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true); // tooltip state
  const chatEndRef = useRef(null);

  // Auto-scroll when messages or loader changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // push user message
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    let aiResponse = "Sorry, I couldn't find an answer.";
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/blog/assistant/${blogId}/ask`,
        { question: input },
        { withCredentials: true }
      );
      aiResponse = res.data.answer || aiResponse;
    } catch (err) {
      console.error(err);
    }

    // push ai response
    setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    setLoading(false);
  };

  return (
    <>
      {/* Floating Logo with Tooltip */}
      <div className="fixed bottom-6 right-6 z-10 flex flex-col items-end">
        {showTooltip && (
          <div className="mb-2 bg-blue-500 text-white text-xs px-3 py-1 rounded-lg shadow-md whitespace-nowrap animate-bounce">
            AI Blog Assistant ✨
          </div>
        )}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false); // hide tooltip once clicked
          }}
          className="bg-blue-600 p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <MessageCircle size={28} className="text-white" />
        </button>
      </div>

      {/* Chat Window with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-6 w-80 h-96 flex flex-col bg-gray-50 border rounded-2xl shadow-xl z-10"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-2 border-b bg-blue-600 text-white rounded-t-2xl">
              <h3 className="font-semibold text-lg">🤖 Blog Assistant</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-gray-200"
              >
                ✖
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-2xl max-w-[70%] text-sm ${
                      msg.sender === "user"
                        ? "bg-green-500 text-white rounded-br-none"
                        : "bg-white text-gray-800 border rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border text-gray-700 px-3 py-2 rounded-2xl rounded-bl-none inline-flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-150">.</span>
                    <span className="animate-bounce delay-300">.</span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input Box */}
            <div className="p-2 border-t flex items-center bg-white rounded-b-2xl">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask your question..."
                className="flex-1 border rounded-full px-3 py-2 text-sm focus:outline-none"
              />
              <button
                onClick={handleSend}
                className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default QAAssistant;
