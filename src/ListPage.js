import React, {Component} from 'react';
import {Text, TouchableOpacity, View, FlatList} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
export class ListPage extends Component {
  state = {showCalender: false, selectedDate: new Date(), list: []};

  componentDidMount() {
    this.fetchFunction();
  }

  fetchFunction = () => {
    fetch(
      'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=725&date=' +
        moment(this.state.selectedDate).format('DD-MM-yyyy'),
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.sessions);
        let list1 = responseJson.sessions
        list1 = list1.sort((a,b)=>{
            return a.available_capacity < b.available_capacity?1:-1
        })
        console.log("sorted",list1)
        this.setState({list: list1});
      })
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
      });
  };

  render() {
    return (
      <View style={{flex: 1, margin: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 0.5,
            padding: 10,
            borderBottomColor: 'blue',
          }}>
          <Text style={{fontSize: 20, color: 'blue'}}>
            {moment(this.state.selectedDate).format('DD-MM-yyyy')}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.setState({showCalender: true});
            }}>
            <Icons name={'calendar'} size={20} color="blue" />
          </TouchableOpacity>
        </View>

        <View>
          <FlatList
            data={this.state.list}
            keyExtractor={index => {
              index.toString();
            }}
            renderItem={({item, index}) => {
              return (
                <View style={{borderWidth:.5,borderColor:'blue',margin:10,padding:10}}>
                  <View
                    style={style.viewStyle}>
                    <Text style={style.textHeadingStyle}>Name</Text>
                    <Text style={style.subTextStyle}>{item.name}</Text>
                  </View>
                  <View
                    style={style.viewStyle}>
                    <Text style={style.textHeadingStyle}>Address</Text>
                    <Text style={style.subTextStyle}>{item.address}</Text>
                  </View>
                  <View
                    style={style.viewStyle}>
                    <Text style={style.textHeadingStyle}>Fee Type</Text>
                    <Text style={style.subTextStyle}>{item.fee_type}</Text>
                  </View>
                  <View
                    style={style.viewStyle}>
                    <Text style={style.textHeadingStyle}>Total Capacity</Text>
                    <Text style={style.subTextStyle}>{item.available_capacity}</Text>
                  </View>
                  <View
                    style={style.viewStyle}>
                    <Text style={style.textHeadingStyle}>Dose 1 Capacity</Text>
                    <Text style={style.subTextStyle}>{item.available_capacity_dose1}</Text>
                  </View>
                  <View
                    style={style.viewStyle}>
                    <Text style={style.textHeadingStyle}>Dose 2 Capacity</Text>
                    <Text style={style.subTextStyle}>{item.available_capacity_dose2}</Text>
                  </View>
                  <View
                    style={style.viewStyle}>
                    <Text style={style.textHeadingStyle}>Charges</Text>
                    <Text style={style.subTextStyle}>{item.fee}</Text>
                  </View>
                  <View
                    style={style.viewStyle}>
                    <Text style={style.textHeadingStyle}>Minimum Age</Text>
                    <Text style={style.subTextStyle}>{item.min_age_limit}</Text>
                  </View>
                
                  <View
                    style={style.viewStyle}>
                    <Text style={style.textHeadingStyle}>Vaccine Name</Text>
                    <Text style={style.subTextStyle}>{item.vaccine}</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>

        {this.state.showCalender ? (
          <DateTimePicker
            testID="dateTimePicker"
            value={this.state.selectedDate}
            mode={'date'}
            display="default"
            onChange={(date, selectedDate) => {
              console.log(date);
              this.setState({selectedDate: selectedDate, showCalender: false});
            }}
          />
        ) : null}
      </View>
    );
  }
}

const style={
    viewStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
      
      },
      textHeadingStyle:{
          fontSize:14,
          color:'black',
          fontWeight:'bold'
      },
      subTextStyle:{
          fontSize:12,
          color:'grey'
      }
}

export default ListPage;
