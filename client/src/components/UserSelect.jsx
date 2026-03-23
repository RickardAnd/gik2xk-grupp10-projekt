import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import api from '../services/api';


export default function UserSelect(props) {
  // Hämtar använare från databas
  const [users, setUsers] = useState([]);
  // vald användare
  const [selectedUser, setSelectedUser] = useState('')

  useEffect(() => {
       api.get("/users") 
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.error("Error:", err)
      });
  }, []);
 

  const handleChange = (event) => {
    
    

    const userId = Number(event.target.value); // hämtar id:t
    console.log("Testar ID", userId);
    
    setSelectedUser(userId);
  
    if (props.onUserChange) {
      props.onUserChange(userId);
    }
  };

  return (
   <Box sx={{ minWidth: 130 }}>
      <FormControl fullWidth variant="standard"> 
        <InputLabel 
          id="demo-simple-select-label" 
          sx={{ 
            color: '#C0A080', 
            fontWeight: 500,
            fontSize: '0.875rem', 
            textTransform: 'uppercase', 
            '&.Mui-focused': { color: '#C0A080' }
          }}
        >
          Kund
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedUser}
          onChange={(e) => handleChange(e)}
          label="Kund"
          disableUnderline 
          sx={{
            color: '#C0A080',
            fontWeight: 500,
            fontSize: '0.875rem',
            '& .MuiSvgIcon-root': { color: '#C0A080' },
            paddingBottom: '5px'
          }}
        >
        {users.map((user) => (
        <MenuItem key={user.id} value={user.id}>
          {/* Lägger in namn i dropdownen */}
        {user.firstName}  
        </MenuItem>
        ))}
        </Select>
      </FormControl>
    </Box>
  );
}