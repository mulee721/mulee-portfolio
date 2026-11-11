import React from 'react';

type HtmlTag = 'div' | 'section' | 'article' | 'aside' | 'main' | 'header' | 'footer' | 'nav';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: HtmlTag;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  as: Tag = 'div',
}) => {
  return (
    <Tag className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Tag>
  );
};
