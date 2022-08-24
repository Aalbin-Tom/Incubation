import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

function AdminHome() {
  return (
    <Box bgcolor="white" flex={8}>
    <Outlet/> 
      
    </Box>
  )
}

export default AdminHome
