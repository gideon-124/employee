import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Checkbox, FormControl, FormGroup } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Skills from "./Skills";
import Datebirth from "./Datebirth";
import Autocomplete from "@mui/material/Autocomplete";
import Slider from "@mui/material/Slider";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";


const Operations = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [states, setStates] = useState([]);
  const [city, setCity] = useState([]);
  const [state,setState]=useState("")
  const [cities, setCities]=useState("")
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [hobbies, setHobbies] = useState("");
  const[skills,setSkills]=useState("")
  const [value, setValue] = React.useState("");

 

  const handleSubmit = (e) => {
    e.preventDefault();
    const userdetails = {
      name,
      email,
      number,
      address,
      state,
      cities,
      skills,
      gender,
      hobbies,
      password,
      dob
    };
   
    let arr = localStorage.getItem("List")
    ? JSON.parse(localStorage.getItem("List"))
    : [];
  arr.push(userdetails);
  localStorage.setItem("List", JSON.stringify(arr));
  console.log(e);
  
  };
  let token="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJhc2tAdW5pdmVyc2FsLXR1dG9yaWFsLmNvbSIsImFwaV90b2tlbiI6IlQ2VlBOUmZXbkxFbmdsMHd2djctZ1d2Y09KRHFPSkptc3ZoNkNOdGo5a3p1Z1RSYkhvdXVET1NXeTdzYmJzdG5taDAifSwiZXhwIjoxNjUwMzYyMDYyfQ.HsKFW9meD3IY0uREynv--zTbQHOmhd3CsTnORIiBCMo"

  useEffect(()=>{
    axios.get("https://www.universal-tutorial.com/api/states/India",{
      headers:{authorization:token}
    })
    .then(response=>{
      console.log(response)
      setStates(response.data)
    })
   
  },[])

  useEffect(()=>{
    axios.get(`https://www.universal-tutorial.com/api/cities/${state}`,{
      headers:{authorization:token}
    })
    .then(response=>{
      console.log(response)
      setCity(response.data)
    })
   
  },[state])

  //console.log(gender(e.target.value));

  return (
    <div>
      <form onSubmit={handleSubmit}>
        
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            type="textbox"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>

       
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          Validate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>

        
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          Validate
          autoComplete="off"
        >
          <TextField
            label="phone"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </Box>

        
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            type="textbox"
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Box>

        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
        <Autocomplete
          getOptionLabel={option=>option.state_name}
          id="combo-box-demo"
          options={states}
          sx={{ width: 300 }}
          onChange={(e,value) => setState(value.state_name)}
          renderInput={(params) => <TextField {...params} label="State" />}
        />
        </Box>

        <br></br>

        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >

        <Autocomplete
          getOptionLabel={option=>option.city_name}
          id="combo-box-demo"
          options={city}
          sx={{ width: 300 }}
          onChange={(e,value)=>setCities(value.city_name)}
          renderInput={(params) => <TextField {...params} label="city" />}
        />
        </Box>
        <br></br>

        <Box  component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off">
        <TextField
          id="date"
          label="Date of Birth"
          type="date"
          // defaultValue="1999-04-16"
          // sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
         onChange={(e)=>setDob(e.target.value)}
        />
      </Box> 
         
         <Box component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off" >
      

        <FormControl>
          <FormLabel>Gender</FormLabel>
          <RadioGroup
            // aria-labelledby="demo-radio-buttons-group-label"
            value={gender}
            //name="radio-buttons-group"
            onChange={(e) => setGender(e.target.value)}
          >
            <FormControlLabel
              value="female"
              type="radio"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        </Box>
        <br></br>
        
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>

        <FormControl>
          <FormLabel>Hobbies</FormLabel>
          <FormGroup>
            <FormControlLabel
              value="Reading books"
              
              control={<Checkbox />}
              label="Reading books"
            />

            <FormControlLabel
              value="Watching movies"
              control={<Checkbox />}
              label="Watching movies"
            />
            <FormControlLabel
              value="painting"
              control={<Checkbox />}
              label="painting"
            />
          </FormGroup>
        </FormControl>
        <br></br> 

        <Box sx={{width:"200px"}}>
        <FormLabel>Rate your communication skills</FormLabel>
        <Slider
          sx={{ width:"200px" }}
          aria-label="skills"
          
          // getAriaValueText={valuetext}
          valueLabelDisplay="auto"
         onChange={(e)=>setSkills(e.target.value)}
          step={1}
          marks
          min={0}
          max={5}
        />
      </Box>


        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Operations;
