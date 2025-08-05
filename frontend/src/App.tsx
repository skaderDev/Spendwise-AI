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

  const handleParsedData = (data: Transaction[]) => {
    const categorized = data.map((tx) => ({
      ...tx,
      Category: categorize(tx.Description),
    }));
    setTransactions(categorized);
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl text-blue-500 font-bold">SpendWise AI</h1>


      <FileUpload onParse={handleParsedData} />

      {transactions.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Spending Summary</h2>
          <p className="mb-2 font-medium">
            Total Spending: <span className="text-green-600">${totalSpending.toFixed(2)}</span>
          </p>
          <ul className="list-disc list-inside mb-4">
            {Object.entries(totals).map(([cat, amt]) => (
              <li key={cat}>
                {cat}: ${amt.toFixed(2)}
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold mb-2">Parsed Transactions</h2>
          <table className="table-auto border-collapse w-full mt-2 text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2 text-left">Date</th>
                <th className="border px-4 py-2 text-left">Description</th>
                <th className="border px-4 py-2 text-left">Amount</th>
                <th className="border px-4 py-2 text-left">Category</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{tx.Date}</td>
                  <td className="border px-4 py-2">{tx.Description}</td>
                  <td className="border px-4 py-2">${parseFloat(tx.Amount).toFixed(2)}</td>
                  <td className="border px-4 py-2">{tx.Category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
