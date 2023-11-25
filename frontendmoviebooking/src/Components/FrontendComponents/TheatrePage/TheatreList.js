import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Button, Divider } from '@mui/material';

const TheatreList = () => {
  const { movieDetailId } = useParams();
  const [theatreList, setTheatreList] = useState([]);


  const navigate=useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/admin/shows/${movieDetailId}`);
        const todayShows = filterShowsByDate(response.data, new Date());
        const groupedShows = groupShowsByTheatre(todayShows);
        setTheatreList(groupedShows);
        console.log('Fetched Theatre List:', groupedShows);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [movieDetailId]);

  const filterShowsByDate = (shows, currentDate) => {
    return shows.filter((show) => {
      const showDate = new Date(show.showDate);
      return showDate.toDateString() === currentDate.toDateString();
    });
  };

  const groupShowsByTheatre = (shows) => {
    const groupedShows = shows.reduce((grouped, show) => {
      let theatreId = null;

      if (show.theatreId) {
        theatreId = show.theatreId.theatreId;
      }

      if (!grouped[theatreId]) {
        grouped[theatreId] = {
          theatreId,
          theatreName: show.theatreId ? show.theatreId.theatreName : null,
          shows: [],
        };
      }

      grouped[theatreId].shows.push(show);

      return grouped;
    }, {});

    return Object.values(groupedShows);
  };

  const handleShowClick = (showId) => {
    // Add your logic for handling the show click
    console.log(`Show ${showId} clicked`);
    navigate(`/seatBook/${showId}`)
  };

  return (
    <Grid container spacing={2}>
      {theatreList.map((theatre) => (
        <Grid item xs={12} key={theatre.theatreId}>
          <Card sx={{ backgroundColor: '#f4f4f4', padding: '20px' }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom sx={{ color: '#212121' }}>
                {theatre.theatreName}
              </Typography>
              <Divider />
              <Grid container spacing={2}>
                {theatre.shows.map((show) => (
                  <Grid item xs={2} key={show.showId}>
                    <Card sx={{ backgroundColor: '#fff', padding: '10px' }}>
                      <CardContent>
                        <Typography variant="h6" component="div" gutterBottom sx={{ color: '#212121' }}>
                          {show.showDate}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          Start Time: {show.showStartTiming}
                        </Typography>
                        <Button variant="contained" sx={{ backgroundColor: '#f44336', color: '#fff', width: '100%', marginTop: '10px' }} onClick={() => handleShowClick(show.showId)}>
                          Book Now
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TheatreList;
