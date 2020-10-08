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
	hobbies: [String],
	features: [String],
	bdate: {
		type: Date,
		required: false
	},
	followers: [mongoose.Schema.Types.ObjectId],
	following: [mongoose.Schema.Types.ObjectId],
	location: {
		type: String,
		required: false
	},
	job: {
		type: String,
		required: false
	},
	school: {
		type: String,
		required: false
	},
	website: {
		type: String,
		required: false,
	},
	twitter: {
		type: String,
		required: false
	},
	bio: {
		type: String,
		required: false
	},
	gender: {
		type: String,
		required: true
	},
	interested_genders: [String],
	open_to_relationship: {
		type: Boolean,
		required: false
	},
	weight: {
		type: Number,
		required: false
	},
	height: {
		type: Number,
		required: false
	},
	sexual_orientation: {
		type: String,
		required: false
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
