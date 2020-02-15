const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const Proyect = require("../../models/project");

module.exports = {
    createUser: async args => {
        try {
            const existingUser = await User.findOne({username: args.userInput.username});
            const existingEmail = await User.findOne({email: args.userInput.email});
            if (existingUser) {
                throw new Error('Username exists already.');
            }
            else if (existingEmail) {
                throw new Error('Email exists already.');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12)

            const user = new User({
                name: args.userInput.name,
                username: args.userInput.username,
                password: hashedPassword,
                email: args.userInput.email
            })
            const result = await user.save();
            const proyects= Proyect.find();
            proyects.map(proyect =>{
                proyect.sharedUsers.map(shared=>{
                    if (shared == args.userInput.email) {
                        user.sharedProjects.push(proyect);
                        user.save();
                    }
                });
            });
            return { ...result._doc, password: "null", _id: result.id }
        } catch (err) {
            throw err;
        }
    },
    login: async ({ username, password }) => {
        const user = await User.findOne({ username: username });
        if (!user) {
            throw new Error('User does not exist!');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('Password is incorrect!');
        }
        const token = jwt.sign({ userId: user.id, username: user.username, email: user.email }, 'somesupersecretkey', {
            expiresIn: '1h'
        });
        return {token: token};
    }
};