import React from 'react';

const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`px-8 py-4 bg-forest text-offwhite rounded-full font-semibold text-lg hover:bg-opacity-90 transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
