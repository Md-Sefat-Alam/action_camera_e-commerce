import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import useAuth from "../../../hooks/useAuth";
import { useHistory, useLocation } from "react-router-dom";
import BasicPopover from "../BasicPopover/BasicPopover";

const Nav = () => {
  const { user, logOut, setIsDashBoard, isDashBoard } = useAuth();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const history = useHistory();
  const location = useLocation();
  // if (location !== "undefined") {
  //   if (location?.pathname === "/dashboard") {
  //     setIsDashBoard(true);
  //   } else {
  //     setIsDashBoard(false);
  //   }
  // }

  if (location !== "undefined") {
    if (location?.pathname.includes("/dashboard")) {
      setIsDashBoard(true);
    } else {
      setIsDashBoard(false);
    }
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  if (isDashBoard) {
    return null;
  }

  return (
    <AppBar
      position="static"
      color="primary"
      style={{ backgroundColor: "#DFE3EE" }}
      className="text-gray-800"
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <img
              className="h-14 cursor-pointer border-2 border-dotted rounded-full border-gray-400"
              src="./images/logo/logo.png"
              alt=""
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to={"/home"}>
                  <Typography textAlign="center">
                    <HomeIcon /> Home
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to={"/explore"}>
                  <Typography textAlign="center">
                    <ExploreIcon /> Explore
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          ></Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link to={"/home"}>
              <Button
                className="text-gray-800 flex items-center"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "rgb(31 41 55)", display: "block" }}
              >
                <HomeIcon /> <span>Home</span>
              </Button>
            </Link>
            <Link to={"/explore"}>
              <Button
                className="text-gray-800 flex items-center"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "rgb(31 41 55)", display: "block" }}
              >
                <ExploreIcon /> <span>Explore</span>
              </Button>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            <BasicPopover />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!user.accessToken ? (
              <Link className="text-gray-900 font-bold" to={"/login"}>
                <LoginIcon /> Login
              </Link>
            ) : (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {user.photoURL ? (
                    <Avatar
                      alt={user.displayName ? user.displayName : user.email}
                      src={user.photoURL}
                    />
                  ) : (
                    <Avatar className="uppercase">
                      {user.displayName ? user.displayName[0] : user.email[0]}
                    </Avatar>
                  )}
                </IconButton>
              </Tooltip>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                style={{ minWidth: "250px" }}
                onClick={handleCloseUserMenu}
              >
                <Typography textAlign="center">
                  <AccountCircleIcon /> Profile
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  history.push("/dashboard");
                }}
              >
                <Typography textAlign="center">
                  <DashboardIcon /> Dashboard
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  logOut();
                }}
              >
                <Typography textAlign="center">
                  <LogoutIcon /> Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Nav;
