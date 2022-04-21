import React from 'react'

import { Paper, Container, Grid, Backdrop, CircularProgress} from '@mui/material'
const Loading = () => {
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
        <Grid container spacing={2}>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Grid>
      </Container>
    </Paper>
  );
}

export default Loading