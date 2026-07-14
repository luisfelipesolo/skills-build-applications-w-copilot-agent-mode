import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

function Users() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(getApiUrl('users/'));
        if (!response.ok) throw new Error('Unable to load users');
        const payload = await response.json();
        setItems(Array.isArray(payload) ? payload : payload.data || payload.results || []);
      } catch (err) {
        setError(err.message || 'Unable to load users');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <div>
      <h2 className="h4 mb-3">Users</h2>
      {loading && <p>Loading users…</p>}
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {items.map((user) => (
          <li className="list-group-item" key={user._id || user.id || user.email}>
            <strong>{user.name}</strong> — {user.role || 'member'}
            <div className="text-muted small">{user.email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
