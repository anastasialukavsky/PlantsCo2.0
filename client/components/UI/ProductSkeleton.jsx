import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="mx-auto h-screen">
      <div className="m-24 flex h-full flex-col justify-center gap-12 md:flex-row">
        <div
          className="h-1/2 w-96"
          style={{
            background: '#ccc',
            animation: 'fade 2s ease-in-out infinite alternate',
            backgroundSize: '200% 100%',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        ></div>
        <div className="flex h-1/2 w-96 flex-col gap-4">
          <div
            style={{
              background: '#ccc',
              animation: 'fade 2s ease-in-out infinite alternate',
              backgroundSize: '200% 100%',
              animation: 'pulse 2s ease-in-out infinite',
            }}
            className="my-1 h-1/6 rounded-md"
          ></div>
          <div
            style={{
              background: '#ccc',
              animation: 'fade 2s ease-in-out infinite alternate',
              backgroundSize: '200% 100%',
              animation: 'pulse 2s ease-in-out infinite',
            }}
            className="my-1 h-1/6 w-5/6 rounded-md"
          ></div>
          <div
            style={{
              background: '#ccc',
              animation: 'fade 2s ease-in-out infinite alternate',
              backgroundSize: '200% 100%',
              animation: 'pulse 2s ease-in-out infinite',
            }}
            className="my-1 h-1/6 w-2/3 rounded-md"
          ></div>
          <div
            style={{
              background: '#ccc',
              animation: 'fade 2s ease-in-out infinite alternate',
              backgroundSize: '200% 100%',
              animation: 'pulse 2s ease-in-out infinite',
            }}
            className="my-1 h-1/6 rounded-md"
          ></div>
          <div
            style={{
              background: '#ccc',
              animation: 'fade 2s ease-in-out infinite alternate',
              backgroundSize: '200% 100%',
              animation: 'pulse 2s ease-in-out infinite',
            }}
            className="my-1 h-1/6 w-1/2 rounded-md"
          ></div>
          <div
            style={{
              background: '#ccc',
              animation: 'fade 2s ease-in-out infinite alternate',
              backgroundSize: '200% 100%',
              animation: 'pulse 2s ease-in-out infinite',
            }}
            className="my-1 h-1/6 rounded-md"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
