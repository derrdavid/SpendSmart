import React from 'react';
import './TableRow.css';

function TableRow({ rowData, remove, update }) {

    const handleDelete = (e) => {
        remove(rowData._id);
    }

    const handleSwap = (e) => {
        if (e.target.className === 'moveUpButton') {
            console.log("Up")
        }
        if (e.target.className === 'moveDownButton') {
            console.log("down")
        }
    }

    const handleInput = (e) => {
        if (e.key === 'Enter') {
            let body = {};
            body[e.target.className] = e.target.value;
            update(rowData._id, body);
        }
    }

    const handleBlur = (e) => {
        const attrib = e.target.className;
        e.target.value = rowData[attrib];
    }

    return (
        <tr className='tableRow'>
            <td><button className='moveUpButton' onClick={handleSwap}>up</button></td>
            <td><button className='moveDownButton' onClick={handleSwap}>down</button></td>
            <td><input type="checkbox"></input></td>
            <td><input className='name' type="text" defaultValue={rowData.name} onKeyUp={handleInput} onBlur={handleBlur}></input></td>
            <td><input className='category' type="text" defaultValue={rowData.category} onKeyUp={handleInput} onBlur={handleBlur}></input></td>
            <td><input className='price' type="text" defaultValue={rowData.price} onKeyUp={handleInput} onBlur={handleBlur}></input></td>
            <td><button className='deleteButton' onClick={handleDelete}>delete</button></td>
        </tr>
    )
}

export default TableRow;
