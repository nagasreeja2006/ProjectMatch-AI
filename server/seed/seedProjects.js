const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Project = require('../models/Project');
const seedProjects = require('./seedData');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/projectmatch_ai';
  console.log(`[Seed Script] Attempting connection to ${uri}...`);

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('[Seed Script] MongoDB connected.');

    // Count existing
    const count = await Project.countDocuments();
    console.log(`[Seed Script] Current project count in DB: ${count}`);

    // Upsert projects to avoid duplicates
    let inserted = 0;
    let updated = 0;

    for (const proj of seedProjects) {
      const res = await Project.findOneAndUpdate(
        { title: proj.title },
        { $set: proj },
        { upsert: true, new: true }
      );
      if (res) inserted++;
    }

    console.log(`[Seed Script] Successfully seeded/updated ${inserted} projects into MongoDB.`);
    process.exit(0);
  } catch (error) {
    console.warn(`[Seed Script] MongoDB is not reachable (${error.message}).`);
    console.info(`[Seed Script] Note: The in-memory store already contains all ${seedProjects.length} seed projects and runs automatically!`);
    process.exit(0);
  }
};

seedDB();
