import { useState } from "react";
import { useNavigate } from "react-router";
import { 
  Upload, 
  X, 
  CheckCircle2,
  Home as HomeIcon,
  Car,
  Briefcase,
  ShoppingBag,
  Smartphone,
  Sofa,
  Sparkles
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Switch } from "../components/ui/switch";
import { toast } from "sonner";

const categories = [
  { name: "Недвижимость", value: "property", icon: HomeIcon },
  { name: "Транспорт", value: "transport", icon: Car },
  { name: "Электроника", value: "electronics", icon: Smartphone },
  { name: "Работа", value: "jobs", icon: Briefcase },
  { name: "Мебель", value: "furniture", icon: Sofa },
  { name: "Товары", value: "goods", icon: ShoppingBag }
];

const pricingPlans = [
  {
    id: "basic",
    name: "Базовое",
    price: "Бесплатно",
    duration: "14 дней",
    features: ["Размещение на 14 дней", "Базовое расположение", "До 5 фотографий"]
  },
  {
    id: "standard",
    name: "Стандарт",
    price: "299 ₽",
    duration: "30 дней",
    features: ["Размещение на 30 дней", "Приоритетное расположение", "До 10 фотографий", "Выделение цветом"]
  },
  {
    id: "premium",
    name: "Премиум",
    price: "599 ₽",
    duration: "30 дней",
    features: ["Размещение на 30 дней", "Топ страницы", "До 20 фотографий", "Золотое выделение", "Закрепление вверху"],
    recommended: true
  }
];

export function PostAd() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    location: "",
    contact: "",
    phone: "",
    email: ""
  });
  const [selectedPlan, setSelectedPlan] = useState("standard");
  const [autoRenewal, setAutoRenewal] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.description || !formData.price) {
      toast.error("Заполните все обязательные поля");
      return;
    }

    toast.success("Объявление успешно размещено!", {
      description: "Ваше объявление будет опубликовано после модерации",
      icon: <CheckCircle2 className="w-5 h-5" />
    });

    setTimeout(() => {
      navigate("/classifieds");
    }, 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).slice(0, 5 - images.length);
      newImages.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Разместить объявление</h1>
          <p className="text-slate-600 mt-2">Заполните форму для публикации вашего объявления</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Information */}
          <Card>
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
              <CardDescription>Укажите детали вашего объявления</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="title">Название объявления *</Label>
                <Input
                  id="title"
                  placeholder="Например: 2-комнатная квартира в центре"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="category">Категория *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        <div className="flex items-center gap-2">
                          <cat.icon className="w-4 h-4" />
                          {cat.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Описание *</Label>
                <Textarea
                  id="description"
                  placeholder="Подробно опишите ваше предложение..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-2 min-h-32"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="price">Цена *</Label>
                  <Input
                    id="price"
                    type="text"
                    placeholder="Введите цену"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Местоположение</Label>
                  <Input
                    id="location"
                    placeholder="Например: Центральный район"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photos */}
          <Card>
            <CardHeader>
              <CardTitle>Фотографии</CardTitle>
              <CardDescription>Добавьте до 5 фотографий</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-slate-100">
                      <img src={image} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {images.length < 5 && (
                    <label className="aspect-square rounded-lg border-2 border-dashed border-slate-300 hover:border-blue-500 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50">
                      <Upload className="w-8 h-8 text-slate-400 mb-2" />
                      <span className="text-xs text-slate-500">Загрузить</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Контактная информация</CardTitle>
              <CardDescription>Как с вами связаться</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="contact">Контактное лицо</Label>
                <Input
                  id="contact"
                  placeholder="Ваше имя"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Plans */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Выберите тариф
              </CardTitle>
              <CardDescription>Увеличьте эффективность вашего объявления</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {pricingPlans.map((plan) => (
                  <label
                    key={plan.id}
                    className={`relative cursor-pointer rounded-lg border-2 p-6 transition-all ${
                      selectedPlan === plan.id
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-200 hover:border-slate-300"
                    } ${plan.recommended ? "ring-2 ring-amber-400" : ""}`}
                  >
                    {plan.recommended && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs px-3 py-1 rounded-full">
                        Рекомендуем
                      </div>
                    )}
                    <RadioGroupItem value={plan.id} className="sr-only" />
                    <div className="text-center mb-4">
                      <div className="font-bold text-lg text-slate-900">{plan.name}</div>
                      <div className="text-2xl font-bold text-blue-600 my-2">{plan.price}</div>
                      <div className="text-sm text-slate-500">{plan.duration}</div>
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </label>
                ))}
              </RadioGroup>

              {selectedPlan !== "basic" && (
                <div className="flex items-center justify-between mt-6 p-4 bg-slate-100 rounded-lg">
                  <div>
                    <div className="font-medium text-slate-900">Автопродление</div>
                    <div className="text-sm text-slate-600">Автоматически продлевать объявление</div>
                  </div>
                  <Switch checked={autoRenewal} onCheckedChange={setAutoRenewal} />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/classifieds")}
            >
              Отмена
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Опубликовать объявление
            </Button>
          </div>

          <p className="text-sm text-slate-500 text-center">
            Нажимая "Опубликовать", вы соглашаетесь с правилами размещения объявлений
          </p>
        </form>
      </div>
    </div>
  );
}
