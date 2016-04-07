// keeps track of parentheses for bracket matching
var bracketStack = [];

function startParsing (string) {
  var result;

  if (valid(string)) {
    result = evaluate(clean(string));
  }
  else {
    throw new Error('Malformed expression!');
  }

  return result;
}

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

  string = stripBrackets(string);

  for (var i = string.length - 1; i >= 0; i--) {
    if (skipBrackets(string, i)) continue;

    if (string[i] === '+' || string[i] === '-') {
      return operateRecursive(string, i);
    }
  }

  // no +/- operators were found, so check for multiplication or division
  for (var i = string.length - 1; i >= 0; i--) {
    if (skipBrackets(string, i)) continue;

    if (string[i] === '*' || string[i] === '/') {
      return operateRecursive(string, i);
    }
  }

  // if no operators are found, this must be a number, so return it
  return string;
}



function stripBrackets (string) {
  // if this is an expression enclosed by parentheses, strip them off
  if (string[0] === '(' && string[string.length - 1] === ')') {
    string = string.slice(1, -1);
  }

  return string;
}



function valid (string) {
  var valid = true;

  for (var i = 0; i < string.length; i++) {
    if (string[i] === '(') {
      bracketStack.push('(');
    }
    else if (string[i] === ')') {
      if (bracketStack.length > 0) {
        bracketStack.pop();
      }
      else {
        // If this block is reached, it means a closing bracket with no
        // matching opening bracket was found. The expression is invalid.
        valid = false;
      }
    }
  }

  return valid;
}



function clean (string) {
  string = string.replace('-+', '-');
  string = string.replace('+-', '-');
  return string;
}



function skipBrackets (string, i) {
  // When parentheses are found, keep track of brackets and skip iterations
  // until all matching brackets are reached.
  if (string[i] === ')') {
    bracketStack.push(')');
  }
  else if (string[i] === '(') {
    if (bracketStack.length) {
      bracketStack.pop();
    }
    else {
      // If this block is reached, it means an opening bracket with no
      // matching closing bracket was found. Throw an error.
      throw new Error('Malformed expression!');
    }
  }

  // if bracketStack is not empty, skip iteration
  return bracketStack.length ? true : false;
}



function operateRecursive (string, i) {
  // 0. get the operation from string[i] and store it in 'op'
  // 1. split the expression into left and right parts around position i
  // 2. evaluate each part recursively
  // 3. coerce each part into a number
  // 4. perform the operation on the operands
  var op = string[i];
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

var expression = "200*3-(3*(5+5))-2/3";
console.log('mine:', startParsing(expression));
console.log('eval:', eval(expression));
