import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import BAC from '../../assets/payment/BAC.png';

const CreditCardForm = () => {
  return (
    <Card
      className="p-6 w-1/2 "
      sx={{
        backgroundImage: `url(${BAC})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" className="mb-4">
          <CreditCardIcon className="mr-2" />
          <Typography variant="h6" className="flex-grow">
            Credit card
          </Typography>
        </Box>
        <Box component="form" noValidate autoComplete="off">
          <Box display="flex" justifyContent="space-between" className="mb-4">
            <TextField
              required
              fullWidth
              label="Card number"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              placeholder="0000 0000 0000 0000"
              className="w-2/3 mr-2 bg-white rounded-md"
            />
            <TextField
              required
              label="CVV"
              variant="outlined"
              InputLabelProps={{ shrink: true
                
               }}
              placeholder="123"
              className="w-1/3 bg-white rounded-md"
            />
          </Box>
          <TextField
            required
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            placeholder="John Smith"
            className="mb-4 bg-white rounded-md"
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
            className="mb-4"
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
