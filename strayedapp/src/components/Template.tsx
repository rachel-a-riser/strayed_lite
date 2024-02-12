import React from 'react'
import PetList from './PetList';
import { useDisclosure } from '@mantine/hooks';
import User from './User'
import FosterList from './FosterList';
import NavbarSimple from './NavBarSimple';
import { useState } from 'react';
import { Button, Collapse,TextInput,Select,Title } from '@mantine/core';
import { AppShell, Navbar, Header,Box,Footer, Group,Container,ScrollArea,Grid,Text,Tabs,SimpleGrid,Center,Space,Modal} from '@mantine/core';
import {Tab} from '@headlessui/react'
import ModelAddPet from './ModalAddPet'
import ModalAddFoster from './ModalAddFoster'
import Icon from '@mdi/react';
import { mdiHomePlus } from '@mdi/js';
import LoginModal from './LoginModal'







export default class Template extends React.Component<any,any>{
  constructor(props:any){
    super(props)
    
  


   this.state={
    
   
    }
    
   



  }
  
 
 
    

   
  

    render() {
     
       
        
   
        return (
            <div>
            
            
            <AppShell
            padding="md"
            
            footer={<Footer style={{}} height={50}>{<p>Footer Content</p>}</Footer>}
         
            navbar={<Navbar width={{ base: 300 }} height={500}p="xs">{<NavbarSimple/>}</Navbar>}
            
            header={<Header style={{backgroundImage:'url(/images/diamond-sunset.svg)'}} height={100} p="xs" >{<p>
             
               <Box sx={{position: 'fixed', left: '1250px', top:'30px'}}>
                <SimpleGrid cols={2} spacing="sm">
                <div>
              <LoginModal/>

              </div>
              <div>
             <Button style={{backgroundColor:'white',borderColor:'teal'}} size="sm"><text style={{color:'teal'}}>Register</text></Button>
              
             
        
              </div>
              </SimpleGrid>
              </Box>

              
              
              
              
              
              
              
              
              
              
              </p>}</Header>}
            styles={(theme) => ({
              

              
              main: {backgroundImage:'url(/images/navypaw.svg)', backgroundRepeat:'no-repeat', backgroundPosition: 'bottom',  
            
              
              
              
              },
            })}
          >
            {
                <div>
                    <p>MAIN CONTENT</p>
                  
       

    
      
        
        
        
                
       
       
        
    
        

                

        </div>

            }
          </AppShell>
        
        


        </div>
    );
    }
    
    
    }