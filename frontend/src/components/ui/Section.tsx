import { HTMLAttributes } from 'react';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'alternate' | 'primary';
  container?: boolean;
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}

export function Section({
  variant = 'default',
  container = true,
  spacing = 'lg',
  className = '',
  children,
  ...props
}: SectionProps) {
  const baseStyles = 'w-full';
  
  const variants = {
    default: 'bg-white',
    alternate: 'bg-gray-50',
    primary: 'bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white',
  };

  const spacings = {
    none: '',
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
  };

  const containerClass = container ? 'container mx-auto px-4 sm:px-6 lg:px-8' : '';

  return (
    <section
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${spacings[spacing]}
        ${className}
      `}
      {...props}
    >
      <div className={containerClass}>
        {children}
      </div>
    </section>
  );
} 