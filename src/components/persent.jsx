import React from 'react';
import '../styles/persent.css';

const Percent = ({ tasks }) => {
  const calculateCompletion = () => {
    if (tasks.length === 0) {
      return 0;
    }

    const completedTasks = tasks.filter((task) => task.completed);
    const completionPercentage = (completedTasks.length / tasks.length) * 100;
    return Math.round(completionPercentage);
  };

  const completionLevel = calculateCompletion();

  const getProgressText = () => {
    if (completionLevel === 0) {
      return '0% - Not started';
    } else if (completionLevel >= 1 && completionLevel <= 24) {
      return `${completionLevel}% - Keep going, you're on your way!`;
    } else if (completionLevel === 25) {
      return '25% - You\'ve started, well done!';
    } else if (completionLevel >= 26 && completionLevel <= 49) {
      return `${completionLevel}% - Making progress, keep pushing!`;
    } else if (completionLevel === 50) {
      return '50% - Halfway there, great work!';
    } else if (completionLevel >= 51 && completionLevel <= 74) {
      return `${completionLevel}% - You're getting closer, keep it up!`;
    } else if (completionLevel === 75) {
      return '75% - You\'re almost there, don’t give up now!';
    } else if (completionLevel >= 76 && completionLevel <= 99) {
      return `${completionLevel}% - Almost done, keep pushing through!`;
    } else if (completionLevel === 100) {
      return '100% - Congratulations, you did it! Well done!';
    }
  };

  return (
    <div>
        <div className='rangeLevel'>
        <input
        type="range"
        id="completionLevel"
        min="0"
        max="100"
        step="1"
        value={completionLevel}
        readOnly
        />
        </div>
        <div className='textLevel'>
                <span id="progressText">{getProgressText()}</span>
        </div>
    </div>
);
};

export default Percent;


















