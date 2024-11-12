type CartItem<T> = {
    product: T;
    quantity: number;
};
  
const addToCart = <T extends BaseProduct>(
    cart: CartItem<T>[],
    product: T,
    quantity: number
    ): CartItem<T>[] => {
    if (!Array.isArray(cart) || typeof quantity !== 'number' || quantity <= 0) {
      console.error("Некоректні вхідні дані для додавання товару в кошик.");
      return cart;
    }
  
    const existingItem = cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
      // Якщо товар вже є в кошику, оновлюємо його кількість
      existingItem.quantity += quantity;
    } else {
      // Інакше додаємо новий товар до кошика
      cart.push({ product, quantity });
    }
    
    return cart;
};

const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
    if (!Array.isArray(cart)) {
      console.error("Некоректні вхідні дані для розрахунку загальної вартості.");
      return 0;
    }
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
};