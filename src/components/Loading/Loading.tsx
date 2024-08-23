"use client"
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { LoadingProps } from '@/src/types/interfaces';

const Loading: React.FC<LoadingProps> = ({ ancho }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center"  sx={{ '& > * + *': { marginLeft: 2 } }} >
      <CircularProgress color="secondary" size={ancho?ancho:'40px'}/>
    </Box>
  );
}

export default Loading;