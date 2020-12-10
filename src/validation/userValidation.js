const Joi = require('joi')

const userSchema = Joi.object({
	username: Joi.string().max(32).required(),
	name: Joi.string().max(255).required(),
	email: Joi.string().min(6).max(255).email().required(),
	isAdmin: Joi.boolean().required(),
	image: Joi.string().required(),
	hobbies: Joi.array(),
	features: Joi.array(),
	bdate: Joi.date(),
	followers: Joi.array(),
	following: Joi.array(),
	location: Joi.object().empty(''),
	job: Joi.string().empty(''),
	school: Joi.string().empty(''),
	website: Joi.string().empty(''),
	twitter: Joi.string().empty(''),
	bio: Joi.string().empty(''),
	gender: Joi.string().empty(''),
	languages: Joi.array(),
	wish_to_speak: Joi.array()
});

const userValidation = (data) => {
	const { error } = userSchema.validate(data);
	return !error;
}

module.exports = userValidation