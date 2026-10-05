// declaring variables by their id to access them in JS
const desc = document.getElementById("description");
const amnt = document.getElementById("amount");
const amountType = document.getElementById("amount-type");

const formSubmit = document.getElementById("form-transactions");

const uList = document.getElementById("unordered-list");

const balanceShow = document.getElementById("balance");
const incomeShow = document.getElementById("income");
const expenseShow = document.getElementById("expense");

const errorMsg = document.getElementById("invalid-msg");

// to store objects information.
const transactions = [];

// calculation
function updateTotals() {
    let incomeTotal = 0;
    let expenseTotal = 0;
    let balanceTotal = 0;

    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].amountType === "income") {
            incomeTotal = incomeTotal + transactions[i].amnt;
        }
        else {
            expenseTotal = expenseTotal + transactions[i].amnt;
        }
    }
    
        balanceTotal = incomeTotal - expenseTotal;

        incomeShow.textContent = "₹" + incomeTotal;
        expenseShow.textContent = "₹" + expenseTotal;
        balanceShow.textContent = "₹" + balanceTotal;
}

// re-render 
function renderTransactions() {
    uList.innerHTML = "";

    for (let i = 0; i < transactions.length; i++) {
        const li = document.createElement("li");
        li.textContent = transactions[i].description + "  ";
        li.textContent += " - ₹" + transactions[i].amnt + "  ";
        li.textContent += " - " + transactions[i].amountType + "  ";

        li.classList.add("li-transactions");

        // delete button
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        li.appendChild(delBtn);

        delBtn.classList.add("li-delBtn");

        delBtn.addEventListener("click", function () {
            transactions.splice(i, 1);
            renderTransactions();
            updateTotals();
        });

        uList.appendChild(li);
    }
}

// initializing main logic and event listener
formSubmit.addEventListener("submit", function (event) {

    event.preventDefault();

    const descriptionValue = desc.value.trim();
    const amntValue = Number(amnt.value);
    const amountTypeValue = amountType.value;

    if (descriptionValue === "") {
        errorMsg.textContent = "Description is required";
        return;
    }

    if (amntValue <= 0) {
        errorMsg.textContent = "Valid amount is required";
        return;
    }

    errorMsg.textContent = "";

    const transaction = {
        description: descriptionValue,
        amnt: amntValue,
        amountType: amountTypeValue
    };

    transactions.push(transaction);
    renderTransactions();
    updateTotals();

    formSubmit.reset();
});
