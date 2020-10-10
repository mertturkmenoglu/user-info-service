const mongoose = require('mongoose')

const userInfoSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		maxLength: 32
	},
	name: {
		type: String,
		required: true,
		maxLength: 255
	},
	email: {
		type: String,
		required: true,
		minLength: 6,
		maxLength: 255,
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false
	},
	image: {
		type: String,
		required: true,
		default: "https://github.com/afterthebyte.png"
	},
	hobbies: [String],
	features: [String],
	bdate: {
		type: Date,
		required: false
	},
	followers: [String],
	following: [String],
	location: {
		city: {
			type: String,
			required: false
		},
		country: {
			type: String,
			required: false
		}
	},
	job: {
		type: String,
		required: false,
		default: ""
	},
	school: {
		type: String,
		required: false,
		default: ""
	},
	website: {
		type: String,
		required: false,
		default: ""
	},
	twitter: {
		type: String,
		required: false,
		default: ""
	},
	bio: {
		type: String,
		required: false,
		default: ""
	},
	gender: {
		type: String,
		required: true,
		default: ""
	},
	languages: [
		{
			language: String,
			proficiency: String
		}
	],
	wish_to_speak: [String]
}, { timestamps: mongoose.timestamps })

module.exports = mongoose.model('User', userInfoSchema)
