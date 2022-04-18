import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {
  Autocomplete,
  Button,
  Grid,
  Card,
  CardContent,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import Grid from "@mui/material/Grid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Crud = () => {
  const navigate = useNavigate();

  const [auth_token, setAuth_token] = useState();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    DOB: null,
    gender: "",
    password: "",
    hobbies: { reading: false, writing: false, playing: false },
    skills: "",
  });

  useEffect(() => {
    axios
      .get("https://www.universal-tutorial.com/api/getaccesstoken", {
        headers: {
          Accept: "application/json",
          "api-token":
            "5Ssc9X7EPUaGnfPnXNAxc-k2Jyy42I77aMBX879QidKrqvvPig_jlTG5ENk8r2s7pRY",
          "user-email": "chetankumar00959@gmail.com",
        },
      })
      .then((res) => {
        setAuth_token(res.data.auth_token);
        getStates(res.data.auth_token);
      });
  }, []);
  useEffect(() => {
    if (employee.state !== "") {
      getCities();
    }
  }, [employee.state]);

  const getStates = async (auth_token) => {
    const res = await axios.get(
      "https://www.universal-tutorial.com/api/states/India",
      {
        headers: {
          Authorization: `Bearer ${auth_token}`,
          Accept: "application/json",
        },
      }
    );
    console.log(res.data);
    setStates(res.data);
  };

  const getCities = async () => {
    const res = await axios.get(
      `https://www.universal-tutorial.com/api/cities/${employee.state}`,
      {
        headers: {
          Authorization: `Bearer ${auth_token}`,
          Accept: "application/json",
        },
      }
    );
    console.log(res.data);
    setCities(res.data);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let arr = localStorage.getItem("empList")
      ? JSON.parse(localStorage.getItem("empList"))
      : [];
    arr.push(employee);
    localStorage.setItem("empList", JSON.stringify(arr));
    console.log(e);
    navigate("/");
   
  };
  return ( 
      <>
      <div className="justify-content-center">
      <h1 align="center"> Add Employee Details</h1>
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
          type="text"
          label="Name"
          value={employee.name}
          onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
          required
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
          label="email"
          value={employee.email}
          onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
          required
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
          value={employee.phone}
          onChange={(e) => setEmployee({ ...employee, phone: e.target.value })}
          required
        />
      </Box>

      {/* <Grid item xs={12} sm={12}>
              <TextField
                id="outlined-multiline-flexible"
                type='text'
                label="Address"
                placeholder='Enter your address'
                value={employee.address}
                onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
                multiline
                fullWidth
                minRows={2}
                maxRows={4}
                required
              />
            </Grid> */}
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
          value={employee.address}
          onChange={(e) =>
            setEmployee({ ...employee, address: e.target.value })
          }
        />
      </Box>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={states.map((states) => ({
            ...states,
            label: states.state_name,
          }))}
          // sx={{ width: 300 }}
          value={employee.state ? employee.state : ""}
          onChange={(e, val) =>
            setEmployee({ ...employee, state: val.state_name })
          }
          renderInput={(params) => (
            <TextField {...params} label="State" required />
          )}
        />
      </Box>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={cities.map((city) => ({
            ...city,
            label: city.city_name,
          }))}
          // sx={{ width: 300 }}
          value={employee.city ? employee.city : ""}
          onChange={(e, val) =>
            setEmployee({ ...employee, city: val.city_name })
          }
          renderInput={(params) => (
            <TextField {...params} label="City" required />
          )}
        />
      </Box>
      <br></br>

      <Box item xs={12} sm={6}>
        <TextField
          id="date"
          label="Date of Birth"
          type="date"
          // defaultValue="1999-04-16"
          // sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setEmployee({ ...employee, DOB: e.target.value })}
        />
      </Box>

      <FormControl>
        <FormLabel>Gender</FormLabel>
        <RadioGroup
          value={employee.gender}
          onChange={(e) => setEmployee({ ...employee, gender: e.target.value })}
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
          value={employee.password}
          onChange={(e) =>
            setEmployee({ ...employee, password: e.target.value })
          }
        />
      </Box>

      <Grid item xs={12} sm={6}>
        <FormControl component="" variant="standard">
          <FormLabel component="">Hobbies </FormLabel>
          <FormGroup sx={{ margin: "0 30px" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={employee.hobbies.reading}
                  onChange={() =>
                    setEmployee({
                      ...employee,
                      hobbies: {
                        ...employee.hobbies,
                        reading: !employee.hobbies.reading,
                      },
                    })
                  }
                  name="reading"
                />
              }
              label="Reading"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={employee.hobbies.writing}
                  onChange={() =>
                    setEmployee({
                      ...employee,
                      hobbies: {
                        ...employee.hobbies,
                        writing: !employee.hobbies.writing,
                      },
                    })
                  }
                  name="jason"
                />
              }
              label="Writing"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={employee.hobbies.playing}
                  onChange={() =>
                    setEmployee({
                      ...employee,
                      hobbies: {
                        ...employee.hobbies,
                        playing: !employee.hobbies.playing,
                      },
                    })
                  }
                  name="antoine"
                />
              }
              label="Playing"
            />
          </FormGroup>
          {/* <FormHelperText>Be careful</FormHelperText> */}
        </FormControl>
      </Grid>

      <Box sx={{width:"200px"}}>
        <FormLabel>Rate your communication skills</FormLabel>
        <Slider
          sx={{ width:"200px" }}
          aria-label="skills"
          
          // getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          onChange={(e) => setEmployee({ ...employee, skills: e.target.value })}
          step={1}
          marks
          min={0}
          max={5}
        />
      </Box>

      <Button type="submit">Submit</Button>
    </form>
    </div>
    </>
  );
};

export default Crud;
