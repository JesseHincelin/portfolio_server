import { Schema, createCollection } from "../Config/mongoose.config.js";

const projectSchema = new Schema({
  projectName: {
    type: String,
    required: [true, "Project name required"],
  },
  description: [
    {
      english: {
        type: String,
        required: [true, "Project description required"],
      },
      french: {
        type: String,
        required: [true, "Project description required"],
      },
    },
  ],
  paragraph: [
    {
      english: {
        paragraphTitle: String,
        paragraphContent: String,
      },
      french: {
        paragraphTitle: String,
        paragraphContent: String,
      },
    },
  ],
  mainPicture: {
    type: String,
    required: [true, "Presentation picture required"],
  },
  images: [{ url: String }],
  visible: {
    type: Boolean,
    default: true,
  },
});

const Project = createCollection("Project", projectSchema);

export default Project;
