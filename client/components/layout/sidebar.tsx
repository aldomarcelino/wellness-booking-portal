"use client";
import { Box } from "@mui/material";
import Image from "next/image";
import { Colors } from "styles/theme/color";
import styled from "@emotion/styled";

const SidebarItem = styled(Box)`
  dispaly: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  justify-content: space-between;
  &:hover {
    background-color: #d8eaf5;
    color: ${Colors.darkBlue};
  }
`;

const Sidebar = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        background: Colors.white,
        boxShadow: Colors.shadowLight,
        zIndex: 10,
        padding: "16px",
        width: "256px",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", margin: "42px 0px" }}
      >
        <Box position="relative" sx={{ height: "104px", width: "100%" }}>
          <Image
            layout="fill"
            src="/logo.png"
            alt="logo-wellness"
            objectFit="cover"
          />
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column", margin: "8px 0px" }}
        >
          <SidebarItem>
            <Box
              sx={{ display: "flex", alignItems: "center", margin: "8px 0px" }}
            >
              <p style={{ fontSize: "14px", lineHeight: "20px" }}>Setting</p>
            </Box>
          </SidebarItem>
          <SidebarItem>
            <Box
              sx={{ display: "flex", alignItems: "center", margin: "8px 0px" }}
            >
              <p style={{ fontSize: "14px", lineHeight: "20px" }}>Setting</p>
            </Box>
          </SidebarItem>
          <SidebarItem>
            <Box
              sx={{ display: "flex", alignItems: "center", margin: "8px 0px" }}
            >
              <p style={{ fontSize: "14px", lineHeight: "20px" }}>Setting</p>
            </Box>
          </SidebarItem>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
