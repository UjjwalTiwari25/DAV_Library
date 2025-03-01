const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Visitor = require('../models/Visitor');
const mongoose = require('mongoose');

// Get visitor and user statistics
router.get('/stats', async (req, res) => {
  try {
    console.log('Stats API called');
    console.log('MongoDB connection state:', mongoose.connection.readyState);
    
    // Check database connection
    if (mongoose.connection.readyState !== 1) {
      console.log('MongoDB not connected, attempting to reconnect...');
      await mongoose.connect(process.env.MONGO_URI);
    }
    
    // List all collections in the database
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    console.log('Available collections:', collectionNames);
    
    // Check if Visitor model is defined correctly
    console.log('Visitor model collection:', Visitor.collection.name);
    
    // Get visitor count
    let visitorData = null;
    try {
      visitorData = await Visitor.findOne({ id: 'main' });
      console.log('Visitor data:', visitorData);
      
      // If no visitor data exists, create it
      if (!visitorData) {
        console.log('No visitor data found, creating initial record');
        visitorData = await Visitor.create({ id: 'main', count: 1 });
        console.log('Created visitor data:', visitorData);
      }
    } catch (visitorErr) {
      console.error('Error getting visitor data:', visitorErr);
    }
    
    // Get registered user count
    let userCount = 0;
    let userDebug = {};
    
    try {
      // Log the User model details
      console.log('User model collection:', User.collection.name);
      
      // Try direct database query to users collection
      const userCollection = mongoose.connection.db.collection('users');
      if (userCollection) {
        const directCount = await userCollection.countDocuments({});
        console.log('Direct count from users collection:', directCount);
        userCount = directCount;
      }
      
      // If that doesn't work, try the model's collection name
      if (userCount === 0 && User.collection) {
        const modelCollectionName = User.collection.name;
        console.log(`Trying model collection: ${modelCollectionName}`);
        const modelCollection = mongoose.connection.db.collection(modelCollectionName);
        if (modelCollection) {
          const modelCount = await modelCollection.countDocuments({});
          console.log(`Count from ${modelCollectionName}:`, modelCount);
          userCount = modelCount;
        }
      }
      
      userDebug = {
        collections: collectionNames,
        userModelCollection: User.collection.name,
        connectionState: mongoose.connection.readyState
      };
    } catch (userErr) {
      console.error('Error counting users:', userErr);
      userDebug.error = userErr.message;
    }
    
    res.status(200).json({
      success: true,
      visitors: visitorData ? visitorData.count : 0,
      registeredUsers: userCount,
      debug: {
        collections: collectionNames,
        connectionState: mongoose.connection.readyState,
        visitorCollection: Visitor.collection.name,
        userCollection: User.collection.name
      }
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
});

// Increment visitor count - this should be called when a page is loaded
router.post('/increment-visitor', async (req, res) => {
  try {
    console.log('Increment visitor called');
    
    // Check if the visitors collection exists
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    console.log('Available collections for increment:', collectionNames);
    
    // Create or increment the visitor count
    const result = await Visitor.findOneAndUpdate(
      { id: 'main' }, 
      { $inc: { count: 1 } },
      { upsert: true, new: true }
    );
    
    console.log('Updated visitor count:', result);
    
    res.status(200).json({
      success: true,
      visitors: result.count
    });
  } catch (error) {
    console.error('Error incrementing visitor count:', error);
    res.status(500).json({
      success: false,
      message: 'Error incrementing visitor count',
      error: error.message
    });
  }
});

module.exports = router; 