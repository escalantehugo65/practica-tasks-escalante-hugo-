import { UserModel as User } from "../models/user.model.js";
import{matchedData} from 'express-validator'

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
            message: ("Error al crear el usuario"),
            error: error.message
        });
    }
};

export const updateUser = async (req, res) => {
try {
  const { id } = req.params;

  const datosLimpios = matchedData(req);

  if(Object.keys(datosLimpios).length===0){
    return res.status(400).json({
      message:("No se enviaron datos validos, intente de nuevo ingresando los datos de manera correcta")
  })
  }

  await User.update(datosLimpios,{where:{id}});

  return res.status(200).json({
    message:"Usuario actualizado de manera correcta",
    datos_actualizados: datosLimpios
});
} catch(error){
  return res.status(500).json({
    message:"Error interno al realizar la actualización del usuario, intente mas tarde",
    error: error.message
})
}
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    await user.destroy();

    return res.status(200).json({
      message: "Usuario eliminado logicamente de manera correcta",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar el usuario",
      error: error.message,
    });
  }
};