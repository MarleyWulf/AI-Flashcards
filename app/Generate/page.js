"use client";
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
  Container,
  TextField,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

import { useState } from "react";
import flashcard from "../data.js";
import Link from "next/link.js";
import { LinkedCamera } from "@mui/icons-material";
import ToolBar from "@/components/ToolBar.js";

let cardsinfo = [{ title: "hi" }, { title: "hello" }, { title: "welcome" }];

let pricinginfo = [{ title: "Free" }, { title: "Pro" }];

export default function Home() {
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [isFront, setIsFront] = useState(true);
  const handleInputChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = async () => {
    if (!text.trim()) return;

    try {
      const response = await fetch("api/flashcard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setText("");
      if (Array.isArray(data.reply)) {
        setFlashcards(data.reply);
        console.log(data.reply);
      } else {
        console.error("Different response format", data);
      }
    } catch (error) {
      console.error("error fetching flashcards", error);
    }
  };
  return (
    <Box>
      <ToolBar loginLink={"/Log-in"} signUpLink={"/Sign-up"} />
      <Container>
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ justifySelf: "center" }}
            variant="h3"
            component="h1"
            gutterBottom
          >
            Generate Flashcards
          </Typography>

          <TextField
            value={text}
            placeholder="Enter a topic"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 2 }}
            onChange={handleInputChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSubmit();
                setText("");
              }
            }}
          />
          <Button
            cariant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            {" "}
            Render Flashcards
          </Button>
        </Box>
        <Box
          sx={{
            mt: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/** use grid, set each box with a value of 3, use space evenly? */}
          <Typography sx={{ marginBottom: "20px" }}>
            {" "}
            Flashcards Preview
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Grid container spacing={2} justifyContent="center">
              {flashcard.map((flashcard, index) => (
                <Grid item xs={3} key={index}>
                  <Card sx={{ width: 200, height: 200, mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6">Front:</Typography>
                      <Typography>{flashcard.front}</Typography>
                      <Typography variant="h6" sx={{ mt: 2 }}>
                        Back:
                      </Typography>
                      <Typography>{flashcard.back}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
