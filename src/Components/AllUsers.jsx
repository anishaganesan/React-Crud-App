import React, { useEffect, useState } from 'react';
import { Table,TableCell, TableRow, TableHead, TableBody, makeStyles, Button, TableContainer} from '@material-ui/core';
import { deleteUser ,getallUsers } from '../service/api';
import { Link,useHistory} from 'react-router-dom';
import './components.css';
import Navibar from './Navibar';
import "./Navbar.css";
import Navbar from './Navbar';
import Footer from './Footer'



const useStyle = makeStyles({
    table: {
        width: '40%',
        margin: '50px 50px 100px ',
        
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

const AllUsers = () => {

    const classes = useStyle();
    const [user, setUser] = useState([]);
    const [value, setValue] = useState([]);
    const history = useHistory()


    useEffect(() => {
        getUsers();
      
      
    }, [])
    

    const getUsers = async () =>{
        const response = await getallUsers();
        console.log(response);
        setUser(response.data);
    }
    

    const deleteData = async (id) => {
        await deleteUser(id);
        getUsers();
    }
    return (
        <div >
            <Navbar/>
            <div className="all">
            <Navibar/>
            

      

<TableContainer >
    
        
 <div style={{
        margin:"34px",
        padding:"5px",
        maxWidth:"400px",
       
    }}  class="btn-group"
    >
       <input
        
        type="text"
        className="form-control"
        placeholder="Search" 
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        
            />
            <Button onClick={() => history.push('/add')}
              variant="contained"
              color="secondary"
              align="center"
              style={{ margin: '0px 20px' }}>Add Users</Button>
  
  
</div>
            
    
    
    

    
<Table className={classes.table}> 
<TableHead className="neuro1">
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
{user.length === 0 ? (
<TableBody>
<TableRow>
    <TableCell>No data found</TableCell>
</TableRow>
</TableBody>
):(
user.filter(index=>index.firstname.toLowerCase().includes(value)).map((item,index)=>(
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
        <Button variant="contained" color="primary" style={{margin: '0px 20px'}} component={Link} to={`/edit/${item.id}`}>Edit</Button>
                    <Button variant="contained" color="secondary" style={{margin: '0px 20px'}} onClick={() => deleteData(item.id)}>Delete</Button>
        </TableCell>
    </TableRow>

</TableBody>

))
)}
    



</Table>
</TableContainer>
            </div>
            <Footer/>
    
           
</div>

)
}

export default AllUsers;
