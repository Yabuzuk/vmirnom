import { useState, useEffect } from 'react';
import { Calendar, Tag, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';

import { newsAPI } from '../../services/api';

interface NewsArticle {
  id: number;
  title: string;
  description: string;
  created_at: string;
  tags: string[];
  image: string;
  ai_summary?: string;
}

export function NewsFeed() {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await newsAPI.getAll();
      setNewsArticles(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, newsArticles.length));
  };

  return (
    <section id="news" className="bg-[#F2F2F2] py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl mb-8 text-gray-900">Лента новостей</h2>

        {loading ? (
          <div className="text-center py-8">Загрузка...</div>
        ) : (
        <div className="space-y-4">
          {newsArticles.slice(0, visibleCount).map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="sm:w-[120px] sm:h-[120px] w-full h-48 flex-shrink-0">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl text-gray-900 line-clamp-2 hover:text-[#2196F3] transition-colors">
                      {article.title}
                    </h3>
                    {article.ai_summary && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            className="flex-shrink-0 p-2 hover:bg-purple-50 rounded-full transition-colors"
                            title="ИИ-краткое содержание"
                          >
                            <Sparkles className="w-5 h-5 text-purple-600" />
                          </button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Sparkles className="w-5 h-5 text-purple-600" />
                              Краткое содержание (ИИ)
                            </DialogTitle>
                            <DialogDescription className="text-base pt-4">
                              {article.ai_summary}
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(article.created_at).toLocaleDateString('ru-RU')}</span>
                  </div>

                  <p className="mt-2 text-gray-600 line-clamp-3">
                    {article.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {article.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs flex items-center gap-1"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

        {!loading && visibleCount < newsArticles.length && (
          <div className="text-center mt-8">
            <Button
              onClick={showMore}
              variant="outline"
              className="bg-white hover:bg-gray-50"
            >
              Показать ещё
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
