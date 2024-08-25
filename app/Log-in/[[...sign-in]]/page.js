import { Box, Typography, Container } from "@mui/material";
import { SignIn } from "@clerk/nextjs";

export default function Login() {
  return (
    <Container
      sx={{
        height: "100vh", // Full viewport height
        display: "flex", // Use flexbox for centering
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
      }}
    >
      <Box>
        <SignIn />
      </Box>
    </Container>
  );
}
