"use client";
import {
  Box,
  Typography,
  Button,
  Container,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogTextField,
  DialogActions,
} from "@mui/material";

import { useState, useEffect } from "react";
import ToolBar from "@/components/ToolBar.js";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {db} from '@/firebase'
import {doc,collection, setDoc, getDoc, writeBatch } from 'firebase/firestore'

export default function GenerateFlashcards() {
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [name, setName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter()
  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;

    const response = await fetch("/api/flashcard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    setFlashcards(data.flashcards);
  };

  const handleClick = (id) =>
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

  const handleOpen = () => {
    setDialogOpen(true);
  };
  const handleClose = () => {
    setDialogOpen(false);
  };

  const saveFlashcards = async () => {
    if (!name) {
      alert("Please enter a name");
      return;
    }
    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, "users"), user.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      if (collections.find((f) => f.name === name)) {
        alert("Flashcard collection with the same name already exists");
        return;
      } else {
        collections.push({ name });
        batch.set(userDocRef, { flashcards: collections }, { merge: true });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }

    const colRef = collection(userDocRef, name);
    
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, flashcard);
    });

    await batch.commit();
    handleClose();
    router.push("/flashcards");
  };
  useEffect(() => {
    if (Array.isArray(flashcards) && flashcards.length > 0) {
      // Check if isFront has already been initialized
      const isFrontInitialized = flashcards.some((flashcard) =>
        flashcard.hasOwnProperty("isFront")
      );
  
      if (!isFrontInitialized) {
        setFlashcards((prevFlashcards) =>
          prevFlashcards.map((flashcard) => ({
            ...flashcard,
            isFront: true,
          }))
        );
      }
    }
  }, [flashcards]);
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
              {Array.isArray(flashcards) && flashcards.length > 0 ? (
                <>
                  {flashcards.map((flashcard, index) => (
                    <Grid item xs={3} key={index}>
                      <Card sx={{ width: 250, height: 250, mb: 2 }}>
                        <CardActionArea onClick={() => handleClick(index)}>
                          <CardContent>
                            <Box
                              sx={{
                                perspective: "1000px",
                                "& > div": {
                                  transition: "transform 0.6s",
                                  transformStyle: "preserve-3d",
                                  position: "relative",
                                  width: "100%",
                                  height: "220px",
                                  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                                  transform: flipped[index]
                                    ? "rotateY(180deg)"
                                    : "rotateY(00deg)",
                                },
                                "& > div > div": {
                                  position: "absolute",
                                  width: "100%",
                                  height: "100%",
                                  backfaceVisibility: "hidden",
                                  display: "flex",
                                  alignItems: "center",
                                  padding: 2,
                                  boxSizing: "border-box",
                                },
                                "& > div > div:nth-of-type(2)": {
                                  transform: "rotateY(180deg)",
                                },
                              }}
                            >
                              <div>
                                <div>
                                  <Typography variant="h6" component="div">
                                    {flashcard.front}
                                  </Typography>
                                </div>
                                <div>
                                  <Typography variant="h6" component="div">
                                    {flashcard.back}
                                  </Typography>
                                </div>
                              </div>
                            </Box>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                  <Grid container justifyContent="center" sx={{ mt: 1 }}>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      display="flex"
                      justifyContent="center"
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleOpen}
                        fullWidth
                      >
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <Typography>No flashcards generated yet.</Typography>
              )}
            </Grid>
          </Box>
        </Box>
      </Container>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle> Save Flashcards</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your flashcard collection
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Collection Name"
            type="text"
            fullWidth
            value={name}
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveFlashcards}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
