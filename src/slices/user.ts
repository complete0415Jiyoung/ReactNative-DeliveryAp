import {createSlice} from '@reduxjs/toolkit';


// store -> root redducer(root, state) -> user slice , order Slice

// ----구조설계----
// state.user.email
// state.order
// state.ui.
  // const initialState ={
  //   loading : 'ture'
  // }

// action : state를 바꾸는 동작/행위
// dispathch: 그 액션을 실제로 실행하는 함수 
// reducer : 액션이 실제로 실행되면 state를 state를 바꾸는 로직  예) setName

const initialState = {
  name: '',
  email: '',
  accessToken: '',
  refreshToken:'',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
     
    },
    setName(state,action){
      state.name = action.payload;
    },
    setEmail(state,action){
      state.email = action.payload;
    }
  },
  extraReducers: builder => {},
});

export default userSlice;