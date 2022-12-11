let inputField = document.querySelector('.inputField'),
    resultField = document.querySelector('.resultField'),
    clear = document.getElementById('clear'),
    clearDigit = document.getElementById('clearDigit'),
    power = document.getElementById('power'),
    divide = document.getElementById('divide'),
    multiply = document.getElementById('multiply'),
    subtract = document.getElementById('subtract'),
    add = document.getElementById('add')
    equal = document.getElementById('equal'),
    one = document.getElementById('one'),
    two = document.getElementById('two'),
    three = document.getElementById('three'),
    four = document.getElementById('four'),
    five = document.getElementById('five'),
    six = document.getElementById('six')
    seven = document.getElementById('seven'),
    eight = document.getElementById('eight'),
    nine = document.getElementById('nine'),
    dot = document.getElementById('dot'),
    zero = document.getElementById('zero'),
    open = document.querySelector('.open'),
    close = document.querySelector('.close');

inputField.textContent = '';
resultField.textContent = '= 0';

clear.addEventListener('click', ()=> {
    inputField.textContent = '';
    resultField.textContent = '= 0';
});

clearDigit.addEventListener('click', ()=> {
    inputField.textContent = inputField.textContent.slice(0, -1);
});

const addItem = (item) => {
    inputField.textContent += item;
}

power.addEventListener('click', ()=> {
    addItem('^');
});

divide.addEventListener('click', ()=> {
    addItem('/');
});

multiply.addEventListener('click', ()=> {
    addItem('*');
});

subtract.addEventListener('click', ()=> {
    addItem('-');
});

add.addEventListener('click', ()=> {
    addItem('+');
});

dot.addEventListener('click', ()=> {
    addItem('.');
});

zero.addEventListener('click', ()=> {
    addItem('0');
});

one.addEventListener('click', ()=> {
    addItem('1');
});

two.addEventListener('click', ()=> {
    addItem('2');
});

three.addEventListener('click', ()=> {
    addItem('3');
});

four.addEventListener('click', ()=> {
    addItem('4');
});

five.addEventListener('click', ()=> {
    addItem('5');
});

six.addEventListener('click', ()=> {
    addItem('6');
});

seven.addEventListener('click', ()=> {
    addItem('7');
});

eight.addEventListener('click', ()=> {
    addItem('8');
});

nine.addEventListener('click', ()=> {
    addItem('9');
});

open.addEventListener('click', ()=> {
    addItem('(');
});

close.addEventListener('click', ()=> {
    addItem(')');
});

let arePair = (c1, c2) => {
    if(c1 === '(' && c2 === ')')
        return true;
    else if(c1 === '[' && c2 === ']')
        return true;
    else if(c1 === '{' && c2 === '}')
        return true;
    else
        return false;
}

let isBalanced = (s) => {
    let stack = [];
    for(let i = 0; i < s.length; i++) {
        if(s[i] === '(' || s[i] === '[' || s[i] === '{') {
            stack.push(s[i]);
            continue;
        }

        if(s[i] === ')' || s[i] === ']' || s[i] === '}') {
            if(stack.length === 0 || !arePair(stack.pop(), s[i])) {
                return false;
            }
        }
    }
    return stack.length === 0;
}

let precedence = (sign) => {
    switch(sign) {
        case '(':
        case ')':
            return 1;
        case '+':
        case '-':
            return 2;
        case '*':
        case '/':
            return 3;
        case '^':
            return 4;
    }
    return -1;
}

let isOperator = (sign) => {
    return ['+', '-', '*', '/', '^'].includes(sign);
}

let postfixConvert = (expression) => {
    let stack = [], len = expression.length, res = "";

    for(let i = 0; i < len; i++) {

        let numberFlag = false;
        while(i < len && !isNaN(expression[i])) {
            res += expression[i++];
            numberFlag = true;
        }

        if(numberFlag) {
            res += ' ';
        }

        if(expression[i] === ')') {
            while(stack[stack.length-1] !== '(') {
                res += stack.pop() + ' ';
            }
            stack.pop();
        } else if(expression[i] === '(') {
            stack.push(expression[i]);
        } else {
            while(stack.length > 0 && precedence(expression[i]) <= precedence(stack[stack.length-1])) {
                res += stack.pop() + ' ';
            }
            stack.push(expression[i]);
        }
    }

    while(stack.length > 0) {
        res += stack.pop() + ' ';
    }
    res = res.split(' ');
    return res.filter(item => item !== '');
}

let calculate = (n1, n2, operation) => {
    n1 = parseFloat(n1), n2 = parseFloat(n2);
    switch(operation) {
        case '+':
            return n2+n1;
        case '-':
            return n2-n1;
        case '*':
            return n1*n2;
        case '/':
            return n2/n1;
        case '^':
            return Math.pow(n2, n1);
    }
    return 0;
}

let evaluation = (expression) => {

    // Remove any whitespaces.
    expression = expression.replace(/\s/g, '');
    if(expression.length > 0 && (expression[0] !== '(' || expression[expression.length-1] !== ')')) {
        if(isOperator(expression[expression.length-1])) {
            return null;
        }
        expression = '(' + expression + ')';
    }

    // Check if the given expression is valid.
    if(!isBalanced(expression)) {
        return null;
    }

    let expArray = postfixConvert(expression),
        stack = [];
    for(let i = 0; i < expArray.length; i++) {
        let current = expArray[i];

        // check if variable is operator or oprand
        if(isNaN(current)) {
            let num1 = stack.pop();
            let num2 = stack.pop();
            stack.push(calculate(num1, num2, current));
        } else {
            stack.push(current);
        }
    }
    return stack.length === 1? stack.pop(): null;
}

equal.addEventListener('click', ()=> {
    let expression = inputField.textContent;
    let eval = evaluation(expression);
    if(eval === null) {
        alert('invalid expression.');
    }
    else if(isNaN(eval)) {
        alert('invalid expression.');
    } else {
        resultField.textContent = '= ' + eval;
    }
});