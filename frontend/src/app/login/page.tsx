// src/app/login/page.tsx
'use client';

import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Grid } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login } from '../../apiHandler/index';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      console.log('Login response:', response.data);
      if(response.status){

        router.push('/create'); // Redirect to the create page after successful login
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid login credentials');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, p: 3, border: '1px solid', borderColor: 'grey.300', borderRadius: 2 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}>
            <Link href="/signup" passHref>
              <Button variant="contained" fullWidth>
                Sign Up
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
          Login
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
