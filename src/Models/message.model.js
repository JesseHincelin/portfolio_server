import { Schema, createCollection } from "../Config/mongoose.config.js";
import { emailIsValid } from "../Utils/regex.utils.js";

const messageSchema = new Schema({
  content: {
    type: String,
    required: [true, "Message content is required"],
  },
  email: {
    type: String,
    validate: {
      validator: (email) => {
        const isOk = emailIsValid(email);
        return isOk;
      },
      message: "Email is not valid !",
    },
  },
  read: Boolean,
  postingDate: Date,
});

const Message = createCollection("Message", messageSchema);

export default Message;
