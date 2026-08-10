import { User } from "../models/user.model.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener usuarios",
            error: error.message
        });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            message: "Error al buscar el usuario",
            error: error.message
        });
    }
};

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (
            typeof name !== "string" ||
            name.trim() === "" ||
            name.length > 100
        ) {
            return res.status(400).json({
                message: "El nombre debe ser una cadena no vacía de máximo 100 caracteres"
            });
        }


        if (
            typeof email !== "string" ||
            email.trim() === "" ||
            email.length > 100
        ) {
            return res.status(400).json({
                message: "El email debe ser una cadena no vacía de máximo 100 caracteres"
            });
        }

        if (
            typeof password !== "string" ||
            password.trim() === "" ||
            password.length > 100
        ) {
            return res.status(400).json({
                message: "La contraseña debe ser una cadena no vacía de máximo 100 caracteres"
            });
        }

        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({
                message: "El email ya está registrado"
            });
        }

        const user = await User.create({
            name: name.trim(),
            email: email.trim(),
            password
        });

        return res.status(201).json({
            message: "Usuario creado correctamente",
            user
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al crear el usuario",
            error: error.message
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        if (
            typeof name !== "string" ||
            name.trim() === "" ||
            name.length > 100
        ) {
            return res.status(400).json({
                message: "El nombre debe ser una cadena no vacía de máximo 100 caracteres"
            });
        }

        if (
            typeof email !== "string" ||
            email.trim() === "" ||
            email.length > 100
        ) {
            return res.status(400).json({
                message: "El email debe ser una cadena no vacía de máximo 100 caracteres"
            });
        }

        if (
            typeof password !== "string" ||
            password.trim() === "" ||
            password.length > 100
        ) {
            return res.status(400).json({
                message: "La contraseña debe ser una cadena no vacía de máximo 100 caracteres"
            });
        }

        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser && existingUser.id !== user.id) {
            return res.status(400).json({
                message: "El email ya está registrado por otro usuario"
            });
        }

        await user.update({
            name: name.trim(),
            email: email.trim(),
            password
        });

        return res.status(200).json({
            message: "Usuario actualizado correctamente",
            user
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar el usuario",
            error: error.message
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        await user.destroy();

        return res.status(200).json({
            message: "Usuario eliminado correctamente"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al eliminar el usuario",
            error: error.message
        });
    }
};