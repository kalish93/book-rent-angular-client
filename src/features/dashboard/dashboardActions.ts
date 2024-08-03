import { AppDispatch } from "../../app/store";
import { DashboardService } from "./dashboardService";
import { dashboardFailure, dashboardStart, getBankExpensesSuccess, getExpensesSuccess } from "./dashboardSlice";

export const getExpenses = (startDate?: any, endDate?: any) => async (dispatch: AppDispatch) => {
   
  };