import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    navigate('/login');
    return null;
  }

  // Mock data for demonstration
  const profileData = {
    ...user,
    email: user.email || 'student@example.com',
    phone: '+91 98765 43210',
    dateOfBirth: '15/08/2005',
    address: 'Mumbai, Maharashtra',
    targetExam: 'JEE Main 2026',
    enrollmentDate: '01/01/2026',
    totalTests: 45,
    completedTests: 32,
    averageScore: 78.5,
    bestScore: 95,
    totalStudyHours: 156,
    rank: 234,
    badges: ['🏆 100 Tests Completed', '⭐ Top Performer', '🎯 Perfect Score', '📚 Study Streak']
  };

  return (
    <div className="profile-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h2>🎓 JEE Mock Test</h2>
          </div>
          <div className="nav-links">
            <button onClick={() => navigate('/')} className="btn btn-outline">
              Home
            </button>
            <button onClick={() => navigate('/tests')} className="btn btn-primary">
              My Tests
            </button>
            {user.isAdmin && (
              <button onClick={() => navigate('/admin')} className="btn btn-secondary">
                Admin Panel
              </button>
            )}
            <button onClick={logout} className="btn btn-outline">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Profile Content */}
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="profile-info">
            <h1>{user.name}</h1>
            <p className="profile-email">{profileData.email}</p>
            <p className="profile-status">
              {user.isAdmin ? '👑 Admin' : '👨‍🎓 Student'}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="profile-stats">
          <div className="stat-box">
            <div className="stat-icon">📝</div>
            <div className="stat-value">{profileData.completedTests}</div>
            <div className="stat-label">Tests Completed</div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">📊</div>
            <div className="stat-value">{profileData.averageScore}%</div>
            <div className="stat-label">Average Score</div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">🏆</div>
            <div className="stat-value">{profileData.bestScore}%</div>
            <div className="stat-label">Best Score</div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">⏱️</div>
            <div className="stat-value">{profileData.totalStudyHours}h</div>
            <div className="stat-label">Study Hours</div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="profile-sections">
          <div className="profile-section">
            <h2>📋 Personal Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Full Name:</span>
                <span className="info-value">{user.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{profileData.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Phone:</span>
                <span className="info-value">{profileData.phone}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Date of Birth:</span>
                <span className="info-value">{profileData.dateOfBirth}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Address:</span>
                <span className="info-value">{profileData.address}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Enrollment Date:</span>
                <span className="info-value">{profileData.enrollmentDate}</span>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>🎯 Exam Details</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Target Exam:</span>
                <span className="info-value">{profileData.targetExam}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Total Tests Available:</span>
                <span className="info-value">{profileData.totalTests}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Tests Completed:</span>
                <span className="info-value">{profileData.completedTests}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Current Rank:</span>
                <span className="info-value">#{profileData.rank}</span>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>🏅 Achievements & Badges</h2>
            <div className="badges-container">
              {profileData.badges.map((badge, index) => (
                <div key={index} className="badge-item">
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="profile-actions">
          <button className="btn btn-primary" onClick={() => alert('Edit profile feature coming soon!')}>
            ✏️ Edit Profile
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/tests')}>
            📝 Take a Test
          </button>
          <button className="btn btn-outline" onClick={() => alert('Settings feature coming soon!')}>
            ⚙️ Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
