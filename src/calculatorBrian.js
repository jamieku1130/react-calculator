// Model: CalculatorBrian

const Calc = {};
  (function() {
    var accumulate = 0;
    var operations = {
        '+':{
            mode: 'binary',
            priority: 'low',
            expression: function (op1,op2) {
                return op1 + op2;
            }
        },
        '-':{
            mode: 'binary',
            priority: 'low',
            expression: function (op1,op2) {
                return op1 - op2;
            }
        },
        '×':{
            mode: 'binary',
            priority: 'high',
            expression: function (op1,op2) {
                return op1 * op2;
            }
        },
        "÷":{
            mode: 'binary',
            priority: 'high',
            expression: function (op1,op2) {
                return op1 / op2;
            }
        },
        percentage:{
            mode: 'unary',
            expression:function (op1) {
                return op1/100;
            }
        },
        sign:{
            mode: 'unary',
            expression:function (op1) {
                return -(op1);
            }
        },
        '=':{
            mode: 'equal'
        },
        ac:{
            mode: 'clear'
        }
    };

    var lowPriorityPendingOperand = {
        firstOperand:null,
        pendedOperator:null
    };

    var highPriorityPendingOperand = {
        firstOperand:null,
        pendedOperator:null
    };

    function execute(operator) {
        if (operator.pendedOperator === null) {return}
        accumulate = operator.pendedOperator(operator.firstOperand,accumulate);
        operator.firstOperand = null;
        operator.pendedOperator = null;
    }

    function CalculatorBrian() {}

    CalculatorBrian.prototype.setOperand = function (operand) {
        accumulate = operand;
    };

    CalculatorBrian.prototype.result = function () {
        return accumulate;
    };

    CalculatorBrian.prototype.performOperator = function (symbol) {

        var operator = operations[symbol];
        switch (operator.mode){
            case 'unary':
                execute(highPriorityPendingOperand);
                execute(lowPriorityPendingOperand);
                accumulate = operator.expression(accumulate);
                break;
            case 'binary':
                if (operator.priority === 'high'){
                    if (highPriorityPendingOperand.firstOperand !== null) {
                        execute(highPriorityPendingOperand);
                        pickUpPriorityOP(highPriorityPendingOperand,operator.expression);
                    }else {
                        pickUpPriorityOP(highPriorityPendingOperand,operator.expression);
                    }
                }else if(operator.priority === 'low'){
                    if (lowPriorityPendingOperand.firstOperand !== null) {
                        execute(highPriorityPendingOperand);
                        execute(lowPriorityPendingOperand);
                        pickUpPriorityOP(lowPriorityPendingOperand,operator.expression);
                    }else {
                        execute(highPriorityPendingOperand);
                        pickUpPriorityOP(lowPriorityPendingOperand,operator.expression);
                    }
                }
                break;
            case 'equal':
                if (highPriorityPendingOperand.pendedOperator){
                    execute(highPriorityPendingOperand);
                    execute(lowPriorityPendingOperand);
                }else if(lowPriorityPendingOperand.pendedOperator){
                    execute(lowPriorityPendingOperand);
                }
                break;
            case 'clear':
                clear();
                break;
            default: return;
        }
    };

    function pickUpPriorityOP(priorityObj,expression){
        priorityObj.firstOperand = accumulate;
        priorityObj.pendedOperator = expression
    }

    function clear(){
        accumulate = 0;
        lowPriorityPendingOperand.pendedOperator = null;
        lowPriorityPendingOperand.firstOperand = null;
        highPriorityPendingOperand.pendedOperator = null;
        highPriorityPendingOperand.firstOperand = null;
    }
    Calc.CalculatorBrian = CalculatorBrian;  
})();

export default Calc

