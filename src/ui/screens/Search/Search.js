import React, { useEffect } from "react";
import {
  Paper,
  Container,
  Grid,
  Typography,
  Divider,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";

import { useParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setPodcastSelected } from "../../../feactures/podcast/podcastDashboardSlice";

import Loading from "../../components/Loading/Loading";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useParams();
  const { podcastSearch, loading } = useSelector(
    (state) => state.podcastDashboard
  );

  const handleClick = (data) => {
    dispatch(setPodcastSelected(data));
    navigate(`/${encodeURI(data.title).trim()}`);
  };

  if (loading) return <Loading />;

  //mensaje no resultado
  if (podcastSearch.length === 0)
    return (
      <Paper
        sx={{
          height: "100vh",
          borderRadius: "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pt: "2rem",
        }}
      >
        <Container fixed>
          <Grid container justifyContent='center' spacing={12}>
            <Typography variant="h5">Sorry, we couldn't find any results</Typography>
          </Grid>
        </Container>
      </Paper>
    );
  return (
    <Paper
      sx={{
        borderRadius: "0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pt: "2rem",
      }}
    >
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ mt: "2rem" }}>
              {search.toUpperCase()}
            </Typography>
            <Divider sx={{ mb: "2rem" }} />
            <Grid
              container
              justifyContent={"center"}
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 2, md: 2, lg: 4, xl: 5 }}
            >
              {podcastSearch?.map((data) => {
                return (
                  <Grid item md={1} key={data.title}>
                    <Card
                      sx={{ maxWidth: 345, maxHeight: 250, overflow: "hidden" }}
                      onClick={() => handleClick(data)}
                    >
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
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default Search;
