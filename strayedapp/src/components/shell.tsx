import React, { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';

import PetList from './PetList';
import { useDisclosure } from '@mantine/hooks';
import User from './User'
import FosterList from './FosterList';
import NavbarSimple from './NavBarSimple';

import { Button, Collapse,TextInput,Select } from '@mantine/core';
import { Group,Container,ScrollArea,Grid,Tabs,SimpleGrid,Center,Space,Modal} from '@mantine/core';
import {Tab} from '@headlessui/react'
import ModelAddPet from './ModalAddPet'
import ModalAddFoster from './ModalAddFoster'

export default function AppShellDemo() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 175, lg: 225 }}>
          <NavbarSimple/>
        </Navbar>
      }
    
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <Header height={70} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>Application header</Text>
          </div>
        </Header>
      }
    >
      
                  <Center>
        
        </Center>
        <SimpleGrid cols={2}>
          <div>
        <Tabs color='teal' defaultValue="first" variant="default">
      <Tabs.List>
        <Tabs.Tab value="first"> <Text
    component="span"
   
    variant="gradient"
    gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
    size="xl"
    weight={700}
    style={{ fontFamily: 'Greycliff CF, sans-serif' }}
  >
    My Pets
  </Text></Tabs.Tab>
        <Space w="xs" />
        <Tabs.Tab value="second" color="teal">
        <Text
    component="span"
   
    variant="gradient"
    gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
    size="xl"
    weight={700}
    style={{ fontFamily: 'Greycliff CF, sans-serif' }}
  >
    My Fosters
  </Text>
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="first" pt="xs">
       
        <Container>

        <ScrollArea style={{ height: 500 }} type="scroll" offsetScrollbars>
          <Center>
  {<PetList/>}</Center>
</ScrollArea></Container>

      </Tabs.Panel>

      <Tabs.Panel value="second" pt="xs">
        
        <Container>
        <ScrollArea style={{ height: 500 }} type="scroll">
  {<FosterList/>}
</ScrollArea></Container>

      </Tabs.Panel>
      
      
      
    </Tabs>
    </div>
    
    <div>
    
    <ModelAddPet/>
    <br></br>
    <ModalAddFoster/>
   
    
      
    


    
   


    </div>
    </SimpleGrid>



      

        
 


 

    
      
        
        
        
                
       
       
        
    
        

                

    </AppShell>
    
  );
}