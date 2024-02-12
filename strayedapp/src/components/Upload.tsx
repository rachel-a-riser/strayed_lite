import React from 'react';
import {useRef} from "react";                               

import axios from 'axios';
import '../css/css.css'
import '../css/petList.css'
import {Textarea, TextInput, FileInput, Button, FileButton, Title} from '@mantine/core'
import {useState} from 'react'
import { Group, Text, useMantineTheme, rem, Box,Center,Paper,SimpleGrid,Space } from '@mantine/core';
import { redirect, useNavigate } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiFolderUploadOutline } from '@mdi/js';



// Register the plugins



export default class Upload extends React.Component<any,{ status:any,value: string, url:Array<any>, zip:string,description:string, petz:Array<any>,render:boolean,currentURL:string}>{
  constructor(props:any){
    super(props);
   
  
    this.state = {
      value: '',
      url: [],
      zip: '',
      description: '',
      petz:[],
      currentURL: '',
      status:'',
      render:true,
   
      
      
      
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleStatus=this.handleStatus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeDesc=this.handleChangeDesc.bind(this);
    this.handleZip=this.handleZip.bind(this);

    
  }
  

handleStatus(event:any){
  event.preventDefault();
  this.setState({status:event.target.value})
}

  
  handleChange(event:any) {
    event.preventDefault();
    this.setState({value: event.target.value});
  }
 
  handleChangeDesc(event:any) {
    event.preventDefault()
    this.setState({description: event.target.value});
  }
  handleZip(event:any) {
    event.preventDefault();
    this.setState({zip: event.target.value});
  }
  

  handleSubmit= async(event:any)=> {
    
    event.target.reset();
    
    

    
    event.preventDefault();
    
    
    const data = new FormData();
    data.append('name', this.state.value);
    data.append('status',this.state.status)
    
    for (var i = 0; i < this.state.url.length; i++) {
     
      console.log(this.state.url[i])
    }
    data.append('arr',JSON.stringify(this.state.url))
    data.append('description',this.state.description)
    data.append('zip',this.state.zip)
    let response = await fetch('/petForm',
    {
      method: 'post',
      body: data,
    }
  );
 
  let res = await response.json();
  if (res.status !== 1){
    alert('Error uploading file');
  }
  

  this.componentDidMount()
  this.onClear();
  return redirect("/dashboard");
};

  
uploadFile = async (e:any) => {
  const file = e.target.files[0];
 console.log (e.target.files[0].name)
  
  
 this.setState({ url: [
  ...this.state.url,
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

componentDidMount() {
  axios.get('/sessionPets')
    .then(res => {
      const pets = res.data;
      this.setState({ petz: pets });
    });
    setTimeout(() => {
      this.setState({ render : !this.state.render })
   }, 10000)

  }



  stateChange = () => {
    this.componentDidMount()
  }

  theme = () => {
    
    let tvar=useMantineTheme();
    return tvar
  }


  onClear = () => {
    this.componentDidMount();
 
    this.setState({
      value: '',
      url:[''],
      zip: '',
      description: '',
      status:''


    })
  };

 
   





 
 

  render() {
  
    

    
    let url="components/images/"
    
    
    
   


    
    return (
      <div>
    
  
      
       
    
      
      <form id="addPet" onSubmit={this.handleSubmit}>
      <TextInput styles={{ label: { color:'teal'} }} 
    
      placeholder="Your comment"
      label="Name"
      withAsterisk
      value={this.state.value} onChange={this.handleChange}
      /><Space h='md'></Space>
      <TextInput styles={{ label: { color:'teal'} }}
defaultValue={this.state.status}
label="Status"
onChange={this.handleStatus}
withAsterisk


/>
<Space h='md'></Space>
    
     
      <Textarea styles={{ label: { color:'teal'} }} 
      placeholder="Your comment"
      label="Description"
      withAsterisk
      
      value={this.state.description} onChange={this.handleChangeDesc}
    />
    <Space h='md'></Space>

<TextInput styles={{ label: { color:'teal'} }} 
      placeholder="Your comment"
      label="Location"
      withAsterisk
      value={this.state.zip} onChange={this.handleZip}
    />
   <Space h='md'></Space>
            
     
      
     
      
      
      
      
    
      <input
        type="file"
        id="file-butt"
        
        onChange={this.uploadFile}
       
        
        multiple
        hidden/>
      
      
      
      



    





      
      <Space h='xl'></Space>
      <input type="submit" id="actual-button" value="submit" hidden/>
      <label htmlFor="file-butt"><Paper style={{backgroundColor:"#6166B3"}} shadow="xs" p="sm">
      <SimpleGrid cols={2}><div><Text color='white' fw={700}>Select images(s)</Text></div><div><Icon path={mdiFolderUploadOutline} size={1} color='white' style={{float:'right',padding:'15px'}}/></div></SimpleGrid>
        <Center><Text size='sm' color='white' fw={400}>please choose one image at a time</Text></Center>

      </Paper></label>
      <Space h='lg'></Space>
      <Space h='lg'></Space>
    


      <input type="submit"  id="actual-button" value="submit"hidden/>
      <Center>
      <label htmlFor="actual-button"><Paper style={{backgroundColor:"#6166B3"}} shadow="xs" p="sm">
      <Text color='white' fw={700}>Submit</Text></Paper></label></Center>
      
      
   
      
    </form>
    
   
    




    



    </div>
    

    );
  }
}