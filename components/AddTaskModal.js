"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import {
  TextField,
  createTheme,
  ThemeProvider,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button as MUIButton,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import dayjs from "dayjs";
import CalendarView from "@/components/CalendarView";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1f1f1f",
    },
    primary: {
      main: "#ff8800",
    },
    text: {
      primary: "#ffffff",
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export default function AddTaskModal({ userId, onTaskCreated }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [dueTime, setDueTime] = useState(null);
  const [repeat, setRepeat] = useState("none");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddTask = async () => {
    if (!title || !dueDate || !dueTime) return;
    setLoading(true);

    const fullDateTime = dayjs(dueDate)
      .hour(dueTime.hour())
      .minute(dueTime.minute())
      .toISOString();

    const newTask = {
      title,
      dueDate: fullDateTime,
      userId,
      createdAt: new Date(),
      repeat,
    };

    const taskRef = collection(db, "users", userId, "tasks");
    const docRef = await addDoc(taskRef, newTask);
    onTaskCreated((prev) => [...prev, { id: docRef.id, ...newTask }]);

    setTitle("");
    setDueDate(null);
    setDueTime(null);
    setRepeat("none");
    setPreviewOpen(false);
    setLoading(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="bg-[#181818] p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-white">New Task</h2>
          <input
            className="w-full p-2 rounded text-white bg-[#1f1f1f] mb-3 border border-gray-600"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Box className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-4">
            <DatePicker
              label="Due Date"
              value={dueDate}
              onChange={(newValue) => setDueDate(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  sx={{
                    input: { color: "#fff" },
                    label: { color: "#fff" },
                    ".MuiOutlinedInput-root": {
                      backgroundColor: "#1f1f1f",
                      borderRadius: "8px",
                      color: "#fff",
                    },
                  }}
                />
              )}
            />

            <TimePicker
              label="Due Time"
              value={dueTime}
              onChange={(newValue) => setDueTime(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  sx={{
                    input: { color: "#fff" },
                    label: { color: "#fff" },
                    ".MuiOutlinedInput-root": {
                      backgroundColor: "#1f1f1f",
                      borderRadius: "8px",
                      color: "#fff",
                    },
                  }}
                />
              )}
            />

            <FormControl fullWidth>
              <InputLabel id="repeat-label" sx={{ color: "#fff" }}>
                Repeat
              </InputLabel>
              <Select
                labelId="repeat-label"
                value={repeat}
                onChange={(e) => setRepeat(e.target.value)}
                sx={{
                  color: "#fff",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ff8800",
                  },
                }}
              >
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="custom">Custom</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <button
            onClick={() => setPreviewOpen(true)}
            disabled={loading || !title || !dueDate || !dueTime}
            className="flex justify-center items-center gap-2 px-4 py-2 mt-4 bg-orange-400 rounded-full text-white hover:bg-orange-500 transition relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              className={`svg-icon ${loading ? "animate-spin" : ""}`}
            >
              <g strokeWidth={2} strokeLinecap="round" stroke="#fff">
                <rect y={5} x={4} width={16} rx={2} height={16} className="bg-orange-400" />
                <path d="m8 3v4" />
                <path d="m16 3v4" />
                <path d="m4 11h16" />
              </g>
            </svg>
            <span className="text-sm font-medium">
              {loading ? "Adding..." : "Preview Task"}
            </span>
          </button>

          <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)}>
            <DialogTitle>Task Preview</DialogTitle>
            <DialogContent>
              <p><strong>Title:</strong> {title}</p>
              <p><strong>Due:</strong> {dayjs(dueDate).format("MMM D, YYYY")} at {dayjs(dueTime).format("h:mm A")}</p>
              <p><strong>Repeat:</strong> {repeat}</p>
              {dueDate && dueTime && (
                <div className="mt-4">
                  <CalendarView
                    tasks={[
                    {
                      title,
                      dueDate: dayjs(dueDate)
                      .hour(dueTime.hour())
                      .minute(dueTime.minute())
                      .toISOString(),
                      id: "preview",
                    },
                    ]}
                  />
                </div>
              )}

            </DialogContent>
            <DialogActions>
              <MUIButton onClick={() => setPreviewOpen(false)} color="secondary">
                Cancel
              </MUIButton>
              <MUIButton onClick={handleAddTask} disabled={loading} color="primary">
                {loading ? "Saving..." : "Add Task"}
              </MUIButton>
            </DialogActions>
          </Dialog>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
