
import { useState, useEffect } from 'react';

interface DialupSoundProps {
  play: boolean;
  onComplete: () => void;
}

// Simple component to play dial up connection sound
const DialupSound: React.FC<DialupSoundProps> = ({ play, onComplete }) => {
  const [audio] = useState(() => {
    if (typeof window !== 'undefined') {
      const sound = new Audio('/dial-up.mp3');
      sound.addEventListener('ended', onComplete);
      return sound;
    }
    return null;
  });

  useEffect(() => {
    if (play && audio) {
      audio.currentTime = 0;
      audio.volume = 0.3;
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented, we'll need user interaction
          console.log('Audio playback was prevented');
        });
      }
    } else if (!play && audio) {
      audio.pause();
    }
    
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [play, audio]);

  return null;
};

export default DialupSound;
