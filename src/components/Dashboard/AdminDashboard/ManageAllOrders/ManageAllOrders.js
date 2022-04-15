import React, { useState } from "react";
import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import axios from "axios";
import SectionHeader from "../../../shared/SectionHeader/SectionHeader";
import useAuth from "../../../../hooks/useAuth";

const ManageAllOrders = () => {
  document.title = `Dashboard My Booked || Book Now`;
  const { setError, setMessage, user } = useAuth();
  const [myOrderData, setMyOrderData] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(1);
  useEffect(() => {
    fetch(`https://action-camera-engin.herokuapp.com/all-orders`)
      .then((res) => res.json())
      .then((data) => setMyOrderData(data))
      .catch((error) => setError("Failed to Database Connection Try again"));
  }, [forceUpdate]);
  console.log(myOrderData);

  const handleDelete = (_id) => {
    if (window.confirm("Confirmation Click Ok to Delete")) {
      axios
        .delete(
          `https://action-camera-engin.herokuapp.com/myorders-remove-one/${_id}`
        )
        .then((res) => {
          if (res.status === 200) {
            setForceUpdate(forceUpdate + 1);
            setMessage("Delete Successfull");
          }
        })
        .catch((error) => setError("Database connection problem"));
    }
  };
  const handleMakeApproved = (id) => {
    if (window.confirm("Click Okay to make approved")) {
      axios
        .put(
          `https://action-camera-engin.herokuapp.com/order-make-approved/${id}`
        )
        .then((res) => {
          if (res.status === 200) {
            setForceUpdate(forceUpdate + 1);
            setMessage("Updated Successfull");
          }
        })
        .catch((error) => setError("Database connection problem"));
    }
  };
  return (
    <div>
      <SectionHeader text={"Manage All Orders"} />
      <div style={{ minHeight: "70vh" }} className="w-full py-5">
        <div>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead sx={{ bgcolor: "rgb(229 231 235)" }}>
                <TableRow>
                  <TableCell className="uppercase ">Product Id</TableCell>
                  <TableCell className="uppercase ">Email</TableCell>
                  <TableCell className="uppercase" align="right">
                    Status
                  </TableCell>
                  <TableCell className="uppercase" align="right">
                    Quantity
                  </TableCell>
                  <TableCell className="uppercase" align="right">
                    Total Cost
                  </TableCell>
                  <TableCell className="uppercase" align="right">
                    Make Approved
                  </TableCell>
                  <TableCell className="uppercase" align="right">
                    Cancle
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myOrderData.length > 0 ? (
                  myOrderData.map((row) => {
                    const { id, quantity, status, price, _id, email } = row;
                    return (
                      <TableRow
                        key={_id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{id}</TableCell>
                        <TableCell className="lowercase">{email}</TableCell>
                        <TableCell className="uppercase" align="right">
                          {status}
                        </TableCell>
                        <TableCell className="uppercase" align="right">
                          {quantity}
                        </TableCell>
                        <TableCell className="uppercase" align="right">
                          {price} TK
                        </TableCell>
                        <TableCell align="center">
                          {status === "pending" ? (
                            <IconButton
                              onClick={() => handleMakeApproved(_id)}
                              aria-label="delete"
                              size="small"
                            >
                              <UpgradeIcon className="text-gray-600 font-bold text-2xl" />
                            </IconButton>
                          ) : (
                            <CheckCircleOutlineIcon className="text-green-600" />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => handleDelete(_id)}
                            aria-label="delete"
                            size="small"
                          >
                            <DeleteIcon
                              className="text-red-400 font-bold text-2xl"
                              fontSize="20px"
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <p className="text-center">You have no orders</p>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default ManageAllOrders;
