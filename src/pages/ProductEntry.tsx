import React, { useState } from 'react';
import { createProduct } from '../api/products';

const ProductEntry: React.FC = () => {
  const [formData, setFormData] = useState({
    strainName: '',
    batchDate: '',
    totalGrams: '',
    type: 'Indica',
    notes: '',
    pungency: '1',
    totalCannabinoids: ''
  });
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [testReport, setTestReport] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideo(e.target.files[0]);
    }
  };

  const handleTestReportUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setTestReport(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productFormData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      productFormData.append(key, value);
    });
    images.forEach((image) => {
      productFormData.append('images', image);
    });
    if (video) productFormData.append('video', video);
    if (testReport) productFormData.append('testReport', testReport);

    try {
      const response = await createProduct(productFormData);
      console.log('Product created:', response);
      // Reset form or redirect
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Existing form fields */}
        {/* ... */}
        
        <div>
          <label htmlFor="images" className="block mb-1">Images</label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageUpload}
            multiple
            accept="image/*"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        
        <div>
          <label htmlFor="video" className="block mb-1">Video</label>
          <input
            type="file"
            id="video"
            name="video"
            onChange={handleVideoUpload}
            accept="video/*"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        
        <div>
          <label htmlFor="testReport" className="block mb-1">Test Report</label>
          <input
            type="file"
            id="testReport"
            name="testReport"
            onChange={handleTestReportUpload}
            accept=".pdf,.png"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Save Product
        </button>
      </form>
    </div>
  );
};

export default ProductEntry;