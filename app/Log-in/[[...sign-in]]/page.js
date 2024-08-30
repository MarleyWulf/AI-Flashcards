import { Box, Typography, Container } from "@mui/material";
import { SignIn } from "@clerk/nextjs";
// import ToolBar from "../components/ToolBar";
import ToolBar from "../../../components/ToolBar";

export default function Login() {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <ToolBar loginLink="/Log-in" signUpLink="/Sign-up" />
      <Container
        sx={{
          height: "100vh", // Full viewport height
          display: "flex", // Use flexbox for centering
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
        }}
      >
        <SignIn />
      </Container>
    </Box>
  );
}
