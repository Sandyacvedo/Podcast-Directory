import React, {useEffect, useId} from 'react'
import { Typography, Box, Divider, Grid, Card, CardMedia, CardContent, CardActionArea, Button } from '@mui/material'

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setPodcastSelected } from '../../../feactures/podcast/podcastDashboardSlice';

const Category = ( ) => {
  const id = useId();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.podcastCategory)

  const handleClick = (data) => {
    dispatch( setPodcastSelected(data) )
    navigate(`/${encodeURI(data?.title).trim()}`)
  }

  return (
    <Box>
      {categories.map(cat => {
        // console.log(cat.data);
        return (
          <Box key={cat?.name}>
            <Typography variant="h4" sx={{mt: '2rem'}}>{cat?.name}</Typography>
            <Divider sx={{mb: '2rem'}}/>
            <Grid container justifyContent={"center"} spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, md: 2, lg:4, xl:5 }}>
            {cat?.data.map(data => {
              return (
                  <Grid item md={1} key={data?.title}>
                    <Card sx={{ maxWidth: 345, maxHeight: 250, overflow: 'hidden' }} onClick={() => handleClick(data)}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={data?.image}
                          alt="podcast image"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="div">
                            {data?.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                           {data?.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
              );
            })}
            </Grid>
          </Box>
        );
      })}
    </ Box>
  )
}

export default Category