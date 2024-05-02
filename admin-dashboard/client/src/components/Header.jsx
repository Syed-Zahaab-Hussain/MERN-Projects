import { Box, Typography, useTheme } from "@mui/material";
const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        varient="h2"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography varient="h5" color={theme.palette.secondary[300]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
