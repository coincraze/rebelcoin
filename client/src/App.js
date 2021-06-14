import React, { Component } from "react";
import IPFSDrive from "./contracts/IPFSDrive.json";
import CSDC from "./contracts/CSDC.json";
import getWeb3 from "./getWeb3"; 
import { StyledDropZone } from 'react-drop-zone';
import { Table } from 'reactstrap';
import { FileIcon, defaultStyles } from 'react-file-icon';
import "react-drop-zone/dist/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import fileReaderPullStream from 'pull-file-reader';
import ipfs from './ipfs' 
import "./App.css";
import Moment from "react-moment";

const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('6e1da302fb6acf836874', '05b224469b589e1e25970e61b52725a632bb4bcbeafdcad678f077ac94b9a6db');

class App extends Component {
  state = { ipfsDrive: [], web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = IPFSDrive.networks[networkId];
      const driveInstance = new web3.eth.Contract(
        IPFSDrive.abi,
        deployedNetwork && deployedNetwork.address,
      );
      
      const CSDCTokenInstance = new web3.eth.Contract(
        CSDC.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: driveInstance }, this.getFiles);

      
      window.ethereum.on('accountsChanged', async () =>  {
        const changedAccounts = await web3.eth.getAccounts();
        this.setState({accounts:changedAccounts});
        this.getFiles();
      })
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
  
  
  getFiles = async () => {
    try {
      const { accounts, contract } = this.state;
      let filesLength = await contract.methods.getLength().call({from: accounts[0]}); 
      let files = [];
      for (let i=0;i < filesLength; i++) {
        let file = await contract.methods.getFiles(i).call({from: accounts[0]});
        files.push(file);
      }
      this.setState({ipfsDrive: files});
    } catch (error) {
      console.log(error); 
    }
  } 

  onDrop = async (file) => {
    try {
      const { accounts, contract } = this.state;
      const stream = fileReaderPullStream(file);
      const result = await ipfs.add(stream);
      const timestamp = Math.round(+new Date() / 1000);
      const type = file.name.substr(file.name.lastIndexOf(".")+1);
      const fileName = file.name;
      const hash = result[0].hash;
      debugger;
      
      const pinataOptions = {
          pinataMetadata: {
            name: fileName
          }
      };
      
      pinata.pinByHash(hash, pinataOptions).then((result) => {
          //handle
          console.log(result);
      }).catch((err) => {
          //handle error here
          console.log(err);
      });
      let uploaded = await contract.methods.add(hash, file.name, type, timestamp).send({from: accounts[0], gas: 300000});
      console.log(uploaded);
      this.getFiles(); 
    } catch (error) {
      console.log(error);
    }
      
  } 

  render() {
    const {ipfsDrive} = this.state;
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div className="container pt-3">
          <StyledDropZone onDrop={this.onDrop} />
          <Table>
            <thead>
              <tr>
                <th width="2%" scope="row">Type</th>
                <th className="text-left">File Name</th>
                <th className="text-right">Date</th>
              </tr>
            </thead>
            <tbody>
              { ipfsDrive !== [] ?  ipfsDrive.map((item, key)=>(
              <tr>    
                <th><FileIcon 
                      size={30} 
                      extension={item[2]} 
                      {...defaultStyles[item[2]]} 
                      />
                </th>
                <th className="text-left"><a href={"https://ipfs.io/ipfs/"+item[0]}>{item[1]}</a></th>
                <th className="text-right">
                  <Moment format="MM/DD/YYYY" unix>{item[3]}</Moment>
                </th>
              </tr>
            ))  : null}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default App;
