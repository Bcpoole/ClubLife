import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableNativeFeedback,
  Image,
  TouchableOpacity,
} from 'react-native';


//import TabNavigator from 'react-native-tab-navigator';
//import Communications from 'react-native-communications';


class EditClub extends Component {
    constructor(props){
        super(props);
        this.state = {
            hasData: false,
            data: [],
            newVal: '',
            currentVal:'',

            //newValues : '',
            newValues : {}
            //hasValues:false            

            



        };
        //this.setState({hasValues:false});
    }
    


    _resultsView(){
        var TouchableElement = TouchableNativeFeedback;
        var officer = true; // figure this out later
        //var vals = ['Secondary Advisor Department','Meeting Location','Vice President Email','President Email','Parent Organization','Meeting Times','Advisor Email','Vice President Name','Advisor Phone','Organization Email','Secretary Name','Advisor Department','Seceretary Email','Primary Contact','Meeting Day','Secondary Advisor Name and Title','url','Advisor Name and Title','Secondary Advisor Phone','Summary','Treasurer Email','Secondary Advisor Email','Main Summary','About Summary','Name', 'President Name'];
        //image


        var data = this.state.data;
        var yo = this;

        var variableNames = ({'secondaryAdvisorDepartment':'Secondary Advisor Department','organizationMeetingLocation':'Meeting Location',
        'vicePresidentEmail':'Vice-President Email','presidentEmail':'President Email','parentOrganization':'Parent Organization',
        'organizationMeetingTime':'Meeting Time','advisorEmail':'Advisor Email','vicePresidentName':'Vice-President',
        'advisorPhone':'Advisor Phone','organizationEmail':'Organization Email','secretaryName':'Secretary',
        'advisorDepartment':'Advisor Department','secretaryEmail':'Secretary Email','primarycontact':'Primary Contact',
        'organizationMeetingDay':'Meeting Day','secondaryAdvisorNameAndTitle':'Secondary Advisor','url':'Website','advisorNameAndTitle':'Advisor',
        'secondaryAdvisorPhone':'Secondary Advisor Phone','summary':'Summary','treasurerEmail':'Treasurer Email',
        'secondaryAdvisorEmail':'Secondary Advisor Email','mainSummary':'Main Summary','aboutSummary':'About Summary',
        'name':'Club Name','presidentName':'President'});


        function hey(changedVal,originalVal){
            //if (boo in this.state.newValues){
            if (changedVal in yo.state.newValues){
                return "RAWWWR";
                //return yo.state.newValues[changedVal];
            }
            else{
                return originalVal;
            }
         }


        var clubValue= ()=>{

            var returnValue = [];
            //this.state.newValues;
                //onChangeText={(text)=>{this.state.newValues[i]=text}}
                //this.state.newValue.push(club[prop]);
            data.map(club=> {
                var i = 0;

                for (let prop in club){
                        //this.state.newValues;

                        if (prop==="id" || prop === "events" || prop==="posts" || prop==="img"){
                            continue;
                        }


                        returnValue.push(
                            <View>
                                <Text style={styles.welcome}>
                                    {variableNames[prop]}:
                                </Text>
                                <TextInput
                                    style = {styles.textEdit}
                                    onChangeText={(newText)=>{

                                        var obj = Object.assign(this.state.newValues,{prop:newText});
                                        //this.state.newValues[club[prop]] = newText;
                                        this.setState({newValues:obj});
                                        }
                                    }

                                    value = {hey(prop,club[prop])}
                                     > 
                                </TextInput>
                            </View>);
                        i++;                }

                }, this) // end of map
            return returnValue;
            
        }
        
        // var content = (<ScrollView style = {{marginTop: 30, paddingBottom: 30}}>

        //     {clubValue()}
        //     <Text>{this.state.newValues[0]}</Text>
        //     <TouchableElement style = {styles.button} onPress = {()=>{alert(blah[1])}}>

        // }

        var content = (<ScrollView style = {{marginTop: 30, paddingBottom: 30}}>

            {clubValue()}
            <Text>{this.state.newValues[0]}</Text>
            <TouchableElement style = {styles.button} onPress = {()=>{alert(blah[1])}}>
                <View><Text>Submit</Text></View>
            </TouchableElement>
            <TouchableElement style = {styles.button} onPress = {()=>this._onGoClub()}>
                <View><Text>Back</Text></View>
            </TouchableElement>

        </ScrollView>);

       return content;


    }


    _processSubmit(){
        var jsonString = '{';
        var id;
        data.map(club=>{
            id = club.id;
            for(let prop in club){
                if (prop in this.state.newValues){
                    jsonString+="\"" + prop + "\":" + this.state.newValues[prop] + ",";
                }
                else{
                    jsonString+="\"" + prop + "\":" + club[prop] + ",";
                }

            }
        })
        jsonString+='}';

        var updatedData = JSON.parse(jsonString);

        const url = "http://skeleton20161103012840.azurewebsites.net/api/organizations/name?name="+
                this.props.route.state.club.name.replace(" ","+");
        fetch(url,
            {
                method: "POST",
                body: updatedData
            })
            .then(function(res){ return res.json(); })
            .then(function(data){ alert( JSON.stringify( data ) ) })


        
    }
    

    _processSubmit(){
        var jsonString = '{';
        var id;
        data.map(club=>{
            id = club.id;
            for(let prop in club){
                if (prop in this.state.newValues){
                    jsonString+="\"" + prop + "\":" + this.state.newValues[prop] + ",";
                }
                else{
                    jsonString+="\"" + prop + "\":" + club[prop] + ",";
                }
                
            }
        })
        jsonString+='}';
        
        var updatedData = JSON.parse(jsonString);
        
        const url = "http://skeleton20161103012840.azurewebsites.net/api/organizations/name?name="+
                this.props.route.state.club.name.replace(" ","+");
        fetch(url,
            {
                method: "POST",
                body: updatedData
            })
            .then(function(res){ return res.json(); })
            .then(function(data){ alert( JSON.stringify( data ) ) })
        
    }
    

    


    render() {
        return this._resultsView();

    }
        // Jonathan's component code
    componentDidMount() {
        const url = "http://skeleton20161103012840.azurewebsites.net/api/organizations/name?name="+
                this.props.route.state.club.name.replace(" ","+");
        fetch(url)
            .then(res=>res.json())
            .then(json => {
                this.setState({
                    hasData: true,
                    data: json
                })
            })
            .catch(e => {
                console.error(e);
                //TODO: figure out how to navigate back out if something went wrong
            })
        }

    _onGoClub() {
        this.props.navigator.push({
            type: 'club',
            index: this.props.route.index+1,
            state: this.props.route.state,
        })
    }


}

   module.exports = EditClub;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
  //  textAlign: 'center',
    margin: 10,
  },
  instructions: {
    //textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  profilepic: {
      height: 100,
      width: 100

  },
  pad: {
      justifyContent: 'center',
      alignItems: 'center',

  },
  message: {
      borderWidth: 1,
  },
  edit: {
      height: 25,
      width: 25,

  },
  textEdit: {
    marginLeft: 20,
    height: 40,
    width: 200,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1
  },
  box: {

      flexDirection: 'row',
      flexWrap: 'wrap'

  },
  longBox: {
      height: 125

  },
  boxSpace:{
    //   flexDirection: 'row',
    //   flexWrap: 'wrap',
      paddingTop: 20,
      paddingLeft: 20
  }
});
