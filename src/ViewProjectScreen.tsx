import React from 'react'
import { IProject } from './IProject';
import cryptoImage from '../src/Images/the-crypto-squid.png';
import { useHistory, useParams } from 'react-router-dom';
import Left from '../src/Images/1.png'; 

const ViewProjectScreen: React.FC<IProject> = (props: IProject) => {
  const history = useHistory();
  const params :any = useParams();

  const _onClick = (e) => {
    e.preventDefault();
    history.push(`/back-project/${params?.id}`)
  }

  return <div>
    <div className="formWrapper backProjectBg">
      <div className="projectTopHdng">
        <div className="imgStar"></div>
        <h1>VIEW THIS PROJECT</h1>
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
              <textarea placeholder="Project Description (1000 signs)" value={props.description} disabled/>
            </div>
            <div className="inputItem">
              <label>PROJECT DETAILS</label>
              <input type="text" value="Link to full project details (IPFS)" disabled/>
            </div>
            <div className="inputItem">
            <label>PROJECT MINIMUM BUDGET</label>
              <input type="text" placeholder="Project minimum budget" value={1000000} disabled/>
            </div>
            <div className="inputItem">
            <label>MINIMIN BACKERS</label>
              <input type="text" placeholder="Project minimum backers" value={100} disabled/>
            </div>
            <div className="inputItem">
            <label>BACKING AMOUNT</label>
              <input type="text" placeholder="Backing amount" value={props.funding_requested} disabled/>
            </div>
            <div className="inputItem">
            <label>ESTIMATED FUND UNLOCK</label>
              <input type="text" placeholder="Lockedip Period: xxx days/ dd mm yyyy " value={props.lockup_period} disabled/>
            </div>
            <div className="buttonRow">
              <div className="formText">
              </div>
              
            </div>
          </div>
        </div>
      </form>
      <div className="buttonRow">
      <button className="btn backProjectButton" onClick={_onClick }>BACK PROJECT</button>
      </div>
      </div>
  </div>
}

export default ViewProjectScreen