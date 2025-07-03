import { useState } from 'react';

export default function PortfolioInput({ onSubmit }) {
  const [symbols, setSymbols] = useState('');

  return (
    <div>
      <h2>💼 Your Stock Portfolio</h2>
      <input
        type="text"
        placeholder="Enter stock symbols (comma-separated)"
        value={symbols}
        onChange={e => setSymbols(e.target.value)}
      />
      <button onClick={() => onSubmit(symbols.split(',').map(s => s.trim().toUpperCase()))}>
        Link Portfolio
      </button>
    </div>
  );
}
