import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(getApiUrl('activities/'));
        if (!response.ok) throw new Error('Unable to load activities');
        const payload = await response.json();
        setItems(Array.isArray(payload) ? payload : payload.data || payload.results || []);
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  return (
    <div>
      <h2 className="h4 mb-3">Activities</h2>
      {loading && <p>Loading activities…</p>}
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {items.map((activity) => (
          <li className="list-group-item" key={activity._id || activity.id || activity.type}>
            <strong>{activity.type}</strong> — {activity.durationMinutes || activity.duration || 0} min
            <div className="text-muted small">Calories: {activity.caloriesBurned || activity.calories || 0}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Activities;
