// redux/slices/user/user.AsyncThunk.ts
import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = process.env.NEXT_PUBLIC_API_KEY

interface User {
    token: string;
    user: {
        _id: string;
        firstName: string,
        lastName: string,
        userName: string,
        phoneNumber: number,
        email: string,
        profileType: string,
    };
}

const login = createAsyncThunk<User, { userName: string; password: string }>(
    'user/login',
    async ({ userName, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, {
                userName, password
            });
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data?.message || 'Failed to login');
            } else {
                return rejectWithValue('An unknown error occurred');
            }
        }
    }
);

const restoreUser = createAsyncThunk<User, { token: string | undefined }>(
    'user/restore',
    async ({ token }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/user/me`, {
                headers: {
                    "x-auth-token": token,
                  },
            });
            // console.log(response)
            return response.data;
        } catch (error) {
            console.log(error)

            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data?.message || 'Failed to restore user');
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
)

interface SignupCredentials {
    firstName: string
    lastName: string
    userName: string
    phoneNumber?: string
    email: string
    password: string
    confirmPassword: string
}

const signup = createAsyncThunk<User, SignupCredentials>(
    'user/signup',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post<User>(`${apiUrl}/auth/signup`, credentials);
            return response.data;
        } catch (error) {
            // console.log(error.response.data.message)
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data?.message || 'Failed to sign up');
            }
            return rejectWithValue('An unknown error occurred');

        }
    }

)

export {restoreUser, login, signup };
