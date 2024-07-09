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
import { Pagination } from "components/elements";
import BookingModal from "components/layout/modal/book-creation-modal";
import TimeFormatter from "utils/time-formatter";
import VerificationModal from "components/layout/modal/verify-action-modal";
import { getLocalStorage } from "utils/local-storage";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface ListHead {
  id: number;
  title: string;
  align: "left" | "right" | "center" | "inherit" | "justify";
}

function createData(
  name: string,
  type: string,
  event_date: Date,
  location: string
) {
  return { name, type, event_date, location };
}

const rows = [
  createData(
    "July Wellness",
    "Wellness Event",
    new Date(),
    "Batam fkajsdf f;kalsjdf faljsd"
  ),
];

const Dashboard: React.FC = () => {
  const router = useRouter();
  const accessToken = getLocalStorage("access_token");
  // Initialize State
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [data, setData] = useState();

  const listHead: ListHead[] = [
    {
      id: 1,
      title: "Name",
      align: "left",
    },
    {
      id: 2,
      title: "Type",
      align: "left",
    },
    {
      id: 3,
      title: "Date",
      align: "left",
    },
    {
      id: 4,
      title: "Location",
      align: "left",
    },
    {
      id: 5,
      title: "",
      align: "left",
    },
  ];

  // Handle show button
  const handleShowButton = (type: string, label: string) => {
    let bgColor = Colors.gery100;
    const value = type.toLocaleLowerCase();
    switch (value) {
      case "reject":
        bgColor = Colors.red100;
        break;

      case "approve":
        bgColor = Colors.green100;
        break;

      default:
        bgColor = Colors.gery100;
        break;
    }

    useEffect(() => {
      if (!accessToken) router.push("/login");

      const getEvent = async () => {
        try {
          const endpoint =
            `${process.env.NEXT_PUBLIC_RESTURL_API_SERVER}/events` || "";
          const { data } = await axios.get(endpoint, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      };

      getEvent();
    }, [accessToken]);

    return (
      <Box
        display="flex"
        padding="8px"
        justifyContent="center"
        borderRadius="9px"
        width="100%"
        sx={{
          backgroundColor: bgColor,
          color: Colors.white,
          cursor: "pointer",
          "&:hover": {
            opacity: 0.9,
          },
        }}
        onClick={() => {
          setShowVerifyModal(true);
          setActionType(type);
        }}
      >
        {label}
      </Box>
    );
  };

  return (
    <>
      <Box marginTop="24px">
        <Table sx={{ borderCollapse: "separate", borderSpacing: "0 21px" }}>
          <TableHead>
            <TableRow>
              {listHead.map((item) => (
                <TableCell align={item.align} key={`${item.id}-heading`}>
                  {item.title}
                </TableCell>
              ))}
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
                <TableCell align="left">{row.type}</TableCell>
                <TableCell align="left">
                  {TimeFormatter(row.event_date)}
                </TableCell>
                <TableCell align="left">{row.location}</TableCell>
                <TableCell
                  sx={{
                    borderTopRightRadius: "9px",
                    borderBottomRightRadius: "9px",
                  }}
                  align="left"
                >
                  <Box display="flex" gap="8px" width="100%">
                    {handleShowButton("Approve", "Approve")}
                    <>{handleShowButton("Reject", "Reject")}</>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

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

      {/* START - Event Modal Creation */}
      <BookingModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        handleClick={() => {}}
      />
      {/* END - Event Modal Creation */}

      {/* START - Verification Modal */}
      <VerificationModal
        open={showVerifyModal}
        onClose={() => setShowVerifyModal(false)}
        handleClick={() => {}}
        actionType={actionType}
      />
      {/* END -Verification Modal */}
    </>
  );
};

export default Dashboard;
