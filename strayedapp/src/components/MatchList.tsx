import React from 'react'
import {Table} from '@mantine/core'
import axios from 'axios'
import {Grid,CardSection,Image,Group,Text,Card,Space,Button,useMantineTheme} from '@mantine/core'
import {modals} from '@mantine/modals'


export default class MatchList extends React.Component<any,{matchPets:Array<any>,matchDetails:any,date:any}>{
 constructor(props:any){
    super(props)
    this.state={
        matchPets:[],
        matchDetails:[],
        date:''
        

    


    }



    }

makeCardMatch(Date: any, Location: any, image: string, id: any) {
  let url = "components/images/";
  let date = Date.split("-");
  let buttonWords=""

  Date = date[1] + "-" + date[2] + "-" + date[0];

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
        alignItems: "left",
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

   
      <Space h="lg"></Space>
      <Group spacing="medium" align="center">
        
          <Button
            style={{ background: "#2F575F", fontSize: "medium" }}
            size="sm"
            onClick={() => {
              this.dismissMatch(id);
            }}
          >
            Dismiss
          </Button>
          <Space w='sm'></Space>
          <Button
            style={{ background: "#2F575F", fontSize: "medium" }}
            size="sm"
            onClick={() => {
           this.doSomethingWithSubmissionID(id,date);
            }}
          >
            Details
          </Button>
        
      </Group>
    </Card>
  );
}
dismissMatch=async(id:any)=>{
  const data = new FormData();
  data.append("submissionID", id);
  let response = await fetch("/dismissMatch", { method: "post", body: data });
  this.openModalWaiting();
  

}
openModalWaiting() {
    
  modals.open({
    children: (
      <>
      <center>
        <div id="modal">
      
     
        <Image width={100} height={100} src={require('./images/pload.gif')} />
        <Text>Deleting from Matches</Text>
        
        
      </div>
      </center>
      </>
    ),
  });
  setTimeout(() => {
  window.location.reload();
      
  }, 3000);

  

  
};

doSomethingWithSubmissionID=async(id:any,date:any)=>{

 this.setState({date:date})
  const data = new FormData();
  data.append("submissionID", id);
  let response = await fetch("/matchDetails", { method: "post", body: data });
  let res = await response.json();
  console.log(res[0])
  
  
 this.setState({ matchDetails:res[0]
 }
   ,this.openDetailsModal)
  

}
emailButton(typeOfMatch:any){
    if(typeOfMatch!=24){
        return(<>
        <Button>
            Email Foster
        </Button>
        
        
        
        </>)
    }
    if(typeOfMatch==24){
        return(<p></p>)
    }
}



openDetailsModal(){
 // buildjs=['SubmissionDescription','SubmittingUser','SubmittingUserEmail','Location']
    var date1=`${this.state.date}`.split("-")
    var date2=date1[1]+"-"+date1[2]+"-"+date1[0]
    var button=this.emailButton(this.state.matchDetails.SubmittingUser)
    var typeOf=this.state.matchDetails.SubmittingUser
    var disp=""
    var email=""
    var details=this.state.matchDetails.SubmissionDescription
    if(typeOf==24){
      disp="Spotted near: "+`${this.state.matchDetails.Location}`
    }
    if(typeOf!=24){
      disp="This dog is currently be fostered by: "+this.state.matchDetails.SubmittingUserEmail
      
    }



  modals.open({
    title:(<><Text size='md'>Match Details</Text></>),
    children:(<>
    <Text>{disp}</Text>
    <Space h='md'></Space>
    <Text>Description: {details}</Text>
    
    
    </>)
  })

}
componentDidMount(){
axios.get('/modelMatch',{})
.then(res=>{
    const matchPets=res.data
    this.setState({matchPets})
})


}
handleSubmit=async()=>{



}









    render() {
      
        
        return(


<div className="container">
  
                            <ul>
                              <Grid>
                                {this.state.matchPets.map((pet) => (
                                  <Grid.Col span={6}>
                                    <ul className="no-bullets">
                                      <p>
                                        <li key={pet.DogID}></li>
                                        {this.makeCardMatch(
                                          `${pet.Date}`,
                                          `${pet.Location}`,
                                          `${pet.SubmissionImage}`,
                                          `${pet.SubmissionID}`
                                        )}
                                      </p>
                                    </ul>
                                  </Grid.Col>
                                ))}
                              </Grid>
                            </ul>
                          </div>

        );

    }
}