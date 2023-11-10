import React from 'react';

const TableExample = () => {
  const columnHeaders = Array.from(
    { length: 10 },
    (_, index) => `Header ${index + 1}`
  );
  const rowData = Array.from({ length: 10 }, (_, rowIndex) =>
    Array.from(
      { length: 10 },
      (_, colIndex) =>
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry ${
          rowIndex + 1
        }-${colIndex + 1}`
    )
  );

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white border border-gray-300'>
        <thead>
          <tr>
            {columnHeaders.map((header, index) => (
              <th key={index} className='border border-gray-300 py-2 px-4'>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((data, colIndex) => (
                <td key={colIndex} className='border border-gray-300 py-2 px-4'>
                  {data}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableExample;
