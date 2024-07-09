"use client";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { Button, TextField } from "components/elements";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Colors } from "styles/theme/color";
import { getLocalStorage, setLocalStorage } from "utils/local-storage";

const LoginPage = () => {
  const router = useRouter();
  const acessToken = getLocalStorage("access_token");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const endpoint =
        `${process.env.NEXT_PUBLIC_RESTURL_API_SERVER}/auth/login` || "";
      const response = await axios.post(endpoint, form, {
        withCredentials: true,
      });
      if (response.status) {
        setLocalStorage("access_token", response.data.token);
        setLocalStorage("user_role", response.data.role);

        router.push("/");
      }

      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      setError(e.response && e.response.data && e.response.data.message);
    }
  };

  useEffect(() => {
    if (acessToken) router.push("/");
  }, []);

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
            value={form.email}
            name="email"
            label="Email"
            type="email"
            handleChange={handleChange}
            placeholder="aldo.marcelino@mailinator.com"
            width="100%"
          />
          <Box marginTop="24px">
            <TextField
              value={form.password}
              name="password"
              label="Password"
              type={showPass ? "text" : "password"}
              placeholder="••••"
              width="100%"
              handleChange={handleChange}
              endAdornment={
                <Box
                  sx={{ margin: "0px 12px", cursor: "pointer" }}
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <Eye /> : <EyeOff />}
                </Box>
              }
            />
          </Box>

          <Typography
            variant="h3"
            fontSize="16px"
            color={Colors.blue100}
            textAlign="center"
            marginTop="24px"
            marginBottom="32px"
          >
            Forgot Password
          </Typography>

          <Box display="flex" flexDirection="column" justifyContent="center">
            <Typography
              variant="body2"
              color={Colors.red100}
              marginBottom="8px"
              textAlign="center"
            >
              {error}
            </Typography>
            <Button
              label={loading ? "Loading..." : "Login"}
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
