import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api/products';

interface Product {
  id: string;
  strainName: string;
  totalGrams: number;
  type: string;
}

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
        setLowStockProducts(fetchedProducts.filter(product => product.totalGrams < 100));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getProducts();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Inventory Overview</h3>
        <p>Total Products: {products.length}</p>
        <p>Low Stock Products: {lowStockProducts.length}</p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Low Stock Alerts</h3>
        {lowStockProducts.length > 0 ? (
          <ul className="list-disc pl-5">
            {lowStockProducts.map(product => (
              <li key={product.id}>
                {product.strainName} - {product.totalGrams}g remaining
              </li>
            ))}
          </ul>
        ) : (
          <p>No low stock products</p>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Recent Products</h3>
        <ul className="list-disc pl-5">
          {products.slice(0, 5).map(product => (
            <li key={product.id}>
              {product.strainName} - {product.type}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;