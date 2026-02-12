import { Router } from "express";
import passport from "passport";
import { userModel } from "../dao/models/user.model.js";
import { createHash } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";

const router = Router();

router.post("/register", async (req, res) => {

    const { first_name, last_name, email, age, password } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists)
        return res.status(400).json({ error: "Usuario ya existe" });

    const newUser = await userModel.create({
        first_name,
        last_name,
        email,
        age,
        password: createHash(password)
    });

        res.json({
        status: "success",
        message: "Usuario creado correctamente"
    });
});

router.post(
    "/login",
    passport.authenticate("login", { session: false }),
    (req, res) => {

        const token = generateToken(req.user);

        res.json({
            status: "success",
            token
        });
    }
);

router.post(
    "/change-password",
    passport.authenticate("current", { session: false }),
    async (req, res) => {

        const { newPassword } = req.body;

        const user = await userModel.findById(req.user.id);

        if (isValidPassword(user, newPassword))
            return res.status(400).json({
                error: "No puede usar la misma contraseña"
            });

        user.password = createHash(newPassword);
        await user.save();

        res.json({ status: "Password actualizada" });
    }
);

router.get(
    "/current",
    passport.authenticate("current", { session: false }),
    (req, res) => {
        res.json({
            status: "success",
            user: req.user
        });
    }
);

export default router;