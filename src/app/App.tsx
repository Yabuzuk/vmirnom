import { Header } from './components/Header';
import { HeroNews } from './components/HeroNews';
import { NewsFeed } from './components/NewsFeed';
import { EventsSection } from './components/EventsSection';
import { ClassifiedsSection } from './components/ClassifiedsSection';
import { WeatherAndCurrency } from './components/WeatherAndCurrency';
import { ImportantPhones } from './components/ImportantPhones';
import { CityMap } from './components/CityMapLeaflet';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroNews />
        <NewsFeed />
        <EventsSection />
        <ClassifiedsSection />
        <WeatherAndCurrency />
        <ImportantPhones />
        <CityMap />
      </main>
      <Footer />
    </div>
  );
}
