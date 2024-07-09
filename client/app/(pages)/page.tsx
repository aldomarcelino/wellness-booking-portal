"use client";
import React, { useState } from "react";
import {
  Box,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import { Colors } from "styles/theme/color";
import { Button, Pagination } from "components/elements";
import BookingModal from "components/layout/modal/book-creation-modal";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Box marginTop="24px">
      <Table sx={{ borderCollapse: "separate", borderSpacing: "0 21px" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat</TableCell>
            <TableCell align="right">Carbs</TableCell>
            <TableCell align="right">Protein</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{
                backgroundColor: "white",
                transition: "0.5s all ease",
                "&:hover": {
                  boxShadow: Colors.shadow,
                },
                "& td, & th": {
                  border: 0,
                  overflow: "hidden",
                },
              }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{
                  borderTopLeftRadius: "9px",
                  borderBottomLeftRadius: "9px",
                }}
              >
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell
                sx={{
                  borderTopRightRadius: "9px",
                  borderBottomRightRadius: "9px",
                }}
                align="right"
              >
                {row.protein}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button label="Submit" buttonType="primary" padding="9px 19px" />
      <Button label="Submit" buttonType="secondary" padding="9px 19px" />

      <BookingModal open={false} onClose={() => {}} handleClick={() => {}} />

      {/* START - Pagination */}
      <Box display="flex" justifyContent="end">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageLimit={Math.ceil(20 / 10)}
        />
      </Box>
      {/* END - Pagination */}
    </Box>
  );
};

export default Dashboard;
