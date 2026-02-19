let display = document.getElementById('display');
let history = document.getElementById('history');
let currentMode = 'basic';
let lastResult = null;      // Stocke le dernier résultat pour le bouton ANS

// Mode basique ou scientifique
function setMode(mode) {
    currentMode = mode;
    document.getElementById('scientificPanel').style.display = 
        mode === 'scientific' ? 'block' : 'none';
    
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Ajouter un nombre
function appendNumber(number) {
    if (number === '.') {
        let lastChar = display.value.slice(-1);
        if (lastChar === '.') return;
        
        let currentNumber = display.value.split(/[\+\-\*\/\^]/).pop();
        if (currentNumber.includes('.')) return;
    }
    
    display.value += number;
}

// Ajouter un opérateur
function appendOperator(op) {
    let lastChar = display.value.slice(-1);
    
    if (display.value === '' && op !== '-') {
        return;
    }
    
    if (['+', '-', '*', '/', '^'].includes(lastChar)) {
        display.value = display.value.slice(0, -1) + op;
    } else {
        display.value += op;
    }
}

// Ajouter une fonction mathématique
function appendFunction(func) {
    switch(func) {
        case 'sqrt':
            display.value += 'sqrt(';
            break;
        case 'cbrt':
            display.value += 'cbrt(';
            break;
        case 'sin':
            display.value += 'sin(';
            break;
        case 'cos':
            display.value += 'cos(';
            break;
        case 'tan':
            display.value += 'tan(';
            break;
        case 'asin':
            display.value += 'asin(';
            break;
        case 'acos':
            display.value += 'acos(';
            break;
        case 'atan':
            display.value += 'atan(';
            break;
        case 'log':
            display.value += 'ln(';
            break;
        case 'log10':
            display.value += 'log(';
            break;
        case 'exp':
            display.value += 'exp(';
            break;
        case 'abs':
            display.value += 'abs(';
            break;
        case 'pow':
            display.value += '^';
            break;
    }
}

// Ajouter une constante
function appendConstant(constant) {
    if (constant === 'pi') {
        display.value += Math.PI;
    } else if (constant === 'e') {
        display.value += Math.E;
    }
}

// Changer le signe
function toggleSign() {
    if (display.value) {
        if (display.value.startsWith('-')) {
            display.value = display.value.substring(1);
        } else {
            display.value = '-' + display.value;
        }
    }
}

// Pourcentage
function percentage() {
    if (display.value) {
        display.value = display.value + '/100';
    }
}

// Factorielle
function factorial() {
    if (display.value) {
        display.value = display.value + '!';
    }
}

// FONCTION POUR LE BOUTON ANS : Insérer le dernier résultat
function insertLastResult() {
    if (lastResult !== null) {
        display.value += lastResult;
    }
}

// Calcul principal
function calculate() {
    try {
        // Sauvegarder l'opération pour l'historique
        let operation = display.value;
        
        let expression = display.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/\^/g, '**')
            .replace(/ln/g, 'Math.log')
            .replace(/log/g, 'Math.log10')
            .replace(/sqrt/g, 'Math.sqrt')
            .replace(/cbrt/g, 'Math.cbrt')
            .replace(/sin/g, 'Math.sin')
            .replace(/cos/g, 'Math.cos')
            .replace(/tan/g, 'Math.tan')
            .replace(/asin/g, 'Math.asin')
            .replace(/acos/g, 'Math.acos')
            .replace(/atan/g, 'Math.atan')
            .replace(/exp/g, 'Math.exp')
            .replace(/abs/g, 'Math.abs');
        
        // Gestion de la factorielle
        expression = expression.replace(/(\d+)!/g, function(match, number) {
            return 'factorial(' + number + ')';
        });
        
        // Fonction factorielle personnalisée
        window.factorial = function(n) {
            n = parseInt(n);
            if (isNaN(n) || n < 0) return NaN;
            if (n === 0 || n === 1) return 1;
            let result = 1;
            for (let i = 2; i <= n; i++) {
                result *= i;
            }
            return result;
        };
        
        // Ajouter les parenthèses manquantes
        let openParen = (expression.match(/\(/g) || []).length;
        let closeParen = (expression.match(/\)/g) || []).length;
        
        while (openParen > closeParen) {
            expression += ')';
            closeParen++;
        }
        
        let result = eval(expression);
        
        if (isNaN(result) || !isFinite(result)) {
            throw new Error('Résultat invalide');
        }
        
        // Arrondir si nécessaire
        if (Math.abs(result) > 1e12 || (Math.abs(result) < 1e-12 && result !== 0)) {
            result = result.toExponential(10);
        } else {
            result = Math.round(result * 10000000000) / 10000000000;
        }
        
        // Stocker le résultat pour le bouton ANS
        lastResult = result;
        
        // Afficher le résultat
        display.value = result;
        
        // METTRE À JOUR L'HISTORIQUE
        history.textContent = operation + ' = ' + result;
        
    } catch (error) {
        display.value = 'Erreur';
        setTimeout(() => {
            if (display.value === 'Erreur') {
                clearDisplay();
            }
        }, 1500);
    }
}

// Effacer tout
function clearDisplay() {
    display.value = '';
    history.textContent = '';  // Efface aussi l'historique
}

// Effacer l'entrée courante (sans effacer l'historique)
function clearEntry() {
    display.value = '';
}

// Effacer dernier caractère
function backspace() {
    display.value = display.value.slice(0, -1);
}

// Gestion du clavier
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // Chiffres
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    }
    
    // Opérateurs
    if (key === '+') appendOperator('+');
    if (key === '-') appendOperator('-');
    if (key === '*') appendOperator('*');
    if (key === '/') appendOperator('/');
    if (key === '^') appendOperator('^');
    
    // Point décimal
    if (key === '.') appendNumber('.');
    
    // Parenthèses
    if (key === '(') display.value += '(';
    if (key === ')') display.value += ')';
    
    // Entrée ou = pour calculer
    if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    }
    
    // Backspace
    if (key === 'Backspace') {
        backspace();
    }
    
    // Escape ou 'c' pour effacer
    if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    }
    
    // 'Delete' pour clear entry
    if (key === 'Delete') {
        clearEntry();
    }
    
    // Raccourci pour ANS : Ctrl+A
    if (key === 'a' && event.ctrlKey) {
        event.preventDefault();
        insertLastResult();
    }
});