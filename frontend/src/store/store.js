import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice/index'
//import AdminProductSlice from './admin/product-slice'
// import ShopProductSlice from './shop/products-slice'
// import userSlice from './user-slice/index'
import doctorSlice from './admin-slice/index'
const store=configureStore({
    reducer:{
        auth:authReducer,
        // adminProducts:AdminProductSlice,
        doctor:doctorSlice,
        
       
    },
});
export default store;