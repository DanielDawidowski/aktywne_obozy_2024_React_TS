import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { userService } from "../../services/api/user/user.service";
import { ISignUpData } from "../../interfaces/auth/auth.interface";

const fetchAdminUsers = createAsyncThunk<ISignUpData[]>("admin/fetchAdminUser", async () => {
  const response: AxiosResponse = await userService.getAdmin();
  return response.data.admin;
});

export { fetchAdminUsers };
