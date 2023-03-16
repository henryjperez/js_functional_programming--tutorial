console.log("Functional Programming INIT")

/* -------------------------------------------- */
/*                Pure functions                */
/* -------------------------------------------- */
const double = x => x * 2;
let value = 2;
console.group('No matter the time executes the output will always be the same \ngiven the same value')
console.log(double(value))
console.log(double(value))
console.log(double(value))
console.log(double(value))

value = 3
console.log(double(value))
console.log(double(value))
console.log(double(value))

value = 12
console.log(double(value))
console.log(double(value))
console.log(double(value))

value = 234
console.log(double(value))
console.log(double(value))
console.log(double(value))
console.groupEnd()

/* ----------- Not so pure functions ---------- */
const ran = x => x * Math.random();

console.group('It will always change no matter if is the same input')
console.log(ran(value))
console.log(ran(value))
console.log(ran(value))
console.groupEnd()


/* -------------------------------------------- */
/*                 Immutability                 */
/* -------------------------------------------- */
// variables: Stack memory
// objects: Heap memory

/* ------------ Object comparisons ------------ */
console.group('Immutability')
const obj1 = {
	a: 1,
	b: 2,
	c: 3,
	d: { e: 5, f: 6, },
}
const obj2 = obj1;
console.log(`They are the same because 
they are pointing to 
the same reference in the heap memory`, obj1, obj2)

obj2.b = 3456;

console.log(`So, a change in one is a change in another`, obj1, obj2);

const obj3 = Object.assign({}, obj1);
console.log("They look the same but they aren't:\n", obj1, obj3);
obj3.b = 44;
obj3.a = "I'm different";

console.log("They are different objects, a change in one is not in another\n", obj1, obj3)

obj3.d.e = "I'm free!!";
console.log("But Object.assign only works at the first level, sorry\n", obj1, /* obj2, */ obj3);

// but there's a trick
const obj4 = JSON.parse(JSON.stringify(obj1));
console.log("Again, they look alike, right? Wrong\n", obj1, obj4);
obj4.a = 14;
obj4.d.e = "Yeah, bayhbeh";
console.log("Now you see\n", obj1, obj4);


/* --------- Immutability in functions -------- */
function addToList(list, item) {
	const newList = JSON.parse(JSON.stringify(list))
	newList.push(item);

	return newList;
}
const list1 = [1, 2, 3, 4, 5];
const item = "Yeah, baby"
const afterAdding = addToList(list1, item);
console.log("Before and after mutation", list1, afterAdding);

console.groupEnd()


/* -------------------------------------------- */
/*           Scope & the Shared State           */
/* -------------------------------------------- */
console.group('Shared State')
const sharedState = {
	someValue: 3,
}

const addOne1 = () => sharedState.someValue += 1;
const timesTwo1 = () => sharedState.someValue *= 2;
const times3 = (val) => val *= 2;

console.log(sharedState.someValue);

times3(sharedState.someValue); // this is not making and effect because it's not really referencing the object
console.log(sharedState.someValue);
addOne1()
console.log(sharedState.someValue);
timesTwo1()
console.log(sharedState.someValue);

// 	The idea is to not mutate the state
// because you could be working with an object
// and you can change the value reference
// on that object that could be
// on other parts of the code

const anotherState = {
	someValue: 4,
}
// Object.assign({}, obj, { someValue: obj.someValue + 1 })
// equals to
// {...obj, someValue: obj.someValue + 1}
const addOne2 = obj => ({...obj, someValue: obj.someValue + 1 });
const timesTwo2 = obj => ({ ...obj, someValue: obj.someValue * 2 });

console.log(anotherState.someValue);

addOne2(anotherState)
console.log(anotherState.someValue);
timesTwo2(anotherState)
console.log(anotherState.someValue);

// BUT
console.log("Given:", anotherState);
console.log(addOne2(anotherState));
console.log(timesTwo2(anotherState));
console.log(timesTwo2(addOne2(anotherState)));
console.log(addOne2(timesTwo2(anotherState)));
console.log("After that:", anotherState);

console.groupEnd()


/* -------------------------------------------- */
/*                   Closures                   */
/* -------------------------------------------- */
const rememberToSum = a => b => a + b;
function rememberToSum(a) {
	return function (b) {
		return a + b;
	}
}
const returnedSum = rememberToSum(5);
console.log(returnedSum(5))

/* -------------------------------------------- */
/*                   Currying                   */
/* -------------------------------------------- */
function notCurredSumOfThree(a, b, c) {
	return a + b + c;
}
function sumOfThree(a1) {
	return function (b2) {
		return function (c3) {
			return a1 + b2 + c3;
		}
	}
}
const arrowSumOfThree = a => b => c => a + b + c; 

console.log(notCurredSumOfThree(1, 2, 3), sumOfThree(1)(2)(3), arrowSumOfThree(1)(2)(3));


/* -------------------------------------------- */
/*            Higher Order Functions            */
/* -------------------------------------------- */
function triple(x) {
	return x * 3;
}
const numbers = [1, 2, 3, 4, 5, 16, 27,];

const result1 = numbers.map(y => y * 3);
const result2 = numbers.map(triple);
// const result3 = numbers.map(triple()) // map will execute the function, not you. You only declare it not call it
// result1 === result2
// result2 !== result3

// higher order function can also be
// a function which returns another function

console.log("Higher order results", result1, result2, /* result3 */);



console.log("Functional Programming ENDs")
