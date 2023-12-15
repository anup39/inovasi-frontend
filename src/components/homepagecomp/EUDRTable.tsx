import Pagination from "../commoncomp/Pagination";

interface TableProps {
  headers: string[];
  data?: (string | JSX.Element)[][];
}

function TableHeaders({ headers }: { headers: string[] }) {
  return (
    <thead className="text-left bg-creamGray shadow">
      <tr>
        {headers.map((header, index) => (
          <th key={index} className="py-5 px-4 border-b">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function Table({ headers, data }: TableProps) {
  return (
    <div className="bg-white py-6">
      <table className="min-w-full bg-white ">
        <TableHeaders headers={headers} />
        <tbody>
          {data &&
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="py-6 px-4 border-b">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>

      {/* @ts-ignore */}

      <Pagination totalPages={11} />
    </div>
  );
}

function SimpleTable() {
  const theads = [
    "Company",
    "Commoditied",
    "Country",
    "Vol Sales to EU",
    "Nr of facilities in EU",
  ];

  const data: TableProps["data"] = [
    [
      "Neste Oyj (Neste Corporation)",
      "Oil Palm",
      "Finland",
      "1,128,088",
      "Yes",
      <a className="text-blue-600 underline" href="#">
        Options
      </a>,
      <a className="text-blue-600 underline" href="#">
        Details
      </a>,
    ],
    [
      "Neste Oyj (Neste Corporation)",
      "Oil Palm",
      "Finland",
      "1,128,088",
      "Yes",
      <a className="text-blue-600 underline" href="#">
        Options
      </a>,
      <a className="text-blue-600 underline" href="#">
        Details
      </a>,
    ],
    [
      "Neste Oyj (Neste Corporation)",
      "Oil Palm",
      "Finland",
      "1,128,088",
      "Yes",
      <a className="text-blue-600 underline" href="#">
        Options
      </a>,
      <a className="text-blue-600 underline" href="#">
        Details
      </a>,
    ],
    // ...other rows
  ];

  return <Table headers={theads} data={data} />;
}

export default SimpleTable;
