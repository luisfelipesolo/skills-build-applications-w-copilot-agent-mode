"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            user_1.User.deleteMany({}),
            team_1.Team.deleteMany({}),
            activity_1.Activity.deleteMany({}),
            leaderboard_1.Leaderboard.deleteMany({}),
            workout_1.Workout.deleteMany({})
        ]);
        const users = await user_1.User.insertMany([
            { name: 'Ava Chen', email: 'ava@example.com', role: 'captain', fitnessGoal: 'Run a marathon' },
            { name: 'Noah Patel', email: 'noah@example.com', role: 'member', fitnessGoal: 'Increase strength' },
            { name: 'Mia Alvarez', email: 'mia@example.com', role: 'member', fitnessGoal: 'Improve mobility' }
        ]);
        const teams = await team_1.Team.insertMany([
            { name: 'Trailblazers', sport: 'running', members: users.slice(0, 2).map((user) => user._id.toString()), captain: users[0]._id.toString() },
            { name: 'Powerhouse', sport: 'cross-training', members: [users[2]._id.toString()], captain: users[2]._id.toString() }
        ]);
        await activity_1.Activity.insertMany([
            { type: 'run', durationMinutes: 32, caloriesBurned: 280, userId: users[0]._id.toString(), date: new Date('2026-07-10') },
            { type: 'strength', durationMinutes: 45, caloriesBurned: 320, userId: users[1]._id.toString(), date: new Date('2026-07-11') },
            { type: 'yoga', durationMinutes: 25, caloriesBurned: 160, userId: users[2]._id.toString(), date: new Date('2026-07-12') }
        ]);
        await leaderboard_1.Leaderboard.insertMany([
            { userId: users[0]._id.toString(), name: 'Ava Chen', points: 1320, streak: 5 },
            { userId: users[1]._id.toString(), name: 'Noah Patel', points: 1180, streak: 3 },
            { userId: users[2]._id.toString(), name: 'Mia Alvarez', points: 980, streak: 4 }
        ]);
        await workout_1.Workout.insertMany([
            { title: 'Morning Mobility Flow', focus: 'mobility', durationMinutes: 20, difficulty: 'easy' },
            { title: 'Tempo Run Intervals', focus: 'endurance', durationMinutes: 35, difficulty: 'moderate' },
            { title: 'Full Body Strength', focus: 'strength', durationMinutes: 50, difficulty: 'hard' }
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
