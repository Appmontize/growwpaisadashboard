import { useState, useEffect } from 'react';
import '../app/globals.css';

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/user/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      console.log('Fetched users:', data); // Check structure
      setUsers(Array.isArray(data.users) ? data.users : []); // Extract users array
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    console.log('Users state after fetch:', users); // Verify state update
  }, [users]);

  if (loading) {
    return <div className="bg-white p-8 rounded-lg shadow-md">Loading...</div>;
  }

  if (error) {
    return <div className="bg-white p-8 rounded-lg shadow-md">Error: {error}</div>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Registered Users</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coins in Wallet</th> {/* New column */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.user_id || index}>
                <td className="px-6 py-4 whitespace-nowrap">{user.user_id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.Wallet?.coins || 0}</td> {/* Display coins */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center">No users found</td> {/* Adjust colspan */}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
