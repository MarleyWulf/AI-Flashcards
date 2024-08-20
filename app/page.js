"use client";
import Image from "next/image";
import {
  Container,
  Typography,
  Box,
  Stack,
  TextField,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import Button from "@mui/joy/Button";
import { useState } from "react";
export default function Home() {
  const flashcard = [
    {
      front: "What is the capital of France?",
      back: "Paris",
    },
    {
      front: "What is 2 + 2?",
      back: "4",
    },
    {
      front: "Who wrote 'To Kill a Mockingbird'?",
      back: "Harper Lee",
    },
    {
      front: "What is the chemical symbol for gold?",
      back: "Au",
    },
    {
      front: "Which planet is known as the Red Planet?",
      back: "Mars",
    },
    {
      front: "What is the largest ocean on Earth?",
      back: "Pacific Ocean",
    },
    {
      front: "In what year did the Titanic sink?",
      back: "1912",
    },
    {
      front: "Who painted the Mona Lisa?",
      back: "Leonardo da Vinci",
    },
    {
      front: "What is the hardest natural substance on Earth?",
      back: "Diamond",
    },
    {
      front: "What is the smallest prime number?",
      back: "2",
    },
  ];
  const [text, setText] = useState("");
  const [isFront, setIsFront]=useState(true)
  const handleInputChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = () => {};
  return (
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
        />
        <Button
          cariant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          {" "}
          Submit
        </Button>
      </Box>
      <Box sx={{ mt: 4 , alignSelf: "center"}}>
        {/** use grid, set each box with a value of 3, use space evenly? */}
        <Typography sx = {{marginBottom:"20px"}}> Flashcards Preview</Typography>
        <Grid container spacing={2}>
          { flashcard.map((flashcard, index) => (
            <Card sx= {{
              width: 200,
               height: 200,
               mb: 2,
               mr:2
               }} onClick={() => setIsFront(!isFront)}>
              <CardContent>
                <Typography variant="h6">Front:</Typography>
                <Typography>{flashcard.front}</Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Back:
                </Typography>
                <Typography>{flashcard.back}</Typography>
              </CardContent>
            </Card>
          ))
          }
        </Grid>
      </Box>
    </Container>
  );
}
