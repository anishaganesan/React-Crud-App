import React, { useEffect, useState } from 'react'
import axios from "axios";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Box,
  FormGroup,
  Button,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormLabel,NativeSelect,
} from '@material-ui/core'
import { editUser, getallUsers } from '../service/api'
import { useHistory, useParams } from 'react-router-dom'
import './components.css';
import Navbar from './Navbar';
import Navibar from './Navibar';

const initialValue = {
  firstname: '',
  lastname: '',
  gender: 'male',
  countryname:'',
  statename:'',
  cityname:'',
  phone: '',
}

const EditUser = () => {
  const [user, setUser] = useState(initialValue)
  const { firstname, lastname, gender,countryname,statename,cityname, phone } = user
  const [data, setData]= useState([]);

    const [getCountry, setCountry]= useState(initialValue);
    const [getState, setState]= useState([]);
    const [selectedState, setselectedState]= useState(initialValue);
    const [cities,setCities]=useState([]);


  const { id } = useParams()

  useEffect(() => {
    loadUserData();
  }, [])

  const loadUserData = async () => {
    const response = await getallUsers(id)
    setUser(response.data)
  
  };
  console.log(data);
  const history = useHistory()
  
  useEffect( ()=>{
    axios.get("https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json")
      .then(res=>setData(res.data))
      .catch(err=>console.log(err))
      
      
  },[]);

   const country=[...new Set(data.map(item=>item.country))];
  country.sort(); 


  const handlecountry=(e)=>{
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value })
    let state=data.filter(state=>state.country === e.target.value);
    
    state=[...new Set(state.map(item=>item.subcountry))];
    state.sort();
    setState(state);
    
    console.log(e.target.value);
  }
  const handlestate=(e)=>{
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value })
   let cities=data.filter(city=>city.subcountry === e.target.value);
   cities.sort();
   setCities(cities);
   console.log(e.target.value);

    }

  //

  const onValueChange = (e) => {
    //  console.log(e);
    // console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value })
    
  };
  console.log(user);

  const editUserDetails = async () => {
    await editUser(id, user)
    history.push('/all')
  }

  return (
    <div >

      <Navbar/>
      <div className='edit' >
      <Navibar/> 
      
    <Container maxWidth='xs'>
      <Box>
        <Typography variant="h5" align="center">
          Update User Details
        </Typography>
        <FormGroup>
          <FormControl>
            <InputLabel>FirstName</InputLabel>
            <Input
              onChange={(e) => onValueChange(e)}
              name="firstname"
              value={firstname}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Last Name</InputLabel>
            <Input
              onChange={(e) => onValueChange(e)}
              name="lastname"
              value={lastname}
            />
          </FormControl>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={gender}
              onChange={(e) => onValueChange(e)}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
          
          <FormControl>
          
          <FormLabel >Country </FormLabel>
                <NativeSelect  className="form-control p-2"  name="countryname"
              value={countryname}onChange={(e)=>handlecountry(e)} >
                  <option value="">--Select Country--</option>
                  {
                 country.map( (items)=>(
                  <option key={items} value={getCountry}>{items } </option>
                 ))
                  }
                </NativeSelect>
          </FormControl>
          <FormControl>
          
          <FormLabel >State</FormLabel>
                <NativeSelect className="form-select"  name="statename"
              value={statename} onChange={(e)=>handlestate(e)} >
                  <option value="">--Select State--</option>
                  {
                 getState.map( (items)=>(
                  <option key={items} value={selectedState}>{items } </option>
                 ))
                 
                  }            
                </NativeSelect>
          </FormControl>
          <FormControl>
         
          <FormLabel  className="form-label">City</FormLabel>
                <NativeSelect className="form-select" name="cityname" value={cityname} onChange={(e) => onValueChange(e)}>
                  <option value="">--Select City--</option>
                  {
                 cities.map((items)=>(
                  <option key={items.name}>{items.name }</option>
                 ))
                  }                  
                </NativeSelect>
          </FormControl>
          <FormControl>
            <InputLabel>Phone Number</InputLabel>
            <Input
              onChange={(e) => onValueChange(e)}
              name="phone"
              value={phone}
            />
          </FormControl>
          <Box my={3}>
            <Button
              variant="contained"
              onClick={() => editUserDetails()}
              color="primary"
              align="center"
            >
              Update User
            </Button>
            <Button
              onClick={() => history.push('/all')}
              variant="contained"
              color="secondary"
              align="center"
              style={{ margin: '0px 20px' }}
            >
              Cancel
            </Button>
          </Box>
        </FormGroup>
      </Box>
    </Container>
    </div>
    </div>
  )
}

export default EditUser;
