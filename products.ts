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