import { createSlice } from '@reduxjs/toolkit';
import { login, restoreUser, signup } from './user.AsyncThunk';
import { setCookie } from 'cookies-next';

interface User {
  token: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    userName: string;
    phoneNumber: number;
    email: string;
    profileType: string;
  };
}

interface UserState {
  user: User | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  user: typeof window !== "undefined" && localStorage.getItem("user")
    ? (() => {
      const user = JSON.parse(localStorage.getItem("user") as string);
      if (user?.token) {
        setCookie("token", user.token, { maxAge: 60 * 60 * 24 });
      }
      return user;
    })() : null,
  loading: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      console.log("log out")
      setCookie("token", "", { maxAge: -1 });
      localStorage.removeItem("user");
      state.user = null;
      state.loading = 'idle';
      state.error = null;
    },
    cleaner: (state) => {
      state.error = null;
    }
  },

  extraReducers: (builder) => {
    // restore user
    builder.addCase(restoreUser.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(restoreUser.fulfilled, (state) => {
      state.loading = 'succeeded';
    });
    builder.addCase(restoreUser.rejected, (state, action) => {
      state.loading = 'failed';
      const errorMessage = typeof action.payload === 'string' ? action.payload : 'Failed to restore the user';
      state.error = errorMessage || 'Failed to restore the user';
    });

    // login
    builder.addCase(login.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.user = action.payload;

      if (action.payload.token) {
        setCookie('token', action.payload.token, { maxAge: 60 * 60 * 24 });
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = 'failed';
      const errorMessage = typeof action.payload === 'string' ? action.payload : 'Failed to login';
      state.error = errorMessage || 'Failed to login';
    });

    // signup
    builder.addCase(signup.pending, (state) => {
      state.loading = "pending";
    })
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.user = action.payload;

      if (action.payload.token) {
        setCookie('token', action.payload.token, { maxAge: 60 * 60 * 24 });
      }
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = 'failed';
      const errorMessage = typeof action.payload === 'string' ? action.payload : 'Failed to signup';
      state.error = errorMessage || 'Failed to signup';
    });
  },
});
export const { logout, cleaner } = userSlice.actions;
export default userSlice.reducer;
