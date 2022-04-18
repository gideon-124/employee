
import React,{useState} from 'react'
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const Skills = () => {
  const [skills,setSkills]=useState("") 
    const marks = [
      {
        value: 1,
        label: "1",
      },
      {
        value: 2,
        label: "2",
      },
      {
        value: 3,
        label: "3",
      },
      {
        value: 4,
        label: "4",
      },
      {
          value:5,
          label:"5"
      }
    ];
    console.log(marks)

    function valuetext(value) {
      return `${value}`;
    }
  return (
    <div>
      <label> Rate your communication skills </label>
      <Box sx={{ width: 300 }}>
        <Slider
          aria-label="Temperature"
          
          defaultValue={0}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={5}
        />
        <Slider  />
      </Box>
    </div>
  );
}

export default Skills
