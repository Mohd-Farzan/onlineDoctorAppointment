import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice/index'
//import AdminProductSlice from './admin/product-slice'
// import ShopProductSlice from './shop/products-slice'
// import userSlice from './user-slice/index'
// import AdminSlice from './admin-slice/index'
import doctorSlice from './doctor-slice/index'
import contactSlice from './contact-slice/index'
import videoSlice from './videoCall-slice/index'
import appointmentSlice from './appointment-slice/index'
const store=configureStore({
    reducer:{
        auth:authReducer,
        doctor:doctorSlice,
        contact:contactSlice,
        appointment:appointmentSlice,
        video: videoSlice,
        
       
    },
});
export default store;