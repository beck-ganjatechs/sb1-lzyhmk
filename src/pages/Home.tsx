import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api/products';
import { AlertCircle } from 'lucide-react';

interface Product {
  id: string;
  strainName: string;
  type: string;
  totalCannabinoids: number;
  batchDate: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchProducts(currentPage, typeFilter, sortBy);
        setProducts(response.docs);
        setFilteredProducts(response.docs);
        setTotalPages(response.totalPages);
      } catch (error) {
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [currentPage, typeFilter, sortBy]);

  // ... (rest of the component logic)

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-8 text-red-600">
        <AlertCircle className="inline-block mr-2" />
        {error}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Cannabis Inventory</h1>
      
      {/* Filtering and sorting controls */}
      <div className="mb-4 flex space-x-4">
        {/* ... (existing filter and sort controls) */}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="border rounded p-4">
            <h2 className="text-xl font-semibold">{product.strainName}</h2>
            <p>Type: {product.type}</p>
            <p>Potency: {product.totalCannabinoids}%</p>
            <p>Batch Date: {new Date(product.batchDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;