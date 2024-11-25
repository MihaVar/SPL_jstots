import { Article } from './interface/Article';
import { Product } from './interface/Product';
import { createAccessControl } from './control/AccessControl';
import { compositeArticleValidator, compositeProductValidator } from './validation/Validation';
import { Versioned, createVersionedContent } from './version/versioning';

// Створення продукту
const product: Product = {
    id: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'draft',
    name: 'Air fryer',
    description: 'A small countertop convection oven, which simulate deep frying without submerging the food in oil.',
    price: 1499.99,
    stock: 10,
    category: ['home', 'cooking', 'oven'],
};

// Створення статті
const article: Article = {
    id: '2',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'published',
    title: 'SUICT conferention',
    content: 'State University of Information-Communicational Technologies is holding a scientific conferention',
    authorId: 'author1',
    tags: ['suict', 'science', 'conferention'],
};

// Контроль доступу
const articleAccessControl = createAccessControl<Article>();
const productAccessControl = createAccessControl<Product>();

console.log('Editor access to create product:', productAccessControl.editor.create);
console.log('Viewer access to update article:', articleAccessControl.viewer.update);

// Валідація
const productValidationResult = compositeProductValidator.validate(product);
if (productValidationResult.isValid) {
    console.log('Product is valid');
}
else console.log('Product validation failed', productValidationResult.errors);

const articleValidationResult = compositeArticleValidator.validate(article);
if (articleValidationResult.isValid) {
    console.log('Product is valid');
}
else console.log('Product validation failed', articleValidationResult.errors);

// Версіонування
const versionedProduct: Versioned<Product> = createVersionedContent(product);
console.log('Versioned Product:', versionedProduct);

const updatedProduct = { 
    ...versionedProduct, // Версіонований продукт
    stock: 9, // Змінюється кількість
    version: versionedProduct.version + 1, // Змінюється версія
    updatedAt: new Date(), // Дата оновлення продукту
};
console.log('Updated Versioned Product:', updatedProduct);

const versionedArticle: Versioned<Article> = createVersionedContent(article);
console.log('Versioned Article:', versionedArticle);

const updatedArticle = { 
    ...versionedArticle, // Версіонована стаття
    title: 'SUICT Science Conferention', // Змінюється назва
    version: versionedArticle.version + 1, // Змінюється версія
    updatedAt: new Date(), // Дата оновлення статті
};
console.log('Updated Versioned Article:', updatedArticle);