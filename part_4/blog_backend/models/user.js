const uniqueValidator = require('mongoose-unique-validator')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true
	},
	passwordHash: {
		type: String,
	},
	blogs: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Blog'
	}]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject.passwordHash
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('User', userSchema)