
import React, { useState, useEffect } from 'react';

interface ConnectingAnimationProps {
  onComplete?: () => void;
  duration?: number;
}

const ConnectingAnimation: React.FC<ConnectingAnimationProps> = ({ 
  onComplete, 
  duration = 5000 
}) => {
  const [progress, setProgress] = useState(0);
  const [connectionSteps, setConnectionSteps] = useState<string[]>([]);
  
  const steps = [
    "Dialing...",
    "Connecting to server...",
    "Handshaking...",
    "Negotiating protocol...",
    "Authenticating...",
    "Establishing secure connection...",
    "Connected!"
  ];
  
  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedTime = now - startTime;
      const newProgress = Math.min(100, (elapsedTime / duration) * 100);
      
      setProgress(newProgress);
      
      const stepsToShow = Math.floor((steps.length * newProgress) / 100);
      setConnectionSteps(steps.slice(0, stepsToShow + 1));
      
      if (now >= endTime) {
        clearInterval(interval);
        if (onComplete) {
          setTimeout(onComplete, 500);
        }
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [duration, onComplete]);
  
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-black text-green-500 p-4 font-mono text-sm">
      <div className="mb-4">
        <div className="animate-connecting">Connecting to Dial-Up Messenger</div>
      </div>
      
      <div className="w-64 h-4 bg-gray-900 border border-green-500 mb-6">
        <div 
          className="h-full bg-green-500 transition-all duration-300 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="text-left w-64 h-64 overflow-y-auto bg-black border border-green-500 p-2">
        {connectionSteps.map((step, index) => (
          <div key={index} className="mb-2">
            {index === connectionSteps.length - 1 && index < steps.length - 1 ? (
              <span className="animate-connecting">{step}</span>
            ) : (
              step
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectingAnimation;
