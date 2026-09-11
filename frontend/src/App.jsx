import { useState } from 'react'
import './App.css';
import { useWallet } from './WalletContext';
import Test from '../components/Test';

function App() {
  const {userAddress, connnectWallet} = useWallet();
  return (
    <>
      <p>User Address : {userAddress}</p>
      <button onClick={connnectWallet}>{userAddress?"Disconnect":"Connnect"}</button>
      <Test />
    </>
  )
}

export default App