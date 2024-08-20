import Image from "next/image";
import {
  Box,
  AppBar,
  Typography,
  Stack,
  Toolbar,
  IconButton,
  MenuIcon,
  Search,
} from "@mui/material";

export default function Home() {
  return (
    <Box>
      <Stack>
        <Box>
          <AppBar position="static">
            <Toolbar>
              <Typography>Flashcards AI</Typography>
            </Toolbar>
          </AppBar>
        </Box>
      </Stack>
      <Stack sx={{ alignItems: "center" }}>
        <Typography variant="h2">Welcome To FlashCards AI</Typography>{" "}
        {/*placeholder name*/}
        <Stack direction="row" spacing={2}>
          <Typography>Tier 1</Typography>
          <Typography>Tier 2</Typography>
          <Typography>Tier 3</Typography>
        </Stack>
        <Stack>
          <Typography>Other Information</Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
