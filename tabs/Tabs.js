import React, { Component } from 'react';
import {Tabs} from 'antd';
import Tokenizer from '../../pages/record-tokenizer/RecordTokenizer'
import LayoutDefinition from './../../pages/layout-definition/LayoutDefinition';
import NewSourceDefinition from './../../pages/newsourcedefinition/NewSourceDefinition';
import './Tabs.less';
const TabPane = Tabs.TabPane;

export default class ModalTabs extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            activeKey: this.props.activeKey,
        }
        
        this.showAddRecordModal = this.showAddRecordModal.bind(this);
        this.setLayoutDefinition = this.setLayoutDefinition.bind(this);

        this.setForm = this.setForm.bind(this);
        this.setData = this.setData.bind(this);

        console.log("ModalTabs :: ",this.props); 
        
    }

    componentDidMount() {
        
        console.log("componentDidMount ::: ")
        
      }

      setData(key,value){    
        this.props.setData(key,value);
      }

      setForm(form){
        console.log("form ::: ",form);
        console.log("Props ::: ",this.props);
        this.props.setForm(form);
      }

    changeTab(key){
         console.log("Key :: ",key);       
        //  this.setState({
        //         activeKey: key,
        //  });    
    }

    showAddRecordModal(){    
      this.props.onClick();
    }

    setLayoutDefinition(sectionArray){
        console.log("This is Tab's : ", sectionArray);
       this.props.setLayoutDefinition(sectionArray);
       console.log("This is : ", sectionArray);
    }

    render() {

        this.tab = this.props.activeKey;

        this.props.getCurrentTab(this.props.activeKey);//(this.props.activeKey);

        return(
        <Tabs className="customeTab" defaultActiveKey={"1"} onChange = {this.changeTab} type="card">
            <TabPane className="customeTabPanel" tab="Source Definition" key="1"><NewSourceDefinition setForm = {this.setForm} wrappedComponentRef={this.saveSourceForm}/></TabPane>
            <TabPane className="customeTabPanel" tab="Layout Definition" key="2"><LayoutDefinition setLayoutDefinition = {this.setLayoutDefinition}/></TabPane>
            <TabPane className="customeTabPanel" tab="Record Definition" key="3"><Tokenizer setData = {this.setData} onClick = {this.showAddRecordModal} /></TabPane>
        </Tabs>
        );
    }
}