import React from 'react';
import axios from 'axios';


export default class User extends React.Component<any,{user:Array<any>,render:boolean}> {
  constructor(props:any){
    super(props);
  this.state = {
    user: [],
    render:true
  }
  }
  componentDidMount() {
    axios.get('/sessionUser')
      .then(res => {
        const user = res.data;
        this.setState({ user });
      })
  }

  render() {
    return (
      <ul>
        {
          this.state.user
            .map(usr =>
              <ul className="no-bullets">
              <p><li key={usr.UserID}>{usr.Type}</li>
              <li>Username:{usr.UserName}</li></p>
              
             
    

              </ul>
            )
        }
      </ul>
    )
  }
}