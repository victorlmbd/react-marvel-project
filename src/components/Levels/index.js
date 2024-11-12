import React from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const Levels = ({quizLevel, levelNames}) => {

  return (
      <Stepper
        className="levelsContainer"
        activeStep={quizLevel}
        alternativeLabel
        style={{background: 'transparent'}}
        sx={{
          '& .MuiStepLabel-label': {
            marginTop: '8px',
            fontSize: '16px',
            color: '#a8a8a8',
          },
          '& .MuiStepLabel-label.Mui-active': {
            marginTop: '8px',
            fontSize: '16px',
            color: '#d31017',
          },
          '& .MuiStepLabel-label.Mui-completed': {
            marginTop: '8px',
            fontSize: '16px',
            color: '#a8a8a8',
          },
          '& .MuiStepIcon-root': {
            fontSize: '3rem',
            marginTop: '0',
            zIndex: 1,
          },
          '& .MuiStepConnector-line': {
            borderTop: '2px dashed #a8a8a8',
            margin: '2px',
          },
          '& .MuiStepConnector-root': {
            top: '22px',
            left: 'calc(-50% + 36px)',
            right: 'calc(50% + 36px)',
          },
          '& .Mui-active .MuiStepIcon-root': {
            color: '#d31017',
          },
          '& .Mui-completed .MuiStepIcon-root': {
            color: '#a8a8a8',
          },
        }}
        >
        {levelNames.map((level, index) => (
          <Step key={index}>
            <StepLabel>{level.toUpperCase()}</StepLabel>
          </Step>
        ))}
      </Stepper>
  )
}

export default React.memo(Levels);
