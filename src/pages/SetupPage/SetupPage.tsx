import React, { useState } from 'react';
import { Task, Player, Group } from '../../App';
import './SetupPage.css';
import BackgroundParticles from '../../components/BackgroundParticles/BackgroundParticles';
import Footer from '../../components/Footer/Footer';

interface SetupPageProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  groups: Group[];
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
  onStartGame: () => void;
}

const SetupPage: React.FC<SetupPageProps> = ({
  tasks,
  setTasks,
  players,
  setPlayers,
  groups,
  setGroups,
  onStartGame
}) => {
  const [taskName, setTaskName] = useState('');
  const [taskPoints, setTaskPoints] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [groupSize, setGroupSize] = useState('');

  const addTask = () => {
    if (taskName.trim() && taskPoints.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        name: taskName.trim(),
        points: parseInt(taskPoints)
      };
      setTasks([...tasks, newTask]);
      setTaskName('');
      setTaskPoints('');
    }
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const addPlayer = () => {
    if (playerName.trim()) {
      const newPlayer: Player = {
        id: Date.now().toString(),
        name: playerName.trim()
      };
      setPlayers([...players, newPlayer]);
      setPlayerName('');
    }
  };

  const deletePlayer = (playerId: string) => {
    setPlayers(players.filter(player => player.id !== playerId));
  };

  const generateGroups = () => {
    const size = parseInt(groupSize);
    if (size > 0 && players.length >= size) {
      const shuffled = [...players].sort(() => Math.random() - 0.5);
      const newGroups: Group[] = [];
      
      for (let i = 0; i < shuffled.length; i += size) {
        const groupPlayers = shuffled.slice(i, i + size);
        if (groupPlayers.length > 0) {
          newGroups.push({
            id: Date.now().toString() + i,
            name: `Team ${newGroups.length + 1}`,
            players: groupPlayers,
            completedTasks: [],
            score: 0
          });
        }
      }
      
      setGroups(newGroups);
    }
  };

  const canStartGame = tasks.length > 0 && groups.length > 0;

  return (
    <div className="setup-page">
      <BackgroundParticles count={50} />
      <div className="container">
        <h1 className="setup-title">Welcome to Setup</h1>
        
        <div className="setup-grid">
          {/* Add Tasks Section */}
          <div className="card fade-in">
            <h2 className="section-title">Add Tasks</h2>
            <div className="task-form">
              <div className="form-row">
                <input
                  type="text"
                  className="input"
                  placeholder="Task Name"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
                <input
                  type="number"
                  className="input points-input"
                  placeholder="Points"
                  value={taskPoints}
                  onChange={(e) => setTaskPoints(e.target.value)}
                />
                <button className="btn btn-primary" onClick={addTask}>
                  Add Task
                </button>
              </div>
            </div>
            
            <div className="tasks-list">
              {tasks.map(task => (
                <div key={task.id} className="task-item">
                  <span className="task-name">{task.name}</span>
                  <span className="task-points">{task.points} pts</span>
                  <button 
                    className="btn-delete"
                    onClick={() => deleteTask(task.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add Players Section */}
          <div className="card fade-in">
            <h2 className="section-title">Add Players</h2>
            <div className="player-form">
              <div className="form-row">
                <input
                  type="text"
                  className="input"
                  placeholder="Player Name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                />
                <button className="btn btn-primary" onClick={addPlayer}>
                  Add Player
                </button>
              </div>
            </div>
            
            <div className="players-list">
              {players.map(player => (
                <div key={player.id} className="player-tag">
                  <span>{player.name}</span>
                  <button 
                    className="btn-delete"
                    onClick={() => deletePlayer(player.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Form Groups Section */}
          <div className="card fade-in">
            <h2 className="section-title">Form Groups</h2>
            <div className="group-form">
              <div className="form-row">
                <input
                  type="number"
                  className="input"
                  placeholder="Group Size"
                  value={groupSize}
                  onChange={(e) => setGroupSize(e.target.value)}
                />
                <button 
                  className="btn btn-primary" 
                  onClick={generateGroups}
                  disabled={players.length === 0}
                >
                  Generate Groups
                </button>
              </div>
            </div>
            
            <div className="groups-grid">
              {groups.map(group => (
                <div key={group.id} className="group-card">
                  <h3 className="group-name">{group.name}</h3>
                  <div className="group-players">
                    {group.players.map(player => (
                      <span key={player.id} className="group-player">
                        {player.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Start Game Button */}
        <div className="start-game-section">
          <button 
            className={`btn btn-start ${canStartGame ? 'btn-primary pulse-glow' : 'btn-disabled'}`}
            onClick={onStartGame}
            disabled={!canStartGame}
          >
            Assign Tasks & Start Game
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SetupPage;