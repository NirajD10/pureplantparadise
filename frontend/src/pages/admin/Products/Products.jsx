import React from 'react'
import ProductsList from '@/components/admin/Products/ProductsList';

function Products() {
  return (
    <div className="sm:h-full sm:flex-1 sm:flex-col sm:space-y-8 sm:p-8 py-5 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Products</h2>
        </div>
      </div>
      <ProductsList />
    </div>
  )
}

export default Products