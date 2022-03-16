import React from 'react';
import styles from './LoadingSpinner.module.css';

type LoadingSpinnerProps = {
  className?: string;
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className = '',
}) => {
  return (
    <div className={`${styles.loader} ${className}`}>
      <svg className={styles.circular} viewBox="25 25 50 50">
        <circle
          className={styles.path}
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="4"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
};
