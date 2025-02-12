"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Box,
  Typography,
  Modal,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Header from "@/components/Header";
import { useTheme } from "@mui/material/styles";

interface Task {
  tid: number;
  task_title: string;
  task_description: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  category: string;
  priority: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function Tasks() {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
      setLoading(false);
    };

    fetchTasks();
  }, []);

  const handleOpenModal = (task: Task) => {
    setSelectedTask(task);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTask(null);
  };

  return (
    <div>
      <Header NavMOde="home" />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          Task List
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer
            component={Paper}
            sx={{ boxShadow: 2, borderRadius: 2 }}
          >
            <Table
              sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                "& th": {
                  backgroundColor:
                    theme.palette.mode === "light" ? "#F0F0F0" : "#333333",
                  color: theme.palette.text.primary,
                },
                "& td": {
                  color: theme.palette.text.primary,
                },
              }}
            >
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Start Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>End Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Priority</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.tid} hover>
                    <TableCell>{task.tid}</TableCell>
                    <TableCell>{task.task_title}</TableCell>
                    <TableCell>{task.start_date}</TableCell>
                    <TableCell>{task.end_date}</TableCell>
                    <TableCell>{task.status}</TableCell>
                    <TableCell>{task.priority}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => alert(`Edit ${task.tid}`)}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => alert(`Delete ${task.tid}`)}
                      >
                        <DeleteIcon />
                      </IconButton>

                      <IconButton
                        color="info"
                        size="small"
                        onClick={() => handleOpenModal(task)}
                      >
                        <InfoIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Modal for More Info */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {selectedTask && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Task Details
                </Typography>
                <IconButton onClick={handleCloseModal}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Typography>
                <strong>ID:</strong> {selectedTask.tid}
              </Typography>
              <Typography>
                <strong>Title:</strong> {selectedTask.task_title}
              </Typography>
              <Typography>
                <strong>Description:</strong> {selectedTask.task_description}
              </Typography>
              <Typography>
                <strong>Category:</strong> {selectedTask.category}
              </Typography>
              <Typography>
                <strong>Priority:</strong> {selectedTask.priority}
              </Typography>
              <Typography>
                <strong>Status:</strong> {selectedTask.status}
              </Typography>
              <Typography>
                <strong>Start Date:</strong> {selectedTask.start_date} at{" "}
                {selectedTask.start_time}
              </Typography>
              <Typography>
                <strong>End Date:</strong> {selectedTask.end_date} at{" "}
                {selectedTask.end_time}
              </Typography>
              <Typography>
                <strong>Created At:</strong> {selectedTask.created_at}
              </Typography>
              <Typography>
                <strong>Updated At:</strong> {selectedTask.updated_at}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
