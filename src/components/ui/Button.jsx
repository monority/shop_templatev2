import React from 'react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'default',
  className = '',
  ...props 
}) => {
  const variantClass = variant === 'primary' ? 'btn btn-primary' : 
                       variant === 'secondary' ? 'btn btn-secondary' :
                       variant === 'outline' ? 'btn btn-outline' :
                       variant === 'ghost' ? 'btn btn-ghost' :
                       variant === 'destructive' ? 'btn btn-destructive' :
                       variant === 'black' ? 'btn btn-primary' : 'btn btn-primary';
  
  const sizeClass = size === 'sm' ? 'btn-sm' :
                    size === 'lg' ? 'btn-lg' :
                    size === 'xl' ? 'btn-xl' :
                    size === 'icon' ? 'btn-icon' : '';
  
  return (
    <button className={`btn ${variantClass} ${sizeClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
