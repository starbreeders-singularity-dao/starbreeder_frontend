import React, { useMemo } from 'react'
import { useWallet, useConnectedWallet } from '@starterra/starterra-tool-dapp'
import { LCDClient } from '@terra-money/terra.js';
import { MsgExecuteContract, CreateTxOptions } from '@terra-money/terra.js';
import { IProject } from './IProject';
import cryptoImage from './assets/crypto-squad.png';

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
    <div className="formWrapper">
      <form>
        <div className="formRow">
          <div className="leftSecton">
            <div className="imageUpload">
              <div className="image-box">
                <img alt="thumbnail" src={cryptoImage} />
              </div>
              <div className="inputItem">
                <input type="text" placeholder="post thumbnail (link (ipfs))" value={props.thumbnail} />
              </div>
            </div>
            <div className="imageUpload">
              <div className="image-box">NFT Preview</div>
              <div className="inputItem">
                <input type="text" placeholder="post NFT" />
              </div>
            </div>
          </div>
          <div className="rightSecton">
            <div className="inputItem">
              <input type="text" placeholder="Project title" value={props.title} />
            </div>
            <div className="inputItem">
              <textarea placeholder="Project Description (1000 signs)" value={props.description} />
            </div>
            <div className="inputItem">
              <input type="text" placeholder="Link to full project details (IPFS)" />
            </div>
            <div className="inputItem">
              <input type="text" placeholder="Project minimum budget" value={1000000} />
            </div>
            <div className="inputItem">
              <input type="text" placeholder="Project minimum backers" value={100} />
            </div>
            <div className="inputItem">
              <input type="text" placeholder="Backing amount" value={props.funding_requested} />
            </div>
            <div className="inputItem">
              <input type="text" placeholder="Lockedip Period: xxx days/ dd mm yyyy " value={props.lockup_period} />
            </div>
            <div className="buttonRow">
              <div className="formText">
              </div>
              <button className="btn SubmitButton" onClick={(e) => { e.preventDefault(); _onClick(); }}>Submit</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
}

export default BackProjectScreen