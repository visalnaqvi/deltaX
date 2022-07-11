import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email:"",
    };
  }

  componentDidMount() {
    
      const prarms = new URLSearchParams(window.location.search)
      this.setState({email:prarms.get('email')});

    
  }
  render() {
 
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to={`/home?email=${this.state.email}`}  className="navbar-brand">Spotify</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to={`/add-song?email=${this.state.email}`} className="nav-link">Add Song</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}