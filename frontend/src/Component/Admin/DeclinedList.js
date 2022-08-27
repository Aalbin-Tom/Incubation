import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function DeclinedList() {
 const[Company,setCompany] = useState([])


      const companies=(async()=>{
       let companydetail = await axios.get('/admin/declinedlist')
       console.log(companydetail.data.companys);
       setCompany(companydetail.data.companys)
      }) 

       
    useEffect( ()=>{
     companies()
    
    },[])

  return (  
    <div >
      <h1 style={{color:"black", paddingLeft:"6rem",fontSize:"2.3rem"}}>DECLINED LIST</h1>

        <TableContainer component={Paper}>
      <Table sx={{ width: "100%" }} size="small" aria-label="a dense table" >
        <TableHead >
          <TableRow >
            <TableCell sx={{fontSize:'17px',width:"0.5%",fontWeight:"bold"}}>SL.NO</TableCell>
            <TableCell sx={{fontSize:'17px', fontWeight:"bold"}}  align="center">Company Name</TableCell>
            <TableCell sx={{fontSize:'17px', fontWeight:"bold"}}  align="center">User Name</TableCell>
            <TableCell sx={{fontSize:'17px', fontWeight:"bold"}} align="center">Email</TableCell>
            <TableCell sx={{fontSize:'17px', fontWeight:"bold"}} align="center">Address</TableCell>
            <TableCell sx={{fontSize:'17px', fontWeight:"bold"}} align="center">Phone</TableCell>
            <TableCell sx={{fontSize:'17px', fontWeight:"bold"}} align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { Company?.map((users ,index) => {
            return(
         <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{index+1}</TableCell>
              <TableCell align='center' >{users.company}</TableCell>
              <TableCell align='center' >{users.name}</TableCell>

              <TableCell align='center' component="th" scope="row">
                {users.email}
              </TableCell>
              <TableCell align="center"> {users.address} </TableCell>
              <TableCell  align="center"> {users.phone} </TableCell>
              <TableCell style={{background:"rgb(207 99 106)"}}  align="center"> {users.status} </TableCell>
            </TableRow>)
})}
        </TableBody>
      </Table>
    </TableContainer>
      
    </div>
  )
}


export default DeclinedList
