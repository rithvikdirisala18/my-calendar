"use client";

import * as React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Box } from "@mui/material";

// Custom dark theme for MUI
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1f1f1f",
    },
    primary: {
      main: "#ff8800", // your orange
    },
    text: {
      primary: "#fff",
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default function CalendarView() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box className="mt-10 mx-auto w-fit">
          <DateCalendar />
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
