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
import ToolBar from "@/components/ToolBar";
import { useClerk } from "@clerk/nextjs";
import getStripe from "@/utils/get-stripe";

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
  const { signOut } = useClerk();

  //handlesubmit for stripe checkout
  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_session", {
      method: "POST",
      headers: "http://localhost:3000",
    });

    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionID: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  //Testing out the onclick function in the object
  let pricinginfo = [
    { title: "Free", buttonText: "Try Here" },
    { title: "Pro", buttonText: "Buy Now", onClick: handleSubmit },
  ];

  return (
    <Box width="100vw" height="100vh" sx={{ backgroundColor: "#4c516d" }}>
      <ToolBar loginLink={"/Log-in"} signUpLink={"/Sign-up"} />
      <Stack sx={{ alignItems: "center", mt: "20px" }}>
        <Typography variant="h2">Welcome To FlashCards AI</Typography>
        <Typography variant="h5">A better way to use flashcards</Typography>

        <Button variant="outlined" sx={{ mt: "10px", textDecoration: "none" }}>
          <Link
            href="/Generate"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Generate
          </Link>
        </Button>

        <Stack direction="row" spacing={2} sx={{ mt: "40px" }}>
          {cardsinfo.map((card, index) => (
            <Cards key={index} title={card.title} mainText={card.mainText} />
          ))}
        </Stack>
        <Stack sx={{ alignItems: "center", mt: "50px" }}>
          <Typography variant="h4">Pricing</Typography>
          <Stack
            direction="row"
            spacing={3}
            sx={{ alignItems: "center", mt: "20px" }}
          >
            {pricinginfo.map((price, index) => (
              <Cards
                key={index}
                title={price.title}
                buttonText={price.buttonText}
                onClick={price.onClick}
              />
            ))}
          </Stack>
          <Button
            variant="outline"
            onClick={() => signOut({ redirectUrl: "/" })}
          >
            Sign Out
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
