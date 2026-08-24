import { ProfileModel as Profile } from "../models/profile.model.js";
import { UserModel as User } from "../models/user.model.js";

export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll({
      attributes: ["id", "bio", "phone"],
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
    });
    return res.status(200).json(profiles);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener los perfiles",
      error: error.message,
    });
  }
};

export const createProfile = async (req, res) => {
  try {
    const { bio, phone, user_id } = req.body;
    const profile = await Profile.create({
      bio: bio || null,
      phone: phone || null,
      user_id,
    });

    return res.status(201).json({
      message: "Perfil creado correctamente",
      profile,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al crear el perfil",
      error: error.message,
    });
  }
};