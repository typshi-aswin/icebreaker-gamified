import React from 'react';
import { Task, Group } from '../../App';
import './GamePage.css';

interface GamePageProps {
  tasks: Task[];
  groups: Group[];
  updateGroupScore: (groupId: string, taskId: string, completed: boolean) => void;
  onViewLeaderboard: () => void;
  onBackToSetup: () => void;
  onResetGame: () => void;
}

const GamePage: React.FC<GamePageProps> = ({
  tasks,
  groups,
  updateGroupScore,
  onViewLeaderboard,
  onBackToSetup,
  onResetGame
}) => {
  const sortedGroups = [...groups].sort((a, b) => b.score - a.score);

  const handleTaskToggle = (groupId: string, taskId: string, completed: boolean) => {
    updateGroupScore(groupId, taskId, completed);
  };

  return (
    <div className="game-page">
      <div className="container">
        <div className="game-header">
          <h1 className="game-title">Icebreaker Dashboard</h1>
          <div className="game-controls">
            <button className="btn btn-secondary" onClick={onBackToSetup}>
              Back to Setup
            </button>
            <button className="btn btn-danger" onClick={onResetGame}>
              Reset Game
            </button>
            <button className="btn btn-primary" onClick={onViewLeaderboard}>
              View Leaderboard
            </button>
          </div>
        </div>

        <div className="game-content">
          <div className="teams-grid">
            {groups.map(group => (
              <div key={group.id} className="team-card fade-in">
                <div className="team-header">
                  <h2 className="team-name">{group.name}</h2>
                  <div className="team-score">{group.score} pts</div>
                </div>
                
                <div className="team-players">
                  {group.players.map(player => (
                    <span key={player.id} className="player-name">
                      {player.name}
                    </span>
                  ))}
                </div>

                <div className="tasks-section">
                  <h3 className="tasks-title">Tasks</h3>
                  <div className="tasks-list">
                    {tasks.map(task => (
                      <div key={task.id} className="task-row">
                        <label className="task-checkbox">
                          <input
                            type="checkbox"
                            checked={group.completedTasks.includes(task.id)}
                            onChange={(e) => handleTaskToggle(group.id, task.id, e.target.checked)}
                          />
                          <span className="checkmark"></span>
                        </label>
                        <span className={`task-text ${group.completedTasks.includes(task.id) ? 'completed' : ''}`}>
                          {task.name}
                        </span>
                        <span className="task-points-display">
                          {task.points} pts
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="leaderboard-sidebar">
            <div className="sidebar-card">
              <h2 className="sidebar-title">Leaderboard</h2>
              <div className="leaderboard-list">
                {sortedGroups.map((group, index) => (
                  <div 
                    key={group.id} 
                    className={`leaderboard-item ${index === 0 ? 'top-team' : ''}`}
                  >
                    <div className="rank">#{index + 1}</div>
                    <div className="team-info">
                      <div className="team-name-small">{group.name}</div>
                      <div className="team-score-small">{group.score} pts</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;