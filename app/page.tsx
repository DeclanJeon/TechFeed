import { fetchFeeds } from '@/lib/rss';
import { NewsList } from '@/components/news-list';
import { Rss } from 'lucide-react';

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const items = await fetchFeeds();

  return (
    <main className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
      <header className="w-full bg-white border-b border-neutral-200 sticky top-0 z-10 backdrop-blur-md bg-white/80">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Rss className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">TechFeed</h1>
          </div>
          <div className="text-sm text-neutral-500 font-medium">
            Aggregated IT News
          </div>
        </div>
      </header>

      <section className="bg-white border-b border-neutral-200 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-neutral-900">
            Stay Updated with Global IT Trends
          </h2>
          <p className="text-lg text-neutral-600">
            Curated tech news from top domestic and international sources, all in one place.
          </p>
        </div>
      </section>

      <NewsList initialItems={items} />
      
      <footer className="bg-neutral-900 text-neutral-400 py-8 text-center text-sm">
        <p>© {new Date().getFullYear()} TechFeed. Powered by RSS.</p>
      </footer>
    </main>
  );
}
