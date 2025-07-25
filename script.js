const balance = document.getElementById(
    "balance"
  );
  const money_plus = document.getElementById(
    "money-plus"
  );
  const money_minus = document.getElementById(
    "money-minus"
  );
  const list = document.getElementById(
    "list" 
  );
  const form = document.getElementById(
    "form"
  );
  const text = document.getElementById(
    "text"
  );
  const amount = document.getElementById(
    "amount"
  );
  
  //last 
  const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
  
  let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];
  
  //5
  //Add Transaction
  function addTransaction(e){
    e.preventDefault();
    if(text.value.trim() === '' || amount.value.trim() === ''){
      alert('Please add text and amount')
    }else{
      const transaction = {
        id:generateID(),
        text:text.value,
        amount:+amount.value
      }
  
      transactions.push(transaction);
  
      addTransactionDOM(transaction);
      updateValues();
      updateLocalStorage();
      text.value='';
      amount.value='';
    }
  }
  
  
  //5.5
  //Generate Random ID
  function generateID(){
    return Math.floor(Math.random()*1000000000);
  }
  
  //2
  
  //Add Trasactions to DOM list
  function addTransactionDOM(transaction) {
    //GET sign
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");
  
    //Add Class Based on Value
    item.classList.add(
      transaction.amount < 0 ? "minus" : "plus"
    );
  
    item.innerHTML = `
      ${transaction.text} <span>
      ${sign}${Math.abs(transaction.amount)}
      </span>
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
      `;
    list.appendChild(item);
  }
  
  //4
  
  //Update the balance income and expence
  /*
  function updateValues() {
    const amounts = transactions.map(
      (transaction) => transaction.amount
    );
    const total = amounts
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);
  
    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);
  
    const expense =
      (amounts
        .filter((item) => item < 0)
        .reduce((acc, item) => (acc += item), 0) *
      -1).toFixed(2);
  
      balance.innerText= `₹${total}`;
      money_plus.innerText = `₹${income}`;
      money_minus.innerText = `₹${expense}`;
  }
  */
  function animateValue(element, newValue) {
    let current = Number(element.innerText.replace('₹', '')) || 0;
    let step = (newValue - current) / 20;
    let count = 0;
  
    const interval = setInterval(() => {
      current += step;
      count++;
      element.innerText = `₹${current.toFixed(2)}`;
  
      if (count === 20) {
        element.innerText = `₹${newValue.toFixed(2)}`;
        clearInterval(interval);
      }
    }, 40);
  }
  
  function updateValues() {
    const amounts = transactions.map((t) => t.amount);
  
    const total = amounts.reduce((acc, item) => acc + item, 0);
    const income = amounts.filter((item) => item > 0).reduce((acc, item) => acc + item, 0);
    const expense = amounts.filter((item) => item < 0).reduce((acc, item) => acc + item, 0) * -1;
  
    animateValue(balance, total);
    animateValue(money_plus, income);
    animateValue(money_minus, expense);
  }
  //6 
  
  //Remove Transaction by ID
  function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    Init();
  }
  //last
  //update Local Storage Transaction
  function updateLocalStorage(){
    localStorage.setItem('transactions',JSON.stringify(transactions));
  }
  
  //3
  
  //Init App
  function Init() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
  }
  
  Init();
  
  form.addEventListener('submit',addTransaction);
