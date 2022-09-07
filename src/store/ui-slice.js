import { createSlice } from '@reduxjs/toolkit'



const uiSlice = createSlice ({
    name: 'ui',
    initialState: { cartVisible : false, Notification: null },
    reducers:{
         toggle(state){
            state.cartVisible = !state.cartVisible;
         },
         showNotification(state, action){
            state.Notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message,

            }
         }


    }
});

export const uiSliceActions = uiSlice.actions;
export default uiSlice;