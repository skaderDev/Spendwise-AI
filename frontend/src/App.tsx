import { useState } from "react";
import FileUpload, { type Transaction } from "./components/FileUpload";

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const categorize = (description: string): string => {
    const desc = description.toLowerCase();
    if (desc.includes("starbucks") || desc.includes("mcdonald")) {
      return "Dining";
    }
    if (desc.includes("walmart")) {
      return "Groceries";
    }
    if (desc.includes("netflix")) {
      return "Entertainment";
    }
    if (desc.includes("uber")) {
      return "Transport";
    }
    return "Other";
  };

  const totals = transactions.reduce((acc, tx) => {
    const category = tx.Category || "Other";
    const amount = parseFloat(tx.Amount);
    if (!isNaN(amount)) {
      acc[category] = (acc[category] || 0) + amount;
    }
    return acc;
  }, {} as Record<string, number>);

  const totalSpending = Object.values(totals).reduce((sum, amt) => sum + amt, 0);


  const handleParsedData = (data: Transaction[]) => {
    const categorized = data.map((tx) => ({
      ...tx,
      Category: categorize(tx.Description),
    }));
    setTransactions(categorized);
  };

  const thStyle = {
    border: "1px solid #ccc",
    padding: "8px",
    backgroundColor: "#5b5b5bff",
    textAlign: "left" as const,
  };

  const tdStyle = {
    border: "1px solid #ccc",
    padding: "8px",
  };




  return (
    <div style={{ padding: "1rem" }}>
      <h1>SpendWise AI</h1>
      <FileUpload onParse={handleParsedData} />
      <h2>Parsed Transactions:</h2>
      {transactions.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Spending Summary</h2>
          <p><strong>Total Spending:</strong> ${totalSpending.toFixed(2)}</p>
          <ul>
            {Object.entries(totals).map(([cat, amt]) => (
              // sourcery skip: binary-operator-identity
              <li key={cat}>
                {cat}: ${amt.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {transactions.length > 0 && (
        <table style={{ borderCollapse: "collapse", width: "100%", marginTop: "1rem" }}>
          <thead>
            <tr>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Category</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, idx) => (
              <tr key={idx}>
                <td style={tdStyle}>{tx.Date}</td>
                <td style={tdStyle}>{tx.Description}</td>
                <td style={tdStyle}>${parseFloat(tx.Amount).toFixed(2)}</td>
                <td style={tdStyle}>{tx.Category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}

export default App;
