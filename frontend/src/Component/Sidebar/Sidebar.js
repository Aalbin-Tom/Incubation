import React from 'react'
import Box from '@mui/material/Box';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { SidebarData } from './SidebarData';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <Box bgcolor="black" flex={1.5} height={695}>
      <Box>
        {SidebarData.map((item,index)=>(
        <List key={index}>
            <NavLink te style={{textDecoration:"none" ,color:"#FFFFFF"}} to={item.path}>
             <ListItem>
                <ListItemButton>
                    <ListItemIcon>

                    </ListItemIcon>
                    <ListItemText primary={item.title}/>
                </ListItemButton>
            </ListItem>   
            </NavLink>
            
        </List>
        ))}
      </Box>
    </Box>
  )
}

export default Sidebar
