import React, { useState } from 'react'
import { IProject } from './IProject';
import { useWallet, useConnectedWallet } from '@starterra/starterra-tool-dapp'
import { LCDClient } from '@terra-money/terra.js';
import { MsgExecuteContract, CreateTxOptions } from '@terra-money/terra.js';
import { Link, useHistory } from 'react-router-dom';
import { TxResult } from '@terra-money/wallet-provider';
import Loader from './Loader';

const CreateProjectScreen: React.FC<IProject> = (props: IProject) => {
    const [loading, setLoading] = useState(false);
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
    const history = useHistory();
    const {
        id,
        thumbnail,
        title,
        description,
        legal_contract,
        funding_requested,
        funding_raised,
        lockup_period,
        denom,
        minimum_backers,
        minimum_budget,
    } = project

    const onInputChange = (e: any) => {
        const { name, value } = e.target;
        setProject({ ...project, [name]: value });
    }

    const { network } = useWallet();
    const connectedWallet = useConnectedWallet();
    const terra = new LCDClient({
        URL: network.lcd,
        chainID: network.chainID,
        gasPrices: { uluna: 1 }
    });
    const _onClick = async (e: any) => {
        e.preventDefault()
        if (connectedWallet === undefined) {
            alert("Please connect to your Terra wallet");
            return;
        }
        try {
            setLoading(true);
            const executeMsg = {
                create_project: {
                    "thumbnail": thumbnail,
                    "title": title,
                    "description": description,
                    "legal_contract": legal_contract,
                    "funding_requested": funding_requested,
                    "funding_raised": [],
                    "lockup_period": lockup_period,
                    "denom": denom,
                    "minimum_backers": minimum_backers,
                    "minimum_budget": minimum_budget
                }
            };
            if (connectedWallet && terra) {
                const msg = new MsgExecuteContract(
                    connectedWallet.terraAddress, // sender
                    'terra1rzy6g86xpysmkchcxw3ht6f6ch8hzg28v0r7tp', // contract account address
                    { ...executeMsg }, // handle msg
                );

                const signMsg = await terra.tx.create(connectedWallet?.terraAddress, {
                    msgs: [msg],
                    memo: "Test Create Project",
                    feeDenoms: ['uluna']
                })

                const txOptions: CreateTxOptions = {
                    msgs: [msg],
                    memo: "Test Create Project",
                    fee: signMsg.fee
                }

                const request = (nextTxResult) => {  
                    const uri = network.lcd.replaceAll('lcd', 'fcd');
                    fetch(`${uri}/v1/tx/${nextTxResult.result.txhash}`).then((response) => response.json())
                    .then((responseJSON) => {
                       // do stuff with responseJSON here...
                        console.log(responseJSON);
                        if (responseJSON === null) {
                            setTimeout(() => {
                                request(nextTxResult)
                            }, 5000)
                        } else {
                            const project_id = responseJSON?.logs[0]?.events?.filter(test => test.type === 'wasm')[0].attributes.filter(event => event.key === 'project_id')[0].value;
                            console.log(project_id, "prince");
                            setLoading(false);
                            history.push(`/view-project/${project_id}`)
                        }
                    });
                }

                connectedWallet.post(txOptions).then(async (nextTxResult: TxResult) => {
                    console.log(nextTxResult, "Prince");
                    console.log(nextTxResult.result.txhash, "Prince");
                    // const project_id = response?.body?.logs[0]?.events?.filter(test => test.type === 'wasm')[0].attributes.filter(event => event.key === 'project_id')[0].value;
                    // console.log(project_id, "prince");
                    request(nextTxResult);
                  })
                  .catch((error: unknown) => {
                      console.log(error);
                  });
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            {loading && <Loader /> }
            <div className="address-wrapper">
                <Link to="/">
                    <button className="btn home-button">PROJECT Home</button>
                </Link>
            </div>
            <div className="formWrapper createProjectBg">
                <div className="topHdng">
                    <div className="imgStar"></div>
                    <h1>START A PROJECT</h1>
                </div>
                <form className = "form">
                    <div className="formRow">
                        <div className="rightSecton">
                            <label>ARTIST NAME</label>
                            <div className="inputItem">
                                <input type="text"  name="title" />
                            </div>
                            <label>BIO LINK</label>
                            <div className="inputItem">
                                <input type="text"  name="title"  />
                            </div>
                            <label>PROJECT TITLE</label>
                            <div className="inputItem">
                                <input type="text"  name="title" value={title} onChange={onInputChange} />
                            </div>
                            <label>PROJECT DESCRIPTION</label>
                            <div className="inputItem">
                                <textarea name="description" value={description} onChange={onInputChange} />
                            </div>
                            <label>LINK TO FULL PROJECT DETAILS (IPFS)</label>
                            <div className="inputItem">
                                <input type="text"  name="legal_contract" value={legal_contract} onChange={onInputChange} />
                            </div>
                            <label>PROJECT MINIMUM BUDGET</label>
                            <div className="inputItem">
                                <input type="text"  name="minimum_budget" value={minimum_budget} onChange={onInputChange} />
                            </div>
                            <div className="colLeft">
                                <label>MINIMUM BACKERS</label>
                                <div className="inputItem">
                                    <input type="text" name="minimum_backers" value={minimum_backers} onChange={onInputChange} />
                                </div>
                            </div>
                            <div className="colRight">
                                <label>BACKING AMOUNT</label>
                                <div className="inputItem">
                                    <input type="text"  />
                                </div>
                            </div>    
                            <label>ESTIMATE FUND UNLOCK DATE</label>
                            <div className="inputItem">
                                <input type="text"  name="lockup_period" value={lockup_period} onChange={onInputChange} />
                            </div>
                            {/* <label>ESTIMATE FUND UNLOCK DATE</label>
                            <div className="inputItem">
                                <input type="text" placeholder="Lockedip Period: xxx days/ dd mm yyyy " name="lockup_period" value={lockup_period} onChange={onInputChange} />
                            </div> */}
                            <div className="colLeft">
                                <label>THUMBNAIL</label>
                                <div className="inputItem">
                                    <input type="text"  name="thumbnail" value={thumbnail} onChange={onInputChange} />
                                </div>
                            </div>    
                            <div className="colRight">
                                <label> NFT PLATFORM</label>
                                <div className="colRightCheckbox">
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label> TERRA NFT</label>
                                <input type="checkbox" id="vehicle2" name="vehicle2" value="Car"/>
                                    <label> SECERT NFT</label>
                                </div>
                               
                            </div>
                            
                        </div>
                    </div>
                </form>
                <p className="setP">SET UP FEE : UST XX,-</p>
                <div className="buttonRow">
                <div className="formText">
                </div>
                <button className="btn createProjectButton" onClick={(e) => _onClick(e)}>Create Project</button>
                </div>
                </div>
        </>
    )
}

export default CreateProjectScreen