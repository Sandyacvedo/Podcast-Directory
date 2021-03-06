import React, {useEffect} from "react";
import { Typography, Paper, Container, Grid, Button } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { getpodcastLink } from "../../../feactures/podcast/podcastDashboardSlice";

const DetailPodcast = () => {
  const dispatch = useDispatch();
  const { podcastSelected } = useSelector((state) => state.podcastDashboard);

  
  useEffect(() => {
    dispatch(getpodcastLink(podcastSelected.itunesId))
  }, [podcastSelected])

  console.log('podcast -->', podcastSelected);
  return (
    <Paper
      sx={{
        borderRadius: "0",
        display: "flex",
        flexDirection: "column",
        pt:'4vh',
        pb: '25%',
      }}
    >
      <Container fixed>
        <Grid
          container
          justifyContent="center"
          spacing={{ xs: 1, md: 2, lg: 10 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid
            item
            container
            xs={12}
            md={8}
            lg={7}
            order={{ xs: 2, sm: 2, md: 1 }}
          >
            <Grid item container xs={12}>
              <Typography variant="h4" sx={{ mb: "1rem" }}>
                {podcastSelected?.title}
              </Typography>
            </Grid>
            {Object.values(podcastSelected?.categories).map((item) => (
              <Grid
                key={item}
                item
                xs={3.5}
                sx={{ mb: "1rem", overflow: "hidden" }}
              >
                <Paper
                  variant="outlined"
                  sx={{
                    height: "2rem",
                    pt: ".5rem",
                    textAlign: "center",
                    mr: ".5rem",
                    borderRadius: "10px",
                  }}
                >
                  <Typography variant="h7">{item}</Typography>
                </Paper>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Typography variant="text">
                {podcastSelected?.description}
              </Typography>
            </Grid>
            {/* Meta Data */}
            <Grid item container xs={12} sx={{ mb: "1rem", mt: "1rem" }}>
              <Grid item xs={2.5}>
                <Typography variant="h7">Author</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="span">
                  {podcastSelected?.author}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container xs={12} sx={{ mb: "1rem" }}>
              <Grid item xs={2.5}>
                <Typography variant="h7">Trend Score</Typography>
              </Grid>
              <Grid item xs={2.5}>
                <Typography variant="span">
                  ??? {podcastSelected?.trendScore}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={2.5}>
                <Typography variant="h7">Language</Typography>
              </Grid>
              <Grid item xs={2.5}>
                <Typography variant="span">
                  {podcastSelected?.language.toUpperCase()}
                </Typography>
              </Grid>
            </Grid>
            <Grid sx={{ mt: "2rem" }}>
              <a
                href={podcastSelected?.url}
                target="_blank"
                style={{ color: "inherit", textDecoration: "inherit", marginRight: '1rem'}}
              >
                <Button variant="contained">Listen Podcast</Button>
              </a>
            </Grid>
          </Grid>
          <Grid
            item
            xs={3}
            sm={3}
            md={4}
            lg={7}
            order={{ xs: 1, sm: 1, md: 2 }}
          >
            <img
              src={podcastSelected?.image}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "5px",
              }}
              alt="podcast image"
            />
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default DetailPodcast;
