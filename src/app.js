const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')

const userRoutes = require('./routes/userRoutes')

const app = express()
dotenv.config()
app.use(express.json())
app.use(morgan('[:date[web]] || :method :url  || Status: :status || Response time: :response-time ms'))
app.use(cors())

const MONGOOSE_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true }
const DB = process.env.NODE_ENV  === 'production'
	? process.env.DB_CONNECTION
	: process.env.DB_TEST_CONNECTION

mongoose.connect(DB, MONGOOSE_OPTIONS, () => {
	console.log('Connected to MongoDB database')
	console.log(`Node environment: ${process.env.NODE_ENV}`)
})

app.get('/', (req, res) => {
	return res.json({
		message: 'Vevericka User Info Service'
	})
})

app.use('/user', userRoutes)

app.use('*', (req, res, next) => {
	res.status(404).send('Not Found')
	next()
})

const PORT = process.env.PORT || 3232
const server = app.listen(PORT, () => {
	console.log(`Server started on ${process.env.NODE_ENV} mode on port ${PORT}`)
})

module.exports = server