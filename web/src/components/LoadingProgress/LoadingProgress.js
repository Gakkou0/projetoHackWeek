import * as React from 'react';
import { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box';
import './LoadingProgress.css';

function CircularIndeterminate() {
  return (
    <Box sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: '-50px',
      marginLeft: '-50px',
    }}>
      <CircularProgress
        size={100}
        thickness={1}
        color='secondary'
      />
    </Box>
  );
}

export default function TimerProgress() {
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProgress(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (

    <div>

      <div className={'progressSmoth' }>
        <CircularIndeterminate variant="determinate" value={progress} />
      </div>
    </div>
  );
}
