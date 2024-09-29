const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;
const Role = db.Role;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

// Register a new user
exports.signup = async (req, res) => {
    const { username, password, email, roles } = req.body;

    if (!username || !password || !email) {
        return res.status(400).send({
            message: "Please provide all required fields.",
        });
    }

    try {
        // Prepare user data
        const newUser = {
            username,
            password: bcrypt.hashSync(password, 16),
            email,
        };

        // Save user in the database
        const user = await User.create(newUser);

        if (roles) {
            const foundRoles = await Role.findAll({
                where: {
                    name: {
                        [Op.or]: roles,
                    },
                },
            });

            await user.setRoles(foundRoles);
        } else {
            const defaultRole = await Role.findByPk(1); // Assuming role with ID 1 is default
            await user.setRoles([defaultRole]);
        }

        res.send({
            message: "User registered successfully!",
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "An error occurred while registering the new user.",
        });
    }
};

// Sign in a user
exports.signin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({
            message: "Please provide both username and password.",
        });
    }

    try {
        const user = await User.findOne({
            where: { username },
        });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid password",
            });
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400, // 1 day
        });

        const roles = await user.getRoles();
        const authorities = roles.map(role => "ROLE_" + role.name.toUpperCase());

        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "An error occurred while signing in.",
        });
    }
};