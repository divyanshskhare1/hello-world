import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Select, Steps, Modal} from 'antd';
import Img from './../../assets/images/flowDig.png';
import './ReconFlow.less'
import AddNewRecord from './../modal-forms/AddNewRecord';
import ReconProcess1 from './../modal-forms/ReconProcess1';
import ReconProcess2 from './../modal-forms/ReconProcess2';
import TabModal from './TabModal';
const urls = require('./../../utility/urls').default;
const Step = Steps.Step;
const Option = Select.Option;

export default class ReconFlow extends Component {
    
    constructor(props) {
        super(props);
        this.currentTab = "";

        this.reqObject = {};
        this.sourceConfig = {};
        this.fileTypeSourceConfig = {};
        this.fieldConfigs = {};
        this.delimittedFileConfig = {};
        this.layoutDefinitionTable = {};

        this.state = { visible: '', activeTab: "1" };
        this.handleOk = this.handleOk.bind(this);
        this.setData = this.setData.bind(this);
    }
    
    setData(key,value){
        if(key === 'id'){
            this.reqObject.id = value;    
        }

        if(key === 'name'){
            this.reqObject.name = value;    
        }

        if(key === "fieldConfigs" ){
            this.fieldConfigs = value;

            this.fileTypeSourceConfig.fieldConfigs = this.fieldConfigs;
            this.sourceConfig.fileTypeSourceConfig =  this.fileTypeSourceConfig;

            this.reqObject.sourceConfig = this.sourceConfig;
        }

        if(key === 'fileSeparator'){
            this.fileTypeSourceConfig.recordSeperator = value;
            
            this.fileTypeSourceConfig.fieldConfigs = this.fieldConfigs;
            this.sourceConfig.fileTypeSourceConfig =  this.fileTypeSourceConfig;

            this.reqObject.sourceConfig = this.sourceConfig;
        }

        console.log("REQ OBJECT ::",this.reqObject)
    }

    setLayoutDefinition(sectionArray){
        this.layoutDefinitionTable = sectionArray;
        console.log("Its reconflow TableData",layoutDefinitionTable)
    }

    setCurrentTab = (val) => {
        this.currentTab = val;
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    showModal2 = () => {
        this.setState({
            visible: "three",
        });
    }
    showModal3 = () => {
        this.setState({
            addRecordVisible: true,
        });
    } 
    handleOk = (e) => {
        this.setState({
            visible: "two",
        });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    handleModal = (e) => {
        this.setState({
            visible: false,
        });
    }
    handleSave = () => {
        const form = this.saveSourceForm;
        this.setState({ visible: false });

        console.log("*** Original Data ***")
        console.log(this.reqObject);
        console.log("*** Original Data ***")
    
        var payload = {};
        payload.sourceId  = 1;
        payload.sourceName  = "TestSource1";
        payload.sourceConfig = {};
        payload.sourceConfig.fileTypeSourceConfig = {};
        payload.sourceConfig.fileTypeSourceConfig.recordSeperator = ";"
            
        fetch(urls.urlarray.SaveSource, {
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            method: "POST",
            body: JSON.stringify(this.reqObject)
        })
    
            
            .then(function (response) {
                console.log("All Response - ", response);
                console.log(JSON.stringify(response));
                console.log("Response Status Code - ", response.status)
    
                if (response.status === 302) {
                    console.log("Get successfull");
                    this.setState({ validate: true });
                    this.setState({ error_msg: false });
                    // console.log("After return", this.state.validate);
                }
                else if (response.status === 404) {
                    //console.log("Username password do not match");
                    this.setState({ validate: false });
                    this.setState({ error_msg: true });
                }
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
        
       // const form = this.saveSourceForm;
    }
    
    render(){        
        const modalview = this.state.visible;
        console.log("RECON FLOW RENDER :: ",modalview);
        return(
            <div>
                <img className='taskDesign' src={Img} />

                <div className="clickableDiv" onDoubleClick={this.showModal}></div>
                <div className="clickableDiv1" onDoubleClick={this.showModal2}></div>
                
                {(modalview === "three") ? (
                    <div>
                        <TabModal
                            setData = {this.setData}
                            setForm={this.saveSourceForm}
                            setLayoutDefinition={this.setLayoutDefinition}
                            activeTab={this.state.activeTab}
                            setCurrentTab={this.setCurrentTab}
                            onClick={this.showModal3}
                            visible={this.state.visible}
                            onOk={this.handleSave}
                            
                            onCancel={this.handleCancel} />

                        {/* <AddNewRecord
                            wrappedComponentRef={this.saveFormRef} 
                            visible={this.state.addRecordVisible}
                            onCancel={this.handleAddRecordCancel}
                            onCreate={this.handleCreate}
                            visible1={this.state.loadervisible} /> */}
                    </div>
                ): !(modalview === "two") ? (
                    <div>
                        <ReconProcess1
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel} />
                    </div>
                ) : (<div>
                    <ReconProcess2
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onOk={this.handleModal} />
                </div>)}
            </div>
        )
    }
}