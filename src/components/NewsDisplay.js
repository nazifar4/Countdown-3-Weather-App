import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, CardMedia, Typography, CardActionArea, Link } from '@mui/material';

const NewsDisplay = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = 'forge-news'; 
        const url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${apiKey}`;
        const response = await axios.get(url);
        setNewsArticles(response.data.results.slice(0, 5)); // Get top 5 news stories
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <Typography>Loading news...</Typography>;
  if (!newsArticles.length) return <Typography>No news available.</Typography>;

  return (
    <Grid container spacing={2}>
      {newsArticles.map((article, index) => (
        <Grid item xs={12} md={6} key={index}>
          <Card>
            <CardActionArea component="a" href={article.url} target="_blank">
              {article.media.length > 0 && (
                <CardMedia
                  component="img"
                  height="140"
                  image={article.media[0]['media-metadata'][2].url}
                  alt={article.title}
                />
              )}
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {article.abstract}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default NewsDisplay;
