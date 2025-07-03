import { useEffect, useState } from 'react';

export default function NewsList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => setNews(data.news || []));
  }, []);

  return (
    <div>
      <h2>📈 General Market News</h2>
      <ul>
        {news.map((item, i) => (
          <li key={i}>
            <a href={item.link} target="_blank" rel="noreferrer">{item.headline}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
