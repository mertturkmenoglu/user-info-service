const express = require('express')

const {
	getUsers,
	getUserById,
	getUserFollowers,
	getUserFollowing,
	getUserHobbies,
	getUserFeatures,
	getUserInterestedGenders,
	getUserLanguages,
	getUserWishToSpeak,
	createUser,
	followUser,
	unfollowUser,
	deleteUser,
	updateUser,
	getManyUsersById,
	getUserByUsername,
	getUsersByUsernameQuery
} = require('../controllers/userController')


const router = express.Router();

router.route('/').get(getUsers);
router.route('/q').get(getUsersByUsernameQuery);
router.route('/username/:username').get(getUserByUsername)
router.route('/:id').get(getUserById);
router.route('/:id/followers').get(getUserFollowers);
router.route('/:id/following').get(getUserFollowing);
router.route('/:id/hobbies').get(getUserHobbies);
router.route('/:id/features').get(getUserFeatures);
router.route('/:id/interested_genders').get(getUserInterestedGenders);
router.route('/:id/languages').get(getUserLanguages);
router.route('/:id/wish_to_speak').get(getUserWishToSpeak);
router.route('/').post(createUser);
router.route('/get_all').post(getManyUsersById);
router.route('/follow').post(followUser);
router.route('/unfollow').post(unfollowUser);
router.route('/:id').delete(deleteUser);
router.route('/:id').put(updateUser);

module.exports = router