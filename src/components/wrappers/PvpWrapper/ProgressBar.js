import { useEffect } from 'react';
import { ProgressBarContainer, ProgressBarFill } from './Pvp.style';
import { useState } from 'react';

export const ProgressBar = ({ duration, isFight }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isFight) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prevProgress + 100 / duration;
        });
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [duration, isFight]);

  return (
    <ProgressBarContainer isVisible={isFight}>
      <ProgressBarFill style={{ width: `${progress}%` }} />
    </ProgressBarContainer>
  );
};
