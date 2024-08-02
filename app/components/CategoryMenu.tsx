"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const categories = [
  { id: 'banking_finance_news,stock_news,company_news', name: 'Tài chính chứng khoán', icon: '/images/news-icon/money-light.png' },
  { id: 'exchange', name: 'Tin từ sở', icon: '/images/news-icon/dividend-light.png' },
  { id: 'macro_news,commodity_news', name: 'Đầu tư', icon: '/images/news-icon/invest-light.png' },
  { id: 'real_estate_news', name: 'Bất động sản', icon: '/images/news-icon/real-estate-light.png' },
  { id: 'international_news', name: 'Quốc tế', icon: '/images/news-icon/global-light.png' },
];

interface CategoryMenuProps {
  onCategoryClick: (id: string) => void;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ onCategoryClick }) => {
  const [activeCategory, setActiveCategory] = useState<string>('exchange');

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id);
    onCategoryClick(id);
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md">
      <div className="text-2xl font-bold mb-4">Chuyên mục</div>
      <div className="space-y-2">
        {categories.map((category) => (
          <div
            key={category.id}
            id={category.id}
            className={`flex items-center p-2 rounded-lg cursor-pointer ${activeCategory === category.id ? 'bg-orange-500' : 'bg-black hover:bg-gray-700'}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            <Image src={category.icon} alt={category.name} width={24} height={24} className="h-6 w-6 mr-2" />
            <span>{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu;