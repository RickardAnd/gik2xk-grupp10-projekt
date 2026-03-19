import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function UserSelect() {
  const [user, setUser] = React.useState('');

  const handleChange = (event) => {
    setUser(event.target.value);
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
          Användare
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={user}
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
          <MenuItem value={10}>User 1</MenuItem> 
          <MenuItem value={20}>User 2</MenuItem>
          <MenuItem value={30}>User 3</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}