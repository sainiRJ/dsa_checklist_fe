import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Topics from './components/Topics';
import Profile from './components/Profile';
import Progress from './components/Progress';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="/dashboard/topics" replace />} />
          <Route path="topics" element={<Topics />} />
          <Route path="profile" element={<Profile />} />
          <Route path="progress" element={<Progress />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

