import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";
// import { SignIn, SignInWithMetamaskButton } from "@clerk/nextjs";
import { useState } from "react";
import Web3 from "web3";
// import RenewableEnergyCredit from "./contracts/RenewableEnergyCredit.json";

interface RenewableEnergyCreditInstance {
  energyCredits: () => Promise<string>;
  buyCredits: (amount: string) => Promise<void>;
  sellCredits: (amount: string) => Promise<void>;
}


const Home: NextPage = () => {

  const [account, setAccount] = useState<string>("");
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [energyCredits, setEnergyCredits] = useState<string>("0");
  const [purchaseAmount, setPurchaseAmount] = useState<string>("0");
  const [saleAmount, setSaleAmount] = useState<string>("0");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = RenewableEnergyCredit.networks[networkId];
        const instance = new web3Instance.eth.Contract(
          RenewableEnergyCredit.abi,
          deployedNetwork && deployedNetwork.address
        ) as RenewableEnergyCreditInstance;
        const credits = await instance.energyCredits();
        setEnergyCredits(credits);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handlePurchaseCredits = async () => {
    if (web3) {
      const instance = new web3.eth.Contract(
        RenewableEnergyCredit.abi,
        RenewableEnergyCredit.networks[5777].address
      ) as RenewableEnergyCreditInstance;
      await instance.buyCredits(purchaseAmount);
      const credits = await instance.energyCredits();
      setEnergyCredits(credits);
      setPurchaseAmount("0");
    }
  };

  const handleSellCredits = async () => {
    if (web3) {
      const instance = new web3.eth.Contract(
        RenewableEnergyCredit.abi,
        RenewableEnergyCredit.networks[5777].address
      ) as RenewableEnergyCreditInstance;
      await instance.sellCredits(saleAmount);
      const credits = await instance.energyCredits();
      setEnergyCredits(credits);
      setSaleAmount("0");
    }
  };


  return (
    <>
      <Head>
        <title>Renewable Energy Trading</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {/* <SignInWithMetamaskButton />
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" /> */}
        <h1>Renewable Energy Credit Trading Platform</h1>
        {account ? (
          <p>Connected with address: {account}</p>
        ) : (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}
        <h2>Current Energy Credits Available: {energyCredits}</h2>
        <div>
          <h3>Purchase Credits</h3>
          <input
            type="number"
            value={purchaseAmount}
            onChange={(e) => setPurchaseAmount(e.target.value)}
          />
          <button onClick={handlePurchaseCredits}>Buy Credits</button>
        </div>
        <div>
          <h3>Sell Credits</h3>
          <input
            type="number"
            value={saleAmount}
            onChange={(e) => setSaleAmount(e.target.value)}
          />
          <button onClick={handleSellCredits}>Sell Credits</button>
        </div>
      </main>
    </>
  );
};

export default Home;
