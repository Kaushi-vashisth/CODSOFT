
document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    
    let Recent = '';
    let operator = null;
    let initialInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');

            if (value === 'C') {
                Recent = '';
                initialInput = '';
                operator = null;
                display.textContent = '0';
            } else if (value === '=') {
                if (Recent !== '' && initialInput !== '' && operator) {
                    Recent = evaluate(initialInput, Recent, operator);
                    display.textContent = Recent;
                    initialInput = '';
                    operator = null;
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (Recent !== '') {
                    if (initialInput !== '') {
                        Recent = evaluate(initialInput, Recent, operator);
                    }
                    operator = value;
                    initialInput = Recent;
                    Recent = '';
                }
            } else {
                Recent += value;
                display.textContent = Recent;
            }
        });
    });

    function evaluate(num1, num2, operator) {
        const n1 = parseFloat(num1);
        const n2 = parseFloat(num2);
        if (operator === '+') return (n1 + n2).toString();
        if (operator === '-') return (n1 - n2).toString();
        if (operator === '*') return (n1 * n2).toString();
        if (operator === '/') return (n1 / n2).toString();
        return '';
    }
});
