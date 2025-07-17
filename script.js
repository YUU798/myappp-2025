let balance = 0;
let goal = 0;
let transactions = [];
let lineChart = null;

window.onload = () => {
  const sBal = localStorage.getItem("balance");
  const sGoal = localStorage.getItem("goal");
  const sTx = localStorage.getItem("transactions");
  if (sBal) balance = parseInt(sBal);
  if (sGoal) goal = parseInt(sGoal);
  if (sTx) transactions = JSON.parse(sTx);
  document.getElementById("goalAmount").value = goal;
  updateDisplay();
};

function saveData() {
  localStorage.setItem("balance", balance);
  localStorage.setItem("goal", goal);
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateDisplay() {
  document.getElementById("balance").textContent = balance;
  document.getElementById("goalDisplay").textContent = goal;
  const comment = balance >= goal
    ? "や、やるじゃん・・"
    : "マズい！控えて！";
  document.getElementById("comment").textContent = comment;
}

function setGoal() {
  const v = parseInt(document.getElementById("goalAmount").value);
  if (isNaN(v) || v < 0) return alert("0以上の数値を入力してください");
  goal = v;
  saveData();
  updateDisplay();
}

function addTransaction(type) {
  const amt = parseInt(document.getElementById("amount").value);
  if (isNaN(amt) || amt <= 0) return alert("正の整数を入力してください");
  balance += (type === "入金" ? amt : -amt);
  transactions.push({ type, amount: amt, date: new Date().toISOString() });
  saveData();
  updateDisplay();
}

function showAnalysis() {
  if (transactions.length === 0) {
    document.getElementById("analysis").textContent = "履歴はありません";
    return;
  }

  const hist = transactions.map(t => {
    const d = new Date(t.date);
    return `- ${d.toLocaleString()} ${t.type} ${t.amount}円`;
  }).join("\n");
  document.getElementById("analysis").textContent = hist;

  const monthly = {};
  transactions.forEach(t => {
    const d = new Date(t.date);
    const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    monthly[ym] = (monthly[ym] || 0) + (t.type === "入金" ? t.amount : -t.amount);
  });

  const labels = [];
  const data = [];
  let running = 0;
  Object.keys(monthly).sort().forEach(ym => {
    running += monthly[ym];
    labels.push(ym);
    data.push(running);
  });

  const ctx = document.getElementById("lineChart").getContext("2d");
  if (lineChart) lineChart.destroy();
  lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: '月末残高',
        data,
        borderColor: '#FFF3B8',
        fill: false,
        tension: 0.1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: '#444' },
          grid: { color: '#EC008C' }
        },
        x: {
          ticks: { color: '#444' },
          grid: { color: '#EC008C' }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: '#444'
          }
        }
      },
      animation: false
    }
  });
}

function resetData() {
  if (!confirm("本当にリセットする？")) return;
  balance = 0;
  goal = 0;
  transactions = [];
  saveData();
  updateDisplay();
  document.getElementById("goalAmount").value = "";
  document.getElementById("analysis").textContent = "";
  if (lineChart) {
    lineChart.destroy();
    lineChart = null;
  }
}
