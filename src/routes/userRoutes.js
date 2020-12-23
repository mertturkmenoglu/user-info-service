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

router.route('/').get((req, res) => getUsers(req, res, User))
router.route('/q').get(getUsersByUsernameQuery)
router.route('/username/:username').get((req, res) => getUserByUsername(req, res, User))
router.route('/:id').get((req, res) => getUserById(req, res, User))
router.route('/:id/followers').get((req, res) => getUserFollowers(req, res, User))
router.route('/:id/following').get((req, res) => getUserFollowing(req, res, User))
router.route('/:id/hobbies').get((req, res) => getUserHobbies(req, res, User))
router.route('/:id/features').get((req, res) => getUserFeatures(req, res, User))
router.route('/:id/languages').get((req, res) => getUserLanguages(req, res, User))
router.route('/:id/wish_to_speak').get((req, res) => getUserWishToSpeak(req, res, User))
router.route('/').post((req, res) => createUser(req, res, User))
router.route('/get_all').post((req, res) => getManyUsersById(req, res, User))
router.route('/get_all_by_username').post((req, res) => getManyUsersByUsername(req, res, User))
router.route('/follow').post((req, res) => followUser(req, res, User))
router.route('/unfollow').post((req, res) => unfollowUser(req, res, User))
router.route('/:id').delete((req, res) => deleteUser(req, res, User))
router.route('/:id').put((req, res) => updateUser(req, res, User))
router.route('/samples/:username').get((req, res) => getSamplesFromUsername(req, res, User))

module.exports = router