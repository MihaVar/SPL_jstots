// base types
export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
export type TimeSlot = '8:30-10:00' | '10:15-11:45' | '12:15-13:45' | '14:00-15:30' | '15:45-17:15';
export type CourseType = 'Lecture' | 'Seminar' | 'Lab' | 'Practice';

// base structures
export type Professor = {
	id: number;
	name: string;
	department: string;
};

export type Classroom = {
	number: string;
	capacity: number;
	hasProjector: boolean;
};

export type Course = {
	id: number;
	name: string;
	type: CourseType;
};

export type Lesson = {
	courseId: number;
	professorId: number;
	classroomNumber: string;
	dayOfWeek: DayOfWeek;
	timeSlot: TimeSlot;
};

// arrays
export const professors: Professor[] = [];
export const classrooms: Classroom[] = [];
export const courses: Course[] = [];
export let schedule: Lesson[] = [];

// functions for arrays
export function addProfessor(professor: Professor): void {
	professors.push(professor);
}

export function addLesson(lesson: Lesson): boolean {
	if (validateLesson(lesson) === null) {
		schedule.push(lesson);
		return true;
	}
	return false;
}

// search and filter functions
export function findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
	const occupiedClassrooms = schedule
		.filter((lesson) => lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek)
		.map((lesson) => lesson.classroomNumber);

	return classrooms
		.filter((classroom) => !occupiedClassrooms.includes(classroom.number))
		.map((classroom) => classroom.number);
}

export function getProfessorSchedule(professorId: number): Lesson[] {
	return schedule.filter((lesson) => lesson.professorId === professorId);
}

// conflict and validation
export type ScheduleConflict = {
	type: 'ProfessorConflict' | 'ClassroomConflict';
	lessonDetails: Lesson;
};

export function validateLesson(lesson: Lesson): ScheduleConflict | null {
	for (const existingLesson of schedule) {
		if (existingLesson.dayOfWeek === lesson.dayOfWeek && existingLesson.timeSlot === lesson.timeSlot) {
			if (existingLesson.professorId === lesson.professorId) {
				return { type: 'ProfessorConflict', lessonDetails: existingLesson };
			}
			if (existingLesson.classroomNumber === lesson.classroomNumber) {
				return { type: 'ClassroomConflict', lessonDetails: existingLesson };
			}
		}
	}
	return null;
}

// analisys functions
export function getClassroomUtilization(classroomNumber: string): number {
	const totalSlots = 5 * 5; // 5 days and 5 time slots
	const occupiedSlots = schedule.filter((lesson) => lesson.classroomNumber === classroomNumber).length;
	return (occupiedSlots / totalSlots) * 100;
}

export function getMostPopularCourseType(): CourseType {
	const typeCount: Record<CourseType, number> = {
		Lecture: 0,
		Seminar: 0,
		Lab: 0,
		Practice: 0,
	};

	for (const course of courses) {
		typeCount[course.type]++;
	}

	return Object.entries(typeCount).reduce((a, b) => (b[1] > a[1] ? b : a))[0] as CourseType;
}

// data modification
export const reassignClassroom = (lessonId: number, newClassroomNumber: string): boolean => {
	const lesson: Lesson | undefined = schedule.find((lesson: Lesson) => lesson.courseId === lessonId);
	if (lesson && validateLesson({ ...lesson, professorId: -1, classroomNumber: newClassroomNumber }) === null) {
		lesson.classroomNumber = newClassroomNumber;
		return true;
	}
	return false;
};

export function cancelLesson(lessonId: number): void {
	schedule = schedule.filter((lesson) => lesson.courseId !== lessonId);
}
