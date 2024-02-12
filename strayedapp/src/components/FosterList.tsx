import React from 'react';
import axios from 'axios';
import '../css/css.css';
import {Grid, Center, ScrollArea} from '@mantine/core'
import ticketsImage from "./../imgz/doggo.png";
import ModalAddPet from './ModalAddPet'
import ModalEditDog from './ModalEditDog'
import { useDisclosure } from '@mantine/hooks';
import Icon from '@mdi/react';
import { mdiFolderUploadOutline } from '@mdi/js';

import { Modal, Button, Group,Popover,TextInput,Textarea,Title,Box,Paper,Space} from '@mantine/core';
import {closeAllModals, modals, ModalsProvider} from '@mantine/modals';

import { Card, Image, Text, Badge, SimpleGrid } from '@mantine/core';

export default class PetList extends React.Component<any,{ogImages:any,singledog:Array<any>,pets:Array<any>,render:boolean,id:any,description:any,dogName:any,images:any,status:any,location:any}> {
  constructor(props:any){
  super(props);
  this.state = {
    pets: [],
    singledog: [], 
    render:true,
    id:'',
    description:'',
    dogName:'',
    images:'',
    status:'',
    ogImages:'',
    location:''
  }
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
  this.handleSubmitEdit=this.handleSubmitEdit.bind(this);
  this.handleDesc=this.handleDesc.bind(this);
  this.handleStatus=this.handleStatus.bind(this);
  this.handleLocation=this.handleLocation.bind(this);

}

  componentDidMount() {
    var access_token="ak_2Npsl2Pcqr38HRaCq3tHBThq2Aq"
    axios.get('/sessionFosters', {
 })
      .then(res => {
        const pets = res.data;
        this.setState({ pets });
      })
      setTimeout(() => {
        this.setState({ render : !this.state.render })
     }, 100000);
  }

  handleSubmitEdit= async(event:any)=> {
   
    event.target.reset();

    event.preventDefault();

    const data = new URLSearchParams();
    data.append("ID",this.state.id)
    console.log("updating dname"+this.state.dogName)
    data.append('name', this.state.dogName);
    data.append('location',this.state.location);

    for (var i = 0; i < this.state.images.length; i++) {

      console.log(this.state.images[i])
    }
    data.append('arr',JSON.stringify(this.state.images))
    data.append('description',this.state.description)
    data.append('status',this.state.status)
    let response = await fetch('/dogEdit',
    {
      method: 'post',
      body: data,
   
    }
  );

  let res = await response.json();
  if (res.status !== 1){
    alert('Error uploading file');
  }
  this.onClear();

};

  handleSubmit= async(event:any)=> {
   
    event.target.reset();

    event.preventDefault();

    const data = new FormData();
    data.append("ID",this.state.id)
    data.append('name', this.state.dogName);

    for (var i = 0; i < this.state.images.length; i++) {

      console.log(this.state.images[i])
    }
    data.append('arr',JSON.stringify(this.state.images))
    data.append('description',this.state.description)
    data.append('status',this.state.status)
    data.append('location',this.state.location)
    let response = await fetch('/dogEdit',
    {
      method: 'post',
      body: data,


    }
  );
  this.onClear();
  let res = await response.json();
  if (res.status !== 1){
    alert('Error uploading file');
  }

};
uploadFile = async (e:any) => {
  var access_token="ak_2Npsl2Pcqr38HRaCq3tHBThq2Aq"
  const file = e.target.files[0];
 console.log (e.target.files[0].name)

 this.setState({ images: [
  ...this.state.images,,,
  e.target.files[0].name
]})
  if (file != null) {
    const data = new FormData();
    data.append('file_from_react', file);

    let response = await fetch('/picUpload',
      {
        method: 'post',
        body: data,
      
      }
    );
    let res = await response.json();
    if (res.status !== 1){
      alert('Error uploading file');
    }
  }

};
onClear = () => {
  this.componentDidMount();
  this.setState({
    dogName: '',
    images:'',
    status: '',
    ogImages:'',
    description: '',
    id:'',
    location:''

  })
};
handleChange(event:any) {
  event.preventDefault();
  this.setState({dogName: event.target.value});
}
handleDesc(event:any){
  event.preventDefault();
  this.setState({description:event.target.value});
}
handleStatus(event:any){
  event.preventDefault();
  this.setState({status: event.target.value})
}
handleLocation(event:any){
  event.preventDefault();
  this.setState({location: event.target.value})
}
stateChange = () => {
  this.componentDidMount()
}
 openModal=()=>{
  console.log("AT FORM "+this.state.images)

  modals.open({
    modalId:('1'),

    title: <Text
    component="span"

    

    size="xl"
    weight={700}
    style={{ fontFamily: 'Greycliff CF, sans-serif',color:'#544179' }}
  >
    Edit Profile
  </Text>,
    children: (

      <>

<form id="register"  onSubmit={this.handleSubmit}>
        <TextInput
defaultValue={this.state.dogName}
label="Name"
onChange={this.handleChange}
withAsterisk

/>
<Space h='md'></Space>
<Textarea
defaultValue={this.state.description}
label="Description"
withAsterisk
onChange={this.handleDesc}

/>

<Space h='md'></Space>
<TextInput
defaultValue={this.state.location}
label="Status"
onChange={this.handleLocation}
withAsterisk

/>
<Space h='md'></Space>





    


      <input type="submit"  id="actual-button" value="submit" onClick={() => modals.closeAll()} hidden/>
      <Center>
      <label htmlFor="actual-button"><Paper style={{backgroundColor:"#2F575F"}} shadow="xs" p="sm">
      <Text color='white' fw={700}>Submit</Text>
      
       

      </Paper></label></Center>
      <Space h='lg'></Space>

</form>

      </>
    ),
  });

 }
 openModalLost=()=>{
  console.log("AT FORM "+this.state.images)

  modals.open({
    modalId:('1'),

    title: <Text
    component="span"

    variant="gradient"

    size="xl"
    weight={700}
    style={{ fontFamily: 'Greycliff CF, sans-serif' }}
  >
    Report Lost
  </Text>,
    children: (

      <>

<form id="register"  onSubmit={this.handleSubmit}>
  <TextInput
defaultValue={this.state.status}
label="Status"
onChange={this.handleStatus}
withAsterisk

/>

      <input type="submit"  id="actual-button" value="submit" onClick={() => modals.closeAll()}/>

</form>

      </>
    ),
  });

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
      
      <Text size='sm' color='dimmed'><Center>Description</Center></Text>
      <ScrollArea h='60'>
      <Text size="sm" color="dimmed">
      
      {description}
      </Text>
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

    return(

      <div className="petList">

      <div className="container">

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

      </div>
      </div>
    )
  }
}