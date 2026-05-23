import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FiSend } from "react-icons/fi";

export default function Chat() {

  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const sessionIdRef = useRef(uuidv4());

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentInput = input;

    setInput("");

    try {

      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/chat`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            session_id: sessionIdRef.current,
            message: currentInput,
          }),
        }
      );

      const data = await response.json();

      const aiMessage = {
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] flex">

      {/* Sidebar */}
      <aside className="w-72 border-r border-zinc-800 bg-zinc-950/60 backdrop-blur-xl hidden md:flex flex-col">
        
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-xl font-bold">
            MediQuery AI
          </h2>

          <p className="text-sm text-zinc-400 mt-1">
            Medical Chat Assistant
          </p>
        </div>

        <div className="flex-1 p-4">
          <div className="rounded-2xl bg-zinc-900 p-4 border border-zinc-800">
            <p className="text-sm text-zinc-400">
              Session Active
            </p>

            <p className="text-xs text-cyan-400 mt-2 break-all">
              {sessionIdRef.current}
            </p>
          </div>
        </div>
      </aside>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <div className="h-16 border-b border-zinc-800 flex items-center px-6">
          <h1 className="text-lg font-semibold">
            AI Medical Assistant
          </h1>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">

          {
            messages.length === 0 && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-4xl font-bold">
                    Start Conversation
                  </h2>

                  <p className="text-zinc-400 mt-4">
                    Ask questions about your uploaded medical PDFs
                  </p>
                </div>
              </div>
            )
          }

          {
            messages.map((message, index) => (

              <div
                key={index}
                className={`flex ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`
                    max-w-2xl rounded-3xl px-6 py-4
                    ${
                      message.role === "user"
                        ? "bg-cyan-500 text-black"
                        : "bg-zinc-900 border border-zinc-800"
                    }
                  `}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              </div>
            ))
          }

          {
            loading && (
              <div className="flex justify-start">
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl px-6 py-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-100" />
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )
          }

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-zinc-800">
          
          <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3">

            <input
              type="text"
              placeholder="Ask medical questions..."
              className="flex-1 bg-transparent outline-none text-white placeholder:text-zinc-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="w-12 h-12 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition flex items-center justify-center text-black"
            >
              <FiSend />
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}