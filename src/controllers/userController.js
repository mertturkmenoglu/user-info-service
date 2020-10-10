const User = require('../models/User')
const userValidation = require('../validation/userValidation')

const getUsers = async (req, res) => {
	const users = await User.find({})
	return res.json({ users })
}

const getUserById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id)

		if (!user) {
			return res.status(404).json({
				message: "User not found",
				status_code: 404
			})
		}

		return res.json({ user })
	} catch (err) {
		return res.status(400).json({
			message: err.message,
			status_code: 400
		})
	}
}

const getUserByUsername = async (req, res) => {
	try {
		const user = await User.find({ username: req.params.username })

		if (!user) {
			return res.status(404).json({
				message: "User not found",
				status_code: 404
			})
		}

		return res.json({ user })
	} catch (err) {
		return res.status(400).json({
			message: err.message,
			status_code: 400
		})
	}
}

const getUserFollowers = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user || !user.followers) {
			return res.status(404).json({
				message: 'User not found',
				status_code: 404
			})
		}

		return res.json({ 'followers': user.followers })
	} catch (err) {
		return res.status(400).json({ message: err.message, status_code: 400 })
	}
}

const getUserFollowing = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user || !user.following) {
			return res.status(404).json({
				message: 'User not found',
				status_code: 404
			})
		}

		return res.json({ 'following': user.following })
	} catch (err) {
		return res.status(404).json({
			message: 'User not found',
			status_code: 404
		})
	}
}

const getUserHobbies = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user || !user.hobbies) {
			return res.status(404).json({
				message: 'User not found',
				status_code: 404
			})
		}

		return res.json({ 'hobbies': user.hobbies })
	} catch (err) {
		return res.status(404).json({
			message: 'User not found',
			status_code: 404
		})
	}
}

const getUserFeatures = async (req, res) => {
	let user;

	try {
		user = await User.findById(req.params.id);
	} catch (err) {
		return res.status(404).json({
			message: 'User not found',
			status_code: 404
		})
	}

	if (!user || !user.features) {
		return res.status(404).json({
			message: 'User not found',
			status_code: 404
		})
	}

	return res.json({ 'features': user.features })
}

const getUserLanguages = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user || !user.languages) {
			return res.status(404).json({
				message: 'User not found',
				status_code: 404
			})
		}

		return res.json({ 'languages': user.languages })
	} catch (err) {
		return res.status(404).json({
			message: 'User not found',
			status_code: 404
		})
	}
}

const getUserWishToSpeak = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user || !user.wish_to_speak) {
			return res.status(404).json({
				message: 'User not found',
				status_code: 404
			})
		}

		return res.json({ 'wish_to_speak': user.wish_to_speak })
	} catch (err) {
		return res.status(404).json({
			message: 'User not found',
			status_code: 404
		})
	}
}

const createUser = async (req, res) => {
	const isValid = userValidation(req.body);

	if (!isValid) {
		return res.status(400).json({
			message: 'Bad request',
			status_code: 400
		})
	}

	const { username, name, email, isAdmin, image, hobbies, features, bdate, followers, following, location, job, school, website, twitter, bio, gender, languages, wish_to_speak } = req.body;

	const isUsernameUsed = await User.findOne({ username })

	if (isUsernameUsed) {
		return res.status(400).json({
			message: 'Username already exists',
			status_code: 400
		})
	}

	const isEmailUsed = await User.findOne({ email })

	if (isEmailUsed) {
		return res.status(400).json({
			message: 'Email already exists',
			status_code: 400
		})
	}

	const defaultImageUrl = "https://github.com/afterthebyte.png";


	const user = new User({
		username,
		name,
		email,
		isAdmin,
		image: (image ? image : defaultImageUrl),
		hobbies,
		features,
		bdate,
		followers,
		following,
		location,
		job,
		school,
		website,
		twitter,
		bio,
		gender,
		languages,
		wish_to_speak
	});

	try {
		const saved = await user.save();
		return res.status(201).json({ user: saved })
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			message: 'User cannot be added',
			status_code: 500
		})
	}
}

const followUser = async (req, res) => {
	const { thisUsername, otherUsername } = req.body;

	let thisUser;
	let otherUser;

	try {
		thisUser = await User.findOne({ username: thisUsername })
		otherUser = await User.findOne({ username: otherUsername })
	} catch (err) {
		return res.status(404).json({
			message: 'User(s) not found',
			status_code: 404
		})
	}

	if (!thisUser || !otherUser) {
		return res.status(404).json({
			message: 'User(s) not found',
			status_code: 404
		})
	}

	if (thisUser.following.findIndex(username => username == otherUsername) != -1) {
		return res.status(400).json({
			message: 'Already following',
			status_code: 400
		})
	}

	thisUser.following = [...thisUser.following, otherUsername];
	otherUser.followers = [...otherUser.followers, thisUsername];

	try {
		const savedThisUser = await thisUser.save()
		const savedOtherUser = await otherUser.save()

		return res.status(200).json({
			message: `${thisUsername} follows ${otherUsername}`
		})
	} catch (err) {
		return res.status(500).json({
			message: 'Follow operation failed',
			status_code: 500
		})
	}
}

const unfollowUser = async (req, res) => {
	const { thisUsername, otherUsername } = req.body;
	let thisUser
	let otherUser

	try {
		thisUser = await User.findOne({ username: thisUsername })
		otherUser = await User.findOne({ username: otherUsername })
	} catch (err) {
		return res.status(404).json({
			message: 'User(s) not found',
			status_code: 404
		})
	}

	if (!thisUser || !otherUser) {
		return res.status(404).json({
			message: 'User(s) not found',
			status_code: 404
		})
	}

	thisUser.following = thisUser.following.filter(username => username != otherUsername)
	otherUser.followers = otherUser.followers.filter(username => username != thisUsername)

	try {
		const savedThisUser = await thisUser.save()
		const savedOtherUser = await otherUser.save()

		return res.status(200).json({
			message: `${thisUsername} unfollowed ${otherUsername}`
		})
	} catch (err) {
		return res.status(500).json({
			message: 'Unfollow operation failed',
			status_code: 500
		})
	}
}

const deleteUser = async (req, res) => {
	const id = req.params.id;
	let user

	try {
		user = await User.findById(id);
	} catch (err) {
		return res.status(404).json({
			message: 'User not found',
			status_code: 404
		})
	}

	if (!user) {
		return res.status(404).json({
			message: 'User not found',
			status_code: 404
		})
	}

	try {
		const removed = await user.remove()
		res.status(200).json({ user: removed })
	} catch (err) {
		res.status(500).json({
			message: 'User delete failed',
			status_code: 500
		})
	}
}

const updateUser = async (req, res) => {
	let user

	try {
		user = await User.findById(req.user._id)
	} catch (err) {
		return res.status(404).json({
			message: 'User not found',
			status_code: 404
		})
	}

	const { username, name, email, isAdmin, image, hobbies, features, bdate, followers, following, location, job, school, website, twitter, bio, gender, languages, wish_to_speak } = req.body;

	if (!user) {
		const isValid = userValidation(req.body);

		if (!isValid) {
			return res.status(400).json({
				message: 'Bad request',
				status_code: 400
			})
		}

		const isUsernameUsed = await User.find({ username })

		if (isUsernameUsed) {
			return res.status(400).json({
				message: 'Username already exists',
				status_code: 400
			})
		}

		const isEmailUsed = await User.find({ email })

		if (isEmailUsed) {
			return res.status(400).json({
				message: 'Email already exists',
				status_code: 400
			})
		}

		const user = new User({
			username,
			name,
			email,
			isAdmin,
			image,
			hobbies,
			features,
			bdate,
			followers,
			following,
			location,
			job,
			school,
			website,
			twitter,
			bio,
			gender,
			languages,
			wish_to_speak
		});

		try {
			const saved = await user.save();
			return res.status(201).json({ user: saved })
		} catch (err) {
			return res.status(500).json({
				message: 'User cannot be added',
				status_code: 500
			})
		}
	}

	user.username = username || user.username
	user.name = name || user.name
	user.email = email || user.email
	user.isAdmin = isAdmin || user.isAdmin
	user.image = image || user.image
	user.hobbies = hobbies || user.hobbies
	user.features = features || user.features
	user.bdate = bdate || user.bdate
	user.followers = followers || user.followers
	user.following = following || user.following
	user.location = location || user.location
	user.job = job || user.job
	user.school = school || user.school
	user.website = website || user.website
	user.twitter = twitter || user.twitter
	user.bio = bio || user.bio
	user.gender = gender || user.gender
	user.languages = languages || user.languages
	user.wish_to_speak = wish_to_speak || user.wish_to_speak

	try {
		const updatedUser = await user.save()
		return res.status(200).json({ user: updatedUser })
	} catch (err) {
		return res.status(500).json({
			message: 'Update user failed',
			status_code: 500
		})
	}
}

const getManyUsersById = async (req, res) => {
	const MAX_CAPACITY = 100

	const { id_list } = req.body

	if (!id_list || !Array.isArray(id_list) || id_list.length <= 0) {
		return res.status(400).json({
			message: 'User id(s) not valid',
			status_code: 400
		})
	}

	if (id_list.length > MAX_CAPACITY) {
		return res.status(400).json({
			message: `Max request capacity is ${MAX_CAPACITY}`,
			status_code: 400
		})
	}

	const users = []

	for (let id of id_list) {
		let user
		try {
			user = await User.findById(id)
		} catch (err) {
			return res.status(404).json({
				message: "User not found",
				status_code: 404
			})
		}

		if (!user) {
			return res.status(404).json({
				message: "User not found",
				status_code: 404
			})
		}

		users.push(user)
	}

	return res.json({ users })
}

const getManyUsersByUsername = (req, res) => {
	const MAX_CAPACITY = 100

	const { list } = req.body

	if (!list || !Array.isArray(list) || list.length <= 0) {
		return res.status(400).json({
			message: 'Username(s) not valid',
			status_code: 400
		})
	}

	if (list.length > MAX_CAPACITY) {
		return res.status(400).json({
			message: `Max request capacity is ${MAX_CAPACITY}`,
			status_code: 400
		})
	}

	const users = []

	for (let username of list) {
		let user
		try {
			user = await User.findOne({ username })
		} catch (err) {
			return res.status(404).json({
				message: "User not found",
				status_code: 404
			})
		}

		if (!user) {
			return res.status(404).json({
				message: "User not found",
				status_code: 404
			})
		}

		users.push(user)
	}

	return res.json({ users })
}

const getUsersByUsernameQuery = async (req, res) => {
	try {
		const username = req.query.searchTerm
		const result = await User.find({ username: { $regex: '.*' + username + '.*' } }).limit(100)

		return res.status(200).json({
			users: result
		})
	} catch (err) {
		return res.status(404).json({
			message: 'User not found',
			status_code: 404
		})
	}
}

module.exports = {
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
	getUsersByUsernameQuery
}