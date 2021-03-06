import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://youtube.com/playlist?list=PLf7vZ02bgXGWPYTDBP8Bd8C1rLqj0BRV3">
          Curso Básico MERN
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }