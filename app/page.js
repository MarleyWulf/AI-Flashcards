"use client";
// import Image from "next/image";
import Link from "next/link";
import {
  Box,
  AppBar,
  Typography,
  Stack,
  Toolbar,
  IconButton,
  MenuIcon,
  Search,
  Button,
} from "@mui/material";
import Cards from "../components/cards";

let cardsinfo = [{ title: "hi" }, { title: "hello" }, { title: "welcome" }];

let pricinginfo = [{ title: "Free" }, { title: "Pro" }];

export default function Home() {
  return (
    <Box>
      <Stack>
        <Box>
          <AppBar position="static" sx={{ backgroundColor: "black" }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <Typography>Flashcards AI</Typography>
              <Box sx={{ ml: "auto" }}>
                <Button>Login</Button>
                <Button>Sign Up</Button>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      </Stack>
      <Stack sx={{ alignItems: "center" }}>
        <Typography variant="h2">Welcome To FlashCards AI</Typography>

        <Stack direction="row" spacing={2}>
          {cardsinfo.map((card, index) => (
            <Cards key={index} title={card.title} />
          ))}
        </Stack>
        <Stack>
          <Stack spacing={3} sx={{ alignItems: "center" }}>
            <Typography>Pricing</Typography>
            {pricinginfo.map((price, index) => (
              <Cards key={index} title={price.title} />
            ))}
          </Stack>
          <Typography>
            <Link href="/Generate">Generate</Link>
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
