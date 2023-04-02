import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, defaultStyle } from '../styles/styles'
import Header from '../components/Header'
import { Avatar, Button } from 'react-native-paper'
import SearchModel from '../components/SearchModel'
import ProductCard from '../components/ProductCard'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Footer from '../components/Footer'
import Heading from '../components/Heading'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/actions/productAction'
import { useSetCategories } from '../utils/hooks'
import { Toast } from 'react-native-toast-message/lib/src/Toast'


const Home = () => {
   
const [category,setCategory]=useState("");
const [activeSearch,setActiveSearch]=useState(false);
const [searchQuery,setSearchQuery]=useState("");
const [categories, setCategories] = useState([]);
const navigate =useNavigation();
const dispatch = useDispatch();
const isFocused = useIsFocused();
const { products } = useSelector((state) => state.product);
const categoryButtonHandler =(id)=>{
   setCategory(id);
};
// console.log(category);

const addToCardHanler =(id, name, price, image, stock)=>{
    if (stock === 0)
    return Toast.show({
      type: "error",
      text1: "Out Of Stock",
    });
  dispatch({
    type: "addToCart",
    payload: {
      product: id,
      name,
      price,
      image,
      stock,
      quantity: 1,
    },
  });
  Toast.show({
    type: "success",
    text1: "Added To Cart",
  });
    console.log("add to card",id, name, price, image, stock);
}

useSetCategories(setCategories, isFocused);

useEffect(() => {
    const timeOutId = setTimeout(() => {
      dispatch(getAllProducts(searchQuery, category));
    }, 500);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [dispatch, searchQuery, category, isFocused]);

  return (
    <>
    { activeSearch &&(
            <SearchModel 
    searchQuery={searchQuery}
    setSearchQuery={setSearchQuery}
    setActiveSearch={setActiveSearch}
    products={products}
    /> ) }
    <View style={defaultStyle}>
    {/* header  */}
    <Header/>

{/* header row  */}
   <View style={{
    paddingTop:25,
   flexDirection:"row",
   justifyContent:"space-between",
   alignItems:"center",

   }}>
   
  <Heading text1="Our" text2="Products"/>
    {/* serarch bar */}
     <TouchableOpacity onPress={()=>setActiveSearch((prev)=>!prev)}>
        <Avatar.Icon

        size={50}
         icon={"magnify"} 
         color={"gray"} 
         style={{ backgroundColor:colors.color2,elevation:15, marginRight:60}}/>
     </TouchableOpacity>
   </View>
{/* Categories */}


   <View
   style={
    {
        flexDirection:"row",
        height:80,
    }
   }
   >
<ScrollView horizontal contentContainerStyle={{alignItems:"center"}}  showsHorizontalScrollIndicator={false}>
{
    categories.map((item,index)=>(

        <Button
        key={item._id}
         style={{
        
    backgroundColor:category === item._id ? "blue": colors.color5,
   borderRadius:100,
   margin:5,}}
   onPress={()=>categoryButtonHandler(item._id)}
   >
   <Text style={{
    fontSize:12,
    color:category === item._id ? "white":"gray",}}>
{item.category}
   </Text>
   </Button>
    ))}
</ScrollView>

   </View>

   {/* Products */}
   <View style={{flex:1}}>
   <ScrollView
   horizontal
   showsHorizontalScrollIndicator={false}
   >
{
    products.map((item,index)=>(
        <ProductCard 
    stock={item.stock}
    name={item.name}
    price={item.price}
    image={item.images[0]?.url}
    id={item._id}
    addToCardHanler={addToCardHanler}
    key={item._id}
    i={index}
    navigate={navigate}
        />
    ))
}
   </ScrollView>

   </View>

    
    </View>

    {/* Footer */}
    <Footer activeRoute={"home"}/>
    </>
  )
}

export default Home