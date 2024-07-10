"use client";
import React from "react";
import { Box, TextField } from "@mui/material";
import { Colors } from "styles/theme/color";
import { Image, Menu } from "components/elements";
import { Bell, ChevronDown, Search } from "lucide-react";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import axios from "axios";

const StyledTextField = styled(TextField)`
  width: 100%;
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: transparent;
    }
    &:hover fieldset {
      border-color: transparent;
    }
    &.Mui-focused fieldset {
      border-color: transparent;
    }
  }
`;

const Header = () => {
  const router = useRouter();

  const handleLogOut = async () => {
    const response = await axios.post(
      "/api/auth/logout",
      {},
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 200) router.push("/login");
  };

  const itemList = [
    { id: 1, label: "Profile", handleClick: () => {} },
    { id: 2, label: "Setting", handleClick: () => {} },
    {
      id: 3,
      label: "Logout",
      handleClick: handleLogOut,
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-between",
        padding: "5px 16px",
        borderRadius: "11px",
      }}
    >
      <Box display="flex" alignItems="center" width="40%">
        <Search size={24} />
        <StyledTextField name="search" placeholder="Search" />
      </Box>
      <Box display="flex" sx={{ gap: "15px", alignItems: "center" }}>
        <Box position="relative">
          <Box
            position="absolute"
            top={0}
            right={0}
            sx={{
              height: "7px",
              width: "7px",
              borderRadius: "7px",
              backgroundColor: Colors.red100,
            }}
          />
          <Bell size={24} />
        </Box>
        <Box position="relative" display="flex" alignItems="center">
          <Image
            alt="profile"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            width="37px"
            height="37px"
            border={`1px solid ${Colors.lightGrey}`}
            borderRadius="37px"
            objectFit="cover"
            overflow="hidden"
          />
          <Box
            display="flex"
            gap="16px"
            marginLeft="2px"
            sx={{ cursor: "pointer" }}
          >
            <Menu
              menuItems={itemList}
              width="180px"
              buttonBase={<ChevronDown size={19} />}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
