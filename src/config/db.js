require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_DB_URI;

const connectToDB = async () => {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected');
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
};
  
connectToDB();
// module.exports = connectDB;



