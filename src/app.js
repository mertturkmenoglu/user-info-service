const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')

const userRoutes = require('./routes/userRoutes')


const app = express();
dotenv.config();

app.use(express.json());
app.use(morgan('[:date[web]] || :method :url  || Status: :status || Response time: :response-time ms'))

const MONGOOSE_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(process.env.DB_CONNECTION, MONGOOSE_OPTIONS, () => {
	console.log('Connected to MongoDB database');
});


app.use('/user', userRoutes);


const PORT = process.env.PORT || 3232;
app.listen(PORT, () => console.log(`Server started on ${process.env.NODE_ENV} mode on port ${PORT}`));