import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Leaderboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`);
        if (!response.ok) throw new Error('Unable to load leaderboard');
        const payload = await response.json();
        setItems(Array.isArray(payload) ? payload : payload.data || payload.results || []);
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <div>
      <h2 className="h4 mb-3">Leaderboard</h2>
      {loading && <p>Loading leaderboard…</p>}
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {items.map((entry) => (
          <li className="list-group-item" key={entry._id || entry.userId || entry.name}>
            <strong>{entry.name}</strong> — {entry.points || 0} pts
            <div className="text-muted small">Streak: {entry.streak || 0}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
