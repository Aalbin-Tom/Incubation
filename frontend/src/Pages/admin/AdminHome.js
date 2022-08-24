import { Stack } from '@mui/material'
import React from 'react'
import AdminHome from '../../Component/Admin/AdminHome'
import AdminNav from '../../Component/Navbar/AdminNav'
import Sidebar from '../../Component/Sidebar/Sidebar'

function AdminHomeP() {
  return (
    <div>
        <AdminNav/>
        <Stack direction="row" justifyContent="space-between">
            <Sidebar/>
      <AdminHome/>
        </Stack>
      
    </div>
  )
}

export default AdminHomeP
