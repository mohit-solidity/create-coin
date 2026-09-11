import { createContext, useContext, useEffect,useState } from 'react'
import {ethers} from 'ethers';

const WalletContext = createContext();

export function WalletProvider({children}){
    const [provider, setProvider] = useState(null)
    const [signer, setSigner] = useState(null)
    const [userAddress, setUserAddress] = useState(null);

    const restoreWallet = async () => {
        if(!window.ethereum) return;

        const newProvider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await newProvider.send("eth_accounts",[]);

        if(accounts.length>0){
            const signer = newProvider.getSigner();
            setProvider(newProvider);
            setSigner(signer);
            setUserAddress(accounts[0]);
        }
    }

    const connectWallet = async () => {
        if(!window.ethereum){
            alert(`Please Install Metamask`);
            return;
        }
        try{
            const provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts",[]);
            const signer = await provider.getSigner();
            setProvider(provider);
            setSigner(signer);
            setUserAddress(accounts[0]);
        }catch(err){
            alert(`Error : ${err.reason || err.message}`)
        }
    }

    useEffect(()=>{
        restoreWallet();
        if(!window.ethereum) return;

        const handleAccountChanged = async(accounts) => {
            if(accounts.length === 0){
                setProvider(null)
                setSigner(null)
            }else{
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                setProvider(provider)
                setSigner(signer)
                setUserAddress(accounts[0])
            }
        }

        window.ethereum.on("accountsChanged", handleAccountChanged);

        return()=>{
            window.ethereum.removeListener(
                "accountsChanged",
                handleAccountChanged
            )
        }
    },[]);

    return(
        <WalletContext.Provider value={{provider,signer,userAddress,connectWallet}}>{children}</WalletContext.Provider>
    )
}

export function useWallet(){
    return useContext(WalletContext);
}