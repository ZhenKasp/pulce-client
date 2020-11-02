import React from 'react';

const IndexPage = (props) => {
  return (
    <div>
      <h1>IndexPage</h1>
      <button onClick={() => props.setView("userTest")}>Go to UserTest</button>
    </div>
  )
}

export default  IndexPage;
