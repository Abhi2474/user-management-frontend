import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  userEdit: {},
  userEditId: ''
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    read: (state, action) => {
      state.users = action.payload;
    },
    create: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    update: (state, action) => {
      state.users = state.users.map((user) =>{
		console.log(action.payload);
		return  user._id === action.payload._id ? action.payload : user
	  }
      );
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
    editUser: (state, action) => {
		state.userEditId = action.payload.id
      state.userEdit = action.payload.data;
    },
    emptyEditUser: (state) => {
      state.userEdit = {};
	  state.userEditId = null
    },
  },
});

export const { read, create, update, deleteUser, editUser, emptyEditUser } =
  userSlice.actions;

export default userSlice.reducer;
