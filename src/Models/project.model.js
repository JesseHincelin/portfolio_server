import { Schema, createCollection } from "../Config/mongoose.config.js";

const projectSchema = new Schema({
  projectName: {
    type: String,
    required: [true, "Project name required"],
  },
  description: {
    type: String,
    required: [true, "Project description required"],
  },
  paragraph: [
    {
      paragraphTitle: String,
      paragraphContent: String,
    },
  ],
  mainPicture: {
    type: String,
    required: [true, "Presentation picture required"],
  },
  images: [{ url: String }],
});

const Project = createCollection("project", projectSchema);

export default Project;
