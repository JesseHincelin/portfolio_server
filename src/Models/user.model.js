import { Schema } from "mongoose";
import { ObjectId, createCollection } from "../Config/mongoose.config.js";

export const ROLE = {
  ADMIN: "admin",
  VISITOR: "visitor",
};

const userSchema = new Schema({
  userName: {
    type: String,
    required: [true, "userName required"],
  },
  password: {
    type: String,
    required: [true, "Password required"],
  },
  email: {
    type: String,
    required: [true, "Email adress required"],
  },
  role: {
    type: String,
    default: ROLE.VISITOR,
    enum: {
      values: [ROLE.ADMIN, ROLE.VISITOR],
    },
  },
  projects: [{ type: ObjectId, ref: "Project" }],
});

const User = createCollection("user", userSchema);

export default User;
