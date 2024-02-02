import express, { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import bodyParser from "body-parser";
import cors from "cors";
import Ajv, { JSONSchemaType } from "ajv";
import addFormats from "ajv-formats";
import bcrypt from 'bcrypt';

import { createTables } from './db';
import { changePassword, checkUserExists, createUser, getName, getPassword } from "./models/user";
import * as types from "../../common/types";

const ajv = new Ajv();
addFormats(ajv, ["email", "password"]);

export const app = express();
app.use(bodyParser.json());
app.use(cors());

const secretKey = 'expense-tracker-secret';

interface CustomRequest extends Request {
    user?: { userEmail: string; } | string | jwt.JwtPayload;
}

function authenticateToken(req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.post("/register", (req: Request, res: Response) => {
    const schema: JSONSchemaType<types.RegisterRequest> = {
        type: "object",
        properties: {
            email: { type: "string", format: "email" },
            name: { type: "string", minLength: 5 },
            password: { type: "string", pattern: "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$" },
        },
        required: ["email", "name", "password"],
        additionalProperties: false
    }

    const validate = ajv.compile(schema)

    const valid = validate(req.body);
    if (!valid) {
        return res.status(400).json({
            message: validate.errors?.map(err => err.message)
        })
    }

    const { email, name, password } = req.body as types.RegisterRequest;

    if (checkUserExists(email)) {
        return res.status(400).json({
            message: "Account with this email already exists."
        })
    }

    createUser(email, name, password);
    res.json({
        email: email,
        name: name
    } as types.RegisterResponse)
});

app.post("/login", async (req: Request, res: Response) => {
    const schema: JSONSchemaType<types.LoginRequest> = {
        type: "object",
        properties: {
            email: { type: "string", format: "email" },
            password: { type: "string" },
        },
        required: ["email", "password"],
        additionalProperties: false
    }

    const validate = ajv.compile(schema)
    const valid = validate(req.body);
    if (!valid) {
        return res.status(400).json({
            message: validate.errors?.map(err => err.message)
        })
    }

    const {
        email,
        password,
    } = req.body as types.LoginRequest;

    const isPasswordValid = bcrypt.compareSync(password, getPassword(email))
    if (isPasswordValid) {
        const token = jwt.sign({ userEmail: email }, secretKey, { expiresIn: '1h' });

        res.json({
            email: email,
            name: getName(email),
            token: token
        } as types.LoginResponse)
    } else {
        return res.status(401).json({
            message: "Invalid email or password."
        })
    };
});

app.post("/changePassword", authenticateToken, (req: CustomRequest, res: Response) => {
    const schema: JSONSchemaType<types.ChangePasswordRequest> = {
        type: "object",
        properties: {
            password: { type: "string" },
            newPassword: { type: "string", pattern: "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$" },
            confirmPassword: { type: "string" },
        },
        required: ["password", "newPassword", "confirmPassword"],
        additionalProperties: false
    }

    const validate = ajv.compile(schema)
    const valid = validate(req.body);
    if (!valid) {
        return res.status(400).json({
            message: validate.errors?.map(err => err.message)
        })
    }

    const { password, newPassword, confirmPassword } = req.body as types.ChangePasswordRequest;
    let userEmail: string = "";

    if (typeof req.user === 'string') {
        res.status(403).json({ message: req.user });
    } else if (req.user && typeof req.user === 'object' && 'userEmail' in req.user) {
        userEmail = req.user.userEmail;
    }

    const isPasswordValid = bcrypt.compareSync(password, getPassword(userEmail))
    if (isPasswordValid) {
        return res.status(400).json({
            message: "Invalid password."
        })
    } else if (newPassword !== confirmPassword) {
        return res.status(400).json({
            message: "New passwords do not match."
        })
    } else if (newPassword === password) {
        return res.status(400).json({
            message: "New password cannot be the same as the old password."
        })
    } else {
        changePassword(userEmail, newPassword);
        res.json({
            email: userEmail
        } as types.ChangePasswordResponse)
    }
});

createTables();
if (require.main === module) {
    let port = 5000;
    app.listen(port, () => {
        console.log(`App has started on port: ${port}`);
    });
}