import React from "react";
import dayjs from "dayjs";

const calculateStatistics = (transactions: any[]) => {
  if (transactions.length === 0) return {};

  const totalValue = transactions.reduce((acc, txn) => acc + txn.amount, 0);
  const totalTransactions = transactions.length;
  const averageValue = totalValue / totalTransactions;

  const maxTransaction = Math.max(...transactions.map((txn) => txn.amount));
  const minTransaction = Math.min(...transactions.map((txn) => txn.amount));

  const sortedTransactions = transactions
    .map((txn) => txn.amount)
    .sort((a, b) => a - b);
  const medianTransaction =
    sortedTransactions.length % 2 === 0
      ? (sortedTransactions[sortedTransactions.length / 2 - 1] +
          sortedTransactions[sortedTransactions.length / 2]) /
        2
      : sortedTransactions[Math.floor(sortedTransactions.length / 2)];

  const variance =
    transactions.reduce((acc, txn) => acc + Math.pow(txn.amount - averageValue, 2), 0) /
    totalTransactions;
  const standardDeviation = Math.sqrt(variance);

  const typeBreakdown = transactions.reduce(
    (acc, txn) => {
      if (txn.type === "EXPENSE") acc.expenses += txn.amount;
      else acc.income += txn.amount;
      return acc;
    },
    { expenses: 0, income: 0 }
  );

  return {
    totalValue,
    totalTransactions,
    averageValue,
    maxTransaction,
    minTransaction,
    medianTransaction,
    standardDeviation,
    typeBreakdown,
  };
};

const CategorySummary = ({ transactions }: { transactions: any[] }) => {
  const stats = calculateStatistics(transactions);

  return (
    <div>
      <p>
        <strong>Total Transactions:</strong> {stats.totalTransactions}
      </p>
      <p>
        <strong>Total Value:</strong> ${stats.totalValue?.toFixed(2)}
      </p>
      <p>
        <strong>Average Transaction:</strong> ${stats.averageValue?.toFixed(2)}
      </p>
      <p>
        <strong>Max Transaction:</strong> ${stats.maxTransaction?.toFixed(2)}
      </p>
      <p>
        <strong>Min Transaction:</strong> ${stats.minTransaction?.toFixed(2)}
      </p>
      <p>
        <strong>Median Transaction:</strong> ${stats.medianTransaction?.toFixed(2)}
      </p>
      <p>
        <strong>Standard Deviation:</strong> ${stats.standardDeviation?.toFixed(2)}
      </p>
      <p>
        <strong>Expenses:</strong> ${stats.typeBreakdown.expenses.toFixed(2)}
        <br />
        <strong>Income:</strong> ${stats.typeBreakdown.income.toFixed(2)}
      </p>
    </div>
  );
};

export default CategorySummary;
