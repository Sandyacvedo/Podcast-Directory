import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';

import { ThemeProvider } from "@mui/material";
import { darkMode, lightMode } from "./ui/styles/styles";

import PrimarySearchAppBar from "./ui/components/NavBar/NavBar";
import Home from "./ui/screens/Home/Home";
import DetailPodcast from './ui/screens/DetailPodcast/DetailPodcast'
import Search from './ui/screens/Search/Search'
function App() {

  const { darkTheme } = useSelector((state) => state.theme);

  return (
    <ThemeProvider theme={darkTheme ? darkMode : lightMode}>
      <Router>
        <Routes>
          <Route
            element={
              <>
                <PrimarySearchAppBar />
                {/* <Outlet /> */}
              </>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/:podcast" element={<DetailPodcast />} />
            <Route path="/search/:search" element={<Search />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
