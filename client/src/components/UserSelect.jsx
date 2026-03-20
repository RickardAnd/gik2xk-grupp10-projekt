import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function UserSelect() {
  // Hämtar använare från databas
  const [users, setUsers] = useState([]);
  // vald användare
  const [selectedUser, setSelectedUser] = useState('')

  useEffect(() => {
      fetch("http://localhost:4000/users") 
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Error:", err));
  }, []);
 

  const handleChange = (event) => {
    setSelectedUser(event.target.value);
  };

  return (
   <Box sx={{ minWidth: 130 }}>
      <FormControl fullWidth variant="standard"> 
        <InputLabel 
          id="demo-simple-select-label" 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.8)', 
            fontWeight: 500,
            fontSize: '0.875rem', 
            textTransform: 'uppercase', 
            '&.Mui-focused': { color: 'white' }
          }}
        >
          Kund
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedUser}
          onChange={handleChange}
          label="Användare"
          disableUnderline 
          sx={{
            color: 'white',
            fontWeight: 500,
            fontSize: '0.875rem',
            '& .MuiSvgIcon-root': { color: 'white' }, 
            marginTop: '16px' 
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