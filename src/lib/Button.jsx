import { forwardRef } from 'react';

/* Calm editorial button. Variants: primary, inverse, outline-light,
   outline-dark. Hover state lives in CSS (.btn / .btn-*). */
const Button = forwardRef(function Button(
  { variant = 'inverse', as: Tag = 'button', className = '', children, ...rest },
  ref,
) {
  const cls = `btn btn-${variant}${className ? ` ${className}` : ''}`;
  const tagProps = Tag === 'button' ? { type: rest.type || 'button' } : {};
  return (
    <Tag ref={ref} className={cls} {...tagProps} {...rest}>
      {children}
    </Tag>
  );
});

export default Button;
