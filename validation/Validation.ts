import { Article } from "../interface/Article";
import { Product } from "../interface/Product";

// Базовий тип для валідатора
type Validator<T> = {
    validate: (data: T) => ValidationResult;
}
  
type ValidationResult = {
    isValid: boolean;
    errors?: string[];
}

// Валідатор для продуктів
export const productValidator: Validator<Product> = {
    validate: (data) => {
        const errors: string[] = []; // Можливі помилки
        if (!data.name || data.name.trim() === '') {
            errors.push('Name is required.');
        }
        if (data.name && data.name.length > 35) {
            errors.push('Product name must not exceed 35 characters.');
        }
        if (data.price < 0) {
            errors.push('Price must be a positive value.');
        }
        if (data.stock < 0) {
            errors.push('Stock must be a positive value.');
        }
        return {
            isValid: errors.length === 0, // Помилки виводяться, лише якщо вони існують
            errors, 
        };
    },
};

// Валідатор для статтей
export const articleValidator: Validator<Article> = {
    validate: (data) => {
        const errors: string[] = []; 
        if (!data.title || data.title.trim() === '') {
            errors.push('Title is required.');
        }
        if (!data.content || data.content.trim() === '') {
            errors.push('Content is required.');
        }
        return {
            isValid: errors.length === 0,
            errors, 
        };
    },
};

// Компонування валідатора
export type CompositeValidator<T> = {
    validators: Validator<T>[];
    validate: (data: T) => ValidationResult;
};


export const compositeProductValidator: CompositeValidator<Product> = {
    validators: [productValidator],
    validate(data) {
      const allErrors = this.validators.flatMap((v) => v.validate(data).errors || []); // Усі помилки збираються в один об'єкт
      return {
        isValid: allErrors.length === 0,
        errors: allErrors,
      };
    },
};
  
export const compositeArticleValidator: CompositeValidator<Article> = {
    validators: [articleValidator],
    validate(data) {
      const allErrors = this.validators.flatMap((v) => v.validate(data).errors || []);
      return {
        isValid: allErrors.length === 0,
        errors: allErrors,
      };
    },
};