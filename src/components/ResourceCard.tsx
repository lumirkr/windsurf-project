import React from 'react';

interface ResourceCardProps {
  id: number;
  title: string;
  icon: string;
  link: string;
  description: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ 
  title, 
  icon, 
  link, 
  description 
}) => {
  const isExternal = link.startsWith('http');
  
  return (
    <a
      href={link}
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="resource-card"
    >
      <div className="resource-card__icon">
        <span className="resource-card__icon-symbol" aria-hidden="true">
          {icon}
        </span>
      </div>
      <h3 className="resource-card__title">{title}</h3>
      <p className="resource-card__description">{description}</p>
      <span className="resource-card__cta">
        Acceder
        <span className="resource-card__cta-arrow" aria-hidden="true">→</span>
      </span>
    </a>
  );
};

export default ResourceCard;
