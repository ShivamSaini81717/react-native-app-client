import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors, defaultStyle, formHeading, inputOptions } from '../../styles/styles'
import Header from '../../components/Header'
import { Avatar, Button, TextInput } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { useMessageAndErrorOther, useSetCategories } from '../../utils/hooks'
import { addCategory, deleteCategory } from '../../redux/actions/otherAction'


const Categories = ({ navigation }) => {

  
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
  
    useSetCategories(setCategories, isFocused);
    const loading = useMessageAndErrorOther(dispatch, navigation, "adminpanel");

    const deleteHandler = (id) => {
        console.log("delete",id)
        dispatch(deleteCategory(id));
      };
    
      const submitHandler = () => {
        console.log("Submit")
        dispatch(addCategory(category));
      };
  return (
    <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
      <Header back={true} />

      <View style={{ marginBottom: 20, paddingTop: 50 }}>
        <Text style={formHeading}>Categories</Text>
      </View>
      <ScrollView
        style={{
          marginBottom: 20,
        }}
      >
        <View
          style={{
            backgroundColor: colors.color2,
            padding: 20,
            minHeight: 400,
          }}
        >
          {categories.map((i) => (
            <CategoryCard
              name={i.category}
              id={i._id}
              key={i._id}
              deleteHandler={deleteHandler}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.container}>
        <TextInput
          {...inputOptions}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />

        <Button
          textColor={colors.color2}
          style={{
            backgroundColor: colors.color1,
            margin: 20,
            padding: 6,
          }}
          loading={loading}
          disabled={!category}
          onPress={submitHandler}
        >
          Add
        </Button>
      </View>

    </View>
  )
}

const CategoryCard = ({ name, id, deleteHandler }) => (
    <View style={styles.cardContainer}>
      <Text style={styles.cardText}>{name}</Text>
      <TouchableOpacity onPress={() => deleteHandler(id)}>
        <Avatar.Icon
          icon={"delete"}
          size={30}
          style={{
            backgroundColor: colors.color1,
          }}
        />
      </TouchableOpacity>
    </View>
  );

export default Categories

const styles = StyleSheet.create({
    container: {
      padding: 20,
      elevation: 10,
      borderRadius: 10,
      backgroundColor: colors.color3,
    },
  
    cardContainer: {
      backgroundColor: colors.color2,
      elevation: 5,
      margin: 10,
      padding: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 10,
    },
    cardText: {
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: 1,
    },
  });