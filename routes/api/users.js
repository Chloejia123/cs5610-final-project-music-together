const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs')
const {
    check,
    validationResult
} = require('express-validator');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register a new user
// @access  Public 
router.post('/', [
    check('name', 'Name is required').exists(),
    check('email', 'Please use a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({
        min: 6
    })
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {
        name,
        email,
        password
    } = req.body;

    try {
        let user = await User.findOne({
            email
        });

        // Check if the user already exists
        if (user) {
            res.status(400).json({
                errors: [{
                    msg: 'User already exists'
                }]
            });
        }

        // Get the user's avatar using email
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({
            name,
            email,
            avatar,
            password
        })

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        // Return JSONWEBTOKEN
        res.send('User registered');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }


});

module.exports = router;