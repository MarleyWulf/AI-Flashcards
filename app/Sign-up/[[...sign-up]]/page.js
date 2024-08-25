import { ClerkProvider } from "@clerk/nextjs";
import { Box, Typography, Container } from "@mui/material";
import { SignUp as ClerkSignUp } from "@clerk/nextjs";

export default function SignUp() {
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
        <ClerkSignUp />
      </Box>
    </Container>
  );
}
