import {
  Box,
  Card,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { selectBook } from "../../features/book/bookSlice";
import { getIncomeByMonth } from "../../features/book/bookActions";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const Income = () => {
  const dispatch = useDispatch<AppDispatch>();
  const bookState = useSelector(selectBook);
  const { incomeByMonth, loading, error } = bookState;

  useEffect(() => {
    dispatch(getIncomeByMonth());
    console.log(incomeByMonth, "oooooooooooooooooo");
  }, [dispatch]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error fetching data</Typography>;
  }
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 300,
        padding: 2,
        backgroundColor: "#fff",
        borderRadius: ".5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ color: "#656575" }}>
          Income
        </Typography>
        <Typography
          variant="button"
          gutterBottom
          sx={{ backgroundColor: "rgba(0,0,0,.1)", padding: ".1rem .5rem" }}
        >
          This Month
        </Typography>
      </div>
      <Divider sx={{ margin: "1rem 0" }} />

      <Typography
        variant="h4"
        sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
      >
        ETB {incomeByMonth.currentMonthIncome}
        {!isNaN(incomeByMonth.percentageChange) && (
          <Box
            component="span"
            sx={{
              display: "flex",
              alignItems: "center",
              color: incomeByMonth.percentageChange >= 0 ? "green" : "red",
              marginLeft: 1,
              fontSize: "1rem",
            }}
          >
            {incomeByMonth.percentageChange >= 0 ? (
              <ArrowUpwardIcon fontSize="small" />
            ) : (
              <ArrowDownwardIcon fontSize="small" />
            )}
            {incomeByMonth.percentageChange == Infinity
              ? "100"
              : incomeByMonth.percentageChange}
            %
          </Box>
        )}
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ color: "#656575" }}>
        Compared To ETB {incomeByMonth.lastMonthIncome} Last Month
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ color: "#525256" }}>
        Last Month Income ETB {incomeByMonth.lastMonthIncome}
      </Typography>
    </Card>
  );
};

export default Income;
