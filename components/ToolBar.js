import React from "react";
import { Box, AppBar, Typography, Stack, Toolbar, Button } from "@mui/material";
import Link from "next/link";
import SignUp from "@/app/Sign-up/[[...sign-up]]/page";
import Login from "@/app/Log-in/[[...sign-in]]/page";

export default function ToolBar({ loginLink, signUpLink }) {
  return (
    <Stack>
      <Box>
        <AppBar position="static" sx={{ backgroundColor: "black" }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography>
              <Link href="/" style={{ textDecoration: "none" }}>
                Flashcards AI
              </Link>
            </Typography>
            <Box sx={{ ml: "auto" }}>
              <Button>
                <Link
                  href={loginLink}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Login
                </Link>
              </Button>
              <Button>
                <Link
                  href={signUpLink}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Sign Up
                </Link>
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </Stack>
  );
}
