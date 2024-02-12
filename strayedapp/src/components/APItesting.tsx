


import React from 'react'
import axios from'axios'

export default class APItesting extends React.Component<any,any>{
  constructor(props:any){
    super(props)


   this.state={
   
    }
    
  }
componentDidMount() {
    this.addressToCoordinates("Grant Ave Baptist Church Fort Smith")
    this.coordinatesToAddress("placeholder","placeholder")
    this.locationFromIP("placeholder")
    this.getIP()
    
}
getIP(){
 

const options = {
  method: 'GET',
  url: 'https://get-ip-address-and-basic-info.p.rapidapi.com/api.php',
  headers: {
    'X-RapidAPI-Key': 'ed7662a34fmsh81512c2b4ac74a0p184f44jsna690f2dabcc1',
    'X-RapidAPI-Host': 'get-ip-address-and-basic-info.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
}

addressToCoordinates(address:any){
    
  
    let addy=`${address}`

    const options = {
      method: 'GET',
      url: 'https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi',
      params: {address: `${addy}`},
      headers: {
        'X-RapidAPI-Key': 'ed7662a34fmsh81512c2b4ac74a0p184f44jsna690f2dabcc1',
        'X-RapidAPI-Host': 'address-from-to-latitude-longitude.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data.Results[0]["longitude"]);
    }).catch(function (error) {
      console.error(error);
    });
  }

  coordinatesToAddress(lat:any,lng:any){
    const options = {
      method: 'GET',
      url: 'https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi',
      params: {lat: '48.85824', lng: '2.29451'},
      headers: {
        'X-RapidAPI-Key': 'ed7662a34fmsh81512c2b4ac74a0p184f44jsna690f2dabcc1',
        'X-RapidAPI-Host': 'address-from-to-latitude-longitude.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data.Results[0]["address"]);
    }).catch(function (error) {
      console.error(error);
    });
  }
  
  locationFromIP(ip:any){



    const options = {
      method: 'GET',
      url: 'https://ip-to-location1.p.rapidapi.com/myip',
      params: {ip: '8.30.234.123'},
      headers: {
        'X-RapidAPI-Key': 'ed7662a34fmsh81512c2b4ac74a0p184f44jsna690f2dabcc1',
        'X-RapidAPI-Host': 'ip-to-location1.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data.geo["ll"]);
    }).catch(function (error) {
      console.error(error);
    });
    
  
  }
    
render(){

    return("")
    
}

}