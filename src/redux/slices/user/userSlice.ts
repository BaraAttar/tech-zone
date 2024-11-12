import { createSlice } from '@reduxjs/toolkit';
import { login, signup } from './user.AsyncThunk';
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
  user: User | null; // تم تغيير User[] إلى User | null
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      setCookie("token", "", { maxAge: -1 });
      state.user = null; // Clear the user state on logout
      state.loading = 'idle';
      state.error = null;
    },
    cleaner : (state) => {
      state.error = null;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.user = action.payload;

      if (action.payload.token) {
        setCookie('token', action.payload.token, { maxAge: 60 * 60 * 24 });
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
      state.error = errorMessage|| 'Failed to signup';
    });
  },
});
export const { logout ,cleaner} = userSlice.actions;
export default userSlice.reducer;
