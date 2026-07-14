"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/database");
const activity_1 = require("./models/activity");
const leaderboard_1 = require("./models/leaderboard");
const team_1 = require("./models/team");
const user_1 = require("./models/user");
const workout_1 = require("./models/workout");
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'OctoFit Tracker API is running', baseUrl });
});
app.get('/api/users/', async (_req, res) => {
    try {
        const users = await user_1.User.find({}).lean();
        res.json({ baseUrl, data: users });
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to load users', details: error });
    }
});
app.get('/api/teams/', async (_req, res) => {
    try {
        const teams = await team_1.Team.find({}).lean();
        res.json({ baseUrl, data: teams });
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to load teams', details: error });
    }
});
app.get('/api/activities/', async (_req, res) => {
    try {
        const activities = await activity_1.Activity.find({}).lean();
        res.json({ baseUrl, data: activities });
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to load activities', details: error });
    }
});
app.get('/api/leaderboard/', async (_req, res) => {
    try {
        const leaderboard = await leaderboard_1.Leaderboard.find({}).lean();
        res.json({ baseUrl, data: leaderboard });
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to load leaderboard', details: error });
    }
});
app.get('/api/workouts/', async (_req, res) => {
    try {
        const workouts = await workout_1.Workout.find({}).lean();
        res.json({ baseUrl, data: workouts });
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to load workouts', details: error });
    }
});
if (require.main === module) {
    app.listen(port, () => {
        console.log(`OctoFit Tracker backend listening on port ${port}`);
    });
}
exports.default = app;
