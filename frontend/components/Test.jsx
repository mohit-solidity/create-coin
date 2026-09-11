import { useWallet } from "../src/WalletContext";

export default function Test(){
    const {userAddress} = useWallet();

    const thiss = () => {
        alert("Yeyyyyyyyyyyyyyyyyyyyy")
    }
    return(
        <>
            <h1>Hello This Is In Test</h1>
            <p>User Address : {userAddress}</p>
            <button onClick={()=> thiss()}>Click Here</button>
        </>
    )
}