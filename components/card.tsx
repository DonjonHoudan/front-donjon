import React from 'react';
import { cn } from '@/lib/utils/cn';

type CardProps = {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn(
      "border rounded-lg bg-white shadow-md p-4",
      className
    )}>
      {children}
    </div>
  )
}