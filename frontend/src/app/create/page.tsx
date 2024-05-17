// src/app/dashboard/page.tsx
'use client'

import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Grid, Alert } from '@mui/material';
import Link from 'next/link';
import { postArticle } from '../../apiHandler/index';
import { useRouter } from 'next/navigation';

const DashboardPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
   const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      let token:any = JSON.parse(localStorage.getItem("token")||"test");
      console.log(token);
      const response = await postArticle({ title, content },token.token);
      console.log('Post response:', response.data);
      if(response.status){

        router.push('/');
      }
    } catch (error) {
      setError('Please login again');
      console.error('Post error:', error);
    }
  };

  return (
    <Container maxWidth="md">
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
            <Link href="/signup" passHref>
              <Button variant="contained" fullWidth>
                Sign Up
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
          Create Post
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="content"
            label="Content"
            name="content"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
            Post
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default DashboardPage;
