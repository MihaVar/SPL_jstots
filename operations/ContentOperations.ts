import { BaseContent } from "../interface/BaseContent";

// Операції з контентом
export type ContentOperations<T extends BaseContent> = {
    create: (content: T) => T;
    read: (id: string) => T | undefined;
    update: (id: string, updates: Partial<T>) => T | undefined;
    delete: (id: string) => boolean;
};


export function createContentOperations<T extends BaseContent>(): ContentOperations<T> {
    const contentStorage: Map<string, T> = new Map();

    return {
        create(content: T): T { // Створення об'єкту
            contentStorage.set(content.id, content);
            return content;
        },
        read(id: string): T | undefined { // Читання об'єкту
            return contentStorage.get(id);
        },
        update(id: string, updates: Partial<T>): T | undefined { // Оновлення об'єкту
            const existingContent = contentStorage.get(id);
            if (existingContent) {
                const updatedContent = { ...existingContent, ...updates, updatedAt: new Date() };
                contentStorage.set(id, updatedContent as T);
                return updatedContent as T;
            }
            return undefined;
        },
        delete(id: string): boolean { // Видалення об'єкту
            return contentStorage.delete(id);
        },
    };
}