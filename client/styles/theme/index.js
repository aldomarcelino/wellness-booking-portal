import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      mobile2: 376,
      mobile3: 426,
      tablet: 600,
      laptop: 960,
      laptop2: 1280,
      desktop: 1440,
    },
  },
});

export default theme;
