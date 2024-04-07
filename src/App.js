import './App.css';
import React, { useState, } from 'react';
import { Sidebar, } from '~/components';
import { Information, } from '~/pages';

function App() {
  const [page, setPage,] = useState(Information);

  return (
    <div className='App'>
      <Sidebar setPage={setPage} page={page}/>
      <div id={'content'}>
        {page}
      </div>
    </div>
  );
}

export default App;
