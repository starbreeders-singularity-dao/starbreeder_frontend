import React, { useMemo } from 'react'
import { useWallet, useConnectedWallet } from '@starterra/starterra-tool-dapp'
import { LCDClient } from '@terra-money/terra.js';
import { MsgExecuteContract, CreateTxOptions } from '@terra-money/terra.js';
import { IProject } from './IProject';
import cryptoImage from '../src/Images/the-crypto-squid.png';
import Left from '../src/Images/1.png'; 

const BackProjectScreen: React.FC<IProject> = (props: IProject) => {
  const {
    network
  } = useWallet();

  const connectedWallet = useConnectedWallet();

  const terra = useMemo(() => {
    if (!network) {
      return null;
    }

    return new LCDClient({
      URL: network.lcd,
      chainID: network.chainID,
    });
  }, [network]);

  const _onClick = async () => {
    if (connectedWallet === undefined) {
      alert("Please connect to your Terra wallet");
      return;
    }
    try {
      const executeMsg = {
        back_project: {
          "id": 0,
          "amount": props.funding_requested
        },
      };
      if (connectedWallet && terra) {
        const msg = new MsgExecuteContract(
          connectedWallet.terraAddress, // sender
          'terra1rzy6g86xpysmkchcxw3ht6f6ch8hzg28v0r7tp', // contract account address
          { ...executeMsg }, // handle msg
          { uluna: props.funding_requested } // coins
        );

        const signMsg = await terra.tx.create(connectedWallet.terraAddress, {
          msgs: [msg],
          memo: 'Test Back Project',
          feeDenoms: ['uluna'],
        });

        const txOptions: CreateTxOptions = {
          msgs: [msg],
          memo: 'Test Back Project',
          fee: signMsg.fee,
        };
        const response = await connectedWallet.post(txOptions);
        if (response.success === true) {
          alert("Thanks for backing the project");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <div>
    <div className="formWrapper backProjectBg">
    <div className="projectTopHdng">
        <div className="imgStar"></div>
        <h1>BACK THIS PROJECT</h1>
      </div>
      <form className="formBgColor">
        
        <h2>THE CRypto squad: Episode 1-8 : To the moon and bey</h2>
        <div className="formRow projectForm formWrapperWidth">
          
         
           <div className="leftSecton">
            <div className="imageUpload">
              <div className="image-box">
                <img alt="thumbnail" src={cryptoImage} />
              </div>
              
            </div>

            <div className="imageBoxTwo">
              <div className="imageUploadLeft">
                <label>CREATOR</label>
                  <div className="image-box">
                     <img alt="thumbnail" src={Left} />
                </div>
                <span>MAX MUSTER-GUY <br/>WEBLINK</span>
              
              </div>
              <div className="imageUploadRight">
              <label>NFT PREVIEW</label>
                  <div className="image-box">
                     <img alt="thumbnail" src={Left} />
                </div>
                <span>NFT PLATFORM</span>
                <button className="btn secretButton">SECRET</button>
                </div>

            </div>
            
            
            
          </div>
          
          <div className="rightSecton">
           
            <div className="inputItem">
              <textarea placeholder="Project Description (1000 signs)" value={props.description} />
            </div>
            <div className="inputItem">
              <label>PROJECT DETAILS</label>
              <input type="text" value="Link to full project details (IPFS)" />
            </div>
            <div className="inputItem">
            <label>PROJECT MINIMUM BUDGET</label>
              <input type="text" placeholder="Project minimum budget" value={1000000} />
            </div>
            <div className="inputItem">
            <label>MINIMIN BACKERS</label>
              <input type="text" placeholder="Project minimum backers" value={100} />
            </div>
            <div className="inputItem">
            <label>BACKING AMOUNT</label>
              <input type="text" placeholder="Backing amount" value={props.funding_requested} />
            </div>
            <div className="inputItem">
            <label>ESTIMATED FUND UNLOCK</label>
              <input type="text" placeholder="Lockedip Period: xxx days/ dd mm yyyy " value={props.lockup_period} />
            </div>
            <div className="buttonRow">
              <div className="formText">
              </div>
              
            </div>
          </div>
        </div>
      </form>
      <div className="buttonRow">
      <button className="btn backProjectButton" onClick={(e) => { e.preventDefault(); _onClick(); }}>Submit</button>
      </div>
      </div>
  </div>
}

export default BackProjectScreen