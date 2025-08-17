import React from 'react';
import { Group } from '../../App';
import './LeaderboardPage.css';

interface LeaderboardPageProps {
  groups: Group[];
  onBackToGame: () => void;
  onBackToSetup: () => void;
}

const LeaderboardPage: React.FC<LeaderboardPageProps> = ({
  groups,
  onBackToGame,
  onBackToSetup
}) => {
  const sortedGroups = [...groups].sort((a, b) => b.score - a.score);

  const getRankSuffix = (rank: number) => {
    if (rank === 1) return 'st';
    if (rank === 2) return 'nd';
    if (rank === 3) return 'rd';
    return 'th';
  };

  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '';
  };

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <h1 className="leaderboard-main-title">Icebreaker Leaderboard</h1>
          <div className="leaderboard-controls">
            <button className="btn btn-secondary" onClick={onBackToSetup}>
              Back to Setup
            </button>
            <button className="btn btn-primary" onClick={onBackToGame}>
              Back to Game
            </button>
          </div>
        </div>

        <div className="leaderboard-content">
          <div className="rankings-list">
            {sortedGroups.map((group, index) => {
              const rank = index + 1;
              const isWinner = rank === 1;
              const isTopThree = rank <= 3;
              
              return (
                <div 
                  key={group.id}
                  className={`ranking-item fade-in ${isWinner ? 'winner' : ''} ${isTopThree ? 'top-three' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="rank-section">
                    <div className="rank-number">
                      {rank}<span className="rank-suffix">{getRankSuffix(rank)}</span>
                    </div>
                    <div className="medal">{getMedalEmoji(rank)}</div>
                  </div>
                  
                  <div className="team-section">
                    <h2 className="team-name-large">{group.name}</h2>
                    <div className="team-players-list">
                      {group.players.map(player => (
                        <span key={player.id} className="player-badge">
                          {player.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="score-section">
                    <div className="final-score">{group.score}</div>
                    <div className="score-label">points</div>
                  </div>
                </div>
              );
            })}
          </div>

          {sortedGroups.length === 0 && (
            <div className="empty-state">
              <h2>No teams yet!</h2>
              <p>Go back to setup to create teams and start playing.</p>
            </div>
          )}
        </div>

        {sortedGroups.length > 0 && (
          <div className="winner-announcement">
            <div className="winner-card">
              <div className="winner-crown">👑</div>
              <h2 className="winner-text">
                Congratulations to <span className="winner-name">{sortedGroups[0].name}</span>!
              </h2>
              <p className="winner-subtitle">
                Victory with {sortedGroups[0].score} points!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;