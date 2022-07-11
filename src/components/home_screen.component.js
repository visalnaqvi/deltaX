import React, { Component } from 'react';
import axios from 'axios';
import Navbar from "./nav-bar.component"
import StarRating from './star_rating';

const Artist = props => (
  <tr>
    <td>{props.artist.name}</td>
    <td>{props.artist.bio}</td>
    <td>{props.artist.dob.substring(0,10)}</td>
    <td><StarRating u={props.email} a={props.artist} s={false}></StarRating>
    <StarRating  u={props.email} a={props.artist} s={true}></StarRating></td>
    <td>
       <a href="#" onClick={() => { props.deleteArtist(props.artist._id) }}>delete</a>
    </td>
  </tr>
)




const Song = props => (
    <tr>
      <td><img className='img' alt="" src={props.song.image}></img></td>
      <td>{props.song.name}</td>
      <td>{props.song.artist.join()}</td>
      <td>{props.song.dor.substring(0,10)}</td>
      <td>
       <a href="#" onClick={() => { props.deleteSong(props.song._id) }}>delete</a>
      </td>
    </tr>
  )

export default class ArtistList extends Component{
  constructor(props) {
    super(props); 
    this.state = {
      email: '',
    }
    this.deleteArtist = this.deleteArtist.bind(this)
    this.state = {artist: [],song:[]};
    this.deleteSong = this.deleteSong.bind(this)
  }



  componentDidMount() {
    axios.get('http://localhost:5000/artist/')
      .then(response => {
        this.setState({ artist: response.data })
      })
      .catch((error) => {
        console.log(error);
      })

      const prarms = new URLSearchParams(window.location.search)
      this.setState({email:prarms.get('email')});

      axios.get('http://localhost:5000/song/')
      .then(response => {
        this.setState({ song: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteArtist(id) {
    axios.delete('http://localhost:5000/artist/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      artist: this.state.artist.filter(el => el._id !== id)
    })
  }

  deleteSong(id) {
    axios.delete('http://localhost:5000/song/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      song: this.state.song.filter(el => el._id !== id)
    })
  }

  artistList() {
    return this.state.artist.map(currentartist => {
      return <Artist email={this.state.email} artist={currentartist} deleteArtist={this.deleteArtist} key={currentartist._id}/>;
    })
  }

  songList() {
    return this.state.song.map(currentsong => {
      return <Song song={currentsong} email={this.state.email} deleteSong={this.deleteSong} key={currentsong._id}/>;
    })
  }

  render() {
    return (
        <div className='my-container'>
           <Navbar /> 
      <div>
        <br></br>
        <h3>Top Artists</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Bio</th>
              <th>Date of Birth</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            { this.artistList() }
          </tbody>
        </table>
      </div>
      <div>
        <br></br>
      <h3>Top Songs</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Thumbnail</th>
            <th>Name</th>
            <th>Artist</th>
            <th>Date of release</th>
          </tr>
        </thead>
        <tbody>
          { this.songList() }
        </tbody>
      </table>
    </div>
    </div>
    )
  }
}