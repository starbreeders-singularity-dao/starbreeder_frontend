import React, { useState } from 'react'
import { useWallet, useConnectedWallet } from '@starterra/starterra-tool-dapp'
import { LCDClient } from '@terra-money/terra.js';
import { useEffect } from 'react';
import BackProjectScreen from './BackProjectScreen';
import { IProject } from './IProject';
import { Link, useParams } from 'react-router-dom';

const SmartContractConnection = () => {
  const { network } = useWallet()
  const connectedWallet = useConnectedWallet()
  const params :any = useParams();
  const terra = new LCDClient({
    URL: network.lcd,
    chainID: network.chainID,
    gasPrices: { uluna: 1 }
  });
  const [project, setProject] = useState<IProject>({
    id: 0,
    thumbnail: "",
    title: "",
    description: "",
    legal_contract: "",
    funding_requested: 0,
    funding_raised: 0,
    lockup_period: 0,
    denom: "",
    minimum_backers: "",
    minimum_budget: ""
  });

  useEffect(() => {
    (async () => {
      let project_id = 5;
      if (params?.id) {
        project_id = params?.id;
      }
      const result: any = await terra.wasm.contractQuery(
        "terra1rzy6g86xpysmkchcxw3ht6f6ch8hzg28v0r7tp",
        { get_project: { "id": Number(project_id) } }
      );
      setProject(result);
    })()
  }, []);

  useEffect(() => {
    (async () => {
      console.log(params?.id)
      let project_id = 5;
      if (params?.id) {
        project_id = params?.id;
      }
      const result: any = await terra.wasm.contractQuery(
        "terra1rzy6g86xpysmkchcxw3ht6f6ch8hzg28v0r7tp",
        { get_project: { "id": Number(project_id) } }
      );
      console.log(result)
      setProject(result);
    })()
  }, [params?.id]);

  return (
    <div> 
      <div className="address-wrapper">
        <Link to="/">
          <button className="btn backProjectButton">PROJECT HOME</button>
        </Link>
        <p className="homeP"><strong>You are connected with </strong>: {network.name}</p>
        <p className="homeP"><strong> Your {network.name} address is </strong>: {connectedWallet?.terraAddress}</p>
      </div>
      <BackProjectScreen {...project} />
    </div>
  )
}

export default SmartContractConnection;
