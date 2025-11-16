import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

const Button = ({ children, variant = 'primary', ...props }) => {
  return (
    <BootstrapButton variant={variant} {...props}>
      {children}
    </BootstrapButton>
  );
};

export default Button;
