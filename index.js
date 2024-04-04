// import db from './mongoC';

// const express = require('express')
// const mongoose = require('mongoose')
// const UserModel = require ('./User')
// var cors = require('cors')

// const app = express()
// const port = 3000
// app.use(cors())

// app.use(express.json())

// mongoose.connect('mongodb://127.0.0.1/nodeexpressdb', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

// .then(db => console.log('DB is connected'))
// .catch(err => console.log(err)); 

// app.get('/', (req, res) => {
//   UserModel.find()
//   .then(users => res.json(users))
//   .catch(err => res.json(err))
// })

// app.get('/get/:id', (req, res) => {
//     const id = req.params.id
//     UserModel.findById({_id:id})
//         .then(post => res.json(post))
//         .catch(err => console.log(err))
// })

// app.post('/create', (req, res) => {
//     UserModel.create(req.body)
//     .then(post => res.json(post))
//     .catch(err => res.json(err))
// })

// app.put('/update/:id', (req, res) => {
//     const id = req.params.id
//     UserModel.findByIdAndUpdate({_id: id},{
//         name: req.body.name,
//         email: req.body.email,
//         age: req.body.age
//     }) .then(post => res.json(user))
//     .catch(err => res.json(err))
// })

// app.delete('/deleteuser/:id', (req, res)=>{
//     const id = req.params.id;
//     UserModel.findByIdAndDelete({_id: id})
//     .then(response => res.json(response))
//     .catch(err => res.json(err))
// })


// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })


import db from './mongoC.js';
import express from 'express';
import cors from 'cors';
import UserModel from './User';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// No need to connect with Mongoose, already connected with MongoClient

app.get('/', (req, res) => {
  // Use the db object to interact with the database
  db.collection('users').find().toArray()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/get/:id', (req, res) => {
  const id = req.params.id;
  // Use the db object to interact with the database
  db.collection('users').findOne({ _id: id })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/create', (req, res) => {
  const newUser = req.body;
  // Use the db object to interact with the database
  db.collection('users').insertOne(newUser)
    .then(result => res.json(result.ops[0]))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  // Use the db object to interact with the database
  db.collection('users').updateOne({ _id: id }, { $set: updatedUser })
    .then(() => res.json({ message: 'User updated successfully' }))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.delete('/deleteuser/:id', (req, res) => {
  const id = req.params.id;
  // Use the db object to interact with the database
  db.collection('users').deleteOne({ _id: id })
    .then(() => res.json({ message: 'User deleted successfully' }))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
