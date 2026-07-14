import express from 'express';
import './config/database';
import { Activity } from './models/activity';
import { Leaderboard } from './models/leaderboard';
import { Team } from './models/team';
import { User } from './models/user';
import { Workout } from './models/workout';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker API is running', baseUrl });
});

app.get('/api/users/', async (_req, res) => {
  try {
    const users = await User.find({}).lean();
    res.json({ baseUrl, data: users });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load users', details: error });
  }
});

app.get('/api/teams/', async (_req, res) => {
  try {
    const teams = await Team.find({}).lean();
    res.json({ baseUrl, data: teams });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load teams', details: error });
  }
});

app.get('/api/activities/', async (_req, res) => {
  try {
    const activities = await Activity.find({}).lean();
    res.json({ baseUrl, data: activities });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load activities', details: error });
  }
});

app.get('/api/leaderboard/', async (_req, res) => {
  try {
    const leaderboard = await Leaderboard.find({}).lean();
    res.json({ baseUrl, data: leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load leaderboard', details: error });
  }
});

app.get('/api/workouts/', async (_req, res) => {
  try {
    const workouts = await Workout.find({}).lean();
    res.json({ baseUrl, data: workouts });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load workouts', details: error });
  }
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`OctoFit Tracker backend listening on port ${port}`);
  });
}

export default app;
