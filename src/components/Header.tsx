"use client";
import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { useThemeStore } from "@/app/store";



const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginLeft: theme.spacing(2),
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

type Mode = {
  NavMOde: string;
};

export default function Header(props: Mode) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };
  const { toggleTheme } = useThemeStore();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          marginBottom:"500px",
          bgcolor: theme.palette.background.default, // Use theme color
          color: theme.palette.text.primary, // Adapt text color
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          borderBottom: `1px solid ${theme.palette.divider}`, // Light/dark mode border
        }}
      >
        <Toolbar>
          {props.NavMOde === "home" && (
            <IconButton
              size="large"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Image
            onClick={() => (window.location.href = "/")}
            src="/logo.png"
            alt="Logo"
            width={50}
            height={50}
            style={{
              cursor: "pointer",
              marginRight: "15px",
              borderRadius: "50%",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            }}
          />

          <Typography
            onClick={() => (window.location.href = "/")}
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: "bold",
              letterSpacing: 3.5,
              display: { xs: "none", sm: "block" },
              cursor: "pointer",
              textDecoration: "none",
              "&:hover": {
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            TaskSync
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {props.NavMOde === "home" && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
               
              <IconButton
                onClick={toggleTheme}
                size="large"
                color="inherit"
                sx={{ ml: 2 }}
              >
                <Brightness4Icon />
              </IconButton>
               
              <IconButton size="large" color="inherit" sx={{ ml: 2 }}>
                <NotificationsNoneIcon />
              </IconButton>
            </Box>
          )}

          {props.NavMOde === "landing" && (
            <Box sx={{ ml: 2, display: "flex", gap: 1 }}>
              <Button
                onClick={() => (window.location.href = "/login")}
                variant="contained"
                sx={{
                  bgcolor: "#007BFF",
                  color: "#FFFFFF",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "#0056b3",
                  },
                }}
              >
                Sign In
              </Button>
              <Button
                onClick={() => (window.location.href = "/register")}
                variant="outlined"
                sx={{
                  borderColor: "#6c757d",
                  color: "#6c757d",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    borderColor: "#5a6268",
                    color: "#5a6268",
                  },
                }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Side Navigation Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 250,
            backgroundColor: theme.palette.background.paper, // Dynamically update background
            color: theme.palette.text.primary, // Update text color
            boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
          {/* Close Button */}
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{ alignSelf: "flex-end", m: 1 }}
          >
            <CloseIcon />
          </IconButton>

          <List sx={{ flexGrow: 1 }}>
            <ListItem
              onClick={() => (window.location.href = "/tasks")}
              sx={{
                padding: "12px 16px",
                cursor: "pointer",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
              }}
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Task Management" />
            </ListItem>

            <ListItem
              onClick={() => (window.location.href = "/profile")}
              sx={{
                padding: "12px 16px",
                cursor: "pointer",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
              }}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>

            <Divider />

            <ListItem
              onClick={() => alert("Logging out...")}
              sx={{
                padding: "12px 16px",
                cursor: "pointer",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
