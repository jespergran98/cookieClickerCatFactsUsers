import { useState } from 'react'
import { mockData } from '../../data/userData'
import './UserList.css'

const UserList = () => {
  const [users, setUsers] = useState(mockData)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  const handleAddUser = () => {
    if (username.trim() && email.trim()) {
      setUsers([...users, { username, email }])
      setUsername('')
      setEmail('')
    }
  }

  return (
    <div className="user-list-card">
      <h2 className="user-list-title">User Directory</h2>
      
      <div className="add-user-form">
        <input
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="user-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="user-input"
        />
        <button 
          onClick={handleAddUser}
          className="add-button"
          disabled={!username.trim() || !email.trim()}
        >
          Add User
        </button>
      </div>

      <div className="users-container">
        {users.map((user, index) => (
          <div key={index} className="user-item">
            <div className="user-avatar">{user.username.charAt(0).toUpperCase()}</div>
            <div className="user-info">
              <p className="user-name">{user.username}</p>
              <p className="user-email">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserList