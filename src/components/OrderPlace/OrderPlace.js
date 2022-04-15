import { Button, Container, TableContainer } from "@mui/material";
import { useHistory } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import SectionHeader from "../shared/SectionHeader/SectionHeader";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import OrderPlaceTableRow from "../shared/OrderPlaceTableRow/OrderPlaceTableRow";
import { useEffect, useState } from "react";
import axios from "axios";

const OrderPlace = () => {
  const { cart, quantityManage, user, setIsLoading, setCart, setMessage } =
    useAuth();
  const [productCost, setProductCost] = useState(0);
  const history = useHistory();
  if (!cart.length > 0) {
    history.push("/home");
  }
  useEffect(() => {
    setProductCost(0);
    let costTemp = 0;
    for (const iterator of quantityManage) {
      costTemp += parseInt(iterator.price);
    }
    setProductCost(costTemp);
  }, [quantityManage]);

  const handleOrderPlace = () => {
    // let confirmCreated = false;
    if (window.confirm("Click Ok to order")) {
      for (const iterator of quantityManage) {
        // console.log({ email: user.email, ...iterator });
        axios
          .post("https://action-camera-engin.herokuapp.com/orderplace", {
            email: user.email,
            ...iterator,
            status: "pending",
          })
          .then((res) => {
            if (res.status === 200) {
              // confirmCreated = true;
              setMessage("Order is now Pending wait for confirmation");
              setIsLoading(true);
            }
          })
          .catch((error) => {})
          .finally(() => {});
      }
    }
    axios
      .delete(
        `https://action-camera-engin.herokuapp.com/singleUserCartDataDelete/${user.email}`
      )
      .then((res) => {
        if (res.status === 200) {
          setCart(res);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  return (
    <div className="pageRoot">
      <SectionHeader text={"Place Order"} />
      <Container>
        <TableContainer component={Paper}>
          <Table
            className="bg-gray-100"
            sx={{ minWidth: 650 }}
            aria-label="simple table"
          >
            <TableHead sx={{ bgcolor: "rgb(229 231 235)" }}>
              <TableRow>
                <TableCell className="uppercase" align="left">
                  Product Id
                </TableCell>
                <TableCell className="uppercase" align="left">
                  Name
                </TableCell>
                <TableCell className="uppercase" align="left">
                  Price
                </TableCell>
                <TableCell className="uppercase" align="left">
                  Quantity
                </TableCell>
                <TableCell className="uppercase" align="left">
                  Net Total
                </TableCell>
                <TableCell className="uppercase" align="left">
                  Cencle
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.length > 0 ? (
                cart.map((row) => (
                  <OrderPlaceTableRow key={row._id} row={row} />
                ))
              ) : (
                <TableRow>
                  <TableCell className="" align="center">
                    You have no orders
                  </TableCell>
                </TableRow>
              )}
              <TableRow sx={{ bgcolor: "rgb(229 231 235)" }}>
                <TableCell align="right"> </TableCell>
                <TableCell align="right"> </TableCell>
                <TableCell align="right"> </TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="left">
                  {productCost} TK
                </TableCell>
                <TableCell align="left">
                  <Button onClick={handleOrderPlace} variant="contained">
                    Order Place
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default OrderPlace;
