import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: '',
      flag:false
    }
  }


  componentDidMount() {
    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((users) => users.email),
          });
        
        }
      })
      .catch((error) => {
        console.log(error);
      });
      
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

 
  onSubmit(e) {
    e.preventDefault();

    if(this.state.users.includes(this.state.email)){
      window.location = `/home?email=${this.state.email}`
    }else{
      window.location = '/create-user'
    }
   
      
  }

  render() {
    return (
    <div className='my-container'>
      <h3>Registered Email</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Email: </label>
          <input  type="email"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
              />
        
        </div>
        
        <div className="btn-container">
        <div className="form-group">
          <input type="submit" value="Log In" className="btn btn-primary" />
        </div>
            <button type="button" onClick={()=>{
                       window.location = '/create-user';

              }} className="btn btn-primary">
                Create User
              </button>
              </div>
        

       
      </form>
    </div>
    )
  }
}