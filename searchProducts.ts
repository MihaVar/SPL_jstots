const findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined => {
    if (!Array.isArray(products) || typeof id !== 'number') {
      console.error("Некоректні вхідні дані для пошуку товару.");
      return undefined;
    }
    return products.find(product => product.id === id);
  };

const filterByPrice = <T extends BaseProduct>(products: T[], maxPrice: number): T[] => {
    if (!Array.isArray(products) || typeof maxPrice !== 'number') {
      console.error("Некоректні вхідні дані для фільтрації за ціною.");
      return [];
    }
    return products.filter(product => product.price <= maxPrice);
};