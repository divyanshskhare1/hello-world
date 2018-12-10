import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal, Form, Input, Radio, Select, Progress, Spin, Icon } from 'antd';
import { Breadcrumb, Steps, Card, Row, Col } from 'antd';
import CustomTabs from './../../components/tabs/Tabs';
const Step = Steps.Step;
const Option = Select.Option;
/* const TabPane = Tabs.TabPane; */

const TabModal = Form.create()(
    class extends React.Component {
        constructor(props) {
            super(props);
            console.log(props);
            this.state = { visible: '', activeKey:this.props.activeTab, }
            this.showAddRecord = this.showAddRecord.bind(this);
            this.getCurrentTab = this.getCurrentTab.bind(this);
            this.setForm = this.setForm.bind(this);
            this.setData = this.setData.bind(this);
            this.setLayoutDefinition = this.setLayoutDefinition.bind(this);
        }

        setData(key,value){
            this.props.setData(key,value)
        }

        setLayoutDefinition(sectionArray){
            this.layoutDefinitionTable = sectionArray;
            console.log("From tabModal's : ", this.layoutDefinitionTable)
        }

        getCurrentTab(value){
            this.props.setCurrentTab(value);    
        }

        showAddRecord(){
            this.props.onClick();
        }

        setForm(form){
            console.log("TAB MODAL PROPS :: ",this.props);
                console.log("TAB MODAL FORM :: ",form);
                //this.props.setForm(form);
        }

        callback = (key) => {
            console.log(key);
          }
        render() {
            const { visible, onCancel, onOk } = this.props;
            
            return (
                <div>

                    
                    <Modal
                        visible={visible}
                        title="Source Function"
                        onOk={onOk}
                        onCancel={onCancel}
                        okText="Save"
                        className="customModal"
                        footer={[
                             <Button key="submit" type="primary">
                             Apply
                             </Button>,
                            <Button key="back" type="primary" onClick={onCancel}>OK</Button>,
                            <Button key="submit"  onClick={onCancel}>
                            Cancel
                            </Button>,
                           
                            ]}
                    >
                    <CustomTabs setLayoutDefinition={this.setLayoutDefinition} setData = {this.setData}  setForm = {this.setForm} onClick = {this.showAddRecord} activeKey = {this.props.activeTab} getCurrentTab = {this.getCurrentTab}/>
                    </Modal>
                </div>
            );
        }
    }
)

export default TabModal;