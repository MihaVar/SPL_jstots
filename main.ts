// Типи товарів

type BaseProduct = { // Продукт
    id: number;
    name: string;
    price: number;
    description?: string; // Опис для продуктів
};
  
type Electronics = BaseProduct & { // Тип електроніка
    category: 'electronics';
    brand: string;
    warranty: number; // Гарантія в місяцях
};
  
type Clothing = BaseProduct & { // Тип одяг
    category: 'clothing';
    size: string;
    material: string;
};
  
type Book = BaseProduct & { // Тип книжка
    category: 'book';
    author: string;
    genre: string;
    pages: number;
};

// Пошук продуктів
const findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined => { // Функція для пошуку продукта
    if (!Array.isArray(products) || typeof id !== 'number') { // Перевірка на коректність даніх
      console.error("Некоректні вхідні дані для пошуку товару.");
      return undefined;
    }
    return products.find(product => product.id === id);
  };

const filterByPrice = <T extends BaseProduct>(products: T[], maxPrice: number): T[] => { // Функція для сортування продуктів за ціною
    if (!Array.isArray(products) || typeof maxPrice !== 'number') { // Перевірка на коректність даніх
      console.error("Некоректні вхідні дані для фільтрації за ціною.");
      return [];
    }
    return products.filter(product => product.price <= maxPrice);
};

// Кошик з продуктами
type CartItem<T> = { // Товар в кошику
    product: T;
    quantity: number;
};

// Функція для додавання предметів у кошик
const addToCart = <T extends BaseProduct>( 
    cart: CartItem<T>[],
    product: T,
    quantity: number
    ): CartItem<T>[] => { 
    if (!Array.isArray(cart) || typeof quantity !== 'number' || quantity <= 0) { // Перевірка на коректність даних
      console.error("Некоректні вхідні дані для додавання товару в кошик.");
      return cart;
    }

    const existingItem = cart.find(item => item.product.id === product.id); // Пошук товару
    
    if (existingItem) { // Оновлення кількості якщо товар вже є в кошику
        existingItem.quantity += quantity;
    } 
    else { // Додається новий товар в кошик
      cart.push({ product, quantity });
    }
    
    return cart;
};

const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => { // Функція для рахування загальної вартості предметів у кошику
    if (!Array.isArray(cart)) { // Перевірка на коректність даних
      console.error("Некоректні вхідні дані для розрахунку загальної вартості.");
      return 0;
    }
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0); // Підрахунок суми товарів у кошику
};

// Тестування функцій
const electronics: Electronics[] = [
    {
      id: 1,
      name: "Телефон",
      price: 10000,
      category: 'electronics',
      brand: "Samsung",
      warranty: 24
    }
];
  
const clothing: Clothing[] = [
    {
      id: 2,
      name: "Футболка",
      price: 500,
      category: 'clothing',
      size: "M",
      material: "Cotton"
    }
];
  
const books: Book[] = [
    {
      id: 3,
      name: "Книга",
      price: 300,
      category: 'book',
      author: "Дж. Р. Р. Толкін",
      genre: "Фентезі",
      pages: 500
    }
];

const phone = findProduct(electronics, 1); // Пошук продукту
const cart: CartItem<BaseProduct>[] = [];
  
if (phone) { // Додавання продукту
    addToCart(cart, phone, 1);
}
  
const tshirt = findProduct(clothing, 2);
if (tshirt) {
    addToCart(cart, tshirt, 2);
}
  
const total = calculateTotal(cart); // Підрахунок загальної суми
  
console.log("Кошик:", cart);
console.log("Загальна вартість:", total);
  