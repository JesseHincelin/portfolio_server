import { messageDAO } from "../DAOS/message.DAO.js";

const newMessage = async (req, res) => {
  const { content, email, postingDate } = req.body;

  const { messages, messageError } = await messageDAO.newMessage(content, email, postingDate);
  if (!!messageError) return res.status(400).json({ message: messageError });

  res.status(200).json({ message: "New message created successfully", messages });
};

const getMessages = async (req, res) => {
  const { userId } = req.body;

  const { messages, messagesError } = await messageDAO.getMessages(userId);
  if (!!messagesError) return res.status(400).json({ message: messagesError });

  res.status(200).json({ message: "messages fetched successfully", messages });
};

const deleteMessage = async (req, res) => {
  const { userId } = req.body;
  const { messageId } = req.params;

  const { messages, messageError } = await messageDAO.deleteMessage(userId, messageId);
  if (!!messageError) return res.status(400).json({ message: messageError });

  res.status(200).json({ message: "Message deleted successfully", messages });
};

export const messageController = {
  newMessage,
  getMessages,
  deleteMessage,
};
