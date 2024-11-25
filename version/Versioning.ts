import { BaseContent } from "../interface/BaseContent";

// Тип для версіонування
export type Versioned<T extends BaseContent> = T & {
    version: number;
};

// Створення версіонованого об'єкту
export function createVersionedContent<T extends BaseContent>(content: T): Versioned<T> {
    return { ...content, version: 1};
}
  