import React from 'react'

import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import NavbarSimple from "./NavBarSimple";
import PickModal from "./PickModal";
import CreateAccountModal from "./CreateAcctModal";
import {
  AppShell,
  Navbar,
  Header,
  Grid,
  SimpleGrid,
  Footer,
} from "@mantine/core";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Center,
  Tabs,
  Modal,
  Box,
} from "@mantine/core";
import LoginModal from "./LoginModal";


export default class NoSessionHeader extends React.Component<any,any>{
    constructor(props:any){
        super(props)
    }

render(){
    return(



      <Header
        style={{ backgroundImage: "" }}
        height={100}
        p="xs"
      >
        {
          <p>
            <Box sx={{ position: "fixed", left: "1200px", top: "30px" }}>
              <SimpleGrid cols={2} spacing="xs">
              
                <div>
                  <LoginModal />
                </div>
                <div><CreateAccountModal/></div>
              </SimpleGrid>
            </Box>
          </p>
        }
      </Header>
    )
}





}