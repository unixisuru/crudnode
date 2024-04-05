// const express = require('express')
// const mongoose = require('mongoose')
// const UserModel = require ('./User')
// var cors = require('cors')

// const app = express()
// const port = 3000
// app.use(cors())

// app.use(express.json())

// // mongoose.connect('mongodb://127.0.0.1/nodeexpressdb', {
// mongoose.connect('mongodb+srv://unixisuru:<3fdSmxn7lgDfFjUV>@devcluster.cdvs7yr.mongodb.net/?retryWrites=true&w=majority&appName=DevCluster', {
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

// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const UserModel = require('./User');
// const cors = require('cors');

// const app = express();
// const port = 3000;
// app.use(cors());
// app.use(express.json());

// // Use environment variables for sensitive information
// const { MONGODB_URI } = process.env;

// mongoose
//   .connect(MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => console.log('DB is connected'))
//   .catch(err => console.error('Connection error:', err));

// app.get('/', (req, res) => {
//   UserModel.find()
//     .then(users => res.json(users))
//     .catch(err => res.status(500).json({ error: err.message }));
// });

// app.get('/get/:id', (req, res) => {
//   const id = req.params.id;
//   UserModel.findById(id)
//     .then(user => {
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
//       res.json(user);
//     })
//     .catch(err => res.status(500).json({ error: err.message }));
// });

// app.post('/create', (req, res) => {
//   UserModel.create(req.body)
//     .then(user => res.status(201).json(user))
//     .catch(err => res.status(400).json({ error: err.message }));
// });

// app.put('/update/:id', (req, res) => {
//   const id = req.params.id;
//   UserModel.findByIdAndUpdate(id, req.body, { new: true })
//     .then(user => {
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
//       res.json(user);
//     })
//     .catch(err => res.status(400).json({ error: err.message }));
// });

// app.delete('/deleteuser/:id', (req, res) => {
//   const id = req.params.id;
//   UserModel.findByIdAndDelete(id)
//     .then(user => {
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
//       res.json({ message: 'User deleted successfully' });
//     })
//     .catch(err => res.status(500).json({ error: err.message }));
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

require('dotenv').config();
const express = require('express');
const UserModel = require('./User');
const cors = require('cors');
const connectToDatabase = require('./mongoC');

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

connectToDatabase()
  .then(db => {
    console.log('DB is connected');
    
    // Routes
    app.get('/', (req, res) => {
      UserModel.find()
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: err.message }));
    });

    app.get('/get/:id', (req, res) => {
      const id = req.params.id;
      UserModel.findById(id)
        .then(user => {
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
          res.json(user);
        })
        .catch(err => res.status(500).json({ error: err.message }));
    });

    app.post('/create', (req, res) => {
      UserModel.create(req.body)
        .then(user => res.status(201).json(user))
        .catch(err => res.status(400).json({ error: err.message }));
    });

    app.put('/update/:id', (req, res) => {
      const id = req.params.id;
      UserModel.findByIdAndUpdate(id, req.body, { new: true })
        .then(user => {
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
          res.json(user);
        })
        .catch(err => res.status(400).json({ error: err.message }));
    });

    app.delete('/deleteuser/:id', (req, res) => {
      const id = req.params.id;
      UserModel.findByIdAndDelete(id)
        .then(user => {
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
          res.json({ message: 'User deleted successfully' });
        })
        .catch(err => res.status(500).json({ error: err.message }));
    });

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Connection error:', err);
    process.exit(1); // Exit the process if unable to connect to the database
  });
