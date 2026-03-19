import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function UserSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"
        sx={{
            color: 'white',
            fontWeight: 'bold'
        }}>
            Användare</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Användare"
          onChange={handleChange}
        >
          {/* Lägg in våra användare här */}
          <MenuItem value={1}>Användare 1</MenuItem>
          <MenuItem value={2}>Användare 2</MenuItem>
          <MenuItem value={3}>Användare 3</MenuItem>
          <MenuItem value={4}>Användare 4</MenuItem>
          <MenuItem value={5}>Användare 5</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}