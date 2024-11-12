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