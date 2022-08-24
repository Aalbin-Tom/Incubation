import { TableContainer,Table, TableCell, TableHead, TableRow, Paper, TableBody } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import Swal from 'sweetalert2'
import {TiTick} from 'react-icons/ti'
import {ImCross} from 'react-icons/im'


function Application() {
    const[Company,setCompany] = useState([])
    const [reducerValue,forceUpdate] = useReducer(x=>x+1,0)


      const companies=(async()=>{
       let companydetail = await axios.get('/admin/applicationlist')
       console.log(companydetail.data.companys);
       setCompany(companydetail.data.companys)
      }) 

       
    useEffect( ()=>{
     companies()
     
    },[reducerValue])
    
   const  approve=(_id)=>{

      try {
   
      Swal.fire({
        title:"Are you sure to Approve",
        showDenyButton: true,
        confirmButtonText: "yes",
        denyButtonText: "No",
        customClass: {
          actions: "my-actions",
          confirmButton: "order-2",
          denyButton: "order-3",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axios.post(
            "/admin/approve",

            {
              _id: _id,
            }
          );
          console.log(data);
          forceUpdate()
        }
      });
    } catch (error) {
      
    }

   };

const  decline=(_id)=>{
   };
 


  return (  
    <div >
      <h1 style={{color:"black", paddingLeft:"6rem",fontSize:"2.3rem"}}> PENDING APLICATIONS</h1>

        <TableContainer component={Paper}>
      <Table sx={{ width: "100%" }} size="small" aria-label="a dense table" >
        <TableHead >
          <TableRow >
            <TableCell sx={{fontSize:'17px',width:"0.5%",fontWeight:"bold"}}>SL.NO</TableCell>
            <TableCell sx={{fontSize:'17px', fontWeight:"bold"}}  align="center">Company Name</TableCell>
            <TableCell sx={{fontSize:'17px', fontWeight:"bold"}}  align="center">User Name</TableCell>
            <TableCell sx={{fontSize:'17px', fontWeight:"bold"}} align="center">Email</TableCell>
            <TableCell sx={{fontSize:'17px', fontWeight:"bold"}} align="center">Phone</TableCell>
            <TableCell sx={{fontSize:'17px', fontWeight:"bold"}} align="center">Decline</TableCell>
            <TableCell sx={{fontSize:'17px', fontWeight:"bold"}} align="center">Approve </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { Company?.map((obj ,index) => {
            return(
         <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{index+1}</TableCell>
              <TableCell align='center' >{obj.company}</TableCell>
              <TableCell align='center' >{obj.name}</TableCell>

              <TableCell align='center' component="th" scope="row">
                {obj.email}
              </TableCell>
              <TableCell align="center"> {obj.phone} </TableCell>
              <TableCell align="center"> 
              <button style={{background:"rgb(235 49 73)"}}  onClick={()=>{decline(obj._id) }}><ImCross/> </button>
              </TableCell>

              <TableCell align="center"> 
                <button style={{background:"#4af379"}}  onClick={()=>{approve(obj._id) }}>  <TiTick/></button>
              
               </TableCell>
            </TableRow>)
})}
        </TableBody>
      </Table>
    </TableContainer>
      
    </div>
  )
}
export default Application
