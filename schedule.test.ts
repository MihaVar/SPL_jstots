
import {
    addProfessor,
    addLesson,
    findAvailableClassrooms,
    getProfessorSchedule,
    getClassroomUtilization,
    getMostPopularCourseType,
    reassignClassroom,
    cancelLesson,
    professors, classrooms, courses, schedule,
    Professor, Lesson, Classroom, Course
} from './schedule';

// Set global variables

const professor1: Professor = { id: 1, name: 'John Doe', department: 'Math' };

const classroom1: Classroom = { number: '101', capacity: 30, hasProjector: true };
const classroom2: Classroom = { number: '102', capacity: 20, hasProjector: false };

const course1: Course = { id: 1, name: 'Algebra', type: 'Lecture' };
const course2: Course = { id: 2, name: 'Physics', type: 'Lab' };

const lesson1: Lesson = {
    lessonId: 1,
    courseId: 2,
    professorId: 1,
    classroomNumber: "101",
    dayOfWeek: 'Tuesday',
    timeSlot: '10:15-11:45',
};

const lesson2: Lesson = {
    lessonId: 2,
    courseId: 1,
    professorId: 1,
    classroomNumber: "102",
    dayOfWeek: 'Wednesday',
    timeSlot: '14:00-15:30',
};

describe('University Scheduling System Tests', () => {
    beforeEach(() => {
        // Reset data before each test
        professors.length = 0;
        classrooms.length = 0;
        courses.length = 0;
        schedule.length = 0;
    });

    test('addProfessor should add a professor', () => {
        addProfessor(professor1);
        expect(professors).toContainEqual(professor1); // Add professor
    });

    test('addLesson should add a lesson', () => {
        addProfessor(professor1);
        classrooms.push(classroom1);
        courses.push(course2);

        const result = addLesson(lesson1);
        expect(result).toBe(true);
        expect(schedule).toContainEqual(lesson1); // Add first lesson
    });

    test("addLesson should not add a conflicting lesson (professor conflict)", () => {
        addLesson(lesson1);
        const conflictingLesson = {...lesson1, lessonId: 2, classroomNumber: "102"};
        const result = addLesson(conflictingLesson);
        expect(result).toBe(false); // Another lesson is already set
    });

    test('findAvailableClassrooms should return available classrooms', () => {
        classrooms.push(classroom1, classroom2);
        addLesson(lesson1);

        const available = findAvailableClassrooms('10:15-11:45', 'Tuesday');
        expect(available).toEqual(['102']); // 101 is occupied
    });

    test('getProfessorSchedule should return the correct schedule for a professor', () => {
        addProfessor(professor1);
        classrooms.push(classroom1);
        courses.push(course2);
        addLesson(lesson1);

        const schedule = getProfessorSchedule(professor1.id);
        expect(schedule).toEqual([lesson1]); // Professor is assigned for first lesson
    });

    test('getClassroomUtilization should return utilization percentage', () => {
        classrooms.push(classroom1);
        addLesson(lesson1);

        const utilization = getClassroomUtilization('101');
        expect(utilization).toBeCloseTo((1 / 25) * 100); // 1 of 25 slots occupied
    });

    test('getMostPopularCourseType should return the most popular course type', () => {
        courses.push(course1, course2);
        addLesson(lesson1);
        addLesson(lesson2);

        const popularType = getMostPopularCourseType();
        expect(popularType).toBe('Lecture'); // Lecture is added first
    });

    test("reassignClassroom should reassign classroom", () => {
        addLesson(lesson1);
        const result = reassignClassroom(1, "102");
        expect(result).toBe(true);
        expect(schedule[0].classroomNumber).toBe("102"); // The lesson is reassigned to 102 classroom
    });

    test('cancelLesson should remove the lesson from the schedule', () => {
        addProfessor(professor1);
        classrooms.push(classroom1);
        courses.push(course2);
        addLesson(lesson1);

        cancelLesson(course2.id);
        expect(schedule).not.toContainEqual(lesson1); // The lesson should be removed
    });
});
