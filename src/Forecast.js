import React, { useState, useEffect } from "react";
import { get } from './fetch';

export default function Forecast() {
  const [data, setData] = useState(null);
  const [notes, setNotes] = useState({});
  const [forecastType, setForecastType] = useState('/daily');

  useEffect(() => {
    alert('Requested data from server...');
    get(forecastType).then((response) => {
      alert('Response: ' + JSON.stringify(response,'',2));
      setData(response.data);
    });
  }, [forecastType]);

  const handleChange = (index) => ({ target }) =>
    setNotes((prev) => ({
      ...prev,
      [index]: target.value
    }));

  if (!data) {
            return <p>Loading...</p>;
          }

  return (
    <div className='App'>
      <div style={{marginBottom: '25px'}}>
        <button style={{color: 'white', fontFamily: "impact", fontSize: '2em', marginRight: '7px', padding: '0.1em 0.5em 0.1em 0.5em', backgroundColor: '#50394c', border: 'solid #618685 5px', borderRadius: '5px'}} onClick={() => setForecastType('/daily')}>5-day</button>
        <button style={{color: 'white', fontFamily: "impact", fontSize: '2em', marginLeft: '7px', padding: '0.1em 0.5em 0.1em 0.5em', backgroundColor: '#50394c', border: 'solid #618685 5px', borderRadius: '5px'}} onClick={() => setForecastType('/hourly')}>Today</button>
      </div>
      <table>
        <thead>
          <tr>
            <th style={{fontFamily: "impact", fontSize: '1.5em', color: '#50394c'}}>Summary</th>
            <th style={{fontFamily: "impact", fontSize: '1.5em', color: '#50394c'}}>Avg Temp</th>
            <th style={{fontFamily: "impact", fontSize: '1.5em', color: '#50394c'}}>Precip</th>
            <th style={{fontFamily: "impact", fontSize: '1.5em', color: '#50394c'}}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={item.id}>
              <td style={{fontFamily: "impact", fontSize: '1.3em', color: '#034f84'}}>{item.summary}</td>
              <td style={{fontFamily: "impact", fontSize: '1.3em', color: '#034f84'}}> {item.temp.avg}°F</td>
              <td style={{fontFamily: "impact", fontSize: '1.3em', color: '#034f84'}}>{item.precip}%</td>
              <td>
                <input style={{fontFamily: "impact", fontSize: '1.2em', color: ' #c94c4c'}}
                  value={notes[item.id] || ''}
                  onChange={handleChange(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
