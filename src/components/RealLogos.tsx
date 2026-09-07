import React from 'react';

interface LogoProps {
  size?: number;
  color?: string;
}

export const DeepSeekLogo: React.FC<LogoProps> = ({ size = 36, color = '#38bdf8' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2L2 7L12 12L22 7L12 2Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 17L12 22L22 17"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 12L12 17L22 12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const OpenAILogo: React.FC<LogoProps> = ({ size = 36, color = '#10b981' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M20.5 10.5C20.2 7.8 18.2 5.8 15.5 5.5C14.7 3.5 12.8 2 10.5 2C7.5 2 5.1 4.4 5.1 7.4C5.1 7.8 5.1 8.2 5.3 8.6C3.4 9.4 2 11.3 2 13.5C2 16.5 4.4 18.9 7.4 18.9C7.8 18.9 8.2 18.9 8.6 18.7C9.4 20.6 11.3 22 13.5 22C16.5 22 18.9 19.6 18.9 16.6C18.9 16.2 18.9 15.8 18.7 15.4C20.6 14.6 22 12.7 22 10.5H20.5Z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const AnthropicLogo: React.FC<LogoProps> = ({ size = 36, color = '#d97706' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M4 19L11 4L18 19"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 14H15"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
