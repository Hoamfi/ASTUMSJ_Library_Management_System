import React from "react";

type CardProps = {
  className?: string;
  children: React.ReactNode;
  imageUrl?: string; // optional image at the top
  imageAlt?: string; // optional alt text
};

export const Card: React.FC<CardProps> = ({ className, children, imageUrl, imageAlt }) => (
  <div className={`bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>
    {imageUrl && (
      <img
        src={imageUrl}
        alt={imageAlt || "Card image"}
        className="w-full h-48 object-cover rounded-t mb-4"
      />
    )}
    {children}
  </div>
);

export const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mb-2">{children}</div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <h2 className={`text-lg font-bold ${className}`}>{children}</h2>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={className}>{children}</div>
);
