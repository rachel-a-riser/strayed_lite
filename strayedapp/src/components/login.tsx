import React from "react";
import { TextInput, PasswordInput, Text, Alert, Center, Paper, Space } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";
import axios from "axios";
import { IconAlertCircle } from "@tabler/icons-react";
import { mdiEmail } from "@mdi/js";

export default class Login extends React.Component<
  any,
  { email: string; password: string; render: boolean; message: any }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      email: "",
      password: "",
      render: true,
      message: "",
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  postSession=async(id:any)=>{
    const data=new FormData();
    data.append("id",id);
    let toPost = await fetch('/set',
    {
      method: 'post',
      body:data,
 
   
    }
  );


  }

  saveUser(email: string, password: string, id: string) {
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("password", password);
    sessionStorage.setItem("id", id);
    this.postSession(sessionStorage.getItem("id"))
       
 
    

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
    data.append("email", this.state.email);
    data.append("pswd", this.state.password);


    if(this.state.email == null || this.state.email ==""){

      this.setState({ message: "EMAIL FIELD IS EMPTY" });

    } else if(this.state.password == null || this.state.password ==""){

      this.setState({ message: "PASSWORD FIELD IS EMPTY" });


    } else {


    let response = await fetch("/login", { method: "post", body: data });

    let res = await response.json();

    if (res == 2) {
      this.setState({ message: "THIS EMAIL DOES NOT HAVE AN ACCOUNT" });
    } else if (res == 1) {
      this.setState({ message: "INCORRECT PASSWORD" });
    } else {
      
      this.saveUser(this.state.email, this.state.password, res);
      this.setState({ message: "Hello, " + this.getUserEmail() });
    }

    this.onClear();

  }
  };

  theme = () => {
    let tvar = useMantineTheme();
    return tvar;
  };

  onClear = () => {
    this.setState({
      email: "",
      password: "",
    });
  };

  render() {
    return (
      <div>
        <form id="register" onSubmit={this.handleSubmit}>
          <TextInput
            placeholder="Email Address"
            label="Email Address"
            withAsterisk
            value={this.state.email}
            onChange={this.handleEmail}
            required
          />

          <PasswordInput
            placeholder="Password"
            label="Password"
            withAsterisk
            value={this.state.password}
            onChange={this.handlePassword}
            required
          />
	<Space h='xl'></Space>
          <Text align="center"  color="red">{this.state.message}</Text>

          <input type="submit"  id="actual-button" value="submit" />
         </form>
      </div>
    );
  }
}