import {createSlice} from '@reduxjs/toolkit';
import {LoadState} from '../../../../types';
import {newState} from '../../../common/utils/newState';
import {handleErrorResponse} from '../../api/responseHandlers';
import {resetPassword, userLogin, userRegister} from './userActions';
import {UserInitialState, UserPayload, UserState} from './userState';

function loginHandler(state: UserState, payload: {payload: UserPayload}) {
  return newState(state, {
    user: payload.payload.user,
    accessToken: payload.payload.token,
    loginLoading: LoadState['allIsLoaded'],
  });
}
function loginLoadingHandler(state: UserState) {
  return newState(state, {
    loginLoading: LoadState['pullToRefresh'],
  });
}

function loginErrorHandler(
  state: UserState,
  payload: {payload: string | unknown},
) {
  handleErrorResponse((payload.payload as string) || 'Login failed');
  return newState(state, {
    loginLoading: LoadState['error'],
    accessToken: 'kl;hadjlcnaidojp8989y4hrkn4w3r89',
  });
}

function logoutHandler(state: UserState) {
  return newState(state, UserInitialState);
}

function resetPasswordHandler(
  state: UserState,
  payload: {payload: UserPayload},
) {
  return newState(state, {
    user: payload.payload.user,
    accessToken: payload.payload.token,
    loginLoading: LoadState['allIsLoaded'],
  });
}

function resetPasswordLoadingHandler(state: UserState) {
  return newState(state, {
    loginLoading: LoadState['pullToRefresh'],
  });
}

function registerHandler(state: UserState, payload: {payload: UserPayload}) {
  return newState(state, {
    user: payload.payload.user,
    accessToken: payload.payload.token,
    loginLoading: LoadState['allIsLoaded'],
  });
}

function registerLoadingHandler(state: UserState) {
  return newState(state, {
    loginLoading: LoadState['pullToRefresh'],
  });
}

function registerErrorHandler(
  state: UserState,
  payload: {payload: string | unknown},
) {
  handleErrorResponse((payload.payload as string) || 'Register failed');
  return newState(state, {
    loginLoading: LoadState['error'],
  });
}

function updateHandler(state: UserState, payload: any) {
  return newState(state, {
    user: {
      ...state.user,
      ...payload.payload,
    },
  });
}

function resetPasswordErrorHandler(
  state: UserState,
  payload: {payload: string | unknown},
) {
  handleErrorResponse((payload.payload as string) || 'Password reset failed');
  return newState(state, {
    loginLoading: LoadState['error'],
  });
}

export const {reducer: UserReducer, actions} = createSlice({
  name: 'user',
  initialState: UserInitialState,
  reducers: {
    setLogin: loginHandler,
    setLoginLoading: loginLoadingHandler,
    setLoginError: loginLoadingHandler,
    setLogout: logoutHandler,
    setUpdate: updateHandler,
  },
  extraReducers: builder => {
    builder
      .addCase(userLogin.fulfilled, loginHandler)
      .addCase(userLogin.rejected, loginErrorHandler)
      .addCase(userLogin.pending, loginLoadingHandler)
      .addCase(resetPassword.fulfilled, resetPasswordHandler)
      .addCase(resetPassword.rejected, resetPasswordErrorHandler)
      .addCase(resetPassword.pending, resetPasswordLoadingHandler)
      .addCase(userRegister.fulfilled, registerHandler)
      .addCase(userRegister.rejected, registerErrorHandler)
      .addCase(userRegister.pending, registerLoadingHandler);
  },
});

export const {setLogout, setUpdate} = actions;
