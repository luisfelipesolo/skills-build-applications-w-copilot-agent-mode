import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { getApiBaseUrl } from './utils/api';

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <p className="text-uppercase fw-semibold text-primary">OctoFit Tracker</p>
              <h1 className="display-5 fw-bold mb-3">Modern fitness tracking for teams</h1>
              <p className="lead text-muted mb-4">
                Explore users, teams, activities, leaderboard entries, and workouts through a multi-tier app experience.
              </p>
              <p className="text-muted small mb-4">
                Configure <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to use Codespaces URLs. If it is unset, the app falls back to localhost.
              </p>
              <div className="d-flex flex-wrap gap-2 mb-4">
                <Link className="btn btn-primary" to="/users">Users</Link>
                <Link className="btn btn-outline-secondary" to="/teams">Teams</Link>
                <Link className="btn btn-outline-secondary" to="/activities">Activities</Link>
                <Link className="btn btn-outline-secondary" to="/leaderboard">Leaderboard</Link>
                <Link className="btn btn-outline-secondary" to="/workouts">Workouts</Link>
              </div>
              <div className="alert alert-info">
                API base: <strong>{getApiBaseUrl()}</strong>
              </div>
              <Routes>
                <Route path="/" element={<Users />} />
                <Route path="/users" element={<Users />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/workouts" element={<Workouts />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App
