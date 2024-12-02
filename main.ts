// Статус студента
export enum StudentStatus {
    Active = "Active",
    Academic_Leave = "Academic_Leave",
    Graduated = "Graduated",
    Expelled = "Expelled",
}

// Типи курсів
export enum CourseType {
    Mandatory = "Mandatory",
    Optional = "Optional",
    Special = "Special",
}

// Семестри
export enum Semester {
    First = "First",
    Second = "Second",
}

// Оцінки
export enum Grade {
    Excellent = 5,
    Good = 4,
    Satisfactory = 3,
    Unsatisfactory = 2,
}

// Факультети
export enum Faculty {
    Computer_Science = "Computer_Science",
    Economics = "Economics",
    Law = "Law",
    Engineering = "Engineering",
}

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

// Клас керування університетом
export class UniversityManagementSystem {
    private students: Student[] = [];
    private courses: Course[] = [];
    private grades: GradeRecord[] = [];
    private studentIdCounter = 1;

    // Зарахування студента
    enrollStudent(student: Omit<Student, "id">): Student {
        const newStudent: Student = { id: this.studentIdCounter++, ...student };
        this.students.push(newStudent);
        return newStudent;
    }

    // Реєстрація студента на курс
    registerForCourse(studentId: number, courseId: number): void {
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);

        if (!student) {
            throw new Error("Студента не знайдено");
        }

        if (!course) {
            throw new Error("Курс не знайдено");
        }

        if (student.faculty !== course.faculty) {
            throw new Error("Студент знаходиться на іншому факультеті");
        }

        const registeredStudents = this.grades.filter(g => g.courseId === courseId).length;
        if (registeredStudents >= course.maxStudents) {
            throw new Error("Курс заповнено");
        }
    }

    // Виставлення оцінки студенту
    setGrade(studentId: number, courseId: number, grade: Grade): void {
        const studentRegistered = this.grades.some(
            g => g.studentId === studentId && g.courseId === courseId
        );

        if (!studentRegistered) {
            throw new Error("Студент не зарахований на курс");
        }

        this.grades.push({
            studentId,
            courseId,
            grade,
            date: new Date(),
            semester: Semester.First, // Заміна на відповідний семестр
        });
    }

    // Оновлення статусу студента
    updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
        const student = this.students.find(s => s.id === studentId);

        if (!student) {
            throw new Error("Студента не знайдено");
        }
 
        if (student.status === StudentStatus.Graduated) { 
            throw new Error("Студент випустився");
        }

        if (student.status === StudentStatus.Expelled) { 
            throw new Error("Студента відраховано");
        }

        student.status = newStatus;
    }

    // Отримати список студентів за факультетом
    getStudentsByFaculty(faculty: Faculty): Student[] {
        return this.students.filter(s => s.faculty === faculty);
    }

    // Отримати оцінки студента
    getStudentGrades(studentId: number): GradeRecord[] {
        return this.grades.filter(g => g.studentId === studentId);
    }

    // Отримати доступні курси за факультетом та семестром
    getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
        return this.courses.filter(c => c.faculty === faculty && c.semester === semester);
    }

    // Обчислення середнього балу студента
    calculateAverageGrade(studentId: number): number {
        const studentGrades = this.getStudentGrades(studentId);
        if (studentGrades.length === 0) return 0;

        const total = studentGrades.reduce((sum, record) => sum + record.grade, 0);
        return total / studentGrades.length;
    }

    // Список відмінників
    getTopStudentsByFaculty(faculty: Faculty): Student[] {
        const studentsByFaculty = this.getStudentsByFaculty(faculty);
        return studentsByFaculty.filter(student =>
            this.calculateAverageGrade(student.id) === Grade.Excellent
        );
    }
}

// Ініціалізація системи управління університетом
const ums = new UniversityManagementSystem();

// Додавання студентів
const student1 = ums.enrollStudent({
    fullName: "Ostap Prokopiv",
    faculty: Faculty.Computer_Science,
    year: 1,
    status: StudentStatus.Active,
    enrollmentDate: new Date("2023-09-01"),
    groupNumber: "CS-101",
});

const student2 = ums.enrollStudent({
    fullName: "Maria Petrenko",
    faculty: Faculty.Engineering,
    year: 2,
    status: StudentStatus.Active,
    enrollmentDate: new Date("2022-09-01"),
    groupNumber: "ENG-201",
});

console.log("Додано студентів:", student1, student2);

// Додавання курсів
ums["courses"].push(
    {
        id: 1,
        name: "Algorithms and Data Structures",
        type: CourseType.Mandatory,
        credits: 5,
        semester: Semester.First,
        faculty: Faculty.Computer_Science,
        maxStudents: 30,
    },
    {
        id: 2,
        name: "Thermodynamics",
        type: CourseType.Optional,
        credits: 3,
        semester: Semester.First,
        faculty: Faculty.Engineering,
        maxStudents: 20,
    }
);

console.log("Додано курси:", ums["courses"]);

// Реєстрація студента на курс
ums.registerForCourse(student1.id, 1); // Ostap Prokopiv на курс "Algorithms and Data Structures"

// Виставлення оцінки
ums.setGrade(student1.id, 1, Grade.Excellent);

// Оновлення статусу студента
ums.updateStudentStatus(student2.id, StudentStatus.Academic_Leave);

// Отримання студентів за факультетом
const csStudents = ums.getStudentsByFaculty(Faculty.Computer_Science);
console.log("Студенти на факультеті Комп'ютерні науки:", csStudents);

// Отримання оцінок студента
const student1Grades = ums.getStudentGrades(student1.id);
console.log(`Оцінки студента ${student1.fullName}:`, student1Grades);

// Середній бал студента
const student1Average = ums.calculateAverageGrade(student1.id);
console.log(`Середній бал студента ${student1.fullName}:`, student1Average);

// Список відмінників за факультетом
const csTopStudents = ums.getTopStudentsByFaculty(Faculty.Computer_Science);
console.log("Відмінники факультету Комп'ютерні науки:", csTopStudents);

// Доступні курси за факультетом і семестром
const availableCsCourses = ums.getAvailableCourses(Faculty.Computer_Science, Semester.First);
console.log("Доступні курси на першому семестрі для факультету Комп'ютерні науки:", availableCsCourses);