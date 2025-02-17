import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice/index'
//import AdminProductSlice from './admin/product-slice'
// import ShopProductSlice from './shop/products-slice'
// import userSlice from './user-slice/index'
// import AdminSlice from './admin-slice/index'
import doctorSlice from './doctor-slice/index';
const store=configureStore({
    reducer:{
        auth:authReducer,
        doctor:doctorSlice
        // doctor:AdminSlice,
        
       
    },
});
export default store;