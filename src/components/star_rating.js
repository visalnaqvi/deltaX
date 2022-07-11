import { useState , useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from 'axios';

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
    
};


function StarRating({u,a,h,r,s}) {
 

  const [currentValue, setCurrentValue] = useState(0);
  const [sum, setSum] = useState(0);
  const [flag, setFlag] = useState(true);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0)
  s ?axios.get('http://localhost:5000/artist/' + a._id)
      .then(response => {
       response.data.rating.forEach((r)=>{
        if(u==r.email){
            setCurrentValue(r.score);
        }
       })
      })
      .catch((error) => {
        console.log(error);
      }) : axios.get('http://localhost:5000/artist/' + a._id)
      .then(response => {
        let sum = 0;
       response.data.rating.forEach((r)=>{
        console.log(parseInt(r.score, 10))
         sum += parseInt(r.score, 10);
       })
       let avg = sum/response.data.rating.length;
       console.log("avg",avg)
       console.log("sum",sum)
       setCurrentValue(avg)
      })
      .catch((error) => {
        console.log(error);
      })
  const handleClick = value => {
    if(s==true){
        setCurrentValue(value)
        a.rating.forEach((rating)=>{
           
            if(rating.email == u){
                rating.score = value
        
                setFlag(false)
            }
        })
        flag ? a.rating.push({email:u,score:value}) : a = a;
        const artist = {
            name: a.name,
            artist: a.artist,
            bio: a.bio,
            dob: a.dob,
            rating:a.rating
          };
          console.log("artist.rate",a.rating);
          axios.post('http://localhost:5000/artist/update/' + a._id, artist)
          .then(res => console.log(res.data));
    }
   
  
  }

  const handleMouseOver = newHoverValue => {
    if(s==true){
        setHoverValue(newHoverValue)

    }
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }


  return (
    <div style={styles.container}>
      <p> {s?"Your Rating":"Average Rating"} </p>
      <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div>
      
    </div>
  );
};


const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
 

};




export default StarRating;
 