import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    const { data } = await axios.get('https://economictimes.indiatimes.com/markets');
    const $ = cheerio.load(data);
    const news = [];

    $('.eachStory').each((i, elem) => {
      const headline = $(elem).find('h3 a').text().trim();
      const link = 'https://economictimes.indiatimes.com' + $(elem).find('h3 a').attr('href');
      if (headline) news.push({ headline, link });
    });

    res.status(200).json({ news });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}
