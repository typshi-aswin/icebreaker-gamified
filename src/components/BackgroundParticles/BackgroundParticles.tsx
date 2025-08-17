import React, { useMemo } from "react";
import "./BackgroundParticles.css";

type Particle = {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
};

interface Props {
  count?: number;
}

const BackgroundParticles: React.FC<Props> = ({ count = 30 }) => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2, // 2px - 6px
      left: Math.random() * 100, // percentage position
      duration: Math.random() * 6 + 6, // 6s - 12s
      delay: Math.random() * 5, // stagger start
    }));
  }, [count]);

  return (
    <div className="particles-container">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundParticles;
