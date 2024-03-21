import Project from "../Models/project.model.js";
import User, { ROLE } from "../Models/user.model.js";

const newProject = async (userId, projectName, description, paragraph, mainPicture, images) => {
  let projectError = null;
  let projects = [];
  const newPrjct = {
    projectName,
    description,
    paragraph,
    mainPicture,
    images,
  };

  try {
    const user = await User.findById(userId);
    if (!user || user.role !== ROLE.ADMIN) throw new Error("You don't have the right to proceed");
    const project = await Project.create(newPrjct);
    user.projects.push(project._id);
    await user.save();
    projects = await Project.find();
  } catch (e) {
    projectError = `Could not create new project : ${e.message}`;
  } finally {
    return { projectError, projects };
  }
};

const editProject = async (
  userId,
  projectId,
  projectName,
  description,
  paragraph,
  mainPicture,
  images,
  visible
) => {
  let projectError = null;
  let projects = [];

  try {
    const user = await User.findById(userId);
    if (!user || user.role !== ROLE.ADMIN) throw new Error("You don't have the right to proceed");
    const project = await Project.findById(projectId);
    if (!project) throw new Error("Could not find this project");
    project.projectName = projectName;
    project.description = description;
    project.paragraph = paragraph;
    project.mainPicture = mainPicture;
    project.images = images;
    project.visible = visible;
    await project.save();
    projects = await Project.find();
  } catch (e) {
    projectError = `Could not edit the project : ${e.message}`;
  } finally {
    return { projectError, projects };
  }
};

const deleteProject = async (userId, projectId) => {
  let projectError = null;
  let projects = [];

  try {
    const user = await User.findById(userId);
    if (!user || user.role !== ROLE.ADMIN) throw new Error("You don't have the right to proceed");
    user.projects.pull(projectId);
    await user.save();
    await Project.deleteOne({ _id: projectId });
  } catch (e) {
    projectError = `Could not delete the project : ${e.message}`;
  } finally {
    return { projectError, projects };
  }
};

export const projectDAO = {
  newProject,
  editProject,
  deleteProject,
};
