import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Workouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/workouts/`);
        if (!response.ok) throw new Error('Unable to load workouts');
        const payload = await response.json();
        setItems(Array.isArray(payload) ? payload : payload.data || payload.results || []);
      } catch (err) {
        setError(err.message || 'Unable to load workouts');
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <div>
      <h2 className="h4 mb-3">Workouts</h2>
      {loading && <p>Loading workouts…</p>}
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {items.map((workout) => (
          <li className="list-group-item" key={workout._id || workout.id || workout.title}>
            <strong>{workout.title}</strong> — {workout.focus || 'fitness'}
            <div className="text-muted small">{workout.difficulty || 'moderate'} · {workout.durationMinutes || workout.duration || 0} min</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Workouts;
