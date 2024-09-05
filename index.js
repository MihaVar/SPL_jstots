function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

function fibonacci(n) {
    let a = 0, b = 1, temp;
    while (n >= 0) {
        temp = a;
        a = a + b;
        b = temp;
        n--;
    }
    return b;
}

function gcd(a, b) {
    while (b !== 0) {
        let t = b;
        b = a % b;
        a = t;
    }
    return a;
}

function factorial(num) {
    if (num < 0) return -1;
    if (num === 0 || num === 1) return 1;
    let result = 1;
    for (let i = 2; i <= num; i++) {
        result *= i;
    }
    return result;
}

function reverseString(str) {
    return str.split('').reverse().join('');
}

class Person {

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        return `Hello, my name is ${this.name}.`;
    }

    haveBirthday() {
        this.age++;
        return `Happy ${this.age}th birthday, ${this.name}!`;
    }
}

class Student extends Person {

    constructor(name, age, studentId) {
        super(name, age);
        this.studentId = studentId;
    }

    introduce() {
        return `Hi, I am ${this.name}, a student with ID ${this.studentId}.`;
    }
}

class Teacher extends Person {

    constructor(name, age, subject) {
        super(name, age);
        this.subject = subject;
    }

    teach() {
        return `Teaching ${this.subject} is my passion.`;
    }
}

class Janitor extends Person {

    constructor(name, age, cleaningDuty) {
        super(name, age);
        this.cleaningDuty = cleaningDuty;
    }

    clean() {
        return `Curenntly I am cleaning ${this.cleaningDuty}.`;
    }
}

class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        this.items.push(element);
    }

    dequeue() {
        if (this.isEmpty()) return "Queue is empty";
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }

    peek() {
        return this.isEmpty() ? "Queue is empty" : this.items[0];
    }

    size() {
        return this.items.length;
    }
}

class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        if (this.isEmpty()) return "Stack is empty";
        return this.items.pop();
    }

    peek()  {
        return this.isEmpty() ? "Stack is empty" : this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }
}

function quickSort(arr) {
    if (arr.length <= 1) return arr;
    let pivot = arr[Math.floor(arr.length / 2)];
    let left = arr.filter(x => x < pivot);
    let middle = arr.filter(x => x === pivot);
    let right = arr.filter(x => x > pivot);
    return [...quickSort(left), ...middle, ...quickSort(right)];
}

console.log('Fibonacci(10):', fibonacci(10));
console.log('GCD of 48 and 18:', gcd(48, 18));
console.log('Is 29 prime?', isPrime(29));

console.log('Factorial of 5:', factorial(5));
console.log('Reversed string of "hello":', reverseString('hello'));

let queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log('Queue front:', queue.peek());
console.log('Queue size:', queue.size());
console.log('Dequeued:', queue.dequeue());
console.log('Queue size after dequeue:', queue.size());

let stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
console.log('Stack top:', stack.peek());
console.log('Stack size:', stack.size());
console.log('Popped:', stack.pop());
console.log('Stack size after pop:', stack.size());

console.log('Sorted array:', quickSort([5, 3, 8, 1, 2, 7]));

let student = new Student('John Doe', 20, 'S12345');
console.log(student.greet());
console.log(student.introduce());
console.log(student.haveBirthday());

let teacher = new Teacher('Jane Smith', 40, 'Mathematics');
console.log(teacher.greet());
console.log(teacher.teach());

let janitor = new Janitor('Bob Man', 35, 'Cafeteria');
console.log(janitor.greet());
console.log(janitor.clean());

processData();
