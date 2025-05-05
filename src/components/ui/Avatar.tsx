import React from 'react';
import { cn } from '../../utils/cn';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: AvatarSize;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt, 
  size = 'md', 
  className 
}) => {
  // Get initials from alt text
  const getInitials = (): string => {
    return alt
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Size styles
  const sizeStyles: Record<AvatarSize, string> = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };

  return (
    <div 
      className={cn(
        'relative inline-flex items-center justify-center rounded-full bg-gray-200 overflow-hidden',
        sizeStyles[size],
        className
      )}
    >
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to initials if image fails to load
            (e.target as HTMLImageElement).style.display = 'none';
            (e.target as HTMLImageElement).onerror = null;
          }} 
        />
      ) : (
        <span className="font-medium text-gray-700">{getInitials()}</span>
      )}
    </div>
  );
};

export default Avatar;