import React, { useEffect } from "react";
import { Container, Paper, Grid } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { getPodcastList } from "../../../feactures/podcast/podcastDashboardSlice";
import { getPodcastCategory } from "../../../feactures/podcastCategory/podcastCategorySlice";

import Slider from "../../components/Slider/Slider";
import Loading from "../../components/Loading/Loading";
import Category from "../../components/Category/Category";

const podcastCategoryName = ["Stories", "Animation", "Entertainment"]

const Home = () => {
  const dispatch = useDispatch();
  
  const { loading } = useSelector(
    (state) => state.podcastDashboard
  );
 
  useEffect(() => {
    dispatch(getPodcastList());
    podcastCategoryName?.map(cat => {
      dispatch(getPodcastCategory(cat))
    })
  }, [podcastCategoryName]);

  if (loading) return <Loading />;
  return (
      <Paper
      sx={{
          borderRadius: "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pt:'2rem'
        }}
        >
      <Container fixed>
      <Grid container spacing={2} className='animate-animated animate__slideInUp'>
          <Grid item xs={12}>
              <Slider />
          </Grid>
          <Grid item xs={12} sx={{mb: '5rem'}}>
                <Category />
          </Grid>
      </Grid>
      </Container>
    </Paper>
  );
};

export default Home;
