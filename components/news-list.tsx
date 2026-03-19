'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FeedItem } from '@/lib/rss';
import { NewsCard } from './news-card';

export function NewsList({ initialItems }: { initialItems: FeedItem[] }) {
  const [filter, setFilter] = useState<'all' | 'domestic' | 'international'>('all');

  const filteredItems = initialItems.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-center gap-2 mb-10">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-neutral-900 text-white'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          All News
        </button>
        <button
          onClick={() => setFilter('domestic')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'domestic'
              ? 'bg-neutral-900 text-white'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          Domestic (KR)
        </button>
        <button
          onClick={() => setFilter('international')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'international'
              ? 'bg-neutral-900 text-white'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          International
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <NewsCard item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-20 text-neutral-500">
          No news items found for this category.
        </div>
      )}
    </div>
  );
}
