import { useState } from 'react';
import NewsList from '../components/NewsList';
import PortfolioInput from '../components/PortfolioInput';

function filterNews(newsList, portfolioSymbols) {
  return newsList.filter(news =>
    portfolioSymbols.some(sym => news.headline.toUpperCase().includes(sym))
  );
}

async function analyzeNews(filteredNews) {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ headlines: filteredNews.map(n => n.headline) })
  });
  const data = await response.json();
  return data.result;
}

export default function HomePage() {
  const [portfolio, setPortfolio] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [analysis, setAnalysis] = useState('');

  const handlePortfolioSubmit = async (symbols) => {
    setPortfolio(symbols);
    const news = await fetch('/api/news').then(res => res.json()).then(d => d.news);
    const filtered = filterNews(news, symbols);
    setFilteredNews(filtered);

    const result = await analyzeNews(filtered);
    setAnalysis(result);
  };

  return (
    <div>
      <h1>Smart Stock News & Portfolio Insights</h1>
      <PortfolioInput onSubmit={handlePortfolioSubmit} />
      <NewsList />
      <h2>📰 Filtered News</h2>
      {filteredNews.map((n, i) => <p key={i}>{n.headline}</p>)}
      <h2>📊 AI Sentiment Analysis</h2>
      <pre>{analysis}</pre>
    </div>
  );
}
