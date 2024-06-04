import React, { useEffect, useState } from 'react';
import { ListGroup, ListGroupItem } from 'flowbite-react';
import Header from '../header/Header';
import ActionButtons from '../buttons/ActionButtons';
// importar para navergar entre paginas
import { useNavigate } from 'react-router-dom';


export default function AdminContent() {
  const [products, setProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedStock, setSelectedStock] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(false); // Estado para forzar la actualización

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
        fetchProducts(); // Refresh the products list
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }


  useEffect(() => {
    fetchProducts();
  }, [updateTrigger]); // Ejecutar el useEffect cuando updateTrigger cambie

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
  };

  const handleStockChange = (productId, newStock) => {
    setProducts(products.map(product => product.ProductsID === productId ? { ...product, stock: newStock } : product));
    setUpdateTrigger(!updateTrigger); // Forzar la actualización
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
      <div className="p-6 bg-white shadow rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-2xl">Products</h2>
          <div className="flex items-center gap-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleAddProduct}>Add Product</button>

            <div className="relative">
              <button 
                className="bg-transparent border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white py-2 px-4 rounded flex items-center gap-2"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                Filters <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-20 p-4">
                  <h4 className="font-semibold mb-2">Filter by Brand</h4>
                  <ListGroup>
                    <ListGroupItem active={selectedBrand === 'all'} onClick={() => handleBrandChange('all')}>
                      All
                    </ListGroupItem>
                    <ListGroupItem active={selectedBrand === 'brand1'} onClick={() => handleBrandChange('brand1')}>
                      Brand 1
                    </ListGroupItem>
                    <ListGroupItem active={selectedBrand === 'brand2'} onClick={() => handleBrandChange('brand2')}>
                      Brand 2
                    </ListGroupItem>
                    {/* Add more brands as needed */}
                  </ListGroup>
                  <h4 className="font-semibold mt-4 mb-2">Filter by Stock</h4>
                  <ListGroup>
                    <ListGroupItem active={selectedStock === 'all'} onClick={() => handleStockChangeFilter('all')}>
                      All
                    </ListGroupItem>
                    <ListGroupItem active={selectedStock === 'in-stock'} onClick={() => handleStockChangeFilter('in-stock')}>
                      In Stock
                    </ListGroupItem>
                    <ListGroupItem active={selectedStock === 'out-of-stock'} onClick={() => handleStockChangeFilter('out-of-stock')}>
                      Out of Stock
                    </ListGroupItem>
                  </ListGroup>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="border shadow-sm rounded-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 text-left">Image</th>
                <th className="py-2 text-left">Name</th>
                <th className="py-2 text-left">SKU</th>
                <th className="py-2 text-left">Inventory</th>
                <th className="py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.ProductsID} className="border-t">
                  <td className="py-2">
                    <div className="w-16 h-16">
                      <img
                        src={`http://localhost:3000${product.imageUrl}` || '/placeholder.svg'}
                        alt="Product image"
                        className="w-full h-full object-contain rounded-md"
                      />
                    </div>
                  </td>
                  <td className="py-2">{product.name}</td>
                  <td className="py-2">{product.ProductsID}</td>
                  <td className="py-2">{product.stock}</td>
                  <td className="py-2">
                    <ActionButtons productId={product.ProductsID} onStockChange={handleStockChange} deleteProduct={deleteProduct} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
