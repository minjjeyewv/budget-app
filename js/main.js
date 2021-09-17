let startBtn = document.getElementById('start');
let yearInput = document.getElementsByClassName('year-value')[0];
let monthInput = document.getElementsByClassName('month-value')[0];
let dayInput = document.getElementsByClassName('day-value')[0];
let expensesInput = document.getElementsByClassName('expenses-item');
let btns = document.getElementsByTagName('button');
let btnApproveOne = btns[0];
let btnApproveTwo = btns[1];
let btnCalculate = btns[2];
let notExpensesInput = document.querySelectorAll('.optionalexpenses-item');
let possibleIncome = document.querySelector('.choose-income');
let checkboxSavings = document.querySelector('.checksavings');
let sum = document.querySelector('.choose-sum');
let percent = document.querySelector('.choose-percent');
let budgetValue = document.getElementsByClassName("budget-value")[0];
let expensesValue = document.getElementsByClassName('expenses-value')[0];
let optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0];
let daybudgetValue = document.getElementsByClassName('daybudget-value')[0];
let levelValue = document.getElementsByClassName('level-value')[0];
let incomeValue = document.getElementsByClassName('income-value')[0];
let monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0];
let yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0];
let money, time; // Получаем объекты со страницы

startBtn.addEventListener('click', function(){
    time = prompt("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt("Ваш бюджет на месяц", ""); 
    yearInput.value = new Date(Date.parse(time)).getFullYear();
    monthInput.value = new Date(Date.parse(time)).getMonth() + 1;
    dayInput.value = new Date(Date.parse(time)).getDate();
    while (dayInput.value == 'NaN' || monthInput.value == 'NaN' || yearInput.value == 'NaN' || time == undefined){
        time = prompt("Введите дату в формате YYYY-MM-DD", "");
        yearInput.value = new Date(Date.parse(time)).getFullYear();
        monthInput.value = new Date(Date.parse(time)).getMonth() + 1;
        dayInput.value = new Date(Date.parse(time)).getDate();
    }    
    while (isNaN(money) || money == '' || money == null || money<=0) {
        money = +prompt("Ваш бюджет на месяц", "");
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
});   // функция для начала расчёта бюджета и даты
btnApproveOne.addEventListener('click', function(){
    let sum = 0;
    for (let i = 0; i < expensesInput.length; i++) {
        question1 = expensesInput[i].value;
        question2 = expensesInput[++i].value;
        if (typeof (question1) === 'string' && question1 != null && question2 != null && question1 != '' && question2 != '' && question1.length < 50 && appData.budget >= sum + +question2) {
            appData.expenses[question1] = question2; // проверяем на коректность ввода данных 
            sum += +question2;
        }
        else {
            i -= 1;     // если условие не выполнилось отнимаем единицу от счетчика и повторяем цикл ещё раз 
        }
    };
    expensesValue.textContent = sum;
});   // Функция для подсчёта обязательных расходов
btnApproveTwo.addEventListener('click', function(){
    for (let i = 0; i < notExpensesInput.length ; i++) {
        let opt = +notExpensesInput[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    } // Записываем необязательные расходы в объект optionalExpenses

});  // необязательные расходы
btnCalculate.addEventListener('click', function(){
    if (appData.budget != undefined){
    appData.moneyPerDay = (appData.budget / 30).toFixed();
    daybudgetValue.textContent = appData.moneyPerDay;
    if (appData.moneyPerDay < 150) {
        levelValue.textContent = "Низкий уровень достатка";
    }
    else if (appData.moneyPerDay > 150 && appData.moneyPerDay < 1500) {
        levelValue.textContent = "Средний уровень достатка";
    }
    else if (appData.moneyPerDay > 1500) {
        levelValue.textContent = "Высокий уровень достатка";
    }
    else {
        levelValue.textContent = "Произошла ошибка!";
    }
    }
    else {
        daybudgetValue.textContent = 'Произошла ошибка!';
    }
    // Проверяем уровень достатка используя условие If и логический оператор &&(и)
}); // функция для расчёта уровня достатка
possibleIncome.addEventListener('input', function(){
    let items = possibleIncome.value;
    appData.income = items.split(', ');   // разибите строки в массив
    incomeValue.textContent = appData.income;
}) // записываем способы дополнительного зароботка
checkboxSavings.addEventListener('click', function(){
    if (appData.savings === true){
        appData.savings = false;
    }
    else appData.savings = true;
}); // проверяем в каком состоянии находится чекбокс и меняем его при клике
sum.addEventListener('input', function(){
    if (appData.savings === true){
        let sum2 = +sum.value;
        sumPercent = +percent.value;
        appData.monthIncome = sum2 / 100 / 12 * sumPercent;
        appData.yearIncome = sum2 / 100  * sumPercent;
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
}); // подсчёт суммы дополнительного зароботка
percent.addEventListener('input', function(){
    if (appData.savings === true){
        let sum2 = +sum.value;
        sumPercent = +percent.value;
        appData.monthIncome = sum2 / 100 / 12 * sumPercent;
        appData.yearIncome = sum2 / 100  * sumPercent;
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
}); // подсчёт процентов дополнителного зароботка

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
}
    

