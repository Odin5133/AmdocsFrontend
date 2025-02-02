import React from 'react';

function ChatInput({ newMessage, setNewMessage, submitNewMessage, isLoading }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !isLoading) {
      submitNewMessage();
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        className="flex-grow p-2 border rounded-md"
        placeholder="Type a message..."
      />
      <button
        onClick={submitNewMessage}
        disabled={isLoading}
        className={`p-2 bg-blue-500 text-white rounded-md ${isLoading ? 'opacity-50' : ''}`}
      >
        Send
      </button>
    </div>
  );
}

export default ChatInput;
