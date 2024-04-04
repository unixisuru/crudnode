// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String, 
//     age: Number
// })

// const UserModel = mongoose.model('user', userSchema);

// module.exports = UserModel;

const createUser = async (userData) => {
    try {
      const result = await db.collection('users').insertOne(userData);
      return result.ops[0];
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  const getUserById = async (userId) => {
    try {
      const user = await db.collection('users').findOne({ _id: userId });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  const updateUser = async (userId, updatedUserData) => {
    try {
      await db.collection('users').updateOne({ _id: userId }, { $set: updatedUserData });
      return { message: 'User updated successfully' };
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  const deleteUser = async (userId) => {
    try {
      await db.collection('users').deleteOne({ _id: userId });
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  // You can continue to define other functions as needed
  
  module.exports = {
    createUser,
    getUserById,
    updateUser,
    deleteUser
  };