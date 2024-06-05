import React, { useEffect, useState } from 'react';
import { Button, List, ListItem, Typography, Box, Table, TableHead, TableRow, TableCell, TableBody, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Header from '../header/Header';
import { useNavigate } from 'react-router-dom';

export default function AdminContent() {
  const [products, setProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedStock, setSelectedStock] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [editingStockId, setEditingStockId] = useState(null);
  const [stockValues, setStockValues] = useState({});

  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate('/adminCreateProduct');
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchProducts();
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [updateTrigger]);

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
  };

  const handleStockChange = async (productId) => {
    const newStock = stockValues[productId];
    try {
      const response = await fetch(`http://localhost:3000/products/${productId}/stock`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stock: newStock }),
      });
      if (response.ok) {
        setProducts(products.map(product => product.ProductsID === productId ? { ...product, stock: newStock } : product));
        setUpdateTrigger(!updateTrigger);
        setEditingStockId(null);
      } else {
        console.error('Failed to update stock');
      }
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  const handleStockInputChange = (productId, value) => {
    setStockValues({
      ...stockValues,
      [productId]: value
    });
  };

  const handleStockChangeFilter = (stock) => {
    setSelectedStock(stock);
  };

  const filteredProducts = products.filter(product => {
    let matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
    let matchesStock = selectedStock === 'all' ||
                       (selectedStock === 'in-stock' && product.stock > 0) ||
                       (selectedStock === 'out-of-stock' && product.stock === 0);
    return matchesBrand && matchesStock;
  });

  return (
    <>
      <Header />
      <Box className="rounded-lg w-full">
        <Box className="flex items-center justify-between px-6 py-4 border-b">
          <Typography variant="h6" component="h1">Products</Typography>
          <Box className="flex items-center gap-4">
            <Button 
              variant="outlined" 
              size="small" 
              onClick={handleAddProduct} 
              startIcon={<AddIcon />} 
              sx={{ 
                borderColor: '#d3d3d3', 
                color: 'black',
                backgroundColor: 'transparent',
                '&:hover': {
                  borderColor: '#d3d3d3',
                  backgroundColor: 'grey.100',
                },
              }}
            >
              Add Product
            </Button>
            <Button 
              variant="outlined" 
              size="small" 
              onClick={() => setIsFilterOpen(!isFilterOpen)} 
              startIcon={<FilterListIcon />} 
              sx={{ 
                borderColor: '#d3d3d3', 
                color: 'black',
                backgroundColor: 'transparent',
                '&:hover': {
                  borderColor: '#d3d3d3',
                  backgroundColor: 'grey.100',
                },
              }}
            >
              Filter
            </Button>
          </Box>
        </Box>
        {isFilterOpen && (
          <Box className="px-6 py-4 border-b">
            <Typography variant="subtitle1" className="font-semibold mb-2">Filter by Brand</Typography>
            <List>
              <ListItem button selected={selectedBrand === 'all'} onClick={() => handleBrandChange('all')}>
                All
              </ListItem>
              <ListItem button selected={selectedBrand === 'brand1'} onClick={() => handleBrandChange('brand1')}>
                Brand 1
              </ListItem>
              <ListItem button selected={selectedBrand === 'brand2'} onClick={() => handleBrandChange('brand2')}>
                Brand 2
              </ListItem>
              {/* Add more brands as needed */}
            </List>
            <Typography variant="subtitle1" className="font-semibold mt-4 mb-2">Filter by Stock</Typography>
            <List>
              <ListItem button selected={selectedStock === 'all'} onClick={() => handleStockChangeFilter('all')}>
                All
              </ListItem>
              <ListItem button selected={selectedStock === 'in-stock'} onClick={() => handleStockChangeFilter('in-stock')}>
                In Stock
              </ListItem>
              <ListItem button selected={selectedStock === 'out-of-stock'} onClick={() => handleStockChangeFilter('out-of-stock')}>
                Out of Stock
              </ListItem>
            </List>
          </Box>
        )}
        <Box className="relative w-full overflow-auto">
          <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell align='left' >Image</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">SKU</TableCell>
                <TableCell align="center">Inventory</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.ProductsID}>
                  <TableCell align="left">
                    <Box className="w-16 h-16">
                      <img
                        src={`http://localhost:3000${product.imageUrl}` || '/placeholder.svg'}
                        alt="Product image"
                        className="w-full h-full object-contain rounded-md"
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="center">{product.name}</TableCell>
                  <TableCell align="center">{product.ProductsID}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {editingStockId === product.ProductsID ? (
                        <TextField
                          type="number"
                          size="small"
                          value={stockValues[product.ProductsID] || product.stock}
                          onChange={(e) => handleStockInputChange(product.ProductsID, e.target.value)}
                          InputProps={{
                            inputProps: { 
                              min: 0, 
                              style: { 
                                MozAppearance: 'textfield' 
                              } 
                            },
                            sx: {
                              '& input[type=number]::-webkit-outer-spin-button': {
                                WebkitAppearance: 'none',
                                margin: 0,
                              },
                              '& input[type=number]::-webkit-inner-spin-button': {
                                WebkitAppearance: 'none',
                                margin: 0,
                              },
                            }
                          }}
                          sx={{ width: '60px' }}
                        />
                      ) : (
                        <Typography>{product.stock}</Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box className="flex items-center gap-2 justify-end">
                      {editingStockId === product.ProductsID ? (
                        <Button 
                          variant="outlined" 
                          size="small" 
                          onClick={() => handleStockChange(product.ProductsID)} 
                          startIcon={<AddIcon />} 
                          sx={{ 
                            borderColor: '#d3d3d3', 
                            color: 'black',
                            backgroundColor: 'transparent',
                            '&:hover': {
                              borderColor: '#d3d3d3',
                              backgroundColor: 'grey.100',
                            },
                          }}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button 
                          variant="outlined" 
                          size="small" 
                          onClick={() => setEditingStockId(product.ProductsID)} 
                          startIcon={<EditIcon />} 
                          sx={{ 
                            borderColor: '#d3d3d3', 
                            color: 'black',
                            backgroundColor: 'transparent',
                            '&:hover': {
                              borderColor: '#d3d3d3',
                              backgroundColor: 'grey.100',
                            },
                          }}
                        >
                          Modify Stock
                        </Button>
                      )}
                      <Button 
                        variant="outlined" 
                        size="small" 
                        color="error" 
                        onClick={() => deleteProduct(product.ProductsID)} 
                        startIcon={<DeleteIcon />} 
                        sx={{ 
                          borderColor: '#d3d3d3', 
                          color: 'black',
                          backgroundColor: 'transparent',
                          '&:hover': {
                            borderColor: '#d3d3d3',
                            backgroundColor: 'grey.100',
                          },
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </>
  );
}
