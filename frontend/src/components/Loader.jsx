import React from "react";
import { useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  const loading = useSelector((state) => state.loader.loading);

  if (!loading) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(255, 255, 255, 0)", // Soft white overlay
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        backdropFilter: "blur(8px)", // Subtle blur for clean look
      }}
    >
      <CircularProgress size={50} sx={{ color: "#d63384" }} />
    </Box>
  );
};

export default Loader;
