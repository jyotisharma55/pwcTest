import React, {Component} from 'react';
import {Text, View, SafeAreaView, TouchableOpacity,FlatList} from 'react-native';
import moment from 'moment'
let list=[]
export class App extends Component {
  
   state={
     todoList:[]

   }

   deleteItem=(id)=>{

   let delList =  this.state.todoList.filter(data=>{
        console.log(data.id,id)
        return data.id != id
    })
   console.log(delList)
    this.setState({todoList:delList})
    
   }

   renderView=({item,index})=>{
     return(
      <View
          style={{
            margin: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          
            padding: 10,
          }}>
            <View style={{flexDirection:'column'}}>
            <Text style={style.textStyle}>Item{item.id}</Text>
            <Text style={style.textStyle}>{moment(item.time).format('DD MMM YYYY HH:MM:SS')}</Text>
            </View>
         
          <TouchableOpacity onPress={()=>{
            //console.log(index+1)
           this.deleteItem(item.id)
          }}>
            <View style={{backgroundColor: 'red'}}>
              <Text style={[style.textStyle, {padding: 5,color:'white'}]}>Delete</Text>
            </View>
          </TouchableOpacity>
        </View>
      
     )
      
     
   }

   addTodoList=()=>{
     let list = []
     let toDo={
       time:new Date(),
       id:this.state.todoList.length+1
     }

    // Object.assign(list,toDo)
     let list1 = [toDo,...this.state.todoList]
  
    this.setState({todoList:list1},function(){
     
    })
   }

  render() {
    return (
      <SafeAreaView style={style.viewStyle}>
        <View
          style={{
            margin: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderBottomColor: 'grey',
            padding: 10,
          }}>
          <Text style={style.textStyle}>To do List</Text>
          <TouchableOpacity onPress={()=>{
            this.addTodoList()
          }}>
            <View style={{backgroundColor: 'lightgreen'}}>
              <Text style={[style.textStyle, {padding: 5}]}>ADD</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList data={this.state.todoList} renderItem={this.renderView}  keyExtractor={(index) => index.toString()}/>
        </View>
      </SafeAreaView>
    );
  }
}

const style = {
  viewStyle: {flex: 1},
  textStyle: {fontSize: 15, color: 'black', fontStyle: 'italic'},
};
export default App;
