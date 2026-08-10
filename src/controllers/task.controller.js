import { Task } from "../models/task.model.js";

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();

        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener tareas",
            error: error.message
        });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({
                message: "Tarea no encontrada"
            });
        }

        return res.status(200).json(task);
    } catch (error) {
        return res.status(500).json({
            message: "Error al buscar la tarea",
            error: error.message
        });
    }
};

export const createTask = async (req, res) => {
    try {
        const { title, description, isComplete } = req.body;

        if (
            typeof title !== "string" ||
            title.trim() === "" ||
            title.length > 100
        ) {
            return res.status(400).json({
                message: "El título debe ser una cadena no vacía de máximo 100 caracteres"
            });
        }


        if (
            typeof description !== "string" ||
            description.trim() === "" ||
            description.length > 100
        ) {
            return res.status(400).json({
                message: "La descripción debe ser una cadena no vacía de máximo 100 caracteres"
            });
        }

        if (typeof isComplete !== "boolean") {
            return res.status(400).json({
                message: "isComplete debe ser un valor booleano"
            });
        }

        // Comprobar title único
        const existingTask = await Task.findOne({
            where: { title }
        });

        if (existingTask) {
            return res.status(400).json({
                message: "Ya existe una tarea con ese título"
            });
        }

        const task = await Task.create({
            title: title.trim(),
            description: description.trim(),
            isComplete
        });

        return res.status(201).json({
            message: "Tarea creada correctamente",
            task
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al crear la tarea",
            error: error.message
        });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, isComplete } = req.body;

        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({
                message: "Tarea no encontrada"
            });
        }

        if (
            typeof title !== "string" ||
            title.trim() === "" ||
            title.length > 100
        ) {
            return res.status(400).json({
                message: "El título debe ser una cadena no vacía de máximo 100 caracteres"
            });
        }


        if (
            typeof description !== "string" ||
            description.trim() === "" ||
            description.length > 100
        ) {
            return res.status(400).json({
                message: "La descripción debe ser una cadena no vacía de máximo 100 caracteres"
            });
        }

        if (typeof isComplete !== "boolean") {
            return res.status(400).json({
                message: "isComplete debe ser un valor booleano"
            });
        }
        const existingTask = await Task.findOne({
            where: { title }
        });

        if (existingTask && existingTask.id !== task.id) {
            return res.status(400).json({
                message: "Ya existe otra tarea con ese título"
            });
        }

        await task.update({
            title: title.trim(),
            description: description.trim(),
            isComplete
        });

        return res.status(200).json({
            message: "Tarea actualizada correctamente",
            task
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar la tarea",
            error: error.message
        });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({
                message: "Tarea no encontrada"
            });
        }

        await task.destroy();

        return res.status(200).json({
            message: "Tarea eliminada correctamente"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al eliminar la tarea",
            error: error.message
        });
    }
};