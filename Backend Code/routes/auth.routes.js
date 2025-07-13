const express = require('express')
const User = require('../models/User.models')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchuser.mw')


router.post('/createuser', [
    body('username').notEmpty().withMessage('username is required').isLength({ min: 3 }),
    body('email').notEmpty().withMessage('email is required'),
    body('password').notEmpty().withMessage('password is required').isLength({ min: 6 })
], async (req, res) => {

    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: 'Emila already exists!' })
        }
        // console.log(req.body)

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
        // console.log(hashPass)
        const newuser = new User({ username, email, password: hashPass })
        await newuser.save()

        const data = {
            user: {
                id: newuser._id
            }
        }
        const token = jwt.sign(data, 'Sahil');
        // console.log(token);

        res.json({ token })

    } catch (error) {
        // console.log(error)
        res.status(500).json({ Error: 'Server error' });
    }
})

router.post('/login', [
    body('email').notEmpty().isEmail().withMessage('Enter a correct email'),
    body('password').exists().withMessage('Enter your passowrd')
], async (req, res) => {
    const { email, password } = req.body
    try {
        const userExist = await User.findOne({ email })
        // console.log(userExist.username)
        if (!userExist) {
            res.status(400).json({ error: "Please try to lgoin with correct details" })
        }
        const correctPassword = bcrypt.compareSync(password, userExist.password)
        if (!correctPassword) {
            res.status(400).json({ error: "Please enter correct password" })
        }

        const data = {
            user: {
                id: userExist.id
            }
        }

        const token = jwt.sign(data, 'Sahil')


        res.json({ token })
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Some error occured')
    }
})


// this one is create for fetching the user detail from database

router.post('/fecthuser', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id
        const userdata = await User.findById(userId).select("-password")
        res.send(userdata)

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Some error occured')
    }
})

module.exports = router;