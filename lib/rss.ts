import Parser from 'rss-parser';

export type FeedItem = {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  source: string;
  category: 'domestic' | 'international';
};

const parser = new Parser({
  customFields: {
    item: ['description', 'content:encoded'],
  },
});

const DOMESTIC_FEEDS = [
  { name: 'GeekNews', url: 'https://news.hada.io/rss/news' },
  { name: 'ITWorld Korea', url: 'https://www.itworld.co.kr/rss/feed/index.php' },
  { name: 'CIO Korea', url: 'https://www.ciokorea.com/rss/feed/index.php' },
];

const INTERNATIONAL_FEEDS = [
  { name: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
  { name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml' },
  { name: 'Wired', url: 'https://www.wired.com/feed/rss' },
];

export async function fetchFeeds(): Promise<FeedItem[]> {
  const allItems: FeedItem[] = [];

  const fetchPromises = [
    ...DOMESTIC_FEEDS.map(async (feed) => {
      try {
        const parsed = await parser.parseURL(feed.url);
        parsed.items.forEach((item) => {
          if (item.title && item.link) {
            allItems.push({
              id: item.guid || item.link,
              title: item.title,
              link: item.link,
              pubDate: item.pubDate || new Date().toISOString(),
              contentSnippet: item.contentSnippet || item.description || '',
              source: feed.name,
              category: 'domestic',
            });
          }
        });
      } catch (error) {
        console.error(`Error fetching feed ${feed.name}:`, error);
      }
    }),
    ...INTERNATIONAL_FEEDS.map(async (feed) => {
      try {
        const parsed = await parser.parseURL(feed.url);
        parsed.items.forEach((item) => {
          if (item.title && item.link) {
            allItems.push({
              id: item.guid || item.link,
              title: item.title,
              link: item.link,
              pubDate: item.pubDate || new Date().toISOString(),
              contentSnippet: item.contentSnippet || item.description || '',
              source: feed.name,
              category: 'international',
            });
          }
        });
      } catch (error) {
        console.error(`Error fetching feed ${feed.name}:`, error);
      }
    }),
  ];

  await Promise.allSettled(fetchPromises);

  // Sort by date descending
  return allItems.sort((a, b) => {
    return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
  });
}
