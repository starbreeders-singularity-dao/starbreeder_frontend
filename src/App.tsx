import React from 'react';
import { WalletProvider, Wallet, Tokens } from '@starterra/starterra-tool-dapp'
import './App.css';
import '@starterra/starterra-tool-dapp/dist/index.css'
import SmartContractConnection from './SmartContractConnection';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import CreateProjectScreen from './CreateProjectScreen';
import Home from './Home';
import ViewProject from './ViewProject';

function App() {

  const avaliableNetworks = {
    0: {
      name: "testnet",
      chainID: "bombay-11",
      lcd: "https://bombay-lcd.terra.dev",
    },
    1: {
      name: "mainnet",
      chainID: "columbus-4",
      lcd: "https://lcd.terra.dev",
    },
  };


  const testnetTokens: Tokens = [
    {
      address: "uluna",
      name: "LUNA",
      isDefault: true,
      decimal: 6,
    },
    {
      address: "uusd",
      name: "UST",
      isDefault: false,
      decimal: 6,
    },
    {
      address: "terra1747mad58h0w4y589y3sk84r5efqdev9q4r02pc",
      name: "ANC",
      isDefault: false,
      decimal: 6,
    },
  ];
  return (
    <>
      <div className="App">
        <WalletProvider
          defaultNetwork={avaliableNetworks[0]}
          walletConnectChainIds={avaliableNetworks}
        >
          <Wallet tokens={testnetTokens} readOnlyMode={false} />
          <Router>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/create-project" component={CreateProjectScreen} />
              <Route exact path="/back-project" component={SmartContractConnection} />
              <Route exact path="/back-project/:id" component={SmartContractConnection} />
              <Route exact path="/view-project/:id" component={ViewProject} />
            </Switch>
          </Router>
        </WalletProvider>
      </div>
    </>
  );
}

export default App;
