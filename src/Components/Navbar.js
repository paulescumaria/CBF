import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from '../media/logo.png';
import { Link } from "react-router-dom";

function Navbar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const logout = () => {
    localStorage.setItem('userEmail', "")
    localStorage.setItem('userPassword', "")
    localStorage.setItem('isAdmin', false)
    props.stateManager(false)
  }


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" className="nav">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1 }}>
            <Tooltip title="">
              <img src={logo} alt="" />
            </Tooltip>
          </Box>

          <Box sx={{display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              className="burger-menu"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" }
              }}
            >
              <Link to="/home" className="link-tag">
                <MenuItem key={0} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
              </Link>

              <Link to="/recipes" className="link-tag">  
                <MenuItem key={1} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Recipes</Typography>
                </MenuItem>
              </Link>

              <Link to="/" onClick={logout} className="link-tag">
                <MenuItem key={2} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Link>

            </Menu>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Link to="/home" className="link-tag">
                <MenuItem key={0} onClick={handleCloseNavMenu}>
                 <Typography textAlign="center">Home</Typography>
                </MenuItem>
              </Link>

              <Link to="/recipes" className="link-tag">
                <MenuItem key={1} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Recipes</Typography>
                </MenuItem>
              </Link>

              <Link to="/" onClick={logout} className="link-tag">  
                <MenuItem key={2} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Link>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
