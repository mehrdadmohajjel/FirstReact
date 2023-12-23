import Calc from 'pages/Calc';
import Card from 'pages/Card';
import React from 'react';

function App() {
  return (
    
    <div >
      <Card  age={36} family='محجل گلشنی' name='مهرداد' gender={'male'}/> 
      <Calc />
    </div>
  );
}

export default App;
