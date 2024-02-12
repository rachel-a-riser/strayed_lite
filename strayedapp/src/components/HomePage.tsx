import React from "react";
import PetList from "./PetList";
import Basic from "./Basic";
import BasicA from "./BasicA";
import { useDisclosure } from "@mantine/hooks";
import User from "./User";
import FosterList from "./FosterList";
import NavbarSimple from "./NavBarSimple";
import { useState } from "react";

import {
  Button,
  Collapse,
  TextInput,
  Select,
 
  Textarea,
  Paper,
} from "@mantine/core";
import {
  AppShell,
  Navbar,
  Header,
  Box,
  Footer,
  Group,
  Container,
  ScrollArea,
  Grid,
  Text,
  Tabs,
  Title,

  
 
  Center,
  Space,
 
  Card,
  Image,
  Badge,
} from "@mantine/core";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";

import {
  mdiHomeCircle,
  mdiAccountCircle,
  mdiMap,
  mdiShieldHomeOutline,
} from "@mdi/js";

import { useMantineTheme, PasswordInput } from "@mantine/core";


import { redirect } from "react-router-dom";

import { modals} from "@mantine/modals";
import '../App.css'

import axios from "axios";

export default class HomePage extends React.Component<
  any,
  {
    emailL: any;
    homies:Array<any>;
    passwordL: any;
    contact:any,
    messageL: any;
    appKey: any;
    fNameC: any;
    lNameC: any;
    emailC: any;
    dogSelectID:any,
    dogImage:any,
    passwordC: any;
    messageC: any;
    remount: any;
    sessionHeader: string;
    value: any;
    zip: any;
    description: any;
    petz: any;
    currentURL: any;
    url: any;
    status: any;
    render: boolean;
    verify: any;

    ///////////////////Foy
    pets: Array<any>; //lost
    pets2: Array<any>; //submissions
    pets3: Array<any>; //session
    pets4: Array<any>; //Foster
    pets5: Array<any>; //Sheltered
    id: any;
    shelterid: any;
    sesid: any;
    lostid: any;
    email: any;
  }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      dogImage:'',
      contact:'None',
      sessionHeader: "",
      dogSelectID:'',
      value: "",
      url: [],
      homies:[],
      zip: "",
      description: "",
      petz: [],
      currentURL: "",
      status: "",
      render: true,
      remount: "1",
      emailL: "",
      passwordL: "",
      fNameC: "",
      lNameC: "",
      emailC: "",
      passwordC: "",
      verify:1,

      messageC: "",

      messageL: "",
      appKey: "1",

      ///////////////////////////////foy
      pets: [], //lost dogs
      pets2: [], //found submissions
      pets3: [], //session dogs
      pets4: [],
      pets5: [],
      id: "",
      shelterid: "",
      sesid: "",
      lostid: "",
      email: "",
    };
    /////////////////////////////////
    this.handleChange = this.handleChange.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeDesc = this.handleChangeDesc.bind(this);
    this.handleZip = this.handleZip.bind(this);
    ////////////////////////

    this.handleEmailL = this.handleEmailL.bind(this);
    this.handlePasswordL = this.handlePasswordL.bind(this);
    this.handleSubmitL = this.handleSubmitL.bind(this);
    /////////////////////////////
    this.handlefNameC = this.handlefNameC.bind(this);
    this.handlelNameC = this.handlelNameC.bind(this);
    this.handleEmailC = this.handleEmailC.bind(this);
    this.handlePasswordC = this.handlePasswordC.bind(this);
    this.handleSubmitC = this.handleSubmitC.bind(this);
    ////////////////////////

    
    this.handleChangeF = this.handleChangeF.bind(this);
    this.handleChangeContact=this.handleChangeContact.bind(this)

    /////////////////END BIND HOMEPAGE METHODS///////////
  }

  //lost dog cards
  makeCard(id: any, dName: any, status: any, description: any, image: string, location: any) {
    let url = "components/images/";
    let re=""
    if (status.includes("!R")){
      re="Marked recovered by owner"
    }
    return (
      <Card
        
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{
          borderColor: "#544179",
          height: "350px",
          width: "250px",
          color: "#544179",
          alignItems: "left"
        }}
      >
        <Card.Section>
          <Image
            src={require(`${url}${image}`)}
            height={200}
            width={270}
            fit="fill"
            alt="dog"
          />
        </Card.Section>

        <Group  position="apart" mt="md" mb="xs">
          <Text
            component="span"
            align="center"
            color="#544179"
            size="md"
            weight={700}
            style={{ fontFamily: "Greycliff CF, sans-serif" }}
          >
            {dName}
          </Text>

          <Badge color="pink">{status}</Badge>
        </Group>

        <Text size="xs" color="dimmed">
        
        </Text>
        <Space h='sm'></Space><Center>
        <Text size='xs'>Home Location near: {location}</Text></Center>
       
        <Center>
        <Group spacing="medium" align={"center"}>
          <Grid.Col span={1}>
            <Button
              style={{ background: "#2F575F", fontSize: "medium" , textAlign: "center"}}
              size="sm"
              onClick={() => {
                this.setState(
                  {
                    lostid: `${id}`,
                    dogImage: `${image}`
                  },
                  this.openModalEmail
                );
              }}
            >
              Contact Owner
            </Button>
          </Grid.Col>
        </Group>
        </Center>
      </Card>
    );
  }
  //found dogs cards
  makeCard2(Date: any, Location: any, image: string, id: any,type:any) {
    let url = "components/images/";
    let description=""
    if(type.includes("!R")){
      description="Marked recovered by owner"
    }
    let dataSplit=Date.split("-")
    Date=dataSplit[1]+"-"+dataSplit[2]+"-"+dataSplit[0]

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{
          borderColor: "#544179",
          height: "350px",
          width: "250px",
          color: "#544179",
        }}
      >
        <Card.Section>
          <Image
            src={require(`${url}${image}`)}
            height={200}
            width={270}
            fit="fill"
            alt="dog"
          />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text
            component="span"
            align="center"
            color="#544179"
            size="md"
            weight={700}
            style={{ fontFamily: "Greycliff CF, sans-serif" }}
          >
            Date: {Date}
          </Text>
        </Group>

        <Text size="xs" color="dimmed">
          Near: {Location}
        </Text>
        <Text size='xs'>{description}</Text>
        <Space h='sm'></Space>
        <Center>
        <Group spacing="medium" align="center">
          <Grid.Col span={1}>
            <Button
              style={{ background: "#2F575F", fontSize: "sm" }}
              size="sm"
              onClick={() => {
                this.setState(
                  {
                    id: `${id}`,
                    dogImage: `${image}`
                  },

                  this.openModalF
                );
              }}
            >
              Add to Matches
            </Button>
          </Grid.Col>
        </Group>
        </Center>
      </Card>
    );
  }
  makeCard20(Date: any, Location: any, image: string, id: any, description:any,type:any) {
    let url = "components/images/";
    let dataSplit=Date.split("-")
    let rec=''
    Date=dataSplit[1]+"-"+dataSplit[2]+"-"+dataSplit[0]
    if(type.includes("!R")){
      description="Marked recovered by owner"
  
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{
          borderColor: "#544179",
          height: "350px",
          width: "250px",
          color: "#544179",
        }}
      >
       
        <Card.Section>
          <Image
            src={require(`${url}${image}`)}
            height={200}
            width={270}
            fit="fill"
            alt="dog"
          />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text
            component="span"
            align="center"
            color="#544179"
            size="md"
            weight={700}
            style={{ fontFamily: "Greycliff CF, sans-serif" }}
          >
            Date: {Date}
          </Text>
        </Group>

        <Text size="xs" color="dimmed">
           {description}
          
        </Text>
        <Space h='md'></Space>
        <Center>
      
            <Button
              style={{ background: "#2F575F", fontSize: "sm" }}
              size="xs"
              onClick={() => {
                this.setState(
                  {
                    id: `${id}`,
                    dogImage: `${image}`
                  },

                  this.openModalF
                );
              }}
            >
              Add to Matches
            </Button>
            <Space w='sm'></Space>
            <Button
              style={{ background: "#2F575F", fontSize: "sm" }}
              size="xs"
              onClick={() => {
                this.setState(
                  {
                    lostid: `${id}`,
                    dogImage: `${image}`
                    
                  },
                  this.openModalEmail
                );
              }}
            >
              Send Email
            </Button>
        
        </Center>
      </Card>
    );
  }

  makeCard3(dName: any, id: any, status: any, description: any, image: string) {
    let url = "components/images/";
    let badgecolor = "teal";
    if (`${status}`.includes("ost")) {
      badgecolor = "pink";
    }
    //state ID is associated with submission to be removed

    return (
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{
          borderColor: "#544179",
          height: "350px",
          width: "250px",
          color: "#544179",
        }}
      >
        <Card.Section>
          <Image
            src={require(`${url}${image}`)}
            height={200}
            width={270}
            fit="fill"
            alt="dog"
          />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text
            component="span"
            align="center"
            color="#544179"
            size="md"
            weight={700}
            style={{ fontFamily: "Greycliff CF, sans-serif" }}
          >
            {dName}
          </Text>

          <Badge color={badgecolor}>{status}</Badge>
        </Group>

        
        <Center>
          <Space h='md'></Space>
          <Button
            style={{ background: "#2F575F", fontSize: "medium" }}
            size="sm"
            onClick={() => {
              this.setState(
                {
                  sesid: `${id}`,
                  dogImage:`${image}`
                },
                //this.handleMatch
                this.openModalChoice
              );
            }}
          >
            <Text c="white">Select</Text>

          </Button>
          </Center>
        
      </Card>
    );
  }
  openModalChoice(){
    let url = "components/images/";
    modals.open({
  
      //this.state.sesid points to lost dog
      //this.state.id points to submissionID
      title:(<>yo</>),
      children:(<>
      <p>Your dog id:{this.state.sesid}</p>
      <p>submission id:{this.state.id}</p>
      <form>
      <Image
            src={require(`${url}${this.state.dogImage}`)}
            height={200}
            width={270}
            fit="fill"
            alt="dog"
          />
          <Space h='lg'></Space>
      <Button onClick={() => this.removeFromMap()}>Mark Recovered</Button>
      <Space h='md'></Space>
      <Button onClick={() => this.changeID()}>Still Missing</Button>
      </form>
      </>)



    })

  }
  removeFromMap=async()=>{
   
    const data = new FormData();
    data.append("submissionID", this.state.id);
    data.append("dogID", this.state.sesid);
    data.append("action","map");

    await fetch("/myDogChoice", { method: "post", body: data });
    this.onClear();
    this.openModalWaiting()

  }
  changeID=async()=>{
    
    const data = new FormData();
    data.append("submissionID", this.state.id);
    data.append("dogID", this.state.sesid);
    data.append("action","justDog");

    await fetch("/myDogChoice", { method: "post", body: data });
    this.onClear();

  }

  
  openModalF = () => {
    let url="components/images/"
    let message=""
    if (this.state.pets3.length==0 && this.state.homies.length==0){
      message="Login to choose from your dogs"
    }
    if (this.state.pets3.length==0 && this.state.homies.length!=0){
      message="None of your dogs are currently marked lost."
    }
    
    modals.open({
      
      overlayProps: ({
       
        opacity: .7,
        blur: 7
      }),
      title: (<div style={{ width: 400 }}><Center><Box sx={{top:'20px'}}> <Image
        src={require(`${url}${this.state.dogImage}`) }
        
        height={200}
        width={270}
        
        alt="dog"
      /><Space h='md'></Space><Text>Which of your missing dogs is this?</Text></Box></Center> </div>),
      children: (
        
        <>
       
        
        <form id="select session">
   
          <div style={{ width: 300 }}>
           
          
            <ul>
              <Grid>
                {this.state.pets3.reverse().map((pet) => (
                  <Grid.Col span={10}>
                    <ul className="no-bullets">
                      <p>
                        <li key={pet.DogID}></li>
                        {this.makeCard3(
                          `${pet.Name}`,
                          `${pet.DogID}`,
                          `${pet.Status}`,
                          `${pet.Description}`,
                          `${pet.ProfileImage}`
                        )}
                      </p>
                    </ul>
                  </Grid.Col>
                ))}
              </Grid>
            </ul>
            
          </div>
          <Center><Text>{message}</Text></Center>
          <Space h='md'></Space>
         <Center><Button size='md' color='teal' onClick={() => modals.closeAll()}>Close</Button></Center>
         
        </form>
       
        </>
      ),
    });
  };

  openModalEmail = () => {
    let url='components/images/'
    const styleObj = {
      fontSize: 14,
    };
    modals.open({
      overlayProps: ({
       
        opacity: .7,
        blur: 7
      }),
      title: ( <> <div style={{width:400}}><Center><Image
        src={require(`${url}${this.state.dogImage}`)}
        height={200}
        width={270}
    
      /></Center></div><Space h='md'></Space><Center><Text fw={700} style={{color:"#2F575F"}}>Send Email</Text></Center></>),
      children: (

        <form id="register" onSubmit={this.handleEmail}>
          <Textarea
            
            label="Write a message:"
            onChange={this.handleChangeF}
            withAsterisk
          /><Space h='md'></Space>
          <TextInput
            placeholder=""
            label="Return email or phone number"
            onChange={this.handleChangeContact}
            defaultValue={"None"}
          /><Space h='lg'></Space>
          <input
            style={styleObj}
            type="submit"
            id="actual-button1"
            hidden
          />
          <Center>
                  <label htmlFor="actual-button1">
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
      ),
    });
  };
  handleChangeContact(event:any){
    event.preventDefault()
    this.setState({contact:event.target.value})

  }
  
  ///////////////////////////////////begincreateaccount//////////////////
  saveUserC(email: string, password: string, id: string) {
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("password", password);
    sessionStorage.setItem("id", id);
  }

  getUserEmailC() {
    return sessionStorage.getItem("email");
  }
  getUserPasswordC() {
    return sessionStorage.getItem("password");
  }
  getUserIdC() {
    return sessionStorage.getItem("id");
  }

  handlefNameC(event: any) {
    event.preventDefault();
    this.setState({ fNameC: event.target.value });
  }
  handlelNameC(event: any) {
    event.preventDefault();
    this.setState({ lNameC: event.target.value });
  }
  handleEmailC(event: any) {
    event.preventDefault();
    this.setState({ emailC: event.target.value });
  }
  handlePasswordC(event: any) {
    event.preventDefault();
    this.setState({ passwordC: event.target.value });
  }
  /////////////////////////////////////////////////////////Foy Pet list handlers for data
  handleMatch = async () => {
    const data = new FormData();
    data.append("id", this.state.id);
    data.append("sesid", this.state.sesid);

    await fetch("/match", { method: "post", body: data });
  };
  handleEmail = async () => {
   
    const data = new FormData();
    data.append("lostid", this.state.lostid);
    data.append("email", this.state.email);
    data.append("contact",this.state.contact)

    await fetch("/sendEmail", { method: "post", body: data });
  };
  handleChangeF(event: any) {
    event.preventDefault();
    this.setState({ email: event.target.value });
  }
  handleEmailShelter = async () => {
    const data = new FormData();
    data.append("shelterid", this.state.shelterid);
    data.append("email", this.state.email);

    await fetch("/sendEmail2", { method: "post", body: data });
  };
  ///////////////////////////////////////////////END Foy Pet list handlers for data

  handleSubmitC = async (event: any) => {
    event.target.reset();
    event.preventDefault();
    const data = new FormData();
    data.append("fName", this.state.fNameC);
    data.append("lName", this.state.lNameC);
    data.append("email", this.state.emailC);
    data.append("pswd", this.state.passwordC);

    let response = await fetch("/createAcc", { method: "post", body: data });
    let res = await response.json();
    if (res != 999){
      this.setState({verify:this.state.verify+1})
      this.saveUser(this.state.emailC, this.state.passwordC, res);
    
      this.onClear();
      this.onClearL();


    } else {
      this.setState({verify:this.state.verify+1})
      
      this.openModalC()
    }

   
  };

  themeC = () => {
    let tvar = useMantineTheme();
    return tvar;
  };

  onClearC = () => {
    this.setState({
      fNameC: "",
      lNameC: "",
      emailC: "",
      passwordC: "",
      messageC: "",
    });
    this.onClearL();
    this.setState({messageL:""})
    modals.closeAll();
   

  };

  openModalC = () => {
    modals.open({
      modalId: "1",

      title: (
        <Text
          component="span"
          c=""
          size="xl"
          weight={700}
          style={{ fontFamily: "Greycliff CF, sans-serif", color: "#2F575F" }}
        >
          Strayed: Fort Smith, AR
          <BasicA key={this.state.verify}/>
        </Text>
        
      ),
      children: (
        //////////////////////////start forms/////////////////
        <>
          <Tabs color="gray" defaultValue="first">
            <Tabs.Tab value="first">Create Account</Tabs.Tab>

            <Tabs.Panel value="first" pt="xs">
              <form id="register" onSubmit={this.handleSubmitC}>
                <TextInput
                  required
                  label="First Name"
                  withAsterisk
                  defaultValue={this.state.fNameC}
                  onChange={this.handlefNameC}
                />
                <Space h="md"></Space>

                <TextInput
                  required
                  label="Last Name"
                  withAsterisk
                  defaultValue={this.state.lNameC}
                  onChange={this.handlelNameC}
                />
                <Space h="md"></Space>

                <TextInput
                  required
                  label="Email Address"
                  withAsterisk
                  defaultValue={this.state.emailC}
                  onChange={this.handleEmailC}
                />
                <Space h="md"></Space>

                <PasswordInput
                  required
                  label="Password"
                  withAsterisk
                  defaultValue={this.state.passwordC}
                  onChange={this.handlePasswordC}
                />
                <Space h="md"></Space>

                <Text align="center" color="red">
                  {this.state.messageC}
                </Text>

                <input
                  type="submit"
                  id="actual-button1"
                  value="submit"
                  hidden
                />
                <Center>
                  <label htmlFor="actual-button1">
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
            </Tabs.Panel>
          </Tabs>
        </>
        //////////////////end forms///////////////
      ),
    });
  };

  ////////////////endcreateaccount//////////////////////////////

  ////////////////Begin Login Methods///////////////////////
  postSession = async (id: any) => {
    const data = new FormData();
    data.append("id", id);
    let toPost = await fetch("/set", {
      method: "post",
      body: data,
    });
  };

  saveUser(email: string, password: string, id: string) {
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("password", password);
    sessionStorage.setItem("id", id);
    this.postSession(sessionStorage.getItem("id"));
  }

  getUserEmail() {
    return sessionStorage.getItem("email");
  }
  getUserPassword() {
    return sessionStorage.getItem("password");
  }
  getUserId() {
    return sessionStorage.getItem("id");
  }

  handleEmailL(event: any) {
    event.preventDefault();
    this.setState({ emailL: event.target.value });
  }
  handlePasswordL(event: any) {
    event.preventDefault();
    this.setState({ passwordL: event.target.value });
  }

  handleSubmitL = async (event: any) => {
  
  event.preventDefault();
   
  event.target.reset();
  
   
   
  
    const data = new FormData();
    data.append("email", this.state.emailL);
    data.append("pswd", this.state.passwordL);

    let response = await fetch("/login", { method: "post", body: data });
    let res = await response.json();
   
  if (res != 1 && res != 2) {
      this.saveUser(this.state.emailL, this.state.passwordL, res);
      this.setState({ messageL: "" });
      this.setState({ sessionHeader: "yes", remount: "2" });
      this.setState({verify:this.state.verify+1})
      

      this.onClearL();
      this.openModalWaiting();
    }
    else{
      
      this.setState({verify:this.state.verify+1})
      this.openModalLogin()

    }
  };

  theme = () => {
    let tvar = useMantineTheme();
    return tvar;
  };

  onClearL = () => {
    this.setState({
      emailL: "",
      passwordL: "",
      messageL: "",
    });
    this.setState({messageL:""})
    modals.closeAll();
  };

  openModalLogin = () => {
    modals.open({
      modalId: "1",

      title: (
        <Text
          component="span"
          c=""
          size="xl"
          weight={700}
          style={{ fontFamily: "Greycliff CF, sans-serif", color: "#544179" }}
        >
          
          Strayed: Fort Smith, AR
         <p> {this.state.messageL}</p>
         <Basic key={this.state.verify}/>
         
        </Text>
      ),
      children: (
        //////////////////////////start forms/////////////////
        <>
          <Tabs color="gray" defaultValue="first">
            <Tabs.List>
              <Tabs.Tab value="first">Login</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="first" pt="xs">
              <Text align="center" color="red">
              
                
              </Text>
              <form id="register" onSubmit={this.handleSubmitL}>
                <TextInput
                  label="Email Address"
                  withAsterisk
                  defaultValue={this.state.emailL}
                  onChange={this.handleEmailL}
                />
                <Space h="md"></Space>

                <PasswordInput
                  label="Password"
                  withAsterisk
                  defaultValue=""
                  onChange={this.handlePasswordL}
                />

                <Space h="lg"></Space>

                <input
                  type="submit"
                  id="actual-button2"
                  value="Submit"
                  hidden
                />
                <Center>
                  <label htmlFor="actual-button2">
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
            </Tabs.Panel>

            <Tabs.Panel value="second" pt="xs">
              <form id="register" onSubmit={this.handleSubmitC}>
                <TextInput
                  required
                  label="First Name"
                  withAsterisk
                  defaultValue={this.state.fNameC}
                  onChange={this.handlefNameC}
                />
                <Space h="md"></Space>

                <TextInput
                  required
                  label="Last Name"
                  withAsterisk
                  defaultValue={this.state.lNameC}
                  onChange={this.handlelNameC}
                />
                <Space h="md"></Space>

                <TextInput
                  required
                  label="Email Adress"
                  withAsterisk
                  defaultValue={this.state.emailC}
                  onChange={this.handleEmailC}
                />
                <Space h="md"></Space>

                <PasswordInput
                  required
                  label="Password"
                  withAsterisk
                  defaultValue={this.state.passwordC}
                  onChange={this.handlePasswordC}
                />
                <Space h="md"></Space>

                <Text align="center" color="red">
                 
                </Text>

                <input
                  type="submit"
                  id="actual-button3"
                  value="submit"
                  hidden
                />
                <Center>
                  <label htmlFor="actual-button3">
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
            </Tabs.Panel>
          </Tabs>
        </>
        //////////////////end forms///////////////
      ),
    });
  };

  whatHeader() {
    if (this.state.sessionHeader == "no") {
      return (
        <>
          {
            <p>
              <Box
                sx={{
                  position: "absolute",
                  left: "20px",
                  top: "10px",
                }}
              >
                <Image
                  height={"100px"}
                //  src={"/images/noBackground1.png"}
                ></Image>
               
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  left: "340px",
                  top: "25px",
                }}
              ></Box>
        
              
              <Box
                sx={{
                  position: "absolute",
                  right: "215px",
                  top: "45px",
                }}
              >
                
                <Button
                  style={{
                    backgroundColor: "white",
                    borderColor: "#2F575F",
                    fontSize: "medium",
                  }}
                  size="sm"
                >
                  <text
                    style={{ color: "#2F575F" }}
                    onClick={() => this.openModalLogin()}
                  >
                    Login
                  </text>
                </Button>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  right: "40px",
                  top: "45px",
                }}
              >
                <Button
                  size="sm"
                  style={{
                    borderColor: "#2F575F",
                    backgroundColor: "white",
                    fontSize: "medium",
                  }}
                >
                  <text
                    style={{ color: "#2F575F" }}
                    onClick={() => this.openModalC()}
                  >
                    Create Account
                  </text>
                </Button>
              </Box>
            </p>
          }
        </>
      );
    } else
      return (
        <>
          {
            <p>
              <Box
                sx={{
                  position: "absolute",
                  left: "20px",
                  top: "10px",
                }}
              >
                <Image
                  height={"100px"}
               //   src={"/images/noBackground1.png"}
                ></Image>
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  right: "40px",
                  top: "45px",
                }}
              >
                <Button
                  style={{
                    backgroundColor: "white",
                    borderColor: "#2F575F",
                    fontSize: "medium",
                  }}
                  size="sm"
                >
                  <text
                    style={{ color: "#2F575F" }}
                    onClick={() => this.handleLogout()}
                  >
                    Logout
                  </text>
                </Button>
              </Box>
            </p>
          }
        </>
      );
  }

  //////////////////end TEMPLATE methods//////////////////////
  /////////////////////BEGIN OF PAGE SPECIFIC METHODS////////////////////

  componentDidMount(): void {
    if (sessionStorage.getItem("id") != null) {
      this.setState({ sessionHeader: "yes" });
    } else if (sessionStorage.getItem("id") == null) {
      this.setState({ sessionHeader: "no" });
    }
    axios.get("/lost").then((res) => {
      const pets = res.data;
      this.setState({ pets });
    });
    setTimeout(() => {
      this.setState({ render: !this.state.render });
    }, 100000);
    axios.get("/Subs").then((res) => {
      const pets2 = res.data;
      this.setState({ pets2 });
    });
    setTimeout(() => {
      this.setState({ render: !this.state.render });
    }, 100000);
    axios.get("/sessionPets").then((res) => {
      const pets3 = res.data;
      this.setState({ pets3 });
    });
    axios.get("/notLost").then((res) => {
      const homies = res.data;
      this.setState({ homies });
    });
    setTimeout(() => {
      this.setState({ render: !this.state.render });
    }, 100000);
    setTimeout(() => {
      this.setState({ render: !this.state.render });
    }, 100000);
    axios.get("/fosterSubs").then((res) => {
      const pets4 = res.data;
      this.setState({ pets4 });
    });
    setTimeout(() => {
      this.setState({ render: !this.state.render });
    }, 100000);
    axios.get("/shelterSubs").then((res) => {
      const pets5 = res.data;
      this.setState({ pets5 });
    });
    setTimeout(() => {
      this.setState({ render: !this.state.render });
    }, 100000);
  }
  handleLogout = async () => {
    this.setState({ sessionHeader: "no" });

    sessionStorage.removeItem("email");
    sessionStorage.removeItem("password");
    sessionStorage.removeItem("id");
    const data = new FormData();
    data.append("message", "loggingout");
    let toPost = await fetch("/leave", {
      method: "post",
      body: data,
    });
   
    this.setState({ remount: "" });
    this.openModalWaitingBye()
  };
  handleStatus(event: any) {
    event.preventDefault();
    this.setState({ status: event.target.value });
  }

  handleChange(event: any) {
    event.preventDefault();
    this.setState({ value: event.target.value });
  }

  handleChangeDesc(event: any) {
    event.preventDefault();
    this.setState({ description: event.target.value });
  }
  handleZip(event: any) {
    event.preventDefault();
    this.setState({ zip: event.target.value });
  }

  handleSubmit = async (event: any) => {
    modals.closeAll();

    event.target.reset();

    event.preventDefault();

    const data = new FormData();
    data.append("name", this.state.value);
    data.append("status", this.state.status);

    for (var i = 0; i < this.state.url.length; i++) {
      console.log(this.state.url[i]);
    }
    data.append("arr", JSON.stringify(this.state.url));
    data.append("description", this.state.description);
    data.append("zip", this.state.zip);
    let response = await fetch("/petForm", {
      method: "post",
      body: data,
    });

    let res = await response.json();
    if (res == 2) {
      this.setState({ remount: "3" });
      console.log("remount: " + this.state.remount);
    }
    if (res.status !== 1) {
      //alert('Error uploading file');
    }

    var count = this.state.remount + 1;
    this.setState({ remount: count });
    
    this.onClear();

    return redirect("/dashboard");
    
  };
  onClear = () => {
    modals.closeAll();
    this.componentDidMount();

    this.setState({
      value: "",
      url: [""],
      zip: "",
      description: "",
      status: "",
      messageL:" "
    });
  };


  openModalWaiting() {
    
    modals.open({
      children: (
        <>
        <center>
          <div id="modal">
        
       
          <Image width={100} height={100} src={require('./images/pload.gif')} />
          <Text>Loading</Text>
          
          
        </div>
        </center>
        </>
      ),
    });
    setTimeout(() => {
    window.location.reload();
        
    }, 1000);
  }
    openModalWaitingBye(){
    
      modals.open({
        children: (
          <>
          <center>
            <div id="modal">
          
         
            <Image width={100} height={100} src={require('./images/pload.gif')} />
            <Text>Goodbye</Text>
            
            
          </div>
          </center>
          </>
        ),
      });
      setTimeout(() => {
      window.location.reload();
          
      }, 1000);
  
    
  
    
  };
 

  render() {
    return (
      <div>
<style>
                            @import url('https://fonts.cdnfonts.com/css/crossed-out');
</style>
<style>
                            @import url('https://fonts.cdnfonts.com/css/anonymous-pro');
</style>
                 
                
        <AppShell
          padding="md"
          footer={
            <Footer
             style={{ backgroundImage: "url(images/diamond-sunset.svg)" }}
              height={20}
            >
              {<p></p>}
            </Footer>
          }
          navbar={
            <Navbar width={{ base: 200 }} height={500} p="xs">
              {<NavbarSimple />}
            </Navbar>
          }
          header={
            <Header
              key={this.state.appKey}
          //  style={{ backgroundImage: "url(/images/diamond-sunset.svg)" }}
              height={125}
              p="xs"
            >
              <Title order={3} size="h1" styles={{color:'#2F575F'}}>
            
      </Title>
      <Text className='font-test'  sx={{color: "#2F575F", marginTop:-16, marginLeft:200}}>Strayed</Text>
      <Text className='chester'  sx={{color: "#2F575F", marginTop:-65, marginLeft:675}}>Fort Smith, AR</Text>

      
              {this.whatHeader()}
             
            </Header>
          }
          styles={(theme) => ({
            main: {
              position: "fixed",
              // backgroundImage: null,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "bottom",
            },
          })}
        >
          {
            <div>
              <div style={{ float: "none" }}>
              <Tabs
                  color="gray"
                  defaultValue="first"
                  variant="default"
                  style={{
                    color: "#2F575F",
                    fontSize: "medium",
                    fontWeight: "bold",
                    marginLeft: "0px",
                  }}
                >
                  <Tabs.List grow position="center">
                    <Tabs.Tab
                      style={{
                        color: "#544179",
                        fontFamily: "Greycliff CF, sans-serif",
                        fontSize: "medium",
                        fontWeight: "bold",
                      }}
                      value="first"
                    >
                      <Button
                    color="gray"
                    c={"#544179"}
                    variant="subtle"
                    size="xs"
                    style={{ fontSize: "medium", fontWeight: "bold" }}
                  >Lost Dogs
                  </Button>
                    </Tabs.Tab>
                    <Space w="xs" />
                    <Tabs.Tab
                      style={{
                        color: "#544179",
                        fontFamily: "Greycliff CF, sans-serif",
                        fontSize: "medium",
                        fontWeight: "bold",
                      }}
                      value="second"
                    >
                      <Button
                    color="gray"
                    c={"#544179"}
                    variant="subtle"
                    size="xs"
                    style={{ fontSize: "medium", fontWeight: "bold" }}
                  >Spotted Dogs
                  </Button>
                    </Tabs.Tab>
                    <Space w="xs" />

                    <Tabs.Tab
                      style={{
                        color: "#544179",
                        fontFamily: "Greycliff CF, sans-serif",
                        fontSize: "medium",
                        fontWeight: "bold",
                      }}
                      value="third"
                    >
                     <Button
                    color="gray"
                    c={"#544179"}
                    variant="subtle"
                    size="xs"
                    style={{ fontSize: "medium", fontWeight: "bold" }}
                  >Fostered
                  </Button>
                    </Tabs.Tab>
                    <Space w="xs" />

                    <Tabs.Tab
                      style={{
                        color: "#544179",
                        fontFamily: "Greycliff CF, sans-serif",
                        fontSize: "medium",
                        fontWeight: "bold",
                      }}
                      value="fourth"
                    >
                      <Button
                    color="gray"
                    c={"#544179"}
                    variant="subtle"
                    size="xs"
                    style={{ fontSize: "medium", fontWeight: "bold" }}
                  >Shelters
                  </Button>
                    </Tabs.Tab>
                  </Tabs.List>



                    { /* HEADER BAR FINISH */}



                  <Tabs.Panel value="first">
                    <Container style={{}}>
                      <ScrollArea
                        style={{ height: 500 }}
                        type="scroll"
                        offsetScrollbars
                      >
                        <center>
                        <p>Have you seen me? Tell my owner about it and help me get back home.</p>
                        </center>
                        {
                          <div className="container">
                            <ul>
                              <Grid >
                                {this.state.pets.map((pet) => (
                                  <Grid.Col span={6}>
                                    <ul className="no-bullets">
                                      <p>
                                        <li key={pet.DogID}></li>
                                        {this.makeCard(
                                          `${pet.DogID}`,
                                          `${pet.Name}`,
                                          `${pet.Status}`,
                                          `${pet.ProfileDescription}`,
                                          `${pet.ProfileImage}`,
                                          `${pet.HomeLocation}`
                                        )}
                                      </p>
                                    </ul>
                                  </Grid.Col>
                                ))}
                              </Grid>
                            </ul>
                          </div>
                        }{" "}
                      </ScrollArea>
                    </Container>
                  </Tabs.Panel>
                  <Tabs.Panel value="second">
                    {" "}
                    <Container style={{}}>
                      <center><p>Do I belong to you? Members can add to their matches to for more details.</p></center>
                      <ScrollArea
                    
                        style={{ height: 500 }}
                        type="scroll"
                        offsetScrollbars
                      >
                        {
                          <div className="container">
                            <ul>
                              <Grid align={"center"}>
                                {this.state.pets2.reverse().map((pet) => (
                                  <Grid.Col span={6}>
                                    <ul className="no-bullets">
                                      <p>
                                        <li key={pet.DogID}></li>
                                        {this.makeCard2(
                                          `${pet.Date}`,
                                          `${pet.Location}`,
                                          `${pet.SubmissionImage}`,
                                          `${pet.SubmissionID}`,
                                          `${pet.Type}`
                                        )}
                                      </p>
                                    </ul>
                                  </Grid.Col>
                                ))}
                              </Grid>
                            </ul>
                          </div>
                        }
                      </ScrollArea>
                    </Container>
                  </Tabs.Panel>
                  <Tabs.Panel value="third">
                    {" "}
                    <Container style={{}}>
                      <center><p>These dogs are being fostered by a member of the Strayed community.<br></br><br></br> Members can add to their matches and contact the foster for more information.</p></center>
                      <ScrollArea
                        style={{ height: 500 }}
                        type="scroll"
                        offsetScrollbars
                      >
                        {
                          <div className="container">
                            <ul>
                              <Grid>
                                {this.state.pets4.reverse().map((pet) => (
                                  <Grid.Col span={6}>
                                    <ul className="no-bullets">
                                      <p>
                                        <li key={pet.DogID}></li>
                                        {this.makeCard20(
                                          `${pet.Date}`,
                                          `${pet.Location}`,
                                          `${pet.SubmissionImage}`,
                                          `${pet.SubmissionID}`,
                                          `${pet.SubmissionDescription}`,
                                          `${pet.Type}`
                                        )}
                                      </p>
                                    </ul>
                                  </Grid.Col>
                                ))}
                              </Grid>
                            </ul>
                          </div>
                        }
                      </ScrollArea>
                    </Container>
                  </Tabs.Panel>
                  <Tabs.Panel value="fourth">
                    {" "}
                    <Container style={{}}>
                    <center><p>These dogs are currently being held at our local shelters. <br></br><br></br>Members can add to their matches and contact the shelter for more information.</p></center>

                      <ScrollArea
                        style={{ height: 500 }}
                        type="scroll"
                        offsetScrollbars
                      >
                        {
                          <div className="container">
                            <ul>
                              <Grid>
                                {this.state.pets5.reverse().map((pet) => (
                                  <Grid.Col span={6}>
                                    <ul className="no-bullets">
                                      <p>
                                        <li key={pet.DogID}></li>
                                        {this.makeCard20(
                                          `${pet.Date}`,
                                          `${pet.Location}`,
                                          `${pet.SubmissionImage}`,
                                          `${pet.SubmissionID}`,
                                          `${pet.SubmissionDescription}`,
                                          `${pet.Type}`
                                        )}
                                      </p>
                                    </ul>
                                  </Grid.Col>
                                ))}
                              </Grid>
                            </ul>
                          </div>
                        }
                      </ScrollArea>
                    </Container>
                  </Tabs.Panel>
                </Tabs>
              </div>
            </div>
          }
        </AppShell>
      </div>
    );
  }
}
