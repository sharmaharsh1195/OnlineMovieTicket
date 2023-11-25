import {createSlice} from '@reduxjs/toolkit'


export const userSlice=createSlice({
    name:"user",
    initialState:{ value:{name:"",isLoggedIn:"false"}
    },
    reducers:{
            login:(state,action)=>{
                const {name,isLoggedIn}=action.payload;
                state.value={name,isLoggedIn:isLoggedIn||true}
            },
            logout:(state)=>{
                state.value={name:'',isLoggedIn: false}
            }
    }
})

export const {login,logout}=userSlice.actions;
export default userSlice.reducer;


