import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Workout } from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const users = await User.insertMany([
      { name: 'Ava Chen', email: 'ava@example.com', role: 'captain', fitnessGoal: 'Run a marathon' },
      { name: 'Noah Patel', email: 'noah@example.com', role: 'member', fitnessGoal: 'Increase strength' },
      { name: 'Mia Alvarez', email: 'mia@example.com', role: 'member', fitnessGoal: 'Improve mobility' }
    ]);

    const teams = await Team.insertMany([
      { name: 'Trailblazers', sport: 'running', members: users.slice(0, 2).map((user) => user._id.toString()), captain: users[0]._id.toString() },
      { name: 'Powerhouse', sport: 'cross-training', members: [users[2]._id.toString()], captain: users[2]._id.toString() }
    ]);

    await Activity.insertMany([
      { type: 'run', durationMinutes: 32, caloriesBurned: 280, userId: users[0]._id.toString(), date: new Date('2026-07-10') },
      { type: 'strength', durationMinutes: 45, caloriesBurned: 320, userId: users[1]._id.toString(), date: new Date('2026-07-11') },
      { type: 'yoga', durationMinutes: 25, caloriesBurned: 160, userId: users[2]._id.toString(), date: new Date('2026-07-12') }
    ]);

    await Leaderboard.insertMany([
      { userId: users[0]._id.toString(), name: 'Ava Chen', points: 1320, streak: 5 },
      { userId: users[1]._id.toString(), name: 'Noah Patel', points: 1180, streak: 3 },
      { userId: users[2]._id.toString(), name: 'Mia Alvarez', points: 980, streak: 4 }
    ]);

    await Workout.insertMany([
      { title: 'Morning Mobility Flow', focus: 'mobility', durationMinutes: 20, difficulty: 'easy' },
      { title: 'Tempo Run Intervals', focus: 'endurance', durationMinutes: 35, difficulty: 'moderate' },
      { title: 'Full Body Strength', focus: 'strength', durationMinutes: 50, difficulty: 'hard' }
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
