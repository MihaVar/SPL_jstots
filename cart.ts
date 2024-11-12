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