import React, { useEffect, useState } from 'react'
import { Table,TableCell, TableRow, TableHead, TableBody, makeStyles, Button, TableContainer} from '@material-ui/core';
import axios from "axios";
import { deleteUser ,getallUsers } from '../service/api';
import { Link,useParams} from 'react-router-dom';


const useStyle = makeStyles({
    table: {
        width: '80%',
        margin: '50px 100px 100px 140px',
    },
    thead:{
        '& > *':{
            background:'#6b8e23',
            color:'#FFFFFF',
            fontSize: '16px'
        }
    },
    trow:{
        '& > *':{
            fontSize: '16px'
        }
    }
})
function SearchUser() {
    const classes = useStyle();
  const [data, setData] = useState([]);
  const [value, setValue] = useState([]);
  const { id } = useParams()
  
  useEffect(() => {
    loadUsersData();
  }, []);

  useEffect(() => {
    getUsers();
}, [])

  const loadUsersData = async () => {
    return await axios
      .get("http://localhost:3000/user")
      .then((response) => setData(response.data))
      .catch((err) => console.log(err))
  };
  console.log(data);

  const getUsers = async () =>{
    const response = await getallUsers();
    console.log(response);
    setData(response.data);
}

const deleteData = async (id) => {
    await deleteUser(id);
    getUsers();
}
  //const handleReset=()=>{
      //loadUsersData();
//};

//const handleSearch=async (e) => {
    //e.preventDefault();
    //return await axios
    //.get(`http://localhost:3000/user?q=${value}`)
    //.then((response)=>{
        //setData(response.data);
        //setValue("");
    //})
   // .catch((err)=>console.log(err));  

//};


  return (
    <TableContainer>
         <form style={{
                margin :"auto",
                padding:"15px",
                maxWidth:"400px",
                alignContent:"center",
            }}
            >
                <input
                
                type="text"
                className="form-control"
                placeholder="Search" 
                value={value}
                onChange={(e)=>setValue(e.target.value)}
                
                    />
                    
            </form>
    
    <Table className={classes.table}>
<TableHead>
    <TableRow className={classes.thead}>
        <TableCell>ID</TableCell>
        <TableCell>FirstName</TableCell>
        <TableCell>LastName</TableCell>
        <TableCell>Gender</TableCell>
        <TableCell>Country</TableCell>
        <TableCell>State</TableCell>
        <TableCell>City</TableCell>
        <TableCell>Phone</TableCell>
        <TableCell></TableCell>
    </TableRow>
</TableHead>
{data.length === 0 ? (
    <TableBody>
        <TableRow>
            <TableCell>No data found</TableCell>
        </TableRow>
    </TableBody>
):(
    data.filter(index=>index.firstname.toLowerCase().includes(value)).map((item,index)=>(
        <TableBody key={index.id}>
            <TableRow className={classes.trow}>
            <TableCell>{item.id}</TableCell>
                <TableCell>{item.firstname}</TableCell>
                <TableCell>{item.lastname}</TableCell>
                <TableCell>{item.gender}</TableCell>
                <TableCell>{item.countryname}</TableCell>
                <TableCell>{item.statename}</TableCell>
                <TableCell>{item.cityname}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>
                <Button variant="contained" color="primary" style={{margin: '0px 20px'}} component={Link} to={`/edit/${data.id}`}>Edit</Button>
                            <Button variant="contained" color="secondary" style={{margin: '0px 20px'}} onClick={() => deleteData(data.id)}>Delete</Button>
                </TableCell>
            </TableRow>

        </TableBody>

    ))
)}
            
        


</Table>
</TableContainer>

)
}

export default SearchUser;
