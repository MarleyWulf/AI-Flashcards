"use client";
// import Image from "next/image";
import Link from "next/link";
import { Box, Typography, Stack, Button } from "@mui/material";
import Cards from "./components/cards";
import ToolBar from "../app/components/ToolBar";
import getStripe from "../utils/get-stripe";
import { useClerk } from "@clerk/nextjs";

let cardsinfo = [
  {
    title: "Study With AI",
    mainText: "Use ai to get the most out of your studies",
  },
  {
    title: "Enhance Your Studying",
    mainText: "More interactive way to use flashcards",
  },
  { title: "Get Results", mainText: "Be able to retain what you learned" },
];

export default function Home() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_session", {
      method: "POST",
      headers: { origin: "http://localhost:3000" },
    });
    console.log("the checkout", checkoutSession);
    const checkoutSessionJson = await checkoutSession.json();

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  const { signOut } = useClerk();

  //Testing out the onclick function in the object
  let pricinginfo = [
    { title: "Free", buttonText: "Try Here" },
    { title: "Pro", buttonText: "Buy Now", onClick: handleSubmit },
  ];

  return (
    <Box
      width="100vw"
      height="100vh"
      sx={{
        backgroundColor: "#4c516d",
        minHeight: "100vh", // Ensures the background covers the entire viewport
        display: "flex", // Flexbox layout to handle content flow
        flexDirection: "column", // Column layout to stack items vertically
      }}
    >
      <ToolBar loginLink={"/Log-in"} signUpLink={"/Sign-up"} />
      <Stack
        sx={{ alignItems: "center", mt: "20px", px: { xs: 2, sm: 4, md: 6 } }}
      >
        <Typography
          variant="h2"
          align="center"
          sx={{
            fontSize: {
              xs: "h4.fontSize",
              sm: "h3.fontSize",
              md: "h2.fontSize",
            },
            mb: 2,
          }}
        >
          Welcome To FlashCards AI
        </Typography>
        <Typography
          variant="h5"
          align="center"
          sx={{
            fontSize: {
              xs: "h6.fontSize",
              sm: "h5.fontSize",
              md: "h4.fontSize",
            },
            mb: 3,
          }}
        >
          A better way to use flashcards
        </Typography>

        <Button
          variant="outlined"
          sx={{
            mt: "10px",
            textDecoration: "none",
            px: 4,
            py: 1,
            fontSize: { xs: "12px", sm: "14px", md: "16px" },
          }}
        >
          <Link
            href="/Generate"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Generate
          </Link>
        </Button>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            mt: { xs: "20px", sm: "30px", md: "40px" },
            flexWrap: "wrap", // Wrap items on small screens
            justifyContent: "center",
          }}
        >
          {cardsinfo.map((card, index) => (
            <Cards key={index} title={card.title} mainText={card.mainText} />
          ))}
        </Stack>
        <Stack
          sx={{
            alignItems: "center",
            mt: { xs: "30px", sm: "40px", md: "50px" },
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontSize: {
                xs: "h5.fontSize",
                sm: "h4.fontSize",
                md: "h3.fontSize",
              },
            }}
          >
            Pricing
          </Typography>
          <Stack
            direction="row"
            spacing={3}
            sx={{
              alignItems: "center",
              mt: { xs: "10px", sm: "15px", md: "15px" },
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: { xs: "150px", sm: "200px", md: "250px" },
                height: { xs: "80px", sm: "90px", md: "100px" },
                borderRadius: "12px",
                boxShadow: 4,
                textTransform: "none",
                backgroundColor: "#1E90FF",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                "&:hover": {
                  boxShadow: 8,
                  backgroundColor: "#1C86EE",
                },
              }}
            >
              <Link
                href="/Generate"
                style={{ textDecoration: "none", color: "inherit" }}
              ></Link>
              <Typography variant="h6">Free</Typography>
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                width: { xs: "150px", sm: "200px", md: "250px" },
                height: { xs: "80px", sm: "90px", md: "100px" },
                borderRadius: "12px",
                boxShadow: 4,
                textTransform: "none",
                backgroundColor: "#000",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                "&:hover": {
                  boxShadow: 8,
                  backgroundColor: "#333",
                },
              }}
            >
              <Typography variant="h6">Pro</Typography>
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
