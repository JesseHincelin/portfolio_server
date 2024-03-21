import Message from "../Models/message.model.js";
import User, { ROLE } from "../Models/user.model.js";

const newMessage = async (content, email, postingDate) => {
  let messageError = null;
  let messages = [];
  const newMsg = {
    content,
    email,
    postingDate,
  };

  try {
    const message = await Message.create(newMsg);
    if (!message) throw new Error("could not create new message");
    messages = await Message.find();
  } catch (e) {
    messageError = `Could not create this new message : ${e.message}`;
  } finally {
    return { messages, messageError };
  }
};

const getMessages = async (userId) => {
  let messagesError = null;
  let messages = [];

  try {
    const user = await User.findById(userId);
    if (user.role !== ROLE.ADMIN || !user)
      throw new Error("You don't have the rights to read the messages");
    messages = await Message.find();
  } catch (e) {
    messagesError = `Could not find the messages : ${e.message}`;
  } finally {
    return { messagesError, messages };
  }
};

const deleteMessage = async (userId, messageId) => {
  let messageError = null;
  let messages = [];

  try {
    const user = await User.findById(userId);
    if (user.role !== ROLE.ADMIN || !user)
      throw new Error("You don't have the rights to delete a message");
    await Message.deleteOne({ _id: messageId });
    messages = await Message.find();
  } catch (e) {
    messageError = `Could not delete the message : ${e.message}`;
  } finally {
    return { messages, messageError };
  }
};

export const messageDAO = {
  newMessage,
  getMessages,
  deleteMessage,
};
