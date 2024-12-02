import { Faculty, StudentStatus, CourseType, Semester, Grade } from "../enum/Enums";
 
// Інтерфейс студента
export interface Student {
    id: number; // Унікальний ідентифікатор студента
    fullName: string; // ПІБ студента
    faculty: Faculty; // Факультет
    year: number; // Рік навчання
    status: StudentStatus; // Статус студента
    enrollmentDate: Date; // Дата зарахування
    groupNumber: string; // Номер групи
}

// Інтерфейс курса
export interface Course {
    id: number; // Унікальний ідентифікатор курсу
    name: string; // Назва курсу
    type: CourseType; // Тип курсу
    credits: number; // Кількість кредитів
    semester: Semester; // Семестр, в якому викладається курс
    faculty: Faculty; // Факультет, до якого належить курс
    maxStudents: number; // Максимальна кількість студентів
}

// Інтерфейс оцінок
export interface GradeRecord {
    studentId: number; // ID студента
    courseId: number; // ID курсу
    grade: Grade; // Оцінка
    date: Date; // Дата виставлення оцінки
    semester: Semester; // Семестр, у якому виставлена оцінка
}
