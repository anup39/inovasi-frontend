const theads = [
  'Mill Name',
  'Region',
  'Country',
  'Group Company',
  'Company',
  'RSPO Certified',
];
const data = [
  [
    'Batu Lintang',
    'Kedah',
    'Malaysia',
    'Kuala Lumpur Kepong Behad',
    'Kuala Lambur Kepong Behad (KLK Batu Lintang)',
    'IP',
    <a className='text-blue-600 underline' href='#'>
      Details
    </a>,
  ],
  [
    'Batu Lintang',
    'Kedah',
    'Malaysia',
    'Kuala Lumpur Kepong Behad',
    'Kuala Lambur Kepong Behad (KLK Batu Lintang)',
    'IP',
    <a className='text-blue-600 underline' href='#'>
      Details
    </a>,
  ],
  [
    'Batu Lintang',
    'Kedah',
    'Malaysia',
    'Kuala Lumpur Kepong Behad',
    `Kuala Lambur Kepong Behad (KLK Batu Lintang)`,
    'IP',
    <a className='text-blue-600 underline' href='#'>
      Details
    </a>,
  ],

  // Add more rows as needed
];

function TableHeaders({ headers }) {
  return (
    <thead className='text-left bg-[#FAFAFA] shadow'>
      <tr>
        {headers.map((header, index) => (
          <th key={index} className='py-2 px-4 border-b'>
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function Table({ headers, data }) {
  return (
    <div className='bg-gray-100 py-6'>
      <table className='min-w-full bg-white '>
        <TableHeaders headers={headers} />
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className='py-5 px-4 border-b'>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SimpleTable() {
  return <Table headers={theads} data={data} />;
}
export default SimpleTable;