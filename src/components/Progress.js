import { useState, useEffect } from 'react';
import { topicsAPI } from '../services/api';
import './Progress.css';

const Progress = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const response = await topicsAPI.getAll();
      setTopics(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading progress:', error);
      setLoading(false);
    }
  };

  const calculateProgress = () => {
    let total = 0;
    let completed = 0;

    topics.forEach(topic => {
      topic.subtopics?.forEach(subtopic => {
        total++;
        if (subtopic.completed) completed++;
      });
    });

    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  if (loading) return <div className="loading">Loading...</div>;

  const progress = calculateProgress();

  return (
    <div className="progress-container">
      <h1>Progress</h1>
      <div className="progress-card">
        <h2>Overall Progress</h2>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      </div>
      
      <div className="topics-progress">
        {topics.map(topic => {
          const topicTotal = topic.subtopics?.length || 0;
          const topicCompleted = topic.subtopics?.filter(s => s.completed).length || 0;
          const topicProgress = topicTotal > 0 ? Math.round((topicCompleted / topicTotal) * 100) : 0;
          
          return (
            <div key={topic._id} className="topic-progress-item">
              <div className="topic-progress-header">
                <span>{topic.name}</span>
                <span>{topicCompleted}/{topicTotal}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${topicProgress}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Progress;

