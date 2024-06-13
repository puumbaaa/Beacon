import React, {useEffect, useState} from 'react';

export function SQLHandler() {

    const [data, setData] = useState([])

    useEffect(() => {
        fetch("http://localhost:8081/users")
            .then(response => response.json())
            .then(data => setData(data))
            .catch(err => console.error(err))
    }, [])

    return (
        <div>
            <table>
                <thead>
                <th>ID</th>
                <th>KDA</th>
                </thead>
                <tbody>
                {data.map((d, i) => (
                    <tr key={i}>
                        <td> {d.id} </td>
                        <td> {d.kda} </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}