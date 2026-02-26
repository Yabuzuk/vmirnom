import { Badge } from './ui/badge';
import { Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface NewsItem {
  id: number;
  title: string;
  description?: string;
  category: string;
  image: string;
  aiProcessed?: boolean;
}

const heroNews: NewsItem[] = [
  {
    id: 1,
    title: 'В Мирном открылся новый культурно-досуговый центр',
    description: 'Современное пространство площадью 2000 кв.м. включает концертный зал, библиотеку и творческие мастерские для жителей города.',
    category: 'Городская жизнь',
    image: 'https://images.unsplash.com/photo-1768609956426-b57e83917594?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjaXR5JTIwbmV3c3xlbnwxfHx8fDE3NzE5MTUyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    aiProcessed: true,
  },
  {
    id: 2,
    title: 'Администрация объявляет о конкурсе благоустройства',
    category: 'Объявления',
    image: 'https://images.unsplash.com/photo-1617381519460-d87050ddeb92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3MTg3OTc3MXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    title: 'Летний кинофестиваль стартует в июле',
    category: 'Афиша',
    image: 'https://images.unsplash.com/photo-1620935189009-a820429b03d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwZXZlbnQlMjBjb25jZXJ0fGVufDF8fHx8MTc3MTkxNTI1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    aiProcessed: true,
  },
];

export function HeroNews() {
  const mainNews = heroNews[0];
  const sideNews = heroNews.slice(1);

  return (
    <section className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Большая карточка */}
          <div className="lg:col-span-2 group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg aspect-video">
              <ImageWithFallback
                src={mainNews.image}
                alt={mainNews.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-[#2196F3] text-white hover:bg-[#1976D2]">
                  {mainNews.category}
                </Badge>
              </div>
              {mainNews.aiProcessed && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-purple-600 text-white flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Обработано ИИ
                  </Badge>
                </div>
              )}
            </div>
            <h2 className="mt-4 text-2xl lg:text-3xl text-gray-900 group-hover:text-[#2196F3] transition-colors">
              {mainNews.title}
            </h2>
            <p className="mt-2 text-gray-600 line-clamp-2">
              {mainNews.description}
            </p>
          </div>

          {/* Две маленькие карточки */}
          <div className="flex flex-col gap-6">
            {sideNews.map((news) => (
              <div key={news.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                  <ImageWithFallback
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-[#2196F3] text-white hover:bg-[#1976D2] text-xs">
                      {news.category}
                    </Badge>
                  </div>
                  {news.aiProcessed && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-purple-600 text-white flex items-center gap-1 text-xs">
                        <Sparkles className="w-3 h-3" />
                        ИИ
                      </Badge>
                    </div>
                  )}
                </div>
                <h3 className="mt-3 text-lg text-gray-900 line-clamp-2 group-hover:text-[#2196F3] transition-colors">
                  {news.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
