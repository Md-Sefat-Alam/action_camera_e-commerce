import React, { useEffect, useReducer, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CreateIcon from "@mui/icons-material/Create";
import PersonIcon from "@mui/icons-material/Person";

const MakeAdmin = () => {
  const { setError, setMessage } = useAuth();
  const [allUserList, setAllUserList] = useState([]);
  const [forceData, setForceData] = useState(1);
  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then((res) => res.json())
      .then((data) => setAllUserList(data))
      .catch((error) => setError("Failed to Database Connection Try again"));
  }, [forceData]);
  const handleMakeAdmin = (email) => {
    if (window.confirm("Confirmation Click Ok to make admin")) {
      axios
        .put(`http://localhost:5000/user/makeadmin/${email}`)
        .then((res) => {
          if (res.status === 200) {
            setMessage("Update Successfull");
          }
        })
        .catch((error) => setError("Database connection problem"));
    }
    setForceData(forceData + 1);
  };
  const handleRevomeAdmin = (email) => {
    if (window.confirm("Confirmation Click Ok to remove admin")) {
      axios
        .put(`http://localhost:5000/user/removeadmin/${email}`)
        .then((res) => {
          if (res.status === 200) {
            setMessage("Update Successfull");
          }
        })
        .catch((error) => setError("Database connection problem"));
    }
    setForceData(forceData + 1);
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <Table
          className="bg-gray-100"
          sx={{ minWidth: 650 }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell className="uppercase" align="left">
                Email
              </TableCell>
              <TableCell className="uppercase" align="left">
                Name
              </TableCell>
              <TableCell className="uppercase" align="left">
                Role
              </TableCell>
              <TableCell className="uppercase" align="left">
                Make Admin
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUserList.length > 0 ? (
              allUserList.map((row) => {
                const { _id, name, email, role } = row;
                return (
                  <TableRow
                    key={_id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="left">{email}</TableCell>
                    <TableCell align="left">{name}</TableCell>
                    <TableCell className="uppercase" align="left">
                      {role === "ADMIN" ? (
                        <AdminPanelSettingsIcon />
                      ) : (
                        <PersonIcon />
                      )}
                    </TableCell>
                    <TableCell align="left">
                      {email === "admin@admin.com" ? (
                        "Can't Remove"
                      ) : role === "ADMIN" ? (
                        <IconButton
                          onClick={() => handleRevomeAdmin(email)}
                          aria-label="remove admin"
                          size="small"
                          className=""
                        >
                          <CreateIcon
                            className="text-red-600 font-bold text-2xl"
                            fontSize="20px"
                          />{" "}
                          Remove Admin
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() => handleMakeAdmin(email)}
                          aria-label="make admin"
                          size="small"
                        >
                          <AdminPanelSettingsIcon
                            className="text-green-800 font-bold text-2xl"
                            fontSize="20px"
                          />{" "}
                          Make Admin
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell className="" align="center">
                  You have no orders
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MakeAdmin;
