import React from 'react'
import { Container, Typography, Box } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Navibar from './Navibar'
import Navbar from './Navbar'
import Footer from './Footer'


const Home = () => {
  return (
    
      <div >
      <Navbar/>
    <div className='home'>
    <Navibar/>
   <Container maxWidth="lg" >
   <h1>Home Page</h1>
     </Container>
   
    </div>
    <Footer/>
    
   </div>
  
   
    
     
  )
}

export default Home
