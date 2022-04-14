import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

export default function BasicPopover() {
  const { user, isLoading, setIsLoading } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [cart, setCart] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/singleUserCartData/${user.email}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setCart(res.data);
        }
      })
      .catch((error) => {});
  }, [isLoading === false]);

  const handleCancelCart = (email) => {
    setIsLoading(true);
    axios
      .delete(`http://localhost:5000/singleUserCartDataDelete/${email}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setCart(res);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      {isLoading ? (
        <Box>
          <CircularProgress sx={{ mx: 5 }} size="1.6rem" />
        </Box>
      ) : (
        <div>
          <IconButton
            style={{ margin: "0px 30px", padding: "2px" }}
            aria-describedby={id}
            size="small"
            onClick={handleClick}
          >
            <Badge badgeContent={cart.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "start",
            }}
          >
            <Typography sx={{ p: 0 }}>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  minWidth: 300,
                  bgcolor: "background.paper",
                }}
              >
                <nav className="bg-gray-50" aria-label="main mailbox folders">
                  <List>
                    {cart.length > 0 &&
                      cart.map((cartItem) => {
                        const { name } = cartItem;
                        return (
                          <ListItem key={cartItem._id} disablePadding>
                            <ListItemButton sx={{}}>
                              <ListItemText
                                className="text-sm"
                                sx={{ color: "rgb(75 85 99)" }}
                                primary={name.substring(0, 30)}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                  </List>
                </nav>
                <Divider />
                <nav
                  className="bg-gray-100"
                  aria-label="secondary mailbox folders"
                >
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <ShoppingCartCheckoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cart checkout" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem
                      onClick={() => handleCancelCart(user.email)}
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <RemoveShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cancel All" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </nav>
              </Box>
            </Typography>
          </Popover>
        </div>
      )}
    </>
  );
}
