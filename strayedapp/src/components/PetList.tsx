import React, { useState } from "react";
import axios from "axios";
import "../css/css.css";
import Icon from "@mdi/react";
import { mdiFolderUploadOutline } from "@mdi/js";
import { Grid, Center, MultiSelect,Checkbox, ScrollArea} from "@mantine/core";
import ticketsImage from "./../imgz/doggo.png";
import ModalAddPet from "./ModalAddPet";
import ModalEditDog from "./ModalEditDog";
import { useDisclosure } from "@mantine/hooks";


import {
  Modal,
  Button,
  Space,
  Group,
  Container,
  AspectRatio,
  Paper,
  Alert,
  Notification,
  Popover,
  TextInput,
  Textarea,
  Title,
  Box,
  Radio,
  Select,
} from "@mantine/core";
import { closeAllModals, modals, ModalsProvider } from "@mantine/modals";

import { Card, Image, Text, Badge, SimpleGrid } from "@mantine/core";

export default class PetList extends React.Component<
  any,
  {
    lost: any;
    imageString: string;
    ogImages: any;
    singledog: Array<any>;
    pets: Array<any>;
    render: boolean;
    id: any;
    description: any;
    dogName: any;
    images: any;
    status: any;
    location: any;
    homies: Array<any>;
    colors:any,
    options:Array<any>,
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      pets: [],
     
      options: [{name: "one"},{name:"two"}],
   
      colors:"blue!",
      singledog: [],
      render: true,
      id: "",
      homies: [],
      description: "",
      dogName: "",
      images: "",
      status: "",
      ogImages: "",
      location: "",
      imageString: "",
      lost: "Lost",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    this.handleDesc = this.handleDesc.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handleColors= this.handleColors.bind(this);
  }

  componentDidMount() {
    axios.get("/sessionPets", {}).then((res) => {
      const pets = res.data;
      this.setState({ pets });
    });
    axios.get("/notLost", {}).then((res) => {
      const homies = res.data;
      this.setState({ homies });
    });
    setTimeout(() => {
      this.setState({ render: !this.state.render });
    }, 100000);
  }

  handleSubmitEdit = async (event: any) => {
    event.target.reset();

    event.preventDefault();

    console.log("colors after submit "+this.state.colors)
    const data = new URLSearchParams();
    data.append("ID", this.state.id);
    console.log("updating dname" + this.state.dogName);
    data.append("name", this.state.dogName);
    data.append("location", this.state.location);

    for (var i = 0; i < this.state.images.length; i++) {
      console.log(this.state.images[i]);
    }
    data.append("arr", this.state.images);
    data.append("description", this.state.description);
    console.log("desc to be send "+this.state.description);
    data.append("status", this.state.status);
    let response = await fetch("/dogEdit", {
      method: "post",
      body: data,
      headers: {
        Authentication: "",
      },
    });

    let res = await response.json();
    if (res.status !== 1) {
      alert("Error uploading file");
    }
    this.onClear();
  };

  handleSubmit = async (event: any) => {
    event.target.reset();

    event.preventDefault();
    console.log(JSON.stringify(this.state.colors))
    
    const data = new FormData();
    data.append("ID", this.state.id);
    data.append("name", this.state.dogName);

    for (var i = 0; i < this.state.images.length; i++) {
      console.log(this.state.images[i]);
    }
    data.append("arr", JSON.stringify(this.state.images));
    data.append("description", this.state.description);
    data.append("status", this.state.status);
    data.append("location", this.state.location);
    let response = await fetch("/dogEdit", {
      method: "post",
      body: data,
      mode: "cors",
      referrerPolicy: "no-referrer",
    });
    this.onClear();
  };
  alert() {
    return (
      <Alert title="Bummer!" color="red">
        Something terrible happened! You made a mistake and there is no going
        back, your data was lost forever!
      </Alert>
    );
  }
  uploadFile = async (e: any) => {
    <Notification title="We notify you that">
      You are now obligated to give a star to Mantine project on GitHub
    </Notification>;
    var access_token = "ak_2Npsl2Pcqr38HRaCq3tHBThq2Aq";
    const file = e.target.files[0];
    console.log(e.target.files[0].name);

    this.setState({
      images: e.target.files[0].name,
    });
    var current = this.state.imageString;
    this.setState(
      {
        imageString: `${current}` + " " + `${e.target.files[0].name}`,
      },
      this.renderImageString
    );

    if (file != null) {
      const data = new FormData();
      data.append("file_from_react", file);

      let response = await fetch("/picUpload", {
        method: "post",
        body: data,
      });
      let res = await response.json();
      if (res.status !== 1) {
        alert("Error uploading file");
      }
    }
  };
  onClear = () => {
    this.componentDidMount();
    this.setState({
      dogName: "",
      images: "",
      status: "",
      ogImages: "",
      description: "",
      id: "",
      location: "",
      imageString: "",
    });
  };
  renderImageString = () => {
    return this.state.imageString;
  };
  handleChange(event: any) {
    event.preventDefault();
    this.setState({ dogName: event.target.value });
  }
  handleDesc(event: any) {
   event.preventDefault();
    
    this.setState({ description: event.target.value });
  }

  handleStatus(event: any) {
    this.setState({ status: event.target.value });
  }
  handleLocation(event: any) {
    event.preventDefault();
    this.setState({ location: event.target.value });
  }
  stateChange = () => {
    this.componentDidMount();
  };
  handleColors(event:any){
  event.preventDefault();
 this.setState({colors: this.state.colors+event.target.value+'!'})
   
  }
  openModal = () => {
    console.log("AT FORM " + this.state.images);

    modals.open({
      modalId: "1",

      title: (
        <Text
          component="span"
          size="xl"
          weight={700}
          style={{ fontFamily: "Greycliff CF, sans-serif", color: "#544179" }}
        >
          Edit Profile
        </Text>
      ),
      children: (
        <>
          <form
            id="register"
            style={{ textDecorationColor: "#544179" }}
            onSubmit={this.handleSubmit}
          >
            <TextInput
              defaultValue={this.state.dogName}
              label="Name"
              onChange={this.handleChange}
              withAsterisk
            />
            <Space h="md"></Space>
            <Select
      label="Status"
      placeholder="Select"
      searchable
      defaultValue={this.state.status}
     
      
      
      data={[
        { value: 'home', label: 'Home' },
        { value: 'lost', label: 'Lost' },
        
    
      ]}
      onSelect={this.handleStatus}
    />
    <Space h='md'></Space>

            <Textarea
              defaultValue={this.state.description}
              label="Description"
              onChange={this.handleDesc}
              withAsterisk
            />
            <Space h="md"></Space>
          
         
          
            <TextInput
              defaultValue={this.state.location}
              label="Location"
              onChange={this.handleLocation}
              withAsterisk
            />
            <Space h="lg"></Space>
        
            <input
              type="file"
              id="file-butt"
              onChange={this.uploadFile}
              multiple
              hidden
            />
            <div>{this.renderImageString()}</div>

            
            <Space h="lg"></Space>
            <Space h="lg"></Space>

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
                  p="sm"
                >
                  <Text color="white" fw={700}>
                    Submit
                  </Text>
                </Paper>
              </label>
            </Center>
            <Space h="lg"></Space>
          </form>
        </>
      ),
    });
  };
  imagesNamesMap() {
    const images = this.state.images;
    const listItems = images.map((image: any) => <li>{image}</li>);
    return <ul>{listItems}</ul>;
  }

  openModalLost = () => {
    console.log("AT FORM " + this.state.images);

    modals.open({
      modalId: "1",

      title: (
        <Text
          component="span"
          color="teal"
          size="xl"
          weight={700}
          style={{ fontFamily: "Greycliff CF, sans-serif" }}
        >
          Change Status
        </Text>
      ),
      children: (
        <>
          <Container>
            <form id="register" onSubmit={this.handleSubmit}>
              
        
              <Space h="lg"></Space>
              <Select
      label=""
      placeholder="Select"
      searchable
     
      
      
      data={[
        { value: 'home', label: 'Home' },
        { value: 'lost', label: 'Lost' }
    
      ]}
      onSelect={this.handleStatus}
    />
     <Space h="lg"></Space>
     <Text color="white">adfas</Text>
            

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
          </Container>
        </>
      ),
    });
  };
  
  makeCardAdd() {
    return (
      <Card
        className="cardBorder"
        shadow="md"
        padding="lg"
        radius="md"
        style={{
          borderColor: "#544179",
          height: "315px",
          width: "250px",
          color: "#544179",
        }}
        withBorder
      > </Card>
    );
  }

  makeCard(
    dName: any,
    status: any,
    description: any,
    image: any,
    ID: string,
    location: string

  ) {
    console.log(
     // "what the urls look like coming from the database: " + dName + " " + image
    );
    var butVar
    if (status=="home" || status=="Home"){
      butVar="lost"
    }
    if(status=="lost" || status=="Lost"){
      butVar="found"
    }
    butVar="Report "+butVar
      
      
    let url = "components/images/";
    let badgecolor = "teal";
    if (`${status}`.includes("ost")) {
      badgecolor = "pink";
    }

    return (
      <Card
        className="cardBorder"
        shadow="sm"
        padding="lg"
        radius="md"
        style={{
          borderColor: "#544179",
          height: "400px",
          width: "250px",
          color: "#544179",
        }}
        withBorder
      >
        <Card.Section>
          <Image
            src={require(`${url}${image.split("!")[0]}`)}
            height={200}
            width={270}
            fit="fill"
            alt="dog"
          />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text
            component="span"
            c="#2C3333"
            size="md"
            weight={700}
            style={{ fontFamily: "Greycliff CF, sans-serif", color: "#544179" }}
          >
            {dName}
          </Text>

          <Badge color={badgecolor}>{status}</Badge>
        </Group>

        <Box h={80}>
        
        
        <ScrollArea h='60'>
        <Center>
        <Text size="sm" color="dimmed">
        
        {description}
        </Text>
        </Center>
        </ScrollArea>
        </Box>
        
        <Center>
        <Group spacing="sm" align="center">
          <Group position="center">
            <Group position="center">
              <Button
                style={{
                  background: "#2F575F",
                  borderColor: "#2F575F",
                  fontSize: "medium",
                }}
                size="sm"
                variant="outline"
                c="teal"
                onClick={() => {
                  this.setState(
                    {
                      dogName: `${dName}`,

                      description: `${description}`,

                      id: `${ID}`,

                      ogImages: `${image}`,

                      status: `${status}`,

                      location: `${location}`,
                    },
                    this.openModal // here is where you put the callback
                  );
                }}
              >
                <Text c="white">Edit </Text>
              </Button>
              
            </Group>
          </Group>

          <Grid.Col span={1}>
            <Button
              style={{
                background: "#2F575F",
                borderColor: "#2F575F",
                fontSize: "medium",
              }}
              size="sm"
              variant="outline"
              c="teal"
              onClick={() => {
                this.setState(
                  {
                    dogName: `${dName}`,

                    description: `${description}`,

                    id: `${ID}`,

                    ogImages: `${image}`,

                    status: `${status}`,

                    location: `${location}`,
                  },
                  // here is where you put the callback
                );
              }}
            >
              <Text c="white" size='md'>Remove </Text>
            </Button>
          </Grid.Col>
        </Group>
        </Center>
      </Card>
    );
  }

  render() {
    var heading
    if (this.state.pets.length==0){
      heading=""
    }
    if (this.state.pets.length!=0){
      heading="Lost:"
    }
    var heading2
    if (this.state.homies.length==0){
      heading2=""
    }
    if (this.state.homies.length!=0){
      heading2="Home:"
    }

    return (
      <div className="petList">
        <div className="container">
          <p>{heading}</p>
          <ul>
  
              <Grid justify="space-between">
                {this.state.pets.map((pet) => (
                  <Grid.Col span={6}>
                    <ul className="no-bullets">
                      <li key={pet.DogID}></li>

                      {this.makeCard(
                        `${pet.Name}`,
                        `${pet.Status}`,
                        `${pet.ProfileDescription}`,
                        `${pet.ProfileImage}`,
                        `${pet.DogID}`,
                        `${pet.HomeLocation}`
                      )}
                    </ul>
                  </Grid.Col>
                ))}
                
              </Grid>
              
            
          </ul>
          <p>{heading2}</p>
          <ul>

          <Grid justify="space-between">
                {this.state.homies.map((pet) => (
                  <Grid.Col span={6}>
                    <ul className="no-bullets">
                      <li key={pet.DogID}></li>

                      {this.makeCard(
                        `${pet.Name}`,
                        `${pet.Status}`,
                        `${pet.ProfileDescription}`,
                        `${pet.ProfileImage}`,
                        `${pet.DogID}`,
                        `${pet.HomeLocation}`
                      )}
                    </ul>
                  </Grid.Col>
                ))}
                
              </Grid>
          </ul>
        </div>
      </div>
    );
  }
}
