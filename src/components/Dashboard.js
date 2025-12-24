import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Dashboard</h1>
        </div>
        <nav className="header-nav">
          <button onClick={() => navigate('/dashboard/profile')}>Profile</button>
          <button onClick={() => navigate('/dashboard/topics')}>Topics</button>
          <button onClick={() => navigate('/dashboard/progress')}>Progress</button>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;

