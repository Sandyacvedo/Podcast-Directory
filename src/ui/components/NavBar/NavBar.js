import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from "@mui/material";
import { MaterialUISwitch } from "../../styles/styles";

import { useNavigate, Outlet, createSearchParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setPodcastSelected } from "../../../feactures/podcast/podcastDashboardSlice";
import { toggleTheme } from "../../../feactures/theme/themeSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "3rem",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {

  const dispatch = useDispatch(); // useDispatch instance
  const navigate = useNavigate(); 
  const [search, setSearch] = useState('');

  const { darkTheme } = useSelector((state) => state.theme);
  
  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  const handleClickHome = (e) => {
    e.preventDefault()

    navigate('/')
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    dispatch(setPodcastSelected(search))
    setSearch('')
    navigate(`/search/${search}`)
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="primary" position="fixed" >
        <Toolbar >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={handleClickHome}
          >
            <HomeIcon />
          </IconButton>
          <form onSubmit={handleSubmit}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </Search>
          </form>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { md: "flex" } }}>
            <MaterialUISwitch
              checked={darkTheme}
              onClick={handleToggle}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{mt: '3.5rem'}}>
        <Outlet />
      </Box>
    </Box>
  );
}
