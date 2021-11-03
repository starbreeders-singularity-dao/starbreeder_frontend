import React from 'react'
import { IProject } from './IProject';
import cryptoImage from './assets/crypto-squad.png';
import { useHistory, useParams } from 'react-router-dom';

const ViewProjectScreen: React.FC<IProject> = (props: IProject) => {
  const history = useHistory();
  const params :any = useParams();

  const _onClick = (e) => {
    e.preventDefault();
    history.push(`/back-project/${params?.id}`)
  }

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
                <input type="text" placeholder="post thumbnail (link (ipfs))" disabled value={props.thumbnail} />
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
              <input type="text" placeholder="Project title" value={props.id} disabled />
            </div>
            <div className="inputItem">
              <input type="text" placeholder="Project title" value={props.title} disabled />
            </div>
            <div className="inputItem">
              <textarea placeholder="Project Description (1000 signs)" value={props.description} disabled />
            </div>
            <div className="inputItem">
              <input type="text" placeholder="Link to full project details (IPFS)" disabled />
            </div>
            <div className="inputItem">
              <input type="text" placeholder="Project minimum budget" value={1000000} disabled />
            </div>
            <div className="inputItem">
              <input type="text" placeholder="Project minimum backers" value={100} disabled />
            </div>
            <div className="inputItem">
              <input type="text" placeholder="Backing amount" value={props.funding_requested} disabled/>
            </div>
            <div className="inputItem">
              <input type="text" placeholder="Lockedip Period: xxx days/ dd mm yyyy " value={props.lockup_period} disabled/>
            </div>
            <div className="buttonRow">
              <div className="formText">
              </div>
              <button className="btn SubmitButton" onClick={_onClick}>Back This Project</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
}

export default ViewProjectScreen