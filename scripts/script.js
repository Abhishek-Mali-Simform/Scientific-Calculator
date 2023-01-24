var acc = 0;

function matchValue(val, match) {
    if (val == match) {
        return true;
    }
    return false;
}

function checkClr(val) {
    let variable;
    if (matchValue(val.charAt(val.length - 2), "M")) {
        return false;
    }
    if (matchValue(val.charAt(val.length - 1), "C")) {
        if (matchValue(val.charAt(val.length - 2), "A")) {
            variable = "";
        } else {
            val = document.getElementById("display").value;
            if (!matchValue(val.search("NaN"), -1)) {
                variable = "";
            } else if (matchValue(val.charAt(val.length - 1), " ")) {
                variable = val.substring(0, val.length - 3);
            }
            else {
                variable = val.substring(0, val.length - 1);
            }
        }
        document.getElementById("display").value = variable;
        return true;
    }
    return false;
}

function checkOp(val) {
    if (matchValue(val, "+") || matchValue(val, "-") || matchValue(val, "x") || matchValue(val, "/")) {
        return true;
    }
    return false;
}

function flagSign(val) {
    let secLast = val.charAt(val.length - 3);
    let last = val.charAt(val.length - 1);
    if (checkOp(secLast) && checkOp(last)) {
        return false;
    }
    if (matchValue(last, "=") || (matchValue(val.charAt(val.length - 2), "!") && matchValue(last, "!")) || (matchValue(val.charAt(val.length - 2), "√") && matchValue(last, "√"))) {
        return false;
    }
    return true;
}

function checkabs(val) {
    let secLast = val.charAt(val.length - 2);
    let last = val.charAt(val.length - 1);
    if (checkOp(last) && matchValue(secLast, "|")) {
        return true;
    }
    return false;
}

function check2symbol(val, symb) {
    let secLast = val.charAt(val.length - 2);
    let last = val.charAt(val.length - 1);
    if (matchValue(secLast, symb) && matchValue(last, symb)) {
        return true;
    }
    return false;
}

function syntax10(val) {
    let secLast = val.charAt(val.length - 5);
    let last = val.substring(val.length - 4, val.length);
    if (matchValue(last, "10 ͯ") && (matchValue(secLast, " ") || matchValue(secLast, ""))) {
        return true;
    }
    return false;
}

function checkLog(val,symb){
    let secLast = val.substring(val.length - 5, val.length-2);
    let last = val.charAt(val.length - 1);
    console.log(secLast);
    console.log(last);
    if (matchValue(last, "(") && (matchValue(secLast, " ") || matchValue(secLast, symb))) {
        return true;
    }
    return false;
}

function checkLn(val,symb){
    let secLast = val.substring(val.length - 4, val.length-2);
    let last = val.charAt(val.length - 1);
    console.log(secLast);
    console.log(last);
    if (matchValue(last, "(") && (matchValue(secLast, " ") || matchValue(secLast, symb))) {
        return true;
    }
    return false;
}

function changeSign(val) {
    let a = val.split(" ");
    let last = a.pop();
    last = last.substring(0, last.length - 1);
    if (matchValue(a.length, 0)) {
        if (matchValue(last.charAt(0), '-')) {
            return Math.abs(parseFloat(last));
        } else {
            return parseFloat("-" + last);
        }
    } else {
        let secLast = a.pop();
        if (matchValue(secLast, "+")) {
            return "- " + last;
        } else if (matchValue(secLast, "-")) {
            return "+ " + last;
        }
    }
}

function checkPreced(preced1, preced2) {
    if (matchValue(preced2, "(") || matchValue(preced2, ")")) {
        return false;
    }
    if (matchValue(preced1, "%")) {
        return false;
    }
    else if ((matchValue(preced1, "x") || matchValue(preced1, "/")) && (matchValue(preced1, "+") || matchValue(preced1, "-"))) {
        return false;
    }
    else {
        return true;
    }
}

function doCalc(op, val1, val2) {
    switch (op) {
        case '+':
            {
                return parseFloat(val1 + val2);
            }
        case '-':
            {
                return parseFloat(val2 - val1);
            }
        case 'x':
            {
                return parseFloat(val1 * val2);
            }
        case '/':
            {
                if (matchValue(val2, "=")) {
                    alert("Error:Number not divide by zero");
                }
                return parseFloat(val2 / val1);
            }
        case '%':
            {
                return parseInt(val2 % val1);
            }
        case 'e':
            {
                return Math.exp(val1);
            }
        default:
            {
                return val1;
            }
    }
    return 0;
}
function dofact(val) {
    let a = 1;
    for (let i = 2; i <= val; i++) {
        a *= i;
    }
    return a;
}

function evaluate(exp) {
    let tokens = exp.split(" ");
    let values = [];
    let ops = [];
    for (let i = 0; i < tokens.length; i++) {
        if (matchValue(tokens[i], " ")) {
            continue;
        }
        if (matchValue(tokens[i], "π")) {
            values.push(Math.PI);
        }
        else if (matchValue(tokens[i].charAt(tokens[i].length - 1), "π")) {
            let a = parseFloat(tokens[i].split("π"));
            values.push(doCalc('x', a, Math.PI));
        }
        else if (matchValue(tokens[i], "e")) {
            values.push(Math.E);
        }
        else if (matchValue(tokens[i].charAt(tokens[i].length - 1), "e")) {
            let a = parseFloat(tokens[i].split("e"));
            values.push(doCalc('x', a, Math.E));
        }
        else if (matchValue(tokens[i].charAt(0), "√")) {
            let a = parseFloat(tokens[i].split("√")[1]);
            values.push(parseFloat(Math.sqrt(a)));
        }
        else if (matchValue(tokens[i], "mod")) {
            ops.push('%');
        }
        else if (matchValue(tokens[i], "log")) {
            let a;
            if(matchValue(tokens[i+1],"(")){
                i++;
                let tempToken = "";
                while(tokens[i] != ")"){
                    tempToken += tokens[i++]+" "; 
                    console.log(tempToken);
                }
                a = parseFloat(evaluate(tempToken));
                console.log(a);
            }else{
                a = parseFloat(tokens[++i]);
            }
            values.push(Math.log(a) / Math.log(10));
        }
        else if (matchValue(tokens[i], "ln")) {
            let a;
            if(matchValue(tokens[i+1],"(")){
                i++;
                let tempToken = "";
                while(tokens[i] != ")"){
                    tempToken += tokens[i++]+" "; 
                    console.log(tempToken);
                }
                a = parseFloat(evaluate(tempToken));
                console.log(a);
            }else{
                a = parseFloat(tokens[++i]);
            }
            values.push(Math.log(a));
        }
        else if (!matchValue(tokens[i].indexOf("^"), -1)) {
            let a = tokens[i].split('^');
            values.push(Math.pow(a[0], a[1]));
        }
        else if (matchValue(tokens[i].charAt(tokens[i].length - 1), "!")) {
            let a = parseFloat(tokens[i].split("!"));
            values.push(dofact(a));
        }
        else if (matchValue(tokens[i], "exp")) {
            ops.push('e');
        }
        else if (matchValue(tokens[i].charAt(0), "|")) {
            let a = tokens[i].split("|");
            let b = [];
            for (let j = 0; j < a.length; j++) {
                if (matchValue(a[j], "")) {
                    continue;
                }
                b.push(parseFloat(a[j]));
            }
            values.push(Math.abs(b));
        }
        else if (!isNaN(parseFloat(tokens[i])) && isFinite(tokens[i])) {
            let valBuff = "";
            while (i < tokens.length && !isNaN(parseFloat(tokens[i])) && isFinite(tokens[i])) {
                valBuff += tokens[i++];
            }
            values.push(parseFloat(valBuff));
            i--;
        }
        else if (matchValue(tokens[i], "(")) {
            ops.push(tokens[i]);
        }
        else if (matchValue(tokens[i], ")")) {
            while (!matchValue(ops[ops.length - 1], "(")) {
                values.push(doCalc(ops.pop(), values.pop(), values.pop()));
            }
            ops.pop();
        }
        else if (checkOp(tokens[i])) {
            while (ops.length > 0 && checkPreced(tokens[i], ops[ops.length - 1])) {
                values.push(doCalc(ops.pop(), values.pop(), values.pop()));
            }
            ops.push(tokens[i]);
        }
    }
    while (ops.length > 0) {
        let sn = ops.pop();
        let a;
        let b;
        if (!matchValue(sn, 'e')) {
            a = values.pop();
            b = values.pop();
            if (b === undefined) {
                b = parseFloat(0);
            }
        } else {
            a = values.pop();
            b = parseFloat(0);
        }


        values.push(doCalc(sn, a, b));
    }
    return values.pop();
}


function displaySize(val){
    let len = val.length;
        console.log(len);
        if(len >=16){
            document.getElementById("display").style.fontSize="1rem";
        }
        else if(len >= 9){
            document.getElementById("display").style.fontSize="1.75rem";
        }else{
            document.getElementById("display").style.fontSize="2.75rem";
        }
}

function calculate(btnValue) {
    let temp = btnValue.value;
    displaySize(document.getElementById("display").value);
    let check = document.getElementById("display").value + temp;
    let final = "";
    if (!checkClr(btnValue.value) && flagSign(check)) {
        if (checkOp(temp) || matchValue(temp, "(") || matchValue(temp, ")") || matchValue(temp, "mod") || matchValue(temp, "log") || matchValue(temp, "ln")) {
            if (!checkabs(check) && !checkLog(check,"log")  && !checkLn(check,"ln")) {
                final = " " + temp + " ";
            } else {
                final = temp;
                if(checkLog(check,"log") || checkLn(check,"ln")){
                    final += " "; 
                }
            }
        }
        else if (check2symbol(check, "π")) {
            final = " x π";
        }
        else if (check2symbol(check, "e")) {
            final = " x e";
        }
        else if (matchValue(temp, "x²")) {
            final = "^2";
        }
        else if (matchValue(temp, "xʸ")) {
            final = "^";
        }
        else if (matchValue(temp, "10 ͯ")) {
            if (syntax10(check)) {
                final = "10^";
            } else {
                final = " x 10^"
            }
        }
        else if (matchValue(temp, "¹/x")) {
            final = "1 / ( ";
        }
        else if (matchValue(temp, "exp")) {
            final = temp + " ( ";
        }
        else if (matchValue(temp, "|x|")) {
            final = "|";
        }
        else if (matchValue(temp, "±")) {
            let var1 = document.getElementById("display").value;
            document.getElementById("display").value = var1.substring(0, var1.length - 3);
            final = changeSign(check);
        } else if (matchValue(temp, "M + ")) {
            final = acc + " + ";
        }
        else if (matchValue(temp, "M - ")) {
            final = acc + " - ";
        }
        else {
            final = temp;
        }
        document.getElementById("display").value += final;
    }
    if (matchValue(temp, "=")) {
        let calValue = 0;
        let token = document.getElementById("display").value;
        calValue = evaluate(token);
        document.getElementById("display").value = calValue;
        displaySize(document.getElementById("display").value);
    }
}

function memory(btnValue) {
    let temp = btnValue.value;
    if (matchValue(temp, "MC")) {
        acc = 0;
        document.getElementById("mc").disabled = true;
        document.getElementById("mr").disabled = true;
    } else if (matchValue(temp, "MS")) {
        let var1 = document.getElementById("display").value;
        if (!(matchValue(var1 , "")|| matchValue(var1,0))) {
            let tvar1 = var1.split(" ");
            if (matchValue(tvar1.length, 1)) {
                acc = parseFloat(tvar1);
            }
            document.getElementById("mc").disabled = false;
            document.getElementById("mr").disabled = false;
        }
    } else if (matchValue(temp, "MR")) {
        document.getElementById("display").value = acc;
    }
}

function numKey(event) {
    let ascii = (event.which) ? event.which : event.keyCode
    let aVal = String.fromCharCode(ascii);
    if (ascii >= 40 && ascii <= 57){
        if(checkOp(aVal)){
            document.getElementById("display").value += " "+aVal+" ";
            event.preventDefault();
        }
        let tlen = document.getElementById("display").value;
        displaySize(tlen);
        return true;
    } else if(ascii===13){
        let calValue = 0;
        let token = document.getElementById("display").value;
        calValue = evaluate(token);
        document.getElementById("display").value = calValue;
        displaySize(document.getElementById("display").value);
    }
    return false;
}