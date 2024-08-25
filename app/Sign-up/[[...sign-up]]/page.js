import { ClerkProvider } from "@clerk/nextjs";
import { Box, Typography, Container } from "@mui/material";
import { SignUp as ClerkSignUp } from "@clerk/nextjs";
import ToolBar from "@/components/ToolBar";

export default function SignUp() {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <ToolBar loginLink="/Log-in" signUpLink="/Sign-Up" />
      <Container
        sx={{
          height: "100vh", // Full viewport height
          display: "flex", // Use flexbox for centering
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
        }}
      >
        <ClerkSignUp />
      </Container>
    </Box>
  );
}
