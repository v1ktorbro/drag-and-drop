import React from 'react';
import './index.css';
import DragAndDrop from './components/DragAndDrop.js';
import defaultData from './utils/data.js'


function App() {
  return (
    <DragAndDrop defaultData={defaultData} />
  );
}

export default App;
