import React from "react";
import AvailableBooksByCategory from "./AvailableBooksByCategory";
import Income from "./Income";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const formatDateTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',  // "Tue"
      day: '2-digit',    // "14"
      month: 'short',     // "Nov"
      year: 'numeric',    // "2024"
      hour: '2-digit',    // "11"
      minute: '2-digit',  // "30"
      hour12: true        // AM/PM
    };
  
    // Use Intl.DateTimeFormat with locale 'en-GB' to get the desired format
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  };
  

const DashboardHome = () =>{
    const now = new Date();
  
    // Format the current date and time
    const formattedDateTime = formatDateTime(now);
    return(
        <div style={{marginTop:'20px'}}>
           <Box sx={{
            backgroundColor:'#fff',
            width:'22vw',
            padding:'1vw',
            borderRadius:'1rem'
           }}>
           <Typography variant="h5" sx={{marginBottom:'.7rem'}}>
                This Month Statistics
            </Typography>
           <Typography variant='body2' sx={{marginBottom:'2rem', color:'rgba(0,0,0,.5)'}}>
           {formattedDateTime}
            </Typography>
           <Box sx={{ 
             display:'flex',
             flexDirection:'column',
            gap:'2rem'}}>
           <Income />
           <AvailableBooksByCategory />
           </Box>
           </Box>
        </div>
    )
}

export default DashboardHome;