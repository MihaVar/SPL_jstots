import { Student, Course, GradeRecord } from "../interface/Interfaces";
import { Semester, Grade, StudentStatus, Faculty } from "../enum/Enums";

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
