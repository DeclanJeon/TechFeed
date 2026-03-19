import { formatDistanceToNow } from 'date-fns';
import { ExternalLink, Globe } from 'lucide-react';
import { FeedItem } from '@/lib/rss';

export function NewsCard({ item }: { item: FeedItem }) {
  const pubDate = new Date(item.pubDate);
  const timeAgo = isNaN(pubDate.getTime()) ? '' : formatDistanceToNow(pubDate, { addSuffix: true });

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block group bg-white border border-neutral-200 rounded-2xl p-6 hover:shadow-md transition-all duration-200 hover:border-neutral-300"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
          <span className="flex items-center gap-1 bg-neutral-100 px-2 py-1 rounded-md">
            <Globe className="w-3 h-3" />
            {item.source}
          </span>
          <span>•</span>
          <span>{timeAgo}</span>
        </div>
        <ExternalLink className="w-4 h-4 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
        {item.title}
      </h3>
      <p className="text-sm text-neutral-600 line-clamp-3">
        {item.contentSnippet.replace(/<[^>]*>?/gm, '')}
      </p>
    </a>
  );
}
