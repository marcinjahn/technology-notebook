---
title: OOP
description: How object-oriented programming works in JavaScript
tags: ["javascript"]
lang: en-US
---

# OOP

There are 3 ways of using objects:

- Object Literals
- Constructor Functions
- Classes

## Object Literals

```js
let person = {
    firstName: "John",
    lastName = "Wick",
    //short method syntax, specific to object literals:
    sayHello() { console.log("hello") }
} 

//Dynamically adding properties
person.age = 29

//Methods (could be also defined on the object with firstName, etc. )
person.isAdult = function() { return this.age >= 18 }
```

`let person = {}` is the same as `let person = new Object()`.

### Listing members

```js
//for...in
for (let member in person) {
    ...
}

//Object.keys:
let members = Object.keys(person)
```

## Equality

For objects, the reference is compared.

### ==

Not type-safe.

### ===

Type-safe.

NaN != NaN

+0 == -0

### Object.is(obj1, obj2)

NaN == NaN.

+0 != -0

## Constructor Functions

```js
function Person(firstName, lastName, age) {
    this.firstName = firstName
    this.lastName = lastName
    this.isAdult = function() { return this.age >= 18 }
}

//"new" keyword creates a new object, invokes Person function,
//and sets the context of "this" to that new object
let person1 = new Person("John", "Wick", 29)
person1.isAdult()
```

## Object.create()

Both object literals and constructor functions use `Object.create()` underneath.
It's called "pure prototypal inheritance".

```js
let person = Object.create(
    Object.prototype,
    {
        firstName: {value: 'John', enumerable: true, writable: true, configurable: true},
        lastName: {value: 'Wick', enumerable: true, writable: true, configurable: true},
        age: {value: 29, enumerable: true, writable: true, configurable: true}
    }
)
```

It's not used often, the other ways are prefered. The above is the same as:

```js
let person = {
    firstName: "John",
    lastName: "Wick",
    age: 29
};
```

Another usage:

```js
let person = {
    firstName: "Default",
    lastName: "Default",
    age: 0
};

let jack = Object.create(person);
jack.firstName = "Jack";
```

This creates an empty `jack` object and sets `person` as its prototype. The
default values stay on prototype, `jack` can set its own values for them:

![](https://i.imgur.com/5lWTQM1.png)


## Merging Objects

```js
let person = {
    firstName: "John",
    lastName = "Wick",
    sayHello() { console.log("hello") }
}

let person2 = {
    age: 20
}

Object.assign(person2, person1)
//Now person2 contains all properties and methods of person1 and age.

//New merged object without modifying existing ones
let merged = Object.assign({}, person1, person2)
```

## Object Properties

### Property Descriptor

Every property fo an object has a descriptor:

```js
let descriptor = Object.getOwnPropertyDescriptor(person, "firstName")
```

It returns an object:

```json
Object {
    value: "John",
    writable: true, //the value can be changed from its initial value
    enumerable: true,
    configurable: true
}
```

#### Writable

We can modify the descriptor:

```js
Object.defineProperty(person, "firstName", {writable: false})
```

Now, the property becomes read only and if we try to change it we get an error:

> TypeError: Cannot assign to read only property 'firstName' of object 'Object'

However, if `firstName` was an object, it would be still possible to change its
properties (but not `firstName` itself). 

```js
let person = {
    name: {
        first: "John",
        last = "Wick",
    }
}

Object.defineProperty(person, "name", {writable: false})
person.name.first = "Jim" //works
```

To completely "lock" and object, it needs to be frozen:

```js
Object.freeze(person.name)
```

#### Enumerable

Controls whether object can be enumerated with `for...in` loop or `Object.keys`.

We can disable enumeration for some proeprty:

```js
Object.defineProperty(person, "firstName", {enumerable: false})
```

Now, `firstName` will not show up in results of enumeration. It also affects
JSON serialization with `JSON.stringify(person)`. The `firstName` property will
not be serialized.

#### Configurable

It controls whether:

- the property descriptor's `enumerable` and `configurable` cannot be changed 
- the property can be deleted from the object or not

```js
Object.defineProperty(person, 'firstName', {configurable: false})

//The lines below will throw errors:
Object.defineProperty(person, "firstName", {enumerable: false})
Object.defineProperty(person, "firstName", {configurable: true})
delete person.firstName
```

Once it's done, it cannot be changed back! Only `writable` stays changeable. 

#### Getters and Setters

```js
let person = {
    name: {
        first: "John",
        last: "Wick",
    }
}

Object.defineProperty(person, "fullName",
    {
        get: function() {
            return this.name.first + " " + this.name.last
        },
        set: function(value) {
            let nameParts = value.split(' ')
            this.name.first = nameParts[0]
            this.name.last = nameParts[1]
        }
    })
    
console.log(person.fullName) //John Wick
person.fullName = "Saul Goodman"
console.log(person.name.first) //Saul
console.log(person.name.last) //Goodman
console.log(person.fullName) //Saul Goodman
```

## Prototypes

- it is an object that exists on every function (`{}`). When a function is
  created, there is an Object created in memory, with the same name as the
  function. This object is a prototype of the function.
- "normal" objects do have a prototype, but they do not have `protoype` property
  (`undefined`). It is available at `person.__proto__` (`Object {}`)
- prototype has a `constructor` property that points to a function that created
  it

Function's prototype is an Object instance that is given as a prototype object
for every object created from that function as a constructor. This object
instance contains the methods such as `bind`, `call`, `apply`. This is how
functions inherit these methods.

Object's prototype is the same object that the constructor function had (they
refer to the same object in memory).


![](https://cdn.cacher.io/attachments/u/3bsuakbj52oty/_wZH8qzMNpAfri8RtxK7Cna34O6bQMMW/1ol7eb4gb.png)

Example:

```js
function Person(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
}
Person.prototype.age = 29;
Person.prototype.getFullName = function() {
    return this.firstName + " " + this.lastName;
}

console.log(Person.prototype) // { age: 29 }

let jim = new Person("Jim", "Smith")
console.log(jim.age) // 29

jim.age = 19
console.log(jim.age) // 19
console.log(jim.__proto__.age) // 29
```

`age` property exists on `Person`'s prototype. When we create some object from
that constructor function, it will have the same prototype (same object
reference).

When we request `age` on `jim`, JS:

- looks under `jim` - there is no `age`
- looks under `jim.__proto__` - there is `age` and it is used

When we change the value of `jim.age` only this is changed. The prototype's
value does not change.

We added the `getFullName` on the prototype, and not in the constructor
directly, because this way the function is created just once in memory. If we
were creating it in the constructor every instance of `Person` would have a
separate object for this method!

There is a **Prototype Chain**. Every objech has prototype. If some
property/method is not found on an object, JS engine looks into the prototype of
that object. If it's not there either, it looks into prototype's prototype, and
so on.

The same behaviour is for methods. We can even add more stuff to the prototype
after the objects that use this prototype have been created. These objects will
get the new functionality!

### hasOwnProperty

```js
function Person(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
}
Person.prototype.age = 29

let jim = new Person("Jim", "Smith")
console.log(jim.hasOwnProperty('age')) //false

jim.age = 18
console.log(jim.hasOwnProperty('age')) //true
```

### Inheritance

All objects in JS inherit from `Object` and `Object` has no prototype (`null`).

```js
function Person(firstName, lastName, age) {
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
    this.isAdult = function() {
        return this.age >= 18
    }
    Object.defineProperty(person, "fullName",
    {
        get: function() {
            return this.firstName + " " + this.lastName
        },
        enumerable: true
    })
}

function Student(firstName, lastName, age) {
    //Calling Person constructor function in a context of the new Student object
    //Thanks to it this new object gets the firstName, 
    //lastName, age and isAdult()
    Person.call(this, firstName, lastName, age)
    
    this.enrolledCourses = []
    
    this.enroll = function(courseId) {
        this.enrolledCourses.push(courseId)
    }
    
    this.getCourses = function() {
        return `${this.fullName}'s courses: ${this.enrolledCourses.join(", ")}.`
    }
}
Student.prototype = Object.create(Person.prototype) //we create a new prototype object for Student, however its own prototype is set to Person's prototype
Student.prototype.constructor = Student //the above line causes the constructor to be set to Person. We change it back to Student

//Alternatively, the 2 lines above could be just:
Object.setPrototypeOf(Student.prototype, Person.prototype)
```

The 3 things are really the key in defining inheritance:

- calling base function in a constructor of a new type
- creating a new prototype based on base's prototype
- setting the prorotype's constructor back to the correct one

### Static members

```js
Person.adultAge = 18
Student.fromPerson = function(person) {
    return new Student(person.firstName, person.lastName, person.age)
}

console.log(Person.adultAge) //18
let student = Student.fromPerson(somePerson)
```

## Classes

It is just syntactic sugar for the previous approach. Classes in JS are objects!

```js
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName
        this.lastName = lastName
    }
    
    get fullName() {
        return this.firstName + " " + this.lastName
    }
    
    set fullName(value) {
        let nameParts = value.split(' ')
        this.name.first = nameParts[0]
        this.name.last = nameParts[1]        
    }
    
    isAdult() {
        return this.age >= 18
    }
}

let jim = new Person("Jim", "Smith")
```

Getters and setters are set as `enumerable: false` by default. To change that a
property descriptor needs to be modified. Getters and setters are defined on
prototype, while other properties and methods are defined on the instances
directly.

```js
Object.defineProperty(Person.prototype, 'fullName', {enumerable: true})
```

Now, `fullName` is enumerable.

### Inheritance

```js
class Student extends Person {
    constructor(firstName, lastName, age) {
        super(firstName, lastName, age)
        this.enrolledCourses = []
    }
    
    enroll(courseId) {
        this.enrolledCourses.push(courseId)
    }
    
    getCourses() {
        return `${this.fullName}'s courses: ${this.enrolledCourses.join(", ")}.`
    }
}
```

Under the hood, it just sets `Person` as a prototype (`__proto__`) of `Student`.

### Static members

`static` keyword is for defining static members.

```js
class Student {
    ...
    
    static fromPerson(person) {
        return new Student(person.firstName, person.lastName, person.age)
    }
    
    static adultAge = 18
}

let person = new Person("John", "Wick", 29)
let student = Student.fromPerson(person)
console.log(Student.adultAge)
```