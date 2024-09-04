"use client";
import React from "react";
import { Box, AppBar, Typography, Stack, Toolbar, Button } from "@mui/material";
import Link from "next/link";
import { useUser, SignOutButton } from "@clerk/nextjs"; // Assuming you're using Clerk for authentication
// import SignUp from "@/app/Sign-up/[[...sign-up]]/page";
// import Login from "@/app/Log-in/[[...sign-in]]/page";

export default function ToolBar({ loginLink, signUpLink }) {
  const { user } = useUser();

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
              {user ? (
                <>
                  <Button>
                    <Link
                      href="/Generate"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Generate
                    </Link>
                  </Button>
                  <Button>
                    <Link
                      href="/flashcards"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Flashcards
                    </Link>
                  </Button>
                  <SignOutButton>
                    <Button sx={{ color: "inherit", textDecoration: "none" }}>
                      Sign Out
                    </Button>
                  </SignOutButton>
                </>
              ) : (
                <>
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
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </Stack>
  );
}
