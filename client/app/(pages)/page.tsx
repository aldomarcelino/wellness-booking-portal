"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import {
  Box,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Typography,
  Skeleton,
} from "@mui/material";
import { Colors } from "styles/theme/color";
import { Pagination } from "components/elements";
import EventModal from "components/layout/modal/event-creation-modal";
import TimeFormatter from "utils/time-formatter";
import VerificationModal from "components/layout/modal/verify-action-modal";
import { Plus } from "lucide-react";
import CheckSession from "services/check-session";

interface ListHead {
  id: number;
  title: string;
  align: "left" | "right" | "center" | "inherit" | "justify";
}

interface dataType {
  _id: string;
  name: string;
  type: string;
  event_date: Date;
  location: string;
  status: string;
}

const Dashboard: React.FC = () => {
  const { role } = CheckSession();
  // Initialize State
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [loading, setLoading] = useState(true);

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

  // Fetch Data
  const { data, mutate } = useSWR(() => "/api/events");

  // Handle show button
  const handleShowButton = (type: string, id: string) => {
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
          setCurrentId(id);
        }}
      >
        {type}
      </Box>
    );
  };

  const handleShowStatus = (status: string) => {
    let color = Colors.green100;
    if (status === "Rejected") color = Colors.red100;
    return (
      <Typography variant="body2" color={color} textAlign="center">
        {status}
      </Typography>
    );
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return "";

  return (
    <>
      <Box marginTop="24px">
        <Table sx={{ borderCollapse: "separate", borderSpacing: "0 21px" }}>
          <TableHead sx={{ position: "relative" }}>
            <TableRow>
              {listHead.map((item) => (
                <TableCell
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: 600,
                    fontSize: 16,
                    color: Colors.darkGrey,
                  }}
                  align={item.align}
                  key={`${item.id}-heading`}
                >
                  {item.title}
                </TableCell>
              ))}
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                position="absolute"
                top="16px"
                right="3px"
                borderRadius="7px"
                padding="3px"
                sx={{
                  backgroundColor: Colors.darkBlue,
                  cursor: "pointer",
                  "&:hover": { opacity: 0.9 },
                }}
                onClick={() => setShowCreateModal(true)}
              >
                <Plus color={Colors.blue} />
              </Box>
            </TableRow>
          </TableHead>
          <TableBody>
            {!data ? (
              <>
                {[...Array(7)].map((_, id) => (
                  <TableRow
                    key={`${id}-TableRow`}
                    sx={{
                      cursor: "pointer",
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
                    {[...Array(5)].map((_, idx) => (
                      <TableCell key={`${idx}-TableCell`}>
                        <Skeleton
                          data-testid="skeleton"
                          height="21px"
                          variant="rectangular"
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ) : data.events.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography margin="100px 0px" textAlign="center">
                    No data
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {data.events.map((row: dataType) => (
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
                    <TableCell align="left">
                      <Box maxWidth="200px">{row.location}</Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        borderTopRightRadius: "9px",
                        borderBottomRightRadius: "9px",
                      }}
                      align="left"
                    >
                      {row.status === "Pending Review" && role === "Admin" ? (
                        <Box display="flex" gap="8px" width="100%">
                          {handleShowButton("Approve", row._id)}
                          <>{handleShowButton("Reject", row._id)}</>
                        </Box>
                      ) : (
                        <>
                          {row.status === "Pending Review"
                            ? handleShowButton("Cancel", row._id)
                            : handleShowStatus(row.status)}
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>

        {/* START - Pagination */}
        {data?.events.length ? (
          <Box display="flex" justifyContent="end" margin="32px 0px 48px">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageLimit={Math.ceil(data.count / 10)}
            />
          </Box>
        ) : (
          ""
        )}
        {/* END - Pagination */}
      </Box>

      {/* START - Event Modal Creation */}
      <EventModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        refetch={mutate}
      />
      {/* END - Event Modal Creation */}

      {/* START - Verification Modal */}
      <VerificationModal
        open={showVerifyModal}
        onClose={() => setShowVerifyModal(false)}
        currentId={currentId}
        actionType={actionType}
        refetch={mutate}
      />
      {/* END -Verification Modal */}
    </>
  );
};

export default Dashboard;
