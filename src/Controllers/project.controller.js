import { projectDAO } from "../DAOS/project.DAO.js";

const newProject = async (req, res) => {
  const { userId, projectName, description, paragraph, mainPicture, images } = req.body;

  const { projectError, projects } = await projectDAO.newProject(
    userId,
    projectName,
    description,
    paragraph,
    mainPicture,
    images
  );
  if (!!projectError) return res.status(400).json({ message: projectError });

  res.status(200).json({ message: "Project created successfully", projects });
};

const editProject = async (req, res) => {
  const { userId, projectId, projectName, description, paragraph, mainPicture, images, visible } =
    req.body;

  const { projectError, projects } = await projectDAO.editProject(
    userId,
    projectId,
    projectName,
    description,
    paragraph,
    mainPicture,
    images,
    visible
  );
  if (!!projectError) return res.status(400).json({ message: projectError });

  res.status(200).json({ message: "Project successfully edited", projects });
};

const deleteProject = async (req, res) => {
  const { userId } = req.body;
  const { projectId } = req.params;

  const { projectError, projects } = await projectDAO.deleteProject(userId, projectId);
  if (!!projectError) return res.status(400).json({ message: projectError });

  res.status(200).json({ message: "Project deleted Successfully", projects });
};

export const projectController = {
  newProject,
  editProject,
  deleteProject,
};
