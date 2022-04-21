import {
  Typography,
  Paper,
  Box,
  Button,
  Grid,
  Link,
  Hidden,
} from "@mui/material";
import React, { useId } from "react";
import Carousel from "nuka-carousel";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPodcastSelected } from "../../../feactures/podcast/podcastDashboardSlice";

const Slider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { feeds } = useSelector((state) => state.podcastDashboard.podcastList);

  const handleClick = (data) => {
    dispatch(setPodcastSelected(data));
    navigate(`/${encodeURI(data.title).trim()}`);
  };

  const id = useId();

  return (
    <>
      <Typography variant="h6">TRENDING PODCASTS</Typography>
      <Carousel wrapAround={true} slidesToShow={1}>
        {feeds?.map((item, index) => {
          return (
            <Box
              key={id}
              sx={{ display: "flex", justifyContent: "center", mt: "1rem" }}
            >
              <Paper
                variant="outlined"
                sx={{
                  maxHeight: "40vh",
                  maxWidth: "60vw",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  display: "flex",
                  cursor: 'pointer'
                }}
                onClick={(e) =>handleClick(item)}
              >
                <Grid container sx={{ width: "40rem", m: "1rem" }}>
                  <Grid item lg={8} sx={{ mt: "2rem" }}>
                    <Typography variant="h4">{item?.title}</Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ mt: ".5rem" }}>
                    <Typography variant="span">With {item?.author}</Typography>
                  </Grid>
                  <Grid item container xs={12} spacing={2}>
                    <Grid item md={5} lg={4}>
                      <Button
                        variant="contained"
                        sx={{ borderRadius: "2rem", mt: "1rem" }}
                      >
                        <a
                          href={item?.url}
                          target="_blank"
                          style={{
                            color: "inherit",
                            textDecoration: "inherit",
                          }}
                        >
                          Listen now
                        </a>
                      </Button>
                    </Grid>
            
                  </Grid>
                </Grid>
                <Grid item sm={6} md={6} lg={6}>
                  <img
                    src={item?.image}
                    alt="image podcast slider"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "relative",
                    }}
                  />
                </Grid>
              </Paper>
            </Box>
          );
        })}

      </Carousel>
    </>
  );
};

export default Slider;
