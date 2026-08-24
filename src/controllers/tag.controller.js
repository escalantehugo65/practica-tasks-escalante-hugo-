import { TagModel as Tag } from "../models/tag.model.js";
import { TaskModel as Task } from "../models/task.model.js";

export const getTags = async (req, res) => {
  try {
    const tags = await Tag.findAll({
      attributes: ["id", "name"],
      include: [
        {
          model: Task,
          attributes: ["id", "title", "isComplete"],
          through: { attributes: [] },
        },
      ],
    });
    return res.status(200).json(tags);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener las etiquetas",
      error: error.message,
    });
  }
};

export const createTag = async (req, res) => {
  try {
    const { name } = req.body;
    const tag = await Tag.create({ name: name.trim() });

    return res.status(201).json({
      message: "Etiqueta creada correctamente",
      tag,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al crear la etiqueta",
      error: error.message,
    });
  }
};