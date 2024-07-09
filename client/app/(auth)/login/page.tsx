"use client";
import { Box, Typography } from "@mui/material";
import { Button, TextField } from "components/elements";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Colors } from "styles/theme/color";

const LoginPage = () => {
  const router = useRouter();

  // Handle submit login form
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <Box maxWidth="40%" margin="auto" padding="74px 0px">
      <Box
        textAlign="center"
        sx={{ cursor: "pointer" }}
        onClick={() => router.push("/")}
      >
        <Box position="relative" sx={{ height: "164px", width: "100%" }}>
          <Image
            layout="fill"
            src="/transparent.png"
            alt="logo-wellness"
            objectFit="contain"
          />
        </Box>
      </Box>
      <Box
        padding="48px 74px"
        borderRadius="40px"
        sx={{
          backgroundColor: Colors.white,
          boxShadow: Colors.shadowDark,
        }}
      >
        <Typography
          variant="h3"
          fontSize="28px"
          fontWeight={700}
          marginBottom="24px"
        >
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            width="100%"
            placeholder="aldo.marcelino@mailinator.com"
          />
          <Box marginTop="24px">
            <TextField label="Password" width="100%" placeholder="••••" />
          </Box>

          <Typography
            variant="h3"
            fontSize="16px"
            color={Colors.blue100}
            textAlign="center"
            marginTop="24px"
            marginBottom="36px"
          >
            Forgot Password
          </Typography>

          <Box display="flex" justifyContent="center">
            <Button
              label="Login"
              buttonType="primary"
              padding="15px 132px"
              submit
            />
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
