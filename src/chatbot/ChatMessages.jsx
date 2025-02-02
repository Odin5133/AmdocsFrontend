// import Markdown from 'react-markdown';
import useAutoScroll from "./hookz/useAutoScroll";
import Spinner from "./Spinner";
import userIcon from "./botimages/user.svg";
import assistantIcon from "./botimages/robot.png";
import errorIcon from "./botimages/error.svg";

function ChatMessages({ messages, isLoading }) {
  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.role === "user" ? "justify-end" : "justify-start"
          } items-start gap-3`}
        >
          {message.role === "assistant" && (
            <img src={message.icon} alt="AI" className="w-8 h-8 rounded-full" />
          )}
          <div
            className={`p-3 rounded-lg max-w-[70%] ${
              message.role === "user"
                ? "bg-blue-100 ml-auto"
                : "bg-gray-100 mr-auto"
            }`}
          >
            <div className="prose">
              {message.content.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
              {message.loading && !message.content && (
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              )}
            </div>
          </div>
          {message.role === "user" && (
            <img
              src={message.icon}
              alt="User"
              className="w-8 h-8 rounded-full"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;
