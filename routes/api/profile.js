const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

const Profile = require('../../models/Profile')
const User = require('../../models/User')

const {
    check,
    validationResult
} = require('express-validator');


router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private 
router.get('/me', auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({
                msg: 'There is no profile for this user'
            })
        } else {
            res.json(profile);
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/profile
// @desc    create/update a user profile
// @access  Private 
router.post('/', [auth, 
    // [
    //     check('favouritesongs', 'Please tell us at least one of your favourite songs').exists(),
    //     check('favouriteartists', 'Please tell us at least one of your favourite artists').exists(),
    // ]
],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const {
            bio,
            location,
            favouritesongs,
            favouriteartists,
            followers,
            soundtrackusername,
            youtube,
            twitter,
            facebook,
            instagram
        } = req.body;

        const profileFields = {};

        profileFields.user = req.user.id;
        
        if (bio) {
            profileFields.bio = bio;
        }
        if (location) {
            profileFields.location = location;
        }
        if (favouritesongs) {
            // profileFields.favouritesongs = favouritesongs.split(',').map(x => x.trim());
            profileFields.favouritesongs = favouritesongs
        }
        if (favouriteartists) {
            // profileFields.favouriteartists = favouriteartists.split(',').map(x => x.trim());
            profileFields.favouriteartists = favouriteartists
        }
        if (followers) {
            profileFields.followers = followers;
        }
        if (soundtrackusername) {
            profileFields.soundtrackusername = soundtrackusername;
        }

        profileFields.social = {};

        if (youtube) {
            profileFields.social.youtube = youtube;
        }
        if (twitter) {
            profileFields.social.twitter = twitter;
        }
        if (facebook) {
            profileFields.social.facebook = facebook;
        }
        if (instagram) {
            profileFields.social.instagram = instagram;
        }

        console.log(profileFields.favouritesongs)
        console.log(profileFields.favouriteartists)

        try {
            let profile = await Profile.findOne({
                user: req.user.id
            });
            if (profile) {
                profile = await Profile.findOneAndUpdate({
                    user: req.user.id
                }, {
                    $set: profileFields
                }, {
                    new: true
                })
                return res.json(profile)
            }
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile)
        } catch (error) {
            console.log('here')
            console.error(error.message)
            res.status(500).send('Server Error')
        }
    },
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async(req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:uid', async(req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.uid
        }).populate('user', ['name', 'avatar']);

        if (!profile) return res.status(400).json({
            msg: 'Profile not found'
        });

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({
                msg: 'Profile not found'
            });
        }
        res.status(500).send('Server Error');
    }
});

// @route    DELETE api/profile
// @desc     Delete profile, user and posts
// @access   Private
router.delete('/', auth, async(req, res) => {
    try {
        // TODO: Remove all posts of a user
        // await Post.deleteMany({ user: req.user.id });

        // Remove profile
        if (await Profile.findOne({
                user: req.user.id
            })) {
            await Profile.findOneAndRemove({
                user: req.user.id
            });
            // Remove user
            await User.findOneAndRemove({
                _id: req.user.id
            });
            res.json({
                msg: 'User deleted'
            });
        } else {
            res.json({
                msg: 'Failed to delete, no such user'
            });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;