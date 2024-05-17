'use client'
import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Button, Grid, Box } from '@mui/material';
import Link from 'next/link';
import { getAllPosts } from '../apiHandler/index';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
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
          <Link href="/create" passHref>
            <Button variant="contained" color="primary" fullWidth>
              Create Post
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Typography variant="h3" component="h1" gutterBottom>
        All Blog Posts
      </Typography>
      {posts.length === 0 ? (
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              No posts yet
            </Typography>
          </CardContent>
        </Card>
      ) : (
        posts.map((post:any) => (
          <Card key={post.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {post.title}
              </Typography>
              <Typography variant="body2" component="p">
                {post.content}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default HomePage;
