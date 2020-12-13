const express = require('express')
const User = require('../models/User')

const {
	getUsers,
	getUserById,
	getUserFollowers,
	getUserFollowing,
	getUserHobbies,
	getUserFeatures,
	getUserLanguages,
	getUserWishToSpeak,
	createUser,
	followUser,
	unfollowUser,
	deleteUser,
	updateUser,
	getManyUsersById,
	getManyUsersByUsername,
	getUserByUsername,
	getUsersByUsernameQuery,
	getSamplesFromUsername
} = require('../controllers/userController')


const router = express.Router();

router.route('/').get((req, res) => getUsers(req, res, User));
router.route('/q').get(getUsersByUsernameQuery);
router.route('/username/:username').get((req, res) => getUserByUsername(req, res, User))
router.route('/:id').get((req, res) => getUserById(req, res, User));
router.route('/:id/followers').get(getUserFollowers);
router.route('/:id/following').get(getUserFollowing);
router.route('/:id/hobbies').get(getUserHobbies);
router.route('/:id/features').get(getUserFeatures);
router.route('/:id/languages').get(getUserLanguages);
router.route('/:id/wish_to_speak').get(getUserWishToSpeak);
router.route('/').post(createUser);
router.route('/get_all').post(getManyUsersById);
router.route('/get_all_by_username').post(getManyUsersByUsername);
router.route('/follow').post(followUser);
router.route('/unfollow').post(unfollowUser);
router.route('/:id').delete(deleteUser);
router.route('/:id').put(updateUser);
router.route('/samples/:username').get(getSamplesFromUsername)

module.exports = router