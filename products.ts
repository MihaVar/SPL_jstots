type BaseProduct = {
    id: number;
    name: string;
    price: number;
    description?: string;
};
  
type Electronics = BaseProduct & {
    category: 'electronics';
    brand: string;
    warranty: number; // Гарантія в місяцях
};
  
type Clothing = BaseProduct & {
    category: 'clothing';
    size: string;
    material: string;
};
  
type Book = BaseProduct & {
    category: 'book';
    author: string;
    genre: string;
    pages: number;
};