import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { colors, defaultStyle, formHeading } from '../../styles/styles'
import Header from '../../components/Header'
import Loader from '../../components/Loader'
import Chart from '../../components/Chart'
import ButtonBox from '../../components/ButtonBox'
import ProductListHeading from '../../components/ProductListHeading'
import ProductListItem from '../../components/ProductListItem'
import { useDispatch } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import { useAdminProducts, useMessageAndErrorOther } from '../../utils/hooks'
import { deleteProduct } from '../../redux/actions/otherAction'
import { getAdminProducts } from '../../redux/actions/productAction'

const AdminPanel = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { loading, products, inStock, outOfStock } = useAdminProducts(
    dispatch,
    isFocused
  );

    const navigationHandler = (text) => {
        switch (text) {
          case "Category":
            navigation.navigate("categories");
            break;
          case "All Orders":
            navigation.navigate("adminorders");
            break;
          case "Product":
            navigation.navigate("newProduct");
            break;
    
          default:
            navigation.navigate("adminorders");
            break;
        }
      };
      const deleteProductHandler=(id)=>{
        dispatch(deleteProduct(id));
      }

      const loadingDelete = useMessageAndErrorOther(
        dispatch,
        null,
        null,
        getAdminProducts
      );

  return (

    <View style={defaultStyle}>
        <Header back={true} />
        <View style={{ paddingTop: 50, marginBottom: 20}}>
        <Text style={formHeading}>Admin Panel</Text>
      </View>

      {loading ? (
        <Loader/>
      ) : (
        <>
  
        <View
            style={{
              backgroundColor: colors.color3,
              borderRadius: 20,
              alignItems: "center",
              top:5
            }}
          >
            <Chart inStock={inStock} outOfStock={outOfStock} />
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                margin: 10,
                justifyContent: "space-between",
                top:3
              }}
            >
              <ButtonBox
                icon={"plus"}
                text={"Product"}
                handler={navigationHandler}
              />

              <ButtonBox
                icon={"format-list-bulleted-square"}
                text={"All Orders"}
                handler={navigationHandler}
                reverse={true}
              />
              <ButtonBox
                icon={"plus"}
                text={"Category"}
                handler={navigationHandler}
              />
            </View>
          </View>
          <ProductListHeading/>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
            {!loadingDelete &&
                products.map((item, index) => (
                  <ProductListItem
                    navigate={navigation}
                    deleteHandler={deleteProductHandler}
                    key={item._id}
                    id={item._id}
                    i={index}
                    price={item.price}
                    stock={item.stock}
                    name={item.name}
                    category={item.category?.category}
                    imgSrc={item.images[0].url}
                  />
                ))}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  )
}

export default AdminPanel