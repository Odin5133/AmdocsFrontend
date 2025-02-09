import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "https://amdocs-backend.onrender.com/chat/";

const createChat = async (
  message,
  isStart = false,
  goalTitle = "",
  goalDesc = ""
) => {
  try {
    // If it's the start of a new conversation, send the goal_title and goal_description
    const params = isStart
      ? { is_start: true, goal_title: goalTitle, goal_description: goalDesc }
      : { message };

    console.log("Sending payload:", params); // Debugging: Log the params

    // Use GET request with query parameters
    const response = await axios.get(BASE_URL, {
      params: params, // Passing params as query parameters
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("access")}`,
      },
    });

    console.log("Response from backend:", response.data); // Debugging: Log the response
    return response.data;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
};

const sendChatMessage = async (
  chatId,
  message,
  isStart = false,
  goalTitle = "",
  goalDesc = ""
) => {
  try {
    const params = {
      chat_id: chatId,
      message,
      is_start: isStart,
      goal_title: goalTitle,
      goal_desc: goalDesc,
    };

    console.log("Sending message payload:", params); // Debugging: Log the params

    // Use GET request with query parameters
    const response = await axios.get(BASE_URL, {
      params: params, // Passing params as query parameters
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("access")}`,
      },
    });

    console.log("Response from backend:", response.data); // Debugging: Log the response
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

// Export the functions as named exports
export { createChat, sendChatMessage };
