import React from 'react';

interface DieProps {
  value: number;
  rolling?: boolean;
}

const Die: React.FC<DieProps> = ({ value, rolling }) => {
  // Standard d6 pip layouts matching index.html grid areas
  const pips = {
    1: [
      <div key="cc" className="dot dot-red dot-cc" />
    ],
    2: [
      <div key="tr" className="dot dot-tr" />,
      <div key="bl" className="dot dot-bl" />
    ],
    3: [
      <div key="tr" className="dot dot-tr" />,
      <div key="cc" className="dot dot-cc" />,
      <div key="bl" className="dot dot-bl" />
    ],
    4: [
      <div key="tl" className="dot dot-tl" />,
      <div key="tr" className="dot dot-tr" />,
      <div key="bl" className="dot dot-bl" />,
      <div key="br" className="dot dot-br" />
    ],
    5: [
      <div key="tl" className="dot dot-tl" />,
      <div key="tr" className="dot dot-tr" />,
      <div key="cc" className="dot dot-cc" />,
      <div key="bl" className="dot dot-bl" />,
      <div key="br" className="dot dot-br" />
    ],
    6: [
      <div key="tl" className="dot dot-tl" />,
      <div key="ml" className="dot dot-ml" />,
      <div key="bl" className="dot dot-bl" />,
      <div key="tr" className="dot dot-tr" />,
      <div key="mr" className="dot dot-mr" />,
      <div key="br" className="dot dot-br" />
    ]
  };

  return (
    <div className={`die-face ${rolling ? 'animate-shake' : ''}`}>
      {pips[value as keyof typeof pips]}
    </div>
  );
};

export default Die;