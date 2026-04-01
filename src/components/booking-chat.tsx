"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, Lock, Clock } from "lucide-react";

interface ChatMessage {
  id: string;
  senderId: string;
  body: string;
  createdAt: string;
  sender: { firstName: string; lastName: string; role: string };
}

interface BookingChatProps {
  bookingId: string;
  currentUserId: string;
}

export function BookingChat({ bookingId, currentUserId }: BookingChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatOpen, setChatOpen] = useState(true);
  const [closesAt, setClosesAt] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Load messages
  useEffect(() => {
    fetch(`/api/messages?bookingId=${bookingId}`)
      .then((r) => r.json())
      .then((data) => {
        setMessages(data.messages || []);
        setChatOpen(data.chatOpen ?? false);
        setClosesAt(data.closesAt ?? null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [bookingId]);

  // Poll for new messages every 5 seconds
  useEffect(() => {
    if (!expanded) return;
    const interval = setInterval(async () => {
      const res = await fetch(`/api/messages?bookingId=${bookingId}`);
      const data = await res.json();
      setMessages(data.messages || []);
      setChatOpen(data.chatOpen ?? false);
    }, 5000);
    return () => clearInterval(interval);
  }, [bookingId, expanded]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (expanded) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, expanded]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || sending || !chatOpen) return;
    setSending(true);
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId, body: input.trim() }),
    });
    if (res.ok) {
      const data = await res.json();
      setMessages((prev) => [...prev, data.message]);
      setInput("");
    }
    setSending(false);
  }

  const timeRemaining = closesAt
    ? Math.max(0, Math.floor((new Date(closesAt).getTime() - Date.now()) / (1000 * 60 * 60)))
    : null;

  if (loading) return null;

  return (
    <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 overflow-hidden">
      {/* Header -- always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-[#F5F5F7] transition"
      >
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-[#007AFF]" />
          <span className="text-[14px] font-semibold text-[#1D1D1F]">
            Chat
          </span>
          {messages.length > 0 && (
            <span className="rounded-full bg-[#007AFF]/10 px-2 py-0.5 text-[10px] font-bold text-[#007AFF]">
              {messages.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!chatOpen && (
            <span className="flex items-center gap-1 text-[10px] font-medium text-[#86868B]">
              <Lock className="h-3 w-3" />
              Closed
            </span>
          )}
          {chatOpen && timeRemaining !== null && timeRemaining <= 48 && (
            <span className="flex items-center gap-1 text-[10px] font-medium text-[#FF9500]">
              <Clock className="h-3 w-3" />
              {timeRemaining}h left
            </span>
          )}
          <svg
            className={`h-4 w-4 text-[#86868B] transition-transform ${expanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Chat body -- collapsible */}
      {expanded && (
        <div className="border-t border-[#E8E8ED]">
          {/* Messages */}
          <div className="max-h-72 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center py-6">
                <MessageCircle className="mx-auto h-8 w-8 text-[#E8E8ED]" />
                <p className="mt-2 text-[13px] text-[#86868B]">
                  {chatOpen
                    ? "No messages yet. Start the conversation."
                    : "No messages were exchanged."}
                </p>
              </div>
            )}

            {messages.map((msg) => {
              const isMe = msg.senderId === currentUserId;
              return (
                <div
                  key={msg.id}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                      isMe
                        ? "bg-[#007AFF] text-white rounded-br-md"
                        : "bg-[#F5F5F7] text-[#1D1D1F] rounded-bl-md"
                    }`}
                  >
                    {!isMe && (
                      <p className="text-[10px] font-semibold mb-0.5 opacity-60">
                        {msg.sender.firstName}
                      </p>
                    )}
                    <p className="text-[14px] leading-relaxed">{msg.body}</p>
                    <p
                      className={`text-[10px] mt-1 ${
                        isMe ? "text-white/50" : "text-[#86868B]"
                      }`}
                    >
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          {chatOpen ? (
            <form
              onSubmit={sendMessage}
              className="border-t border-[#E8E8ED] p-3 flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-xl border border-[#E8E8ED] bg-[#F5F5F7] px-3 py-2 text-[14px] outline-none focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF]/20 transition"
                maxLength={1000}
              />
              <button
                type="submit"
                disabled={!input.trim() || sending}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#007AFF] text-white transition hover:bg-[#0055D4] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          ) : (
            <div className="border-t border-[#E8E8ED] p-3">
              <p className="text-[13px] text-[#86868B] text-center flex items-center justify-center gap-1.5">
                <Lock className="h-3 w-3" />
                Chat closed — 48-hour window after job completion has expired
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
