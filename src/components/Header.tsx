"use client";
import { useLoginStore } from "@/app/store";
import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Image from "next/image";

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

export default function Header() {
  const isLogged = useLoginStore((state) => state.isLoggedin);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: "#FFFFFF",
          color: "#212529",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar>
          {/* Conditional rendering of Menu Icon */}
          {isLogged && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

         <Image src="/logo.png" alt="Logo" width={50} height={50} style={({cursor:"auto" , marginRight:"15px" , borderRadius:"50%"})}/>
          {/* Brand Name */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: "bold",
              letterSpacing: 3.5,
              display: { xs: "none", sm: "block" },
            }}
          >
            TaskSync
          </Typography>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* User Dropdown Menu */}
          {isLogged && (
            
          <Box>
          {/* Search Bar */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
          </Search>

          {/* Theme Toggle Icon */}
          <IconButton size="large" color="inherit" sx={{ ml: 2 }}>
            <Brightness4Icon />
          </IconButton>

          {/* Notification Icon */}
          <IconButton size="large" color="inherit" sx={{ ml: 2 }}>
            <NotificationsNoneIcon />
          </IconButton>
          </Box>

      )}

          {/* Buttons */}
          <Box sx={{ ml: 2, display: "flex", gap: 1 }}>
            <Button
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}
