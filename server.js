const mongoose = require('mongoose');
const express = require('express');
const userModel = require('./models/userModel')
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const corsOptions = {
    origin: 'https://boiler-app.onrender.com/',
    optionsSuccessStatus: 200,
};
app.use(cors())

const db = 'mongodb+srv://zaq1234rfv:zaq1234rfv@cluster0.noj0vsj.mongodb.net/?retryWrites=true&w=majority'
const port = process.env.PORT || 3000
async function startServer() {
  try {
    // Connect to MongoDB
    await mongoose.connect(db);
    console.log('Connected to DB');

    // Start Express server
    app.listen(port, () => {
      console.log('Listening to port 3001');
    });
  } catch (error) {
    console.error('Error connecting to DB:', error.message);
  }
}

app.get('/users', async(req,res) =>{

    const users = await userModel.find()
    res.send(users)
   
})

app.post('/update-user-state', async (req, res) =>{
    const filter = {name: req.body.name}
    const update = {isActive: req.body.isActive}
    

    const newStatus =  await userModel.findOneAndUpdate(filter, update,  { new: true })
   res.json(newStatus)


})

startServer();
