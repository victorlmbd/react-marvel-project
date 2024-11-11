import React from 'react'

const Levels = ({quizLevel, levelNames}) => {

  const currentLevel = levelNames[quizLevel]

  return (
    <div className="levelsContainer">
      <h2 className='headingLevels'>{currentLevel}</h2>
    </div>
  )
}

export default Levels
