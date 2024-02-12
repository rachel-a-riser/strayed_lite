import * as L from "leaflet";
import "leaflet-easybutton";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import Icon from "@mdi/react";
import { mdiDogSide } from "@mdi/js";
import addressFromCoordinates from "./APItesting";
import { mdiFolderUploadOutline } from "@mdi/js";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import React from "react";
import { useEffect } from "react";
import "../css/css.css";
import { LoadingOverlay } from "@mantine/core";
import {
  Box,
  Button,
  SimpleGrid,
  Center,
  Space,
  Text,
  Paper,
  Textarea,
  Image
} from "@mantine/core";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import ModelAddPet from "./ModalAddPet";

import { TextInput } from "@mantine/core";
import { closeAllModals, modals, ModalsProvider } from "@mantine/modals";

import axios from "axios";
import { mdiDogService } from "@mdi/js";
import { parse } from "path";

export default class Map extends React.Component<
  any,
  {
    formCoords: any;
    formDescription: any;
    formAddress: any;
    images: any;
    formLocation: any;
    remount: any;
    userLocation: any;
    ipAdd: any;
    lat3: any;
    long3: any;
    lat2: any;
    long2: any;
    message: string;
    mark: Array<any>;
    pets: any;
    tracks: any;
    points: any;
    center: any;
    map: any;
    lat: 34.75;
    long: -92.3;
    render: boolean;
    dogs: Array<any>;
    markers: Array<any>;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      pets: [],
      userLocation: "",
      tracks: [],
      points: [],
      center: [],
      lat: 34.75,
      long: -92.3,
      map: "",
      message: "hi",
      lat2: "",
      long2: "",
      lat3: 0,
      long3: 0,
      ipAdd: "",
      remount: 1,
      formLocation: "",
      formAddress: "",
      images: [],
      formDescription: "",
      formCoords: "",

      render: true,
      dogs: [],
      mark: [],
      markers: [[35.35032, -94.352412]],
    };
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormDescription = this.handleFormDescription.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleFormLocation = this.handleFormLocation.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    
  }

  MyComponent = (arg: any) => {
    const map = useMap();
    var popup;

    var ltl;
    var desc;
    var myTemplate;
    var imgS;
    var addy;
    var date;
    var description;
    let url = "components/images/";
    var greenIcon = L.icon({
      iconUrl: "/images/doggo.png",

      iconSize: [50, 50], // size of the icon
      shadowSize: [50, 64], // size of the shadowla
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    {
      this.state.dogs.map((dogs) => (
        <ul className="no-bullets">
          <>
            <li key={dogs.SubmissionID}></li>
            {
              (greenIcon = L.icon({
                iconUrl: require(`${url}${dogs.SubmissionImage}`),

                iconSize: [50, 50],

                iconAnchor: [22, 94],
                popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
              }))
            }

            {(addy = `${dogs.Location}`)}
            {(date = `${dogs.Date}`.split("-"))}
            {(date = `${date[1]}` + "-" + `${date[2]}` + "-" + `${date[0]}`)}
            {(description = `${dogs.SubmissionDescription}`)}
            {(imgS = require(`${url}${dogs.SubmissionImage}`))}
            {
              (myTemplate = `<div><img src=${imgS}><br><br>${addy}<br><br>${date}<br><br>${description}</div>`)
            }
            {(popup = L.popup().setContent(myTemplate))}

            {L.marker(this.splitCoor(`${dogs.Coordinates}`), {
              icon: greenIcon,
            })
              .addTo(map)
              .bindPopup(popup)}
          </>
        </ul>
      ));
    }
    if (this.state.message == "hello") {
      map.flyTo([this.state["lat"], this.state["long"]]);
    }

    return null;
  };
  splitCoor(content: any) {
    let coor = content.split("!");
    console.log("coor " + coor);
    return coor as L.LatLngExpression;
  }

  MyMapComponent = (center: any) => {
    return (
      <div>
        <MapContainer
          style={{
            position: "relative",
            left: "-440px",
            height: "450px",
            width : "525px",
            border: " solid #544179",
          }}
          center={[this.state["lat"], this.state["long"]]}
          zoom={16}
          scrollWheelZoom={true}
        >
          <div>
            {" "}
            <this.MyComponent key={this.state.remount} />
          </div>
        </MapContainer>
      </div>
    );
  };
  ip() {
    var latlng;
    fetch("https://ip.seeip.org/jsonip?")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        this.setState({ ipAdd: data["ip"] });
        this.coordinates(data["ip"]);
      });
  }
  coordinates(ipa: any) {
    var latlng;
    fetch(
      "https://api.ipgeolocation.io/ipgeo?apiKey=648470381a3e476aa5d83aa180ed307e&ip=" +
        `${ipa}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data["latitude"] + "," + data["longitude"]);
        var send = `${data["longitude"]}` + "," + `${data["latitude"]}`;
        this.reverse(send);
      });
  }

  reverse(latlng: any) {
    console.log("in reverse" + { latlng });
    fetch(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        `${latlng}` +
        ".json?limit=1&access_token=pk.eyJ1IjoicnJpc2UwMDgiLCJhIjoiY2xsbDhudzMyMjdkMjNlbDZuamtodGF5eCJ9.lj_uk6sQyxHfoPjrUzP1BQ"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.features[0].place_name);
        this.setState({ userLocation: `${data.features[0].place_name}` });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  forward(address: any) {
    var cStr = "";
    console.log("in forward" + { address });
    fetch(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        `${address}` +
        ".json?access_token=pk.eyJ1IjoicnJpc2UwMDgiLCJhIjoiY2xsbDhudzMyMjdkMjNlbDZuamtodGF5eCJ9.lj_uk6sQyxHfoPjrUzP1BQ"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.features[0].center[0]);
        console.log(data.features[0].center[1]);
        let lat = `${data.features[0].center[1]}`;
        lat = lat.substring(0, 7);
        let long = `${data.features[0].center[0]}`;
        long = long.substring(0, 8);
        cStr = `${lat}` + "!" + `${long}`;
        console.log("THIS FAR" + cStr);
        this.setState({ formCoords: `${cStr}` });
      })
      .catch((err) => {
        console.log(err.message);
      });
    return cStr;
  }

  handleLocationChange = (event: any) => {
    event.preventDefault();
    let zip = event.target.value;
    axios
      .get(
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
          `${zip}` +
          ".json?proximity=ip&access_token=pk.eyJ1IjoicnJpc2UwMDgiLCJhIjoiY2xsbDhudzMyMjdkMjNlbDZuamtodGF5eCJ9.lj_uk6sQyxHfoPjrUzP1BQ"
      )
      .then(
        (res) => {
          const points = res.data;
          this.setState({ points });

          console.log("Response " + points.features[0].center);
          this.setState({ lat2: points.features[0].center[1] });
          this.setState({ long2: points.features[0].center[0] });
        },

        this.handleChanges
      );
  };

  componentDidMount() {
    this.ip();

    axios.get("/communityMap").then((res) => {
      const dogs = res.data;
      this.setState({ dogs });
    });
    setTimeout(() => {
      this.setState({ render: !this.state.render });
    });
  }

  handleLocation = (e: any) => {
    e.preventDefault();
    this.setState({ formLocation: e.target.value });
  };
  uploadFile = async (e: any) => {
    var access_token = "ak_2Npsl2Pcqr38HRaCq3tHBThq2Aq";
    const file = e.target.files[0];
    console.log(e.target.files[0].name);

    this.setState({ images: e.target.files[0].name });

    if (file != null) {
      const data = new FormData();
      data.append("file_from_react", file);

      let response = await fetch("/picUpload", {
        method: "post",
        body: data,
      });
     // let res = await response.json();
      //if (res.status !== 1) {
      //  alert("Error uploading file");
      }
   // }
  };
  
  handleSubmitForm = async (e: any) => {
    
    //await new Promise(r => setTimeout(this.openModalWaiting,5 ));
  
    e.preventDefault();
    
    //onClick={() => modals.closeAll()}
    this.openModalWaiting()
    
    
    console.log("Submit form")
    //this.state.images
    //this.state.formLocation

    console.log("coords" + this.state.formCoords);
    console.log("desc" + this.state.formDescription);
    console.log("loc" + this.state.formLocation);
    console.log("image" + this.state.images);
    ////////////////
    const data = new FormData();

    for (var i = 0; i < this.state.images.length; i++) {
      console.log(this.state.images[i]);
    }
    data.append("image", this.state.images);
    data.append("description", this.state.formDescription);
    data.append("location", this.state.formLocation);
    data.append("coords", this.state.formCoords);
    let response = await fetch("/mapAdd", {
      method: "post",
      body: data,
      mode: "cors",
      referrerPolicy: "no-referrer",
    });

    //this.setState({ remount: this.state.remount + 1 });
    this.onClearForm();
   


  };
wait(ms:any){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }
  onClearForm() {
   // this.setState({ remount: this.state.remount + 1 });
    this.setState({
      images: "",
      formDescription: "",
      formCoords: "",
      formLocation: "",
    });
    
  }
  handleFormLocation = (e: any) => {
    e.preventDefault();
    this.setState({ formLocation: e.target.value.replace(","," ") });
    this.forward(this.state.formLocation);
  };
  handleFormDescription = (e: any) => {
    e.preventDefault();
    this.setState({ formDescription: e.target.value });
  };
  openModalAdd = () => {
    this.setState({formLocation:this.state.userLocation})
        this.coordinates(this.state.ipAdd)

        modals.open({

          children: (

            <>
      <div id='modal'>
      <form onSubmit={this.handleSubmitForm}>
      <TextInput

label="Location"
defaultValue={this.state.userLocation}
onChange={this.handleFormLocation}
withAsterisk
/>              <Space h="lg"></Space>
              <Textarea
                defaultValue={this.state.formDescription}
                label="Share any useful descriptions here"
                onChange={this.handleFormDescription}
              />
              <Space h="lg"></Space>
              <input
                type="file"
                id="file-butt"
                onChange={this.uploadFile}
                multiple
                hidden
              />

              <label htmlFor="file-butt">
                <Paper
                  style={{ backgroundColor: "#2F575F" }}
                  shadow="xs"
                  p="sm"
                >
                  <SimpleGrid cols={2}>
                    <div>
                      <Text color="white" fw={700}>
                        Select image
                      </Text>
                    </div>
                    <div>
                      <Icon
                        path={mdiFolderUploadOutline}
                        size={1}
                        color="white"
                        style={{ float: "right", padding: "15px" }}
                      />
                    </div>
                  </SimpleGrid>
                  <Center>
                    
                  </Center>
                </Paper>
              </label>
              <Space h="lg"></Space>

              <Space h="xl"></Space>

              <input
                type="submit"
                id="actual-button"
                value="submit"
                onClick={() => modals.closeAll()}
                hidden
              />
              <Center>
                <label htmlFor="actual-button">
                  <Paper
                    style={{ backgroundColor: "#2F575F" }}
                    shadow="xs"
                    p="xs"
                  >
                    <Text color="white" fw={700}>
                      Submit
                    </Text>
                  </Paper>
                </label>
              </Center>
            </form>
          </div>
        </>
      ),
    });
  };

  openModal = () => {
    modals.open({
      children: (
        <>
          <div id="modal">
            <form onSubmit={this.handleSubmit}>
              <TextInput
                label="Current Location"
                onChange={this.handleLocationChange}
                withAsterisk
              />
              <Space h="xl"></Space>

              <input
                type="submit"
                id="actual-button"
                value="submit"
                onClick={() => modals.closeAll()}
                hidden
              />
              <Center>
                <label htmlFor="actual-button">
                  <Paper
                    style={{ backgroundColor: "#2F575F" }}
                    shadow="xs"
                    p="xs"
                  >
                    <Text color="white" fw={700}>
                      Submit
                    </Text>
                  </Paper>
                </label>
              </Center>
            </form>
          </div>
        </>
      ),
    });
  };

  handleSubmit = (e: any) => {
    e.preventDefault();

    this.setState({ message: "hello" });
    this.handleChanges(e);
  };
  handleChanges = (e: any) => {
    this.setState({ lat: this.state["lat2"] });
    this.setState({ long: this.state["long2"] });
  };
  openModalWaiting() {
    
    modals.open({
      children: (
        <>
        <center>
          <div id="modal">
        
       
          <Image width={100} height={100} src={require('./images/pload.gif')} />
          <Text>Upload may take several seconds as we are also looking for potential matches. Thank you for your submission.</Text>
          
          
        </div>
        </center>
        </>
      ),
    });
    setTimeout(() => {
    window.location.reload();
        
    }, 15000);
  
    

    
  };

  openModal2() {
    modals.open({
      children: (
        <>
          <div id="modal">
            <form>
              <p>PLACEHOLDER</p>

              
            </form>
          </div>
        </>
      ),
    });
    
    //this.setState({remount:this.state.remount+1})
    
  }

  render() {
    return (
      <SimpleGrid cols={2}>
        <div id="modal">
          <Button
            style={{
              position: "fixed",
              backgroundColor: "#2F575F",
              borderColor: "#2F575F",
              fontSize: "medium",
            }}
            size="sm"
            variant="outline"
            c=""
            onClick={() => {
              this.openModal();
            }}
          >
            <Text c="white">Change Location</Text>
          </Button>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Button
            style={{
              position: "fixed",
              borderColor: "#2F575F",
              backgroundColor: "#2F575F",
              fontSize: "medium",
            }}
            size="sm"
            variant="outline"
            c=""
            onClick={() => {
              this.openModalAdd();
            }}
          >
            <Text c="white">Add to Map</Text>
          </Button>
        </div>
        <div id="map">
          <this.MyMapComponent key={this.state.remount} />
        </div>
      </SimpleGrid>
    );
  }
}
