import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PaymentsIcon from "@mui/icons-material/Payments";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import RateReviewIcon from "@mui/icons-material/RateReview";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import useAuth from "../../../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import MyOrders from "../MyOrders/MyOrders";
import Pay from "../Pay/Pay";
import Review from "../Review/Review";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ManageAllOrders from "../../AdminDashboard/ManageAllOrders/ManageAllOrders";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import QrCodeIcon from "@mui/icons-material/QrCode";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ManageProducts from "../../AdminDashboard/ManageProducts/ManageProducts";
import MakeAdmin from "../../AdminDashboard/MakeAdmin/MakeAdmin";

const drawerWidth = 240;

const DashboardMain = (props) => {
  const { logOut } = useAuth();
  const userRole = "user";
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const history = useHistory();
  let { path, url } = useRouteMatch();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const drawer = (
    <div>
      <Toolbar className="text-gray-200 font-bold text-xl bg-gray-900">
        {userRole === "admin" ? (
          <>
            <AdminPanelSettingsIcon /> Admin
          </>
        ) : (
          "User Dashboard"
        )}
      </Toolbar>
      <Divider />
      <List>
        <NavLink activeClassName="dashboardMenuActiveClass" to={`${url}/pay`}>
          <ListItem button>
            <ListItemIcon>
              <PaymentsIcon />
            </ListItemIcon>
            <ListItemText primary={"Pay"} />
          </ListItem>
        </NavLink>

        {userRole === "admin" ? (
          <>
            <NavLink
              activeClassName="dashboardMenuActiveClass"
              to={`${url}/manage-all-orders`}
            >
              <ListItem button>
                <ListItemIcon>
                  <ShoppingCartCheckoutIcon />
                </ListItemIcon>
                <ListItemText primary={"Manage All Orders"} />
              </ListItem>
            </NavLink>
            <NavLink
              activeClassName="dashboardMenuActiveClass"
              to={`${url}/manage-products`}
            >
              <ListItem button>
                <ListItemIcon>
                  <QrCodeIcon />
                </ListItemIcon>
                <ListItemText primary={"Manage Products"} />
              </ListItem>
            </NavLink>
            <NavLink
              activeClassName="dashboardMenuActiveClass"
              to={`${url}/make-admin`}
            >
              <ListItem button>
                <ListItemIcon>
                  <AdminPanelSettingsIcon />
                </ListItemIcon>
                <ListItemText primary={"Make Admin"} />
              </ListItem>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              activeClassName="dashboardMenuActiveClass"
              to={`${url}/my-orders`}
            >
              <ListItem button>
                <ListItemIcon>
                  <ShoppingBagIcon />
                </ListItemIcon>
                <ListItemText primary={"My Orders"} />
              </ListItem>
            </NavLink>
            <NavLink
              activeClassName="dashboardMenuActiveClass"
              to={`${url}/review`}
            >
              <ListItem button>
                <ListItemIcon>
                  <RateReviewIcon />
                </ListItemIcon>
                <ListItemText primary={"Review"} />
              </ListItem>
            </NavLink>
          </>
        )}
      </List>
      <Divider />
      <List>
        <ListItem onClick={() => history.push("/home")} button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={"Go to home"} />
        </ListItem>
        <ListItem onClick={logOut} button>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItem>
      </List>
    </div>
  );
  return (
    <div className="pageRoot">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          style={{
            backgroundColor: "rgb(255 255 255)",
            color: "rgb(31 41 55)",
          }}
          className=""
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {location.pathname}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Switch>
            <Route path={`${path}/pay`}>
              <Pay></Pay>
            </Route>

            {userRole === "admin" ? (
              <>
                <Route exact path={`${path}`}>
                  <ManageAllOrders></ManageAllOrders>
                </Route>
                <Route path={`${path}/manage-all-orders`}>
                  <ManageAllOrders></ManageAllOrders>
                </Route>
                <Route path={`${path}/manage-products`}>
                  <ManageProducts></ManageProducts>
                </Route>
                <Route path={`${path}/make-admin`}>
                  <MakeAdmin></MakeAdmin>
                </Route>
              </>
            ) : (
              <>
                <Route exact path={path}>
                  <MyOrders></MyOrders>
                </Route>
                <Route path={`${path}/my-orders`}>
                  <MyOrders></MyOrders>
                </Route>
                <Route path={`${path}/review`}>
                  <Review></Review>
                </Route>
              </>
            )}
          </Switch>
        </Box>
      </Box>
    </div>
  );
};

export default DashboardMain;
