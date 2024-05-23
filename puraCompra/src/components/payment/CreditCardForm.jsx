import React from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
} from '@mui/material';
import BAC from '../../assets/payment/BAC.png';

const CreditCardForm = () => {
  return (
    <Card
      sx={{
        width: '400px',
        height: '250px',
        backgroundImage: `url(${BAC})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center', 
        boxShadow: 'none',

        borderRadius: '20px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      
    >
      <CardContent sx={{ width: '100%' }}>
        <Box component="form" noValidate autoComplete="off">
          <Box display="flex" justifyContent="space-between" className="mb-2">
            <TextField
              required
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              InputProps={{ style: { color: 'white' } }}
              placeholder="0000 0000 0000 0000"
              className="mr-2"
              sx={{
                width: '70%',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
              }}
            />
            <TextField
              required
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              InputProps={{ style: { color: 'white' } }}
              placeholder="123"
              sx={{
                width: '25%',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
              }}
            />
          </Box>
          <TextField
            required
            fullWidth
            variant="outlined"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            InputProps={{ style: { color: 'white' } }}
            placeholder="John Smith"
            sx={{
              marginBottom: '8px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'transparent',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
              },
            }}
          />
          <TextField
            required
            fullWidth
            variant="outlined"
            placeholder="MM/YY"
            InputLabelProps={{ shrink: false }}
            inputProps={{
              style: {
                backgroundColor: 'transparent',
                color: 'white',
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'transparent',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CreditCardForm;
