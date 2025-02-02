import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import assistantIcon from "./botimages/robot.png";
import userIcon from "./botimages/user.svg";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! How may I help you today?",
      icon: assistantIcon,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleStreamingResponse = async (prompt) => {
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro-latest",
      });

      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
          ...messages.map((msg) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
          })),
        ],
        generationConfig: {
          maxOutputTokens: 4000,
          temperature: 0.9,
        },
      });

      const result = await chat.sendMessageStream(prompt);
      let fullResponse = "";

      for await (const chunk of result.stream) {
        const chunkText = await chunk.text();
        fullResponse += chunkText;
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = fullResponse;
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "assistant",
          content: "Error generating response. Please try again.",
          icon: assistantIcon,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const submitNewMessage = async () => {
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage || isLoading) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { role: "user", content: trimmedMessage, icon: userIcon },
    ]);

    // Add temporary assistant message
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "", icon: assistantIcon, loading: true },
    ]);

    setNewMessage("");
    setIsLoading(true);

    try {
      await handleStreamingResponse(trimmedMessage);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-1300xl mx-auto bg-white border border-black shadow-lg rounded-xl p-6">
      <div className="text-center text-xl font-semibold text-gray-700 mb-4">
        Ask me Anything
      </div>
      <div className="grow overflow-y-auto space-y-4 p-4">
        <ChatMessages messages={messages} isLoading={isLoading} />
      </div>
      <ChatInput
        newMessage={newMessage}
        isLoading={isLoading}
        setNewMessage={setNewMessage}
        submitNewMessage={submitNewMessage}
      />
    </div>
  );
}

export default Chatbot;
