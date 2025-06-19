import React from 'react';
const AdoptionTable = ({ records, onGoBack }) => { 
  if (records.length === 0) {
    return <p style={{color: 'white', marginTop: '10em'}}>No adoption requests submitted yet.</p>;
  }

  return (
    <div> 
    <table>
      <thead>
        <tr>
          <th>Pet Name</th>
          <th>Pet Type</th>
          <th>Breed</th>
          <th>Adopter's Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record) => (
          <tr key={record.id}>
            <td>{record.petName}</td>
            <td>{record.petType}</td>
            <td>{record.breed}</td>
            <td>{record.adopterName}</td>
            <td>{record.email}</td>
            <td>{record.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
      <button onClick={onGoBack} style={{ width: 'auto', display: 'inline-block', marginTop: '20px' }}>
        Go Back
      </button>
    </div>
  );
};

export default AdoptionTable;