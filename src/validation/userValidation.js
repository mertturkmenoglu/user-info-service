const Joi = require('joi')

const userSchema = Joi.object({
	username: Joi.string().max(32).required(),
	name: Joi.string().max(255).required(),
	email: Joi.string().min(6).max(255).email().required(),
	isAdmin: Joi.boolean().required(),
	hobbies: Joi.array(),
	features: Joi.array(),
	bdate: Joi.date(),
	followers: Joi.array(),
	following: Joi.array(),
	location: Joi.string(),
	job: Joi.string(),
	school: Joi.string(),
	website: Joi.string(),
	twitter: Joi.string(),
	bio: Joi.string(),
	gender: Joi.string(),
	interested_genders: Joi.array(),
	open_to_relationship: Joi.boolean(),
	weight: Joi.number().min(0).max(1000),
	height: Joi.number().min(0).max(1000),
	sexual_orientation: Joi.string(),
	languages: Joi.array(),
	wish_to_speak: Joi.array()
});

const userValidation = (data) => {
	const { error } = userSchema.validate(data);

	if (error) console.log(error);

	return !error;
}

module.exports = userValidation