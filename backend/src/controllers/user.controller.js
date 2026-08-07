import { comparePassword, createUser, deleteUserById, findAllUsers, findUser, updateUser } from "../services/users.service.js";
import { generateToken } from "../services/token.service.js";
import { BadRequestError } from "../utils/appError.js";

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            throw new BadRequestError("All fields are required");
        }

        const emailLower = email.toLowerCase();
        await createUser(name, emailLower, password);

        res.status(201).json({ message: `User ${name} added` });
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new BadRequestError("All fields are required");
        }

        const emailLower = email.toLowerCase();
        const user = await findUser(emailLower);

        if (!user) {
            throw new BadRequestError("Invalid email or password");
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            throw new BadRequestError("Invalid email or password");
        }

        const jwt = generateToken(user.id, user.email, user.role);

        res.status(200).json({
            message: "Logged In!",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: jwt
            },
        });
    } catch (error) {
        next(error);
    }
};

const updateUserName = async (req, res, next) => {
    try {
        const { newName } = req.body;

        if (!newName) {
            throw new BadRequestError("New name is required");
        }
        const userId = req.user.id;

        await updateUser(newName, userId);

        res.status(200).json({ message: `Update user name to ${newName}` });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const userId = req.user.id;

        await deleteUserById(userId);

        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await findAllUsers();

        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export {
    registerUser,
    loginUser,
    updateUserName,
    deleteUser,
    getAllUsers
};