import React from "react";
import PetList from "./PetList";
import { useDisclosure } from "@mantine/hooks";
import User from "./User";
import FosterList from "./FosterList";
import NavbarSimple from "./NavBarSimple";
import ShelterList from './ShelterList';
import { useState } from "react";
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
  Grid,
  Text,
  Tabs,
  SimpleGrid,
  Center,
  Space,
  Image,
  Modal,
} from "@mantine/core";
import { Tab } from "@headlessui/react";
import ModelAddPet from "./ModalAddPet";
import ModalAddFoster from "./ModalAddFoster";
import { useMantineTheme, PasswordInput, Card } from "@mantine/core";

import { mdiHomePlus } from "@mdi/js";
import LoginModal from "./LoginModal";
import CreateAccountModal from "./CreateAcctModal";
import NoSessionHeader from "./NoSessionHeader";
import { redirect } from "react-router-dom";
import { IconExternalLink } from "@tabler/icons-react";
import Upload from "./Upload";
import { modals } from "@mantine/modals";
import Icon from "@mdi/react";
import { mdiFolderUploadOutline } from "@mdi/js";
import Login from "./login";
import CreateAcc from "./createAcc";

import axios from "axios";

export default class ShelterDash extends React.Component<
  any,
  {
    emailL: any;
    passwordL: any;
    messageL: any;
    appKey: any;
    fNameC: any;
    lNameC: any;
    emailC: any;
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
    render: boolean;
  }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      sessionHeader: "",
      value: "",
      url: [],
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
  ///////////////////////////////////begincreateaccount//////////////////
  makeCardMatch(Date: any, Location: any, image: string, id: any) {
    let url = "components/images/";
	let date=Date.split('-')
	Date=date[2]+'-'+date[1]+'-'+date[0]

    return (
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{
          borderColor: "#544179",
          height: "315px",
          width: "250px",
          color: "#544179",
        }}
      >
        <Center>
          <Card.Section>
            <Image src={require(`${url}${image}`)} height={160} alt="dog" />
          </Card.Section>
        </Center>

        <Group position="apart" mt="md" mb="xs">
          <Text
            component="span"
            align="center"
            color="#544179"
            size="md"
            weight={700}
            style={{ fontFamily: "Greycliff CF, sans-serif" }}
          >
            {Date}
          </Text>
        </Group>

        <Text size="xs" color="dimmed">
          {Location}
        </Text>
        <Group spacing="medium" align="center">
          <Grid.Col span={1}>
            <Button
              style={{ background: "#2F575F", fontSize: "medium" }}
              size="sm"
              onClick={() => {
                this.setState({});
              }}
            >
              My Pet
            </Button>
          </Grid.Col>
        </Group>
      </Card>
    );
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

    if (res == 999) {
      this.setState({ messageC: "THIS EMAIL IS ALREADY IN USE" });
    } else {
      
      this.setState({ messageC: "Hello, " + this.getUserEmail() });
            this.setState({ sessionHeader: "no"});
		modals.closeAll()
	

      this.onClear();
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
    event.target.reset();
    event.preventDefault();
    const data = new FormData();
    data.append("email", this.state.emailL);
    data.append("pswd", this.state.passwordL);

    let response = await fetch("/login", { method: "post", body: data });
    let res = await response.json();
    if (res == 1) {
      this.setState({ messageL: "THIS EMAIL DOES NOT HAVE AN ACCOUNT" });
    } else if (res == 2) {
      this.setState({ messageL: "INCORRECT PASSWORD" });
    } else if (res != 1 || res != 2) {
      this.saveUser(this.state.emailL, this.state.passwordL, res);
      this.setState({ messageL: "Hello, " + this.getUserEmail() });
      this.setState({ sessionHeader: "yes", remount: "2" });
      this.onClearL();
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

      title: (
        <Text
          component="span"
          c=""
          size="xl"
          weight={700}
          style={{ fontFamily: "Greycliff CF, sans-serif", color: "#544179" }}
        >
          Strayed: Fort Smith, AR
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
                  src={"/images/noBackground1.png"}
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
                  src={"/images/noBackground1.png"}
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
      let res = await response.json();
      if (res.status !== 1) {
        alert("Error uploading file");
      }
    }
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
          Add Shelter Pickup
        </Text>
      ),
      children: (
        <>
          <form id="addPet" onSubmit={this.handleSubmit}>
            <TextInput
              styles={{ label: { color: "" } }}
              defaultValue={this.state.value}
              label="Name"
              withAsterisk
              onChange={this.handleChange}
            />
            <Space h="md"></Space>

            <TextInput
              styles={{ label: { color: "" } }}
              defaultValue={this.state.status}
              label="Status"
              onChange={this.handleStatus}
              withAsterisk
            />
            <Space h="md"></Space>

            <Textarea
              styles={{ label: { color: "" } }}
              label="Description"
              withAsterisk
              defaultValue={this.state.description}
              onChange={this.handleChangeDesc}
            />
            <Space h="md"></Space>

            <TextInput
              styles={{ label: { color: "" } }}
              placeholder="Your comment"
              label="Location"
              withAsterisk
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
                      Select images(s)
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
                    Please choose one image at a time
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
            <Navbar width={{ base: 150 }} height={500} p="xs">
              {<NavbarSimple />}
            </Navbar>
          }
          header={
            <Header
              key={this.state.appKey}
              style={{ backgroundImage: "url(/images/diamond-sunset.svg)" }}
              height={125}
              p="xs"
            >
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
	<Box style={{marginLeft:'400px'}}>
       			{<ShelterList key={this.state.remount}/>}
	</Box>
                  
            </div>
          }
        </AppShell>
      </div>
    );
  }
}
