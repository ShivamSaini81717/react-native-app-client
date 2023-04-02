import React, { useEffect } from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from './screens/Home';
import ProductDetails from './screens/ProductDetails';
import Toast from "react-native-toast-message";
import Cart from './screens/Cart'
import ConfirmOrder from './screens/ConfirmOrder'
import Payment from './screens/Payment'
import Login from './screens/Login'
import Signup from './screens/Signup'
import ForgetPassword from './screens/ForgetPassword'
import Verify from './screens/Verify'
import Profile from './screens/Profile';
import UpdateProfile from './screens/UpdateProfile';
import ChangePassword from './screens/ChangePassword';
import Orders from './screens/Orders';
import AdminPanel from './screens/Admin/AdminPanel';
import Categories from './screens/Admin/Categories';
import AdminOrders from './screens/Admin/AdminOrders';
import NewProduct from './screens/Admin/NewProduct';
import UpdateProduct from './screens/Admin/UpdateProduct';
import ProductImages from './screens/Admin/ProductImages';
import CameraCom from './screens/CameraCom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './redux/actions/userAction';
const Stack =createNativeStackNavigator()

const Main = () => {


  const {user} =useSelector(state=>state.user);
  // console.log(user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
 <NavigationContainer>
<Stack.Navigator 
initialRouteName='home'
 screenOptions={{
    headerShown:false,
    }}
 >
    <Stack.Group>
   
        <Stack.Screen 
        name="home" 
        component={Home} 
       />
        <Stack.Screen 
        name="productdetails" 
        component={ProductDetails} 
       />
         <Stack.Screen 
        name="cart" 
        component={Cart} 
       />
      <Stack.Screen 
        name="confirmOrder" 
        component={ConfirmOrder} 
       />
         <Stack.Screen 
        name="payment" 
        component={Payment} 
       />
         <Stack.Screen 
        name="login" 
        component={Login} 
       />
         <Stack.Screen 
        name="signup" 
        component={Signup} 
       />
        <Stack.Screen 
        name="forgetpassword" 
        component={ForgetPassword} 
       />
         <Stack.Screen 
        name="verify" 
        component={Verify} 
       />
        <Stack.Screen 
        name="profile" 
        component={Profile} 
       />
        <Stack.Screen 
        name="updateprofile" 
        component={UpdateProfile} 
       />
        <Stack.Screen 
        name="changepassword" 
        component={ChangePassword} 
       />
        <Stack.Screen 
        name="orders" 
        component={Orders} 
       />

       {/* admin----------------- */}
        <Stack.Screen 
        name="adminpanel" 
        component={AdminPanel} 
       />
         <Stack.Screen 
        name="categories" 
        component={Categories} 
       />
         <Stack.Screen 
        name="adminorders" 
        component={AdminOrders} 
       />
      <Stack.Screen 
        name="newProduct" 
        component={NewProduct} 
       />
         <Stack.Screen 
        name="updateproduct" 
        component={UpdateProduct} 
       />
         <Stack.Screen 
        name="productimages" 
        component={ProductImages} 
       />
        <Stack.Screen 
        name="camera" 
        component={CameraCom} />

    </Stack.Group>
</Stack.Navigator>
<Toast position='top' topOffset={50}/>
 </NavigationContainer>
  )
}

export default Main