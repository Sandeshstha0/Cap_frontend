import React, { useState } from "react";
import FileUploader from "@/components/FileUploader";
import { useTable, Column } from "react-table";

type DataRow = {
  [key: string]: string | number;
};

type Summary = {
  totalEmployees: number;
  totalSalary: number;
  avgSalary: number;
};

const CsvFile: React.FC = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [columns, setColumns] = useState<Column<DataRow>[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);

  const handleFileUpload = (parsedData: DataRow[]) => {
    setData(parsedData);

    // Create columns dynamically from CSV headers
    const headers = Object.keys(parsedData[0]);
    const cols: Column<DataRow>[] = headers.map((header) => ({
      Header: header,
      accessor: header as keyof DataRow,
    }));
    setColumns(cols);

    // Calculate summary
    const calculatedSummary = calculateSummary(parsedData);
    setSummary(calculatedSummary);
  };

  const calculateSummary = (data: DataRow[]): Summary => {
    const salaries = data.map((row) =>
      parseFloat((row["Salary"] as string) || "0")
    );
    const totalSalary = salaries.reduce((sum, val) => sum + val, 0);
    const avgSalary = salaries.length > 0 ? totalSalary / salaries.length : 0;
    const totalEmployees = data.length;

    return {
      totalEmployees,
      totalSalary,
      avgSalary,
    };
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      <h1>CSV Analyzer</h1>
      <FileUploader onFileUpload={handleFileUpload} />

      {summary && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid black",
          }}
        >
          <h2>Summary</h2>
          <p>Total Employees: {summary.totalEmployees}</p>
          <p>Total Salary: ${summary.totalSalary.toLocaleString()}</p>
          <p>Average Salary: ${summary.avgSalary.toFixed(2)}</p>
        </div>
      )}

      {data.length > 0 && (
        <table
          {...getTableProps()}
          style={{ border: "1px solid black", marginTop: "20px" }}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{ border: "1px solid black" }}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      style={{ border: "1px solid black" }}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CsvFile;
