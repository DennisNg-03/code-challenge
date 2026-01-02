// It is assumed that only positive integers are accepted as parameters based on the given examples in the problem.
// Therefore, input validation rejects zero or negative integers.

var sum_to_n_a = function (n) {
	// For loop
	if (n <= 0) {
		return "Please enter a positive integer";
	}

	let sum = 0;

	for (let i = 1; i <= n; i ++) {
		sum += i;
	}

	return sum;
};

var sum_to_n_b = function (n) {
	// Recursive
	if (n <= 0) {
		return "Please enter a positive integer";
	}

	if (n === 1) {
		return 1;
	}

	return n + sum_to_n_b(n - 1);
};

var sum_to_n_c = function (n) {
	// Array.prototype.reduce()
	if (n <= 0) {
		return "Please enter a positive integer";
	}

	let numbers = [];

	for (let i = 1; i <= n; i ++) {
		numbers.push(i);
	}

	const sum = numbers.reduce((acc, curr) => acc + curr);

	return sum;
};

console.log(sum_to_n_a(5));
console.log(sum_to_n_b(5));
console.log(sum_to_n_c(5));
