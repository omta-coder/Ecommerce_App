import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import AdminProductsSlice from './admin/products-slice'
import shoppingProductSlice from './shop/products-slice'
import shopCartSlice from './shop/cart-slice'
import shopAddressSlice from "./shop/address-slice";
import shopOrderSlice from './shop/order-slice'
import adminOrderSlice from './admin/order-slice'


const store = configureStore({
    reducer:{
        auth: authReducer,
        adminProducts: AdminProductsSlice,
        adminOrder: adminOrderSlice,

        shopProducts:shoppingProductSlice,
        shopCart:shopCartSlice,
        shopAddress: shopAddressSlice,
        shopOrder: shopOrderSlice,
        
    }
})



export default store;