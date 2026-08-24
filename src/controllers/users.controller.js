import { UserModel as User } from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener usuarios",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Error al buscar el usuario",
      error: error.message,
    });
  }
};

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

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
        console.log("Error capturado:", error.message);
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

    const existingUser = await User.findOne({ where: { email } });


    await user.update({
      name: name.trim(),
      email: email.trim(),
      password,
    });

    return res.status(200).json({
      message: "Usuario actualizado correctamente",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar el usuario",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    await user.destroy();

    return res.status(200).json({
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar el usuario",
      error: error.message,
    });
  }
};