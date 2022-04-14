import React, { useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { TableCell, TableRow } from "@mui/material";
import useAuth from "../../../hooks/useAuth";

const OrderPlaceTableRow = ({ row }) => {
  const [quantity, setQuantity] = useState(0);
  const { setQuantityManage, quantityManage } = useAuth();
  const { name, id, price } = row;
  const handleQuantityData = (e, id) => {
    // setQuantityManage([...quantityManage, { id, quantity: e.target.value }]);
    if (quantityManage.length > 0) {
      let findId = true;
      quantityManage.map((single) => {
        if (single.id == id) {
          const tempData = { ...single };
          tempData.quantity = e.target.value;
          tempData.price = price * e.target.value;
          const oldData = quantityManage.filter(
            (iterator) => iterator.id !== single.id
          );
          setQuantityManage([tempData, ...oldData]);
          findId = false;
        }
      });
      if (findId === true) {
        setQuantityManage([
          ...quantityManage,
          { id, quantity: e.target.value, price: price * e.target.value },
        ]);
        findId = false;
      }
    } else {
      setQuantityManage([
        { id, quantity: e.target.value, price: price * e.target.value },
      ]);
    }
    //   const tempQuantity = {...quantityManage}
    // if(quantityManage.id){

    // }else{
    //     setQuantityManage({...quantityManage, id:})
    // }
    setQuantity(e.target.value);
  };
  return (
    <>
      <TableRow
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        <TableCell align="left">{id}</TableCell>
        <TableCell align="left">{name}</TableCell>
        <TableCell className="uppercase" align="left">
          {price} tk
        </TableCell>
        <TableCell align="left">
          <input
            className="border-2 w-20 p-1"
            defaultValue={0}
            type="number"
            onChange={(e) => handleQuantityData(e, id)}
            name=""
            min={0}
          />
        </TableCell>
        <TableCell align="left">{quantity * price} TK</TableCell>
        <TableCell align="left">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderPlaceTableRow;
