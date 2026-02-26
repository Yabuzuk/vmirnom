import { Cloud, Wind, Droplets, TrendingUp, TrendingDown } from 'lucide-react';

export function WeatherAndCurrency() {
  return (
    <section className="bg-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Погода */}
          <div className="bg-gradient-to-br from-[#A7D8F0] to-[#7DC4E8] rounded-lg p-6 text-white">
            <h3 className="text-xl mb-4">Погода в Мирном</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="text-5xl">-8°C</div>
                <div className="text-lg mt-2 opacity-90">Ощущается как -12°C</div>
              </div>
              <Cloud className="w-24 h-24 opacity-80" />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/30">
              <div className="flex items-center gap-2">
                <Wind className="w-5 h-5" />
                <div>
                  <div className="text-sm opacity-80">Ветер</div>
                  <div className="text-lg">3 м/с</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="w-5 h-5" />
                <div>
                  <div className="text-sm opacity-80">Влажность</div>
                  <div className="text-lg">76%</div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm opacity-80">
              Обновлено: сегодня в 14:00
            </div>
          </div>

          {/* Курсы валют */}
          <div className="bg-white border-2 border-[#A7D8F0] rounded-lg p-6">
            <h3 className="text-xl mb-4 text-gray-900">Курсы валют</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">💵</div>
                  <div>
                    <div className="text-lg text-gray-900">USD</div>
                    <div className="text-sm text-gray-600">Доллар США</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-lg">89.45 ₽</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Покупка: 88.90 • Продажа: 90.00
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">💶</div>
                  <div>
                    <div className="text-lg text-gray-900">EUR</div>
                    <div className="text-sm text-gray-600">Евро</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-red-600">
                    <TrendingDown className="w-4 h-4" />
                    <span className="text-lg">96.20 ₽</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Покупка: 95.50 • Продажа: 96.90
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Источник: ЦБ РФ • 24 февраля 2026
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
