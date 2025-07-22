import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";
 
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                success: false,
                message: `All fields are required!`
            })
        }
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: `User with this email already exists!`
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url
            }
        })

        return res.status(200).json({
            success: true,
            message: `User registered successfully!`
        })

    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: `All fields are required!`
            })
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: `User doesn't exists with this email!`
            })
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: `Incorrect email or password!`
            })
        }
        if (role != user.role) {
            return res.status(400).json({
                success: false,
                message: `Account doesn't exists with current role!`
            })
        }
        const tokenData = {
            userId: user._id
        }
        const token = jwt.sign(tokenData, process.env.SECRET, { expiresIn: `1d` });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200)
            .cookie(`token`, token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: `strict` })
            .json({
                success: true,
                message: `Welcome back ${user.fullname}`,
                user
            })

    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200)
            .cookie(`token`, ``, { maxAge: 0 })
            .json({
                success: true,
                message: `User logged out successfully!`
            })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;

        const skillsArray = skills ? skills.split(",") : null;

        const userId = req.userId;
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: `User not found!`
            })
        }

        // Updating Data
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        // cloudinary to come here
        if (req.file) {
            const file = req.file;
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

            // Save resume link and original name
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file.originalname;
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            success: true,
            message: `Profile updated successfully!`,
            user
        })

    } catch (error) {
        console.log(error);
    }
}