import { UniversityManagementSystem } from "./class/UniversityManagementSystem";
import { StudentStatus, Faculty, Grade, CourseType, Semester } from "./enum/Enums";

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