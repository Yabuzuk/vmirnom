import { Phone, AlertCircle, Building2, Wrench, Heart, Shield } from 'lucide-react';

interface PhoneContact {
  id: number;
  name: string;
  number: string;
  icon: React.ReactNode;
}

const contacts: PhoneContact[] = [
  {
    id: 1,
    name: 'Единая диспетчерская служба',
    number: '112',
    icon: <AlertCircle className="w-6 h-6" />,
  },
  {
    id: 2,
    name: 'Скорая медицинская помощь',
    number: '103',
    icon: <Heart className="w-6 h-6" />,
  },
  {
    id: 3,
    name: 'Полиция',
    number: '102',
    icon: <Shield className="w-6 h-6" />,
  },
  {
    id: 4,
    name: 'Аварийные службы',
    number: '8 (800) 555-0101',
    icon: <Wrench className="w-6 h-6" />,
  },
  {
    id: 5,
    name: 'Администрация города Мирный',
    number: '8 (41136) 5-12-34',
    icon: <Building2 className="w-6 h-6" />,
  },
  {
    id: 6,
    name: 'Справочная служба',
    number: '8 (41136) 5-67-89',
    icon: <Phone className="w-6 h-6" />,
  },
];

export function ImportantPhones() {
  return (
    <section className="bg-[#F2F2F2] py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl mb-8 text-gray-900">Важные телефоны</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map((contact) => (
            <a
              key={contact.id}
              href={`tel:${contact.number.replace(/\s/g, '')}`}
              className="flex items-center gap-4 bg-white p-5 rounded-lg hover:shadow-lg transition-shadow group"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-[#2196F3] text-white rounded-full flex items-center justify-center group-hover:bg-[#1976D2] transition-colors">
                {contact.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-600 line-clamp-1">
                  {contact.name}
                </div>
                <div className="text-xl text-gray-900 group-hover:text-[#2196F3] transition-colors">
                  {contact.number}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900">
              <strong>Внимание:</strong> В экстренных ситуациях звоните по номеру 112. Звонок бесплатный с любого телефона.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
