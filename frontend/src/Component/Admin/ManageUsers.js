import { TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material'
import axios from 'axios'
import Swal from 'sweetalert2';
import React, { useEffect, useReducer, useState } from 'react'
import { Table } from 'react-bootstrap'

function ManageUsers() {
    const[User,setUser] = useState([])
    const [reducerValue,forceUpdate] = useReducer(x=>x+1,0)
    const [state, setState] = useState(false)


      const user=(async()=>{
       let userdetail = await axios.get('/admin/manageusers')
       console.log(userdetail.data.users);
       setUser(userdetail.data.users)
      }) 

       
    useEffect( ()=>{
     user()
     
    },[reducerValue])
    
   const  viewHandler=(e)=>{
    e.preventdefault()
   };


    const BlockUser = (_id) => {
        console.log("hiihi");
    try {

      Swal.fire({
        title: "Do you Want to block?",
        showDenyButton: true,
        confirmButtonText: "yes",
        denyButtonText: "No",
        customClass: {
          actions: "my-actions",
          confirmButton: "order-2",
          denyButton: "order-3",
        },
      }).then(async (result) => {
        console.log(result);
        if (result.isConfirmed) {
          const { data } = await axios.patch(
            "/admin/blockUser",
            {
              _id: _id,
            }
          );

          setState(state ? false : true);
          console.log(state);
        forceUpdate()
        }
      });
    } catch (error) {}
  };

   const UnBlockUser = (_id) => {
    
    try {
   
      Swal.fire({
        title: "Do you Want to Unblock this user?",
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
          const { data } = await axios.patch(
            "/admin/unBlockUser",

            {
              _id: _id,
            }
          );
          console.log(data);
          setState(state ? false : true);
          console.log(state);
          forceUpdate()
        }
      });
    } catch (error) {}
  };


  return (
    <div >
      <h1 style={{color:"black", paddingLeft:"6rem",fontSize:"2.3rem"}}>MANAGE USERS</h1>

        <TableContainer component={Paper}>
      <Table sx={{ width: "100%" }} size="small" aria-label="a dense table" >
        <TableHead >
          <TableRow >
            <TableCell sx={{fontSize:'17px',width:"0.5%",fontWeight:"bold"}}>SL.NO</TableCell>
            <TableCell sx={{fontSize:'17px', fontWeight:"bold"}}  align="center">User Name</TableCell>
            <TableCell sx={{fontSize:'17px', fontWeight:"bold"}} align="center">Email</TableCell>
            {/* <TableCell sx={{fontSize:'17px', fontWeight:"bold"}} align="center">Manage</TableCell> */}
            <TableCell sx={{fontSize:'17px', fontWeight:"bold"}} align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { User?.map((users ,index) => {
            return(
         <TableRow
              key={users.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{index+1}</TableCell>
              <TableCell align='center' >{users.name}</TableCell>

              <TableCell align='center' component="th" scope="row">
                {users.email}
              </TableCell>
             
              <TableCell style={{cursor:"pointer"}}  align="center">{users.status ? (
                              <a
                                className="text-red-500  hover:text-red-700 cursor-pointer"
                                onClick={() => {
                                  BlockUser(users._id);
                                  setState(false);
                                }}
                              >
                                Block
                              </a>
                            ) : (
                              <a
                                className="text-red-500 hover:text-red-700 cursor-pointer"
                                onClick={() => {
                                  UnBlockUser(users._id);
                                  setState(true);
                                }}
                              >
                                Unblock
                              </a>
                            )}</TableCell>
            </TableRow>)
})}
        </TableBody>
      </Table>
    </TableContainer>
      
    </div>
  )
}

export default ManageUsers
