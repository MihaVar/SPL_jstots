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
  