import { db } from "../server.js";
// import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const register = (req, res) => {
    //check existing user
    const q = "SELECT * FROM users WHERE email=? OR username=?";

    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) {
            return res.json(err)
        }
        if (data.length) {
            return res.status(409).json("User already exists!")
        }

        //create password with hashing
        // const salt = bcrypt.genSaltSync(10);
        // const hash = bcrypt.hashSync(req.body.password, salt)

        //inserting new user into database
        const q = "INSERT INTO users (`username`,`email`) VALUES (?)";
        const values = [
            req.body.username,
            req.body.email 
        ]
        db.query(q, [values], (err, data) => {
            if (err) {
                return res.json(err)
            }
            else {
                return res.status(200).json("user insert into your database")
            }
        })
    })
}

export const login = (req, res) => {
    // check user exists or not

    const q = "SELECT * FROM users WHERE username=?";
    db.query(q, [req.body.username], (err, data) => {
        if (err) {
            res.status(500).json(err)
        }
        if (data.length == 0) {
            res.status(404).json("User not found!")
        }

        //check login password is correct
        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            data[0].password
        );
        if (!isPasswordCorrect) {
            res.status(400).json("user password not match")
        }
    })

    // generate token
    const token = jwt.sign({ id: data[0].id }, process.env.jwtSecretKey);
    console.log(token);
    const { password, ...other } = data[0];

    // Send the token in the response
    res.status(200).json({ token, ...other });
}


export const logout = (req, res) => {
    res.status(200).json("User has been logged out.");
}
