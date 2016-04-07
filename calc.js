function evaluate (string) {
  /* The expression has to be evaluated from right to left,
     to be sure that operations are done in the correct order,
     because subtraction and division are non-associative.
     i.e. 3-(5-7) != (3-5)-7

     This is because of the way recursive calls group the operations.

     First check for +/-, since these have to be done last. The expression
     will be split on the operator, and the left and right sections will
     then be evaluated recursively. As results bubble back up the chain
     of function calls, this ensures addition and subtraction are done
     as the last step. */

  for (var i = string.length - 1; i >= 0; i--) {
    if (string[i] === '+') {
      return operateRecursive(string, i, '+');
    }
    else if (string[i] === '-') {
      return operateRecursive(string, i, '-');
    }
  }

  // if no +/- operators are found, check for multiplication or division
  for (var i = string.length - 1; i >= 0; i--) {
    if (string[i] === '*') {
      return operateRecursive(string, i, '*');
    }
    else if (string[i] === '/') {
      return operateRecursive(string, i, '/');
    }
  }

  // if no operators are found, this must be a number, so return it
  return string;
}



function operateRecursive (string, i, op) {
  // 1. split the expression into left and right parts around position i
  // 2. evaluate each part recursively
  // 3. coerce each part into a number
  // 4. using the op parameter, perform the appropriate operation
  var left = evaluate(string.slice(0, i));
  var right = evaluate(string.slice(i + 1));

  left = Number(left);
  right = Number(right);

  switch (op) {
    case '+':
      return left + right;
    case '-':
      return left - right;
    case '*':
      return left * right;
    case '/':
      return left / right;
  }
}

console.log(evaluate("3-3-5*10+100/2"));
