import React from 'react';

export interface SocialButtonProps {
  href: string;
  animationDelay: string;
  color: string;
  icon: React.ReactNode;
  username: React.ReactNode;
  platform: string;
}

export function SocialButton({ href, animationDelay, color, icon, username, platform }: SocialButtonProps) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="block w-full hover:opacity-80 animate-card transition-opacity" 
      style={{ animationDelay }}
    >
      <div 
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors border" 
        style={{ backgroundColor: `${color}15`, borderColor: `${color}30` }}
      >
        <div className="flex-shrink-0 flex items-center justify-center w-[18px] h-[18px]">
          {icon}
        </div>
        <div className="min-w-0 text-left">
          {typeof username === 'string' ? (
            <span className="font-medium text-text-primary">{username}</span>
          ) : (
            username
          )}
          <span className="ml-1.5 text-xs text-text-muted font-normal">{platform}</span>
        </div>
        <svg 
          width="14" 
          height="14" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke={color} 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="ml-auto flex-shrink-0"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
    </a>
  );
}
