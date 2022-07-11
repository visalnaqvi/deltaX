import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "./nav-bar.component"
import {storage} from "../firebase"
import "bootstrap-select/dist/css/bootstrap-select.min.css";
import "bootstrap-select/dist/js/bootstrap-select.min.js";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import Multiselect from 'multiselect-react-dropdown';
export default class CreateSong extends Component {

  constructor(props) {
    super(props);

    this.onChangeSongName = this.onChangeSongName.bind(this);
    this.onChangeSongArtist = this.onChangeSongArtist.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeDOR = this.onChangeDOR.bind(this);
    this.onSongSubmit = this.onSongSubmit.bind(this);
    this.onArtistSubmit = this.onArtistSubmit.bind(this);
    this.onChangeArtistName = this.onChangeArtistName.bind(this);
    this.onChangeBio = this.onChangeBio.bind(this);
    this.onChangeDOB = this.onChangeDOB.bind(this);
    this.onSelect = this.onSelect.bind(this);



    this.state = {
      email:"",
      btn_text:"Create Song",
      img_added: false,
      song_name: "",
      song_artist: [],
      image: "",
      dor: new Date(),
      artists: [],
      imagefile:  "",
      new_artist_name: "",
      bio: "",
      dob: new Date(),
      options: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/artist/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            artists: response.data.map((artist) => {
              return {name:artist.name , id: artist._id};
            }),
          });
        console.log(this.state.artists)
        }
      })
      .catch((error) => {
        console.log(error);
      });
      const prarms = new URLSearchParams(window.location.search)
      this.setState({email:prarms.get('email')});
  }

  onChangeArtistName(e) {
    this.setState({
      new_artist_name: e.target.value,
    });
  }

  onChangeBio(e) {
    this.setState({
      bio: e.target.value,
    });
  }

  onChangeDOB(dob) {
    this.setState({
      dob: dob,
    });
  }

  onChangeSongName(e) {
    this.setState({
      song_name: e.target.value,
    });
  }

  onChangeSongArtist(e) {
    this.setState({
      song_artist: e.target.value,
    });
  }
  onChangeImage(e) {

   this.setState({
    btn_text:"Uploading"
   })

    this.setState({
      imagefile: e.target.files[0],
    });

    const imgRef = ref(storage,e.target.files[0].name)
    uploadBytes(imgRef, e.target.files[0]).then(()=>{
      console.log("success")
      getDownloadURL(imgRef).then(url =>{
        this.setState({
          image:url,
          img_added:true,
          btn_text:'Create Song'
        })
      })
   
    })

 






  }

  onChangeDOR(dor) {
    this.setState({
      dor: dor,
    });
  }

  onSongSubmit(e) {
    e.preventDefault();

    const song = {
      name: this.state.song_name,
      artist: this.state.song_artist,
      image: this.state.image,
      dor: this.state.dor,
    };
    

    axios
      .post("http://localhost:5000/song/add", song)
      .then((res) => console.log(res.data)).catch((e)=>{console.log(e)});

    window.location = "/home";
  }
  
  onSelect(selectedList, selectedItem) {
    this.state.song_artist.push(selectedItem.name);
    console.log(this.state.song_artist);
  }

  onArtistSubmit(e) {
    e.preventDefault();

    const artist = {
      name: this.state.new_artist_name,
      bio: this.state.bio,
      dob: this.state.dob,
      rating:[]
    };


    console.log(artist);

    axios
      .post("http://localhost:5000/artist/add", artist)
      .then(() => this.componentDidMount()
      );

      const artist_div = document.querySelector(".artist-div");
                artist_div.style.top = '-100%';

      
    
  }

  render() {

    return (
      <>
        <div className="my-container">
        <Navbar /> 
          <h3>Add a new Song</h3>
          <form onSubmit={this.onSongSubmit}>
            <div className="form-group">
              <label>Song Name: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.song_name}
                onChange={this.onChangeSongName}
              />
            </div>
        <div className="form-group">
              <label>Artist: </label>
              <Multiselect required
options={this.state.artists} onSelect={this.onSelect} displayValue="name" selectedValues={this.state.selectedValue}
/>  </div> 

              {/* <select
                ref="userInput"
                required
                className="form-control"
                value={this.state.song_artist}
                onChange={this.onChangeSongArtist}
              >
                {this.state.artists.map(function (artist) {
                  return (
                    <option key={artist} value={artist}>
                      {artist}
                    </option>
                  );
                })}
              </select> */}
          

           
              <button type="button" onClick={()=>{
                const artist_div = document.querySelector(".artist-div");
                artist_div.style.top = '0%';
              }} className="btn btn-primary">
                Add Artist
              </button>
           
            <div className="form-group">
              <label>Image: </label>
              <input
                type="file"
                // required
                className="form-control"
              
                onChange={this.onChangeImage}
              />
            </div>

            <div className="form-group">
              <label>Release Date: </label>
              <div>
                <DatePicker
                  selected={this.state.dor}
                  onChange={this.onChangeDOR}
                />
              </div>
            </div>
         { this.state.img_added ? <div className="form-group">
              <input
                type="submit"
                value="Create Song"
                className="btn btn-primary"
              />
            </div> : <button type="button" className="btn btn-secondary">{this.state.btn_text}</button> }  
           
          </form>
        </div>

        <div className="artist-div">
            <div className="inner-artist-div">
          <h3>Add a new Artist</h3>
          <form onSubmit={this.onArtistSubmit}>
            <div className="form-group">
              <label>Artist Name: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.new_artist_name}
                onChange={this.onChangeArtistName}
              />
            </div>
            <div className="form-group">
              <label>Bio: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.bio}
                onChange={this.onChangeBio}
              />
            </div>
           



            <div className="form-group">
              <label>DOB: </label>
              <div>
                <DatePicker
                  selected={this.state.dob}
                  onChange={this.onChangeDOR}
                />
              </div>
            </div>
            <div className="btn-container">
            <div className="form-group">
              <input
                type="submit"
                value="Create Artist"
                className="btn btn-primary"
              />
            </div>
            <button type="button" onClick={()=>{
                const artist_div = document.querySelector(".artist-div");
                artist_div.style.top = '-100%';
              }} className="btn btn-primary">
                Close
              </button>
              </div>
          </form>
          </div>
        </div>
      </>
    );
  }
}
