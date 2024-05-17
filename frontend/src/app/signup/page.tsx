// src/app/signup/page.tsx
'use client'

import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Grid } from '@mui/material';
import Link from 'next/link';
import { signup } from '../../apiHandler/index';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 const [error, setError] = useState('');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await signup({ email, password });
      if(response.status){
        alert(response.data.message)
      }
      console.log('Signup response:', response.data);
    } catch (error:any) {
      setError('Signup');
      console.error('Signup error:', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, p: 3, border: '1px solid', borderColor: 'grey.300', borderRadius: 2 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}>
            <Link href="/login" passHref>
              <Button variant="contained" fullWidth>
                Login
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Link href="/create" passHref>
              <Button variant="contained" color="primary" fullWidth>
                New
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Link href="/" passHref>
              <Button variant="contained" color="primary" fullWidth>
                HOME
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignupPage;
