import React, { useState } from 'react';
import IndexPage from '../IndexPage/IndexPage';
import UserTest from '../UserTest/UserTest';


const SelectorForm = () => {
  const [view, setView] = useState('indexPage');

  const viewHandler = () => {
    if (view === "indexPage") {
      return <IndexPage setView={setView} />
    } else if (view === "userTest") {
      return <UserTest setView={setView} />
    }
  }

  return (
    <div>
      {viewHandler()}
    </div>
  )
}

export default SelectorForm;
