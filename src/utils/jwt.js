import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = user =>
    jwt.sign(
        {
            id: user._id,
            role: user.role,
            email: user.email
        },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

export const generateResetToken = user =>
    jwt.sign(
        { id: user._id },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

export const jwtSecret = JWT_SECRET;