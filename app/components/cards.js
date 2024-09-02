import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

function Cards({ title, mainText, description, quote, buttonText, onClick }) {
  return (
    <Box
      sx={{
        minWidth: { xs: 200, sm: 250, md: 275 },
        maxWidth: { xs: 300, sm: 400, md: 450 },
        margin: "auto",
        // padding: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Card variant="outlined" sx={{ height: "100%" }}>
        <CardContent>
          <Typography
            sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }}
            color="text.secondary"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography variant="h6" component="div">
            {mainText}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {description}
          </Typography>
          <Typography variant="body2">{quote}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={onClick}>
            {buttonText}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

// Default export to use the component
export default Cards;
