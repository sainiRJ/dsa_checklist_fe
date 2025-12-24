import { useState, useEffect } from 'react';
import { topicsAPI } from '../services/api';
import './Topics.css';

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    try {
      const response = await topicsAPI.getAll();
      if (response.data.length === 0) {
        await initializeTopics();
      } else {
        setTopics(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading topics:', error);
      setLoading(false);
    }
  };

  const initializeTopics = async () => {
    const defaultTopics = [
      {
        name: 'Algorithms',
        status: 'Pending',
        subtopics: [
          { name: 'Sorting Algorithms', leetcodeLink: 'https://leetcode.com', youtubeLink: 'https://youtube.com', articleLink: 'https://example.com', level: 'EASY', status: 'Done', completed: true },
          { name: 'Searching Algorithms', leetcodeLink: 'https://leetcode.com', youtubeLink: 'https://youtube.com', articleLink: 'https://example.com', level: 'EASY', status: 'Pending', completed: false },
          { name: 'Dynamic Programming', leetcodeLink: 'https://leetcode.com', youtubeLink: 'https://youtube.com', articleLink: 'https://example.com', level: 'MEDIUM', status: 'Pending', completed: false },
          { name: 'Greedy Algorithms', leetcodeLink: 'https://leetcode.com', youtubeLink: 'https://youtube.com', articleLink: 'https://example.com', level: 'MEDIUM', status: 'Pending', completed: false },
          { name: 'Divide and Conquer', leetcodeLink: 'https://leetcode.com', youtubeLink: 'https://youtube.com', articleLink: 'https://example.com', level: 'MEDIUM', status: 'Done', completed: true },
          { name: 'Backtracking', leetcodeLink: 'https://leetcode.com', youtubeLink: 'https://youtube.com', articleLink: 'https://example.com', level: 'HARD', status: 'Pending', completed: false }
        ]
      },
      { name: 'Data Structures', status: 'Pending', subtopics: [] },
      { name: 'Databases', status: 'Pending', subtopics: [] },
      { name: 'Machine Learning', status: 'Pending', subtopics: [] },
      { name: 'Operating Systems', status: 'Pending', subtopics: [] },
      { name: 'Networks', status: 'Pending', subtopics: [] }
    ];

    try {
      const promises = defaultTopics.map(topic => topicsAPI.create(topic));
      const results = await Promise.all(promises);
      setTopics(results.map(r => r.data));
    } catch (error) {
      console.error('Error initializing topics:', error);
    }
  };

  const toggleExpand = (topicId) => {
    setExpanded(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const handleCheckboxChange = async (topicId, subtopicId, completed) => {
    try {
      await topicsAPI.updateSubtopic(topicId, subtopicId, { completed });
      loadTopics();
    } catch (error) {
      console.error('Error updating subtopic:', error);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="topics-container">
      <h1>Topics</h1>
      <p className="subtitle">Explore these exciting topics!</p>
      
      {topics.map(topic => (
        <div key={topic._id} className="topic-card">
          <div className="topic-header" onClick={() => toggleExpand(topic._id)}>
            <span className="topic-name">{topic.name}</span>
            <div className="topic-header-right">
              <span className={`status-badge ${topic.status.toLowerCase()}`}>
                {topic.status}
              </span>
              <span className="expand-icon">
                {expanded[topic._id] ? '▲' : '▼'}
              </span>
            </div>
          </div>
          
          {expanded[topic._id] && topic.subtopics && topic.subtopics.length > 0 && (
            <div className="subtopics-table">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>LeetCode Link</th>
                    <th>YouTube Link</th>
                    <th>Article Link</th>
                    <th>Level</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {topic.subtopics.map(subtopic => (
                    <tr key={subtopic._id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={subtopic.completed || false}
                          onChange={(e) => handleCheckboxChange(topic._id, subtopic._id, e.target.checked)}
                        />
                      </td>
                      <td>{subtopic.name}</td>
                      <td>
                        <a href={subtopic.leetcodeLink} target="_blank" rel="noopener noreferrer">
                          Practise
                        </a>
                      </td>
                      <td>
                        <a href={subtopic.youtubeLink} target="_blank" rel="noopener noreferrer">
                          Watch
                        </a>
                      </td>
                      <td>
                        <a href={subtopic.articleLink} target="_blank" rel="noopener noreferrer">
                          Read
                        </a>
                      </td>
                      <td>
                        <span className={`level-badge ${subtopic.level.toLowerCase()}`}>
                          {subtopic.level}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${subtopic.status.toLowerCase()}`}>
                          {subtopic.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Topics;

