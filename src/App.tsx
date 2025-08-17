import { useState } from 'react';
import SetupPage from './pages/SetupPage/SetupPage';
import GamePage from './pages/GamePage/GamePage';
import LeaderboardPage from './pages/LeaderboardPage/LeaderboardPage';
import BackgroundParticles from './components/BackgroundParticles/BackgroundParticles';
import './App.css';

export interface Task {
  id: string;
  name: string;
  points: number;
}

export interface Player {
  id: string;
  name: string;
}

export interface Group {
  id: string;
  name: string;
  players: Player[];
  completedTasks: string[];
  score: number;
}

type Page = 'setup' | 'game' | 'leaderboard';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('setup');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);

  const updateGroupScore = (groupId: string, taskId: string, completed: boolean) => {
    setGroups(prevGroups =>
      prevGroups.map(group => {
        if (group.id === groupId) {
          const task = tasks.find(t => t.id === taskId);
          if (!task) return group;

          let newCompletedTasks;
          let newScore;

          if (completed) {
            newCompletedTasks = [...group.completedTasks, taskId];
            newScore = group.score + task.points;
          } else {
            newCompletedTasks = group.completedTasks.filter(id => id !== taskId);
            newScore = group.score - task.points;
          }

          return {
            ...group,
            completedTasks: newCompletedTasks,
            score: newScore
          };
        }
        return group;
      })
    );
  };

  const resetGame = () => {
    setGroups(prevGroups =>
      prevGroups.map(group => ({
        ...group,
        completedTasks: [],
        score: 0
      }))
    );
  };

  const addExtraScore = (groupId: string, extrascore: number) => {
    setGroups(prevGroups => 
      prevGroups.map(group => {
      if(group.id === groupId){
        group.score = group.score + extrascore;
      }
      return group;
    })
  );
  }

  return (
    <div className="app">
      <BackgroundParticles count={40} />
      {currentPage === 'setup' && (
        <SetupPage
          tasks={tasks}
          setTasks={setTasks}
          players={players}
          setPlayers={setPlayers}
          groups={groups}
          setGroups={setGroups}
          onStartGame={() => setCurrentPage('game')}
        />
      )}

      {currentPage === 'game' && (
        <GamePage
          tasks={tasks}
          groups={groups}
          updateGroupScore={updateGroupScore}
          onViewLeaderboard={() => setCurrentPage('leaderboard')}
          onBackToSetup={() => setCurrentPage('setup')}
          onResetGame={resetGame}
          addExtraScore={addExtraScore}
        />
      )}

      {currentPage === 'leaderboard' && (
        <LeaderboardPage
          groups={groups}
          onBackToGame={() => setCurrentPage('game')}
          onBackToSetup={() => setCurrentPage('setup')}
        />
      )}
    </div>
  );
}

export default App;