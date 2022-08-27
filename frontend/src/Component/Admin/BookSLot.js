import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
// import * as React from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function BookSLot() {
  const [open, setOpen] = useState(false);
  const [room, setRoom] = useState([]);
  const [roomm, setRoomm] = useState(null);
  const [number, setNumber] = useState("");
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [company, setCompany] = useState([]);
  const [companyname, setCompanyname] = useState(null);
  const [show, setShow] = useState(false);
  const [views,setViews]= useState([])
  const [view,setView]= useState(false)

  //      const bull = (
  //   <Box
  //     component="span"
  //     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  //   >
  //     •
  //   </Box>
  // );

   const handleCloseClick = () => {
    setView(false);
  };

  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOpen = (id) => {
    setShow(true);
    console.log(id, "ffff");
    setRoomm(id);
  };

  const handleApp = () => {
    console.log("show");
    setRoomm(null);
    setShow(false);
    setCompanyname(null)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const assignslot = async (_id, name) => {
    console.log(_id,name);
    try {
      const { data } = await axios.post("/admin/asignslot",{
        _id: _id,
        company: name,
      });     
      setShow(false); 
      setCompanyname(null)
      forceUpdate()
    } catch (error) {}
  };
  const viewdata=(async(_id)=>{
   
    console.log(_id);
    let view= await axios.post("/admin/viewdata",{
      _id:_id,
    })
    console.log(view.data)
    setViews(view.data.view) 
    setView(true)
    console.log(views);
  })

  const companies = async () => {
    let companydetail = await axios.get("/admin/approvedlist");
    console.log(companydetail.data.companys);
    setCompany(companydetail.data.companys);
  };

  const rooms = async () => {
    let room = await axios.get("/admin/bookslot");
    console.log(room.data.rooms);
    setRoom(room.data.rooms);
  };

  const addrooms = async (e) => {
    try {
      let addroom = axios.post("/admin/addroom", {
        number: number,
      });
      console.log(addroom);
      setOpen(false);
      forceUpdate();
    } catch (error) {}
  };
  useEffect(() => {
    rooms();
    companies();
  }, [reducerValue]);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <h1 style={{ color: "black", paddingLeft: "6rem", fontSize: "2.3rem" }}>
          Aloting Slot
        </h1>
        <Button
          style={{
            marginLeft: "auto",
            height: "40px",
            marginRight: "2rem",
            marginTop: "1.5rem",
          }}
          variant="outlined"
          onClick={handleClickOpen}
        >
          Add Slot
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>ADD ROOM</DialogTitle>
          <DialogContent>
            <DialogContentText>Add mnumber for the room</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="number"
              label="Room Number"
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={() => {
                addrooms();
              }}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div style={{ display: "flex", marginTop: "15px" }}>
        {room?.map((room, index) => {
          return (
            <>
           
              <Card
                key={index}
                style={{
                  gap: "1rem",
                  marginLeft: "1rem",
                  width: "7rem",
                  backgroundColor: room.status? "yellow" : "#35e635" ,
                }}
              >
              <span >{room.company ? <button style={{background:"yellow" ,border:"1px solid"}} onClick={()=>viewdata(room._id)}>view</button> : ""}</span> 

               {!room.company ?
                <Button
                  style={{ width: "2rem",border:'none',color:"white" }}
                  variant="outlined"
                  onClick={() => handleOpen(room._id)}
                > 
                  <CardContent>
                    <Typography
                      sx={{ fontSize:15}}
                      color="text.secondary"
                      gutterBottom
                    >
                      {room.number}
                    </Typography>
                  </CardContent>
                  <CardActions>
                  </CardActions>
               </Button> : <Button
                  style={{ width: "2rem",border:'none',color:"white" }}
                  variant="outlined"
                  // onClick={() => handleOpen(room._id)}
                > 
                  <CardContent>
                    <Typography
                      sx={{ fontSize:15}}
                      color="text.secondary"
                      gutterBottom
                    >
                      {room.number}
                    </Typography>
                  </CardContent>
                  <CardActions>
                  </CardActions>
                  </Button>}
              </Card>
               
              <Dialog
                open={show}
                onClose={() => {
                  handleApp();
                }}
              >
                <DialogTitle>slot assign</DialogTitle>
                <DialogContent>
                  <DialogContentText>select a Company</DialogContentText>
                  <select onChange={(e)=>{setCompanyname(e.target.value)}}>
                    {company.map((doc) => (
                      <option key={doc.id} value={doc._id} >
                        {/* {console.log(doc.name.stringValue,typeof(doc))} */}
                        {doc.name}
                        {/* {doc._id } */}
                          </option>
                    ))}
                  </select>
                </DialogContent>
                <DialogActions>
                  {/* <Button onClick={handleApp}>Cancel</Button> */}
                  <Button
                    onClick={() => {
                      handleApp();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      assignslot(roomm, companyname);
                    }}
                  >
                    Add
                  </Button>
                </DialogActions>
              </Dialog>


              <Dialog open={view} onClose={handleCloseClick}>
              <DialogTitle>Company Details</DialogTitle>
              <DialogContent>
                <DialogContentText>Company Name: { views.company   }</DialogContentText>
                <DialogContentText> Email:  {  views.email  }</DialogContentText>
                <DialogContentText> Name:  {  views.name  }</DialogContentText>
                <DialogContentText> Phone :  {  views.phone  }</DialogContentText>
                
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseClick}>Cancel</Button>
              </DialogActions>
              </Dialog>
             
            </>
          );
        })}
      </div>
    </div>
  );
}

export default BookSLot;
