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
                    <button className="btn home-button">Home</button>
                </Link>
            </div>
            <div className="formWrapper">
                <form>
                    <div className="formRow">
                        <div className="rightSecton">
                            <label>Title</label>
                            <div className="inputItem">
                                <input type="text" placeholder="Project title" name="title" value={title} onChange={onInputChange} />
                            </div>
                            <label>Description</label>
                            <div className="inputItem">
                                <textarea placeholder="Project Description (1000 signs)" name="description" value={description} onChange={onInputChange} />
                            </div>
                            <label>Link to full project details (IPFS)</label>
                            <div className="inputItem">
                                <input type="text" placeholder="Link to full project details (IPFS)" name="legal_contract" value={legal_contract} onChange={onInputChange} />
                            </div>
                            <label>Project minimum budget</label>
                            <div className="inputItem">
                                <input type="text" placeholder="Project minimum budget" name="minimum_budget" value={minimum_budget} onChange={onInputChange} />
                            </div>
                            <label>Project minimum backers</label>
                            <div className="inputItem">
                                <input type="text" placeholder="Project minimum backers" name="minimum_backers" value={minimum_backers} onChange={onInputChange} />
                            </div>
                            <label>Backing amount</label>
                            <div className="inputItem">
                                <input type="text" placeholder="Backing amount" />
                            </div>
                            <label>Lockedip Period</label>
                            <div className="inputItem">
                                <input type="text" placeholder="Lockedip Period: xxx days/ dd mm yyyy " name="lockup_period" value={lockup_period} onChange={onInputChange} />
                            </div>
                            <label>Thumbnail</label>
                            <div className="inputItem">
                                <input type="text" placeholder="post thumbnail (link (ipfs))" name="thumbnail" value={thumbnail} onChange={onInputChange} />
                            </div>
                            <div className="buttonRow">
                                <div className="formText">
                                </div>
                                <button className="btn SubmitButton" onClick={(e) => _onClick(e)}>Create Project</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </>
    )
}

export default CreateProjectScreen