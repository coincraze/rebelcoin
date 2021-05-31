import React, { Component } from "react";
import IPFSDrive from "./contracts/IPFSDrive.json";
import getWeb3 from "./getWeb3"; 
import { StyledDropZone } from 'react-drop-zone';
import { Table } from 'reactstrap';
import { FileIcon, defaultStyles } from 'react-file-icon';
import "react-drop-zone/dist/styles.css";
import "bootstrap/dist/css/bootstrap.css";
 
import "./App.css";

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
      const instance = new web3.eth.Contract(
        IPFSDrive.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
  
  
  getFiles = async () => {
      
      
  } 

  onDrop = async () => {
      
      
  } 

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div className="container pt-3">
          <StyledDropZone />
          <Table>
            <thead>
              <tr>
                <th width="2%" scope="row">Type</th>
                <th className="text-left">File Name</th>
                <th className="text-right">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th><FileIcon size={30} extension="docx" {...defaultStyles.docx} /></th>
                <th className="text-left">File Name.docx</th>
                <th className="text-right">2021//6/1</th>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default App;
