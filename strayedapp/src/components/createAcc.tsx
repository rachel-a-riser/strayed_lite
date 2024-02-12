import React from "react";
import axios from "axios";
import { PasswordInput, TextInput, Text, Space, Paper, Center } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";
import Homepage from "./HomePage"

interface User {
  fName: string;
  lName: string;
  email: string;
  password: string;

}

export default class CreateAcc extends React.Component<
  any,
  { fName: string; lName: string; email: string;  password: string; render: boolean, message: any }
> {

  
  constructor(props: any) {
    super(props);
    this.state = {
      fName: "",
      lName: "",
      email: "",
      password: "",
      render: true,
      message: "",
    };

    this.handlefName = this.handlefName.bind(this);
    this.handlelName = this.handlelName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  saveUser(email: string, password: string, id: string) {
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("password", password);
    sessionStorage.setItem("id", id);

  }

  getUserEmail() {
    return sessionStorage.getItem("email");
  }
  getUserPassword() {
    return sessionStorage.getItem("password");
  }
  getUserId(){
    return sessionStorage.getItem("id");

  }
  
  
  handlefName(event: any) {
    event.preventDefault();
    this.setState({ fName: event.target.value });
  }
  handlelName(event: any) {
    event.preventDefault();
    this.setState({ lName: event.target.value });
  }
  handleEmail(event: any) {
    event.preventDefault();
    this.setState({ email: event.target.value });
  }
  handlePassword(event: any) {
    event.preventDefault();
    this.setState({ password: event.target.value });
  }


  

  handleSubmit = async (event: any) => {
    event.target.reset();
    event.preventDefault();
    const data = new FormData();
    data.append("fName", this.state.fName);
    data.append("lName", this.state.lName);
    data.append("email", this.state.email);
    data.append("pswd", this.state.password );


      let response = await fetch("/createAcc", { method: "post", body: data });

      let res = await response.json();
  

      if(res == 999){
        this.setState({message: "THIS EMAIL IS ALREADY IN USE"})
      } else {
        this.saveUser(this.state.email, this.state.password, res);
        this.setState({message: "Hello, " + this.getUserEmail()})       
      }

      console.log(res);
    this.onClear();
  };

  

  theme = () => {
    let tvar = useMantineTheme();
    return tvar;
  };

  onClear = () => {
    this.setState({
      fName: "",
      lName: "",
      email: "",
      password: ""
    });
  };

  render() {
    return (
      <div>
        <form id="register" onSubmit={this.handleSubmit}>
          <TextInput
            required 
            placeholder="First Name"
            label="First Name"
            withAsterisk
            value={this.state.fName}
            onChange={this.handlefName}
          />

          <TextInput
          required
            placeholder="Last Name"
            label="Last Name"
            withAsterisk
            value={this.state.lName}
            onChange={this.handlelName}
          />

          <TextInput
          required
            placeholder="Email Address"
            label="Email Address"
            withAsterisk
            value={this.state.email}
            onChange={this.handleEmail}
          />

          <PasswordInput
          required
           placeholder="Password"
           label="Password"
           withAsterisk
           value={this.state.password}
           onChange={this.handlePassword}
           
         />
	<Space h='xl'></Space>


        <Text align="center"  color="red">{this.state.message}</Text>

      <input type="submit"  id="actual-button" value="submit" />
     
        </form>
      </div>
    );
  }
}
