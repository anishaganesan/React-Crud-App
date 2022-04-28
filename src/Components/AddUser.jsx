import React, { useState,useEffect } from 'react'
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
  FormLabel,
  NativeSelect
} from '@material-ui/core'

import { addUser} from '../service/api'
import { useHistory } from 'react-router-dom'
import './components.css';
import Navbar from './Navbar';
import Navibar from './Navibar';
import Footer from './Footer'



const initialValue = {
  firstname: '',
  lastname: '',
  gender: 'male',
  phone: '',
  countryname:'',
  statename:'',
  cityname:''

}

const AddUser = () => {
  
 
  const [user, setUser] = useState(initialValue)
  const { firstname, lastname, gender,countryname,statename,cityname, phone } = user
  const history = useHistory()

  //country state city
  
const onValueChange = (e) => {
    //console.log(e);
    console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const addUserDetails = async () => {
    await addUser(user)
    history.push('/all')
  }
  
  const [data, setData]= useState([]);
  const [getCountry, setCountry]= useState();
  const [getState, setState]= useState([]);
  const [selectedState, setselectedState]= useState();
  const [cities,setCities]=useState([]);

  useEffect( ()=>{
    axios.get("https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json")
      .then(res=>setData(res.data))
      .catch(err=>console.log(err))
      
      
  },[])

   const country=[...new Set(data.map(item=>item.country))];
  country.sort(); 


  const handlecountry=(e)=>{
    e.preventDefault();
    let state=data.filter(state=>state.country === e.target.value);
    
    state=[...new Set(state.map(item=>item.subcountry))];
    state.sort();
    setState(state);
    setUser({ ...user, [e.target.name]: e.target.value })
    ///setUser(e.target.value);
    console.log(e.target.value);
  }
  const handlestate=(e)=>{
    e.preventDefault();
   let cities=data.filter(city=>city.subcountry === e.target.value);
   
   cities.sort();
  /// setUser({ ...user, [e.target.name]: e.target.value })
   setCities(cities);
  setUser({ ...user, [e.target.name]: e.target.value })
   ///setUser(e.target.value);
   console.log(e.target.value);

    }

//

  return (
    <div >

      <Navbar/>
      <div className='add' >
      <Navibar/> 
      
    <Container maxWidth="xs" > 
    
      <Box >
    
  
        <Typography variant="h5" align="center">
          Add User Details
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
            <InputLabel>LastName</InputLabel>
            <Input
              onChange={(e) => onValueChange(e)}
              name="lastname"
              value={lastname}
            />
          </FormControl>
          <FormControl>
          
          <FormLabel>Gender</FormLabel>
          
            <RadioGroup
              row
              name="gender"
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
              onClick={() => addUserDetails()}
              color="primary"
              align="center"
            >
              Add User
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
      <Footer/>
    
    </div>
  )
}

export default AddUser;
