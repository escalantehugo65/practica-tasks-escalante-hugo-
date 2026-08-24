import { TaskModel } from "../models/task.model.js";
import { UserModel } from "../models/user.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.findAll({
      include: [
        {
          model: UserModel,
          as: "author",
          attributes: ["id", "username", "email"],
        },
      ],
    });

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener tareas",
      error: error.message,
    });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await TaskModel.findByPk(id, {
      include: [
        {
          model: UserModel,
          as: "author",
          attributes: ["id", "username", "email"],
        },
      ],
    });

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({
      message: "Error al buscar la tarea",
      error: error.message,
    });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, isComplete, user_id } = req.body;

    const userExists = await UserModel.findByPk(user_id);

    const existingTask = await TaskModel.findOne({
      where: { title },
    });


    const task = await TaskModel.create({
      title: title.trim(),
      description: description.trim(),
      isComplete,
      user_id,
    });

    return res.status(201).json({
      message: "Tarea creada correctamente",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al crear la tarea",
      error: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isComplete, user_id } = req.body;

    const task = await TaskModel.findByPk(id);

    const existingTask = await TaskModel.findOne({
      where: { title },
    });

    await task.update({
      title: title.trim(),
      description: description.trim(),
      isComplete,
      ...(user_id && { user_id }),
    });

    return res.status(200).json({
      message: "Tarea actualizada correctamente",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar la tarea",
      error: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await TaskModel.findByPk(id);

    await task.destroy();

    return res.status(200).json({
      message: "Tarea eliminada correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar la tarea",
      error: error.message,
    });
  }
};