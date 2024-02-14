import React from 'react';
import './TableRow.css';

function TableRow({ index, rowData, onInputChange, remove}) {

    const handleInputChange = (e, fieldName) => {
        const value = e.target.value;
        if (e.key === 'Enter') {
            onInputChange(index, fieldName, value);
            document.activeElement.blur();
        }
    };

    const handleDelete = (e) => {
        remove(rowData._id);
    }

    return (
        <tr className='tableRow'>
            <td><button className='moveButton'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
            </button></td>
            <td><input type="checkbox"></input></td>
            <td><input type="text" onKeyUp={(e) => handleInputChange(e, 'name')} defaultValue={rowData.name}></input></td>
            <td><input type="text" onKeyUp={(e) => handleInputChange(e, 'category')} defaultValue={rowData.category}></input></td>
            <td><input type="text" onKeyUp={(e) => handleInputChange(e, 'price')} defaultValue={rowData.price}></input></td>
            <td><button className='deleteButton' onClick={handleDelete}>delete</button></td>
        </tr>
    )
}

export default TableRow;
