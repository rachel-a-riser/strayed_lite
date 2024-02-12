import React from "react";
import PetList from "./PetList";
import MatchList from './MatchList'

import FosterList from "./FosterList";
import NavbarSimple from "./NavBarSimple";
import '../App.css'

import Basic from './Basic'
import BasicA from './BasicA'
import {
  Button,
  Collapse,
  TextInput,
  Select,
  Title,
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
  
  Text,
  Tabs,
  SimpleGrid,
  Center,
  Space,
  Image,

} from "@mantine/core";

import { useMantineTheme, PasswordInput, Card } from "@mantine/core";


import { redirect } from "react-router-dom";

import { modals } from "@mantine/modals";
import Icon from "@mdi/react";
import { mdiFolderUploadOutline } from "@mdi/js";


import axios from "axios";

export default class StandardDash extends React.Component<
  any,
  {
    emailL: any;
    colors: any,
    passwordL: any;
    submissionIDfromMatch:any;
    messageL: any;
    appKey: any;
    fNameC: any;
    lNameC: any;
    emailC: any;
    matchDetails:any,
    passwordC: any;
    messageC: any;
    remount: any;
    matchPets: Array<any>;
    sessionHeader: string;
    value: any;
    zip: any;
    description: any;
    petz: any;
    currentURL: any;
    url: any;
    status: any;
    verify: any;
    render: boolean;
  }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      sessionHeader: "",
      submissionIDfromMatch:'',
      value: "",
      colors:"blue!",
      url: [],
      matchDetails:"",
      zip: "",
      verify: 1,
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

      messageC: "",

      messageL: "",
      appKey: "1",

      matchPets: [], //Foy pets //Foy Pets
    };

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
  }
 
 
  

  saveUserC(email: string, password: string, id: string) {
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("password", password);
    sessionStorage.setItem("id", id);
    this.postSession(sessionStorage.getItem("id"));
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
    modals.closeAll();
  };

  openModalLogin = () => {
    modals.open({
      modalId: "1",
      withCloseButton: false,

      title: (
        <Text
          component="span"
          c=""
          size="xl"
          weight={700}
          style={{ fontFamily: "Greycliff CF, sans-serif", color: "#544179" }}
        >
          Strayed: Fort Smith, AR
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
                {this.state.messageL}
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
                  defaultValue={this.state.passwordL}
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
                 // src={"/images/noBackground1.png"}
                ></Image>
              </Box>

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
                //  src={"/images/noBackground1.png"}
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


  componentDidMount(): void {
    if (sessionStorage.getItem("id") != null) {
      this.setState({ sessionHeader: "yes" });
    } else if (sessionStorage.getItem("id") == null) {
      this.setState({ sessionHeader: "no" });
    }
    axios.get("/modelMatch").then((res) => {
      const matchPets = res.data;
      this.setState({ matchPets });
    });
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
    }
    if (res.status !== 1) {
      //alert('Error uploading file');
    }
    this.setState({ remount: "3" });
    console.log("remount: " + this.state.remount);

    this.onClear();

    return redirect("/dashboard");
  };
  onClear = () => {
    this.componentDidMount();

    this.setState({
      value: "",
      url: [""],
      zip: "",
      description: "",
      status: "",
    });
  };

  uploadFile = async (e: any) => {
    const file = e.target.files[0];
    console.log(e.target.files[0].name);

    this.setState({
      url: [...this.state.url, e.target.files[0].name.toLowerCase()],
    });
    if (file != null) {
      const data = new FormData();
      data.append("file_from_react", file);

      let response = await fetch("/picUpload", {
        method: "post",
        body: data,
      });
      //let res = await response.json();
      //if (res.status !== 1) {
        //alert("Error uploading file");
     }
   // }
  };
  openModal = () => {
    let url = "components/images/";

    modals.open({
      modalId: "1",

      title: (
        <Text
          component="span"
          size="xl"
          weight={700}
          style={{ fontFamily: "Greycliff CF, sans-serif", color: "#544179" }}
        >
          Add Dog
        </Text>
      ),
      children: (
        <>
          <form id="addPet" onSubmit={this.handleSubmit}>
            <TextInput
              styles={{ label: { color: "" } }}
              defaultValue={this.state.value}
              label="Name (Unknown if unknown)"
              withAsterisk
              onChange={this.handleChange}
            />
            <Space h="md"></Space>
            
            <Select
      label="Status"
      placeholder="Select"
      withAsterisk
      searchable
     
      
      
      data={[
        { value: 'home', label: 'Home' },
        { value: 'lost', label: 'Lost' },
        {value:'foster', label: 'Foster' }
    
      ]}
      onSelect={this.handleStatus}
    />
      <Space h='md'></Space>

         
         
            <Space h="sm"></Space>
            <Textarea
              defaultValue={this.state.description}
              label="Description"
              onChange={this.handleChangeDesc}
              
            />
            <Space h="md"></Space>

        

            <TextInput
              styles={{ label: { color: "" } }}
              placeholder="e.g. 72901 or UAFS college"
              label="Home Location (Users are encouraged to use a zipcode or the address of a nearby public place)"
              
              defaultValue={this.state.zip}
              onChange={this.handleZip}
            />
            <Space h="md"></Space>

            <input
              type="file"
              id="file-butt"
              onChange={this.uploadFile}
              multiple
              hidden
            />

            <Space h="xl"></Space>
            <input type="submit" id="actual-button" value="submit" hidden />
            <label htmlFor="file-butt">
              <Paper style={{ backgroundColor: "#2F575F" }} shadow="xs" p="sm">
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
                  <Text size="sm" color="white" fw={400}>
                    
                  </Text>
                </Center>
              </Paper>
            </label>
            <Space h="lg"></Space>
            <Space h="lg"></Space>

            <input type="submit" id="actual-button" value="submit " hidden />
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
          </form>
        </>
      ),
    });
  };

  render() {
    return (
      <div>
               <style>
                            @import url('https://fonts.cdnfonts.com/css/retro-craft');
</style>
<style>
                            @import url('https://fonts.cdnfonts.com/css/danson');
</style>
<style>
                            @import url('https://fonts.cdnfonts.com/css/vic');
</style>
<style>
                            @import url('https://fonts.cdnfonts.com/css/reigo');
</style>
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
              style={{ backgroundImage: "url(/images/diamond-sunset.svg)" }}
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
             // style={{ backgroundImage: "url(/images/diamond-sunset.svg)" }}
              height={125}
             
            >
                    <Text className='font-test'  sx={{color: "#2F575F", marginTop:-16, marginLeft:200}}>Strayed</Text>
      <Text className='chester'  sx={{color: "#2F575F", marginTop:-65, marginLeft:675}}>Fort Smith, AR</Text>
              {this.whatHeader()}
            </Header>
          }
          styles={(theme) => ({
            main: {
              position: "fixed",
              // backgroundImage:'url(/images/navypaw.svg)',
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
                  >My Pets
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
                  >My Fosters
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
                    ><Button
                    color="gray"
                    c={"#544179"}
                    variant="subtle"
                    size="xs"
                    style={{ fontSize: "medium", fontWeight: "bold" }}
                  >Matches
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
                      value="first"
                    ><Button
                    color="gray"
                    c={"#544179"}
                    variant="outline"
                    size="xs"
                    style={{ fontSize: "medium", fontWeight: "bold" }}
                    onClick={() => this.openModal()}
                  >Add Dog
                  </Button>
                    </Tabs.Tab>
                  </Tabs.List>



                    { /* HEADER BAR FINISH */}

                  <Tabs.Panel value="first" pt="lg">
                    <Container style={{}}>
                      <ScrollArea
                        style={{ height: 500 }}
                        type="scroll"
                        offsetScrollbars
                      >
                        {<PetList key={this.state.remount} />}
                      </ScrollArea>
                    </Container>
                  </Tabs.Panel>

                  <Tabs.Panel value="second" pt="xs">
                    <Container>
                      <ScrollArea style={{ height: 500 }} type="scroll">
                        {<FosterList key={this.state.remount} />}
                      </ScrollArea>
                    </Container>
                  </Tabs.Panel>
                  <Tabs.Panel value="third" pt="xs">
                    {" "}
                    <Container style={{}}>
                      <ScrollArea
                        style={{ height: 500 }}
                        type="scroll"
                        offsetScrollbars
                      >
                        {
                          <MatchList key={this.state.remount} />
                        }
                      </ScrollArea>
                    </Container>
                  </Tabs.Panel>
                  <Tabs.Panel value="fourth" pt="lg">
                  {" "}
                    <Container style={{}}>
                      <ScrollArea
                        style={{ height: 500 }}
                        type="scroll"
                        offsetScrollbars
                      ></ScrollArea>
                    </Container>
                  </Tabs.Panel>
                </Tabs>
              </div>
              <Center>
                <div></div>
              </Center>
            </div>
          }
        </AppShell>
      </div>
    );
  }
}
