import React, {useEffect, useState} from 'react'
import Header from '../header/Header';

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showRoleDropdown, setShowRoleDropdown] = useState(false);

    // Función para obtener los usuarios desde el backend
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const updateUserRole = async (userId, newRole) => {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}/role`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ role: newRole }),
        });
        if (response.ok) {
          fetchUsers(); // Refresh the users list
        } else {
          console.error('Failed to update user role');
        }
      } catch (error) {
        console.error('Error updating user role:', error);
      }
    };
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    return (
      <>
      <Header />
      <div className="p-6 bg-white shadow rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">User List</h3>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">Add User</button>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 text-left">Name</th>
              <th className="py-2 text-left">Email</th>
              <th className="py-2 text-left">Role</th>
              <th className="py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.UsersID} className="border-t">
                <td className="py-2">{user.name}</td>
                <td className="py-2">{user.mail}</td>
                <td className="py-2">{user.role}</td>
                <td className="py-2">
                  <div className="flex justify-end items-center gap-2">
                    <div className="relative">
                      <button
                        className="bg-transparent border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white rounded-full p-2"
                        onClick={() => {
                          setSelectedUser(user.UsersID);
                          setShowRoleDropdown(!showRoleDropdown);
                        }}
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-7 7-7-7" />
                        </svg>
                      </button>
                      {showRoleDropdown && selectedUser === user.UsersID && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-20">
                          <ul>
                            <li
                              className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                              onClick={() => updateUserRole(user.UsersID, 'admin')}
                            >
                              Admin
                            </li>
                            <li
                              className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                              onClick={() => updateUserRole(user.UsersID, 'user')}
                            >
                              User
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                    <button className="bg-transparent border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white rounded-full p-2">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="bg-transparent border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white py-2 px-4 rounded">
              Export
            </button>
          </div>
        </div>
      </div>
      </>
    );
}
