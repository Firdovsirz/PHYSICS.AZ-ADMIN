import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  email: string | null;
  role: number | null;
  token: string | null;
  is_frozen: boolean | null;
  name: string | null;
  surname: string | null;
  created_at: string | null;
}

const initialState: AuthState = {
  email: null,
  role: null,
  token: null,
  is_frozen: null,
  name: null,
  surname: null,
  created_at: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state: AuthState,
      action: PayloadAction<{
        token: string;
        user: {
          email: string,
          role: number;
          is_frozen: boolean;
          name: string;
          surname: string;
        };
      }>
    ) => {
      state.email = action.payload.user.email;
      state.role = action.payload.user.role;
      state.token = action.payload.token;
      state.is_frozen = action.payload.user.is_frozen;
      state.name = action.payload.user.name;
      state.surname = action.payload.user.surname;
    },
    logout: () => initialState,
    clearLoginSteps: (state: AuthState) => {
      state.email = null;
      state.role = null;
      state.token = null;
      state.is_frozen = null;
      state.name = null;
      state.surname = null;
    },
  },
});

export const {
  loginSuccess,
  clearLoginSteps,
  logout
} = authSlice.actions;
export default authSlice.reducer;