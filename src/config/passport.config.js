import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";

import { userModel } from "../dao/models/user.model.js";
import { isValidPassword } from "../utils/hash.js";
import { jwtSecret } from "../utils/jwt.js";

const LocalStrategy = local.Strategy;
const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

export const initializePassport = () => {

    passport.use("login",
        new LocalStrategy(
            { usernameField: "email" },
            async (email, password, done) => {
                try {
                    const user = await userModel.findOne({ email });
                    if (!user) return done(null, false);

                    if (!isValidPassword(user, password))
                        return done(null, false);

                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use("current",
        new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: jwtSecret
            },
            async (payload, done) => {
                const user = await userModel.findById(payload.id);
                return done(null, user);
            }
        )
    );
};