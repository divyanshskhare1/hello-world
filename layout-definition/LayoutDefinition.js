import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import {Modal, Upload, Select, Card, Input, Button, Popconfirm, Table, Divider, Tag, Steps, Breadcrumb, Row, Col, Radio, Popover, Icon, message } from 'antd';
import './layoutdefinition.less';
//import CompactTable from './..'
import CompactTable from './../../components/table/CompactTable'
import AutoConfig from '../auto-config/auto-config';
var hoverContent = require('./../infomapper.js').default;

const { TextArea } = Input;

const RadioGroup = Radio.Group;
const Step = Steps.Step;

const postURL = "http://10.11.14.79/recon/product/getSource/TestProject/Testsource1";

const columns = [{
    title: 'Section',
    dataIndex: 'Section',
    key: 'Section',
}, {
    title: 'Formula',
    dataIndex: 'Formula',
    key: 'Formula',
}];

const data = [{
    key: '1',
    Section: 'Data(*)',
    Formula: '-'
},];


export default class LayoutDefinition extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            val2:'',
            val3:'',
            sectionData: "",
            tableData: [],

            autoConfigDisable: true,
            
            flag : false,
            
        }
        
        this.onUploadChange = this.onUploadChange.bind(this);
        this.showRecordModal = this.showRecordModal.bind(this);
        this.onApplyClicked = this.onApplyClicked.bind(this);
        
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);

    }

    handleOk(){
        this.setState({flag : false}); //for opening modal on no radio button
    }

    onTextChange= (e) => {
        this.setState({
            sectionData : e.target.value,
        });
    }

    handleAdd = () => {
        const { count, data } = this.state;
        const newData = {
          key: count,
          Section: `Data(*)`,
          Formula: '-',       
        };
        this.setState({
          data: [...data, newData],
          count: count + 1,
        });
      }
    
      showRecordModal(){
       this.setState({flag : true});
    }


    onUploadChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          this.setState({ autoConfigDisable: false });
          message.success(`${info.file.name} file uploaded successfully you can now use auto Configuration`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }

    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }

    onChange2 = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            val2: e.target.value,
        });
    }

    onChangetxt = (e) => {
        console.log(e.target.value)
        this.setState({
            val3: e.target.value
        });
    }

    onApplyClicked(e){

        var tokens = this.state.sectionData.split('\n'); //delimiter
        var sectionArray = [];
        
        console.log("SECTION DATA :: ",tokens);

        for(let i=0; i<tokens.length; i++ ){
           
            var object = {};

            object.Section = tokens[i];
            object.Formula = '-';
            sectionArray.push(object);
        }

        console.log("SECTIONArray DATA :: ",sectionArray);

        this.setState({
            tableData : sectionArray,
            
        });

        //console.log("Table DATA :: ",tableData);

        this.props.setLayoutDefinition(sectionArray);

        console.log("sectionArray:: ",sectionArray);

    }

    handleCancel(){
        this.setState({flag : false});
    }

    
    // setValLayoutDefinition() {
        
    //     //results for source and recon jobs with respective to project
    //  fetch('http://10.10.18.20:8080/recon/product/saveProductSource/111')
    //  .then(res => res.json())
    //  .then(
    //    (result) => {
    //      console.log("LIST :: ",result);
 
    //      this.props.setData("id",result.id);
    //      this.props.setData("name",result.name);
 
    //      this.setState({ source_list: result.sourceConfig.fileTypeSourceConfig.fieldConfigs })
 
    //  //    var rows = [];
 
    //      for (let i = 0; i <result.sourceConfig.fileTypeSourceConfig.fieldConfigs.length ; i++){
 
    //          var object = {};

    //       //   object.key = i+'';
    //          object.EncodingType = "";//result.sourceConfig.fileTypeSourceConfig.fieldConfigs[i].fieldName;
    //         // console.log("NAME :: ",result.sourceConfig.fileTypeSourceConfig.fieldConfigs[i].fieldName)
 
    //         this.rows.push(object);
 
    //      }
 
    //    //  console.log("ROWS :: ",rows)
 
    //      this.setState({
    //          data : this.rows,
    //      });
 
    //      this.props.setData("fieldConfigs",this.rows);
 
    //      //this.setState({ recon_list: result.reconList })
    //    },
 
    //    (error) => {
    //      console.log("Cannot fetch source list");
    //      console.log(error);
    //    }
    //  )
 
    //  }
 

    render() {
        const Option = Select.Option;

        const props = {
            name: 'file',
            action: '//jsonplaceholder.typicode.com/posts/',
            headers: {
              authorization: 'authorization-text',
            }, onChange: this.onUploadChange,
            multiple: false
          };
      
        function handleChange(value) {
            console.log(`selected ${value}`);
        }

        function handleBlur() {
            console.log('blur');
        }

        function handleFocus() {
            console.log('focus');
        }

        const val = this.state.value;
        const val2=this.state.val2;

        return (
            <div>
                <div >
                {/* <AutoConfig/> */}
                    {/* <h2>Layout Definition</h2> */}
                    { !(val === 'yes')?( 
                    <div>
                        <h3>
                            Does the file have multiple data sections?  &nbsp;&nbsp;
                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                                <Radio value="yes" >Yes</Radio>
                                    <Radio value="no" >No</Radio>
                            </RadioGroup>

                            <Popover placement="right" title="Datasets"
                                content={hoverContent.maparray.question_info}
                            >
                                <Icon className="infoIcon" type="question-circle" style={{ marginTop: "5px",cursor:'pointer' }} />
                            </Popover>

                        </h3> 
                    </div>):(<div></div>)}
                    <br />
                    { (val === 'no')?( 
                    <div>
                        <h3>
                            Does the your file have column header?  &nbsp;&nbsp;
                          <RadioGroup onChange={this.onChange2} value={this.state.val2}>
                                <Radio value="positive" >Yes</Radio>
                                   {/*  <Link to="/RecordTokenizer"> */}
                                    <Radio value="negative" >No</Radio>
                                    {/* </Link> */}
                            </RadioGroup>
                            
                            <Popover placement="right" title="Datasets"
                                content={hoverContent.maparray.question_info}
                            >
                                <Icon className="infoIcon" type="question-circle" style={{ marginTop: "5px",cursor:'pointer' }} />
                            </Popover>

                        </h3> 
                    </div>):(<div></div>)}<br/>
                    { (val2 === 'positive')?( 
                    <div style={{display:'flex'}}>
                         <Upload {...props} >
            <Button className="ant-btn btn ant-btn-primary" >Upload Sample file</Button>
            
          </Upload>
          <Button className="ant-btn btn ant-btn-primary" onClick = {this.showRecordModal} disabled={this.state.autoConfigDisable} >Preview Auto-configuration</Button>
          
          
                    </div>):(<div></div>)}
                </div>

                {
                    val === 'yes' ? (
                        <div className="cs">
                            <Card className="cardStyle">
                                <Row>
                                    <Col span={4}>
                                        <label className="subHeading3">Character Encoding :</label>
                                    </Col>
                                    <Col span={10}>
                                        <Select
                                            showSearch
                                            className="selectElement"
                                            placeholder="Character Encoding"
                                            optionFilterProp="children"
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            defaultValue="UTF-8"
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Option value="utf8">UTF-8</Option>
                                            <Option value="utf16">UTF-16</Option>
                                        </Select>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={4}>
                                    <label className="subHeading3">File Layout :      </label>
                                    <Popover placement="right" title="Datasets"
                                        content={hoverContent.maparray.file_layout}
                                    // <DatasetCard/>

                                    >
                                        <Icon className="infoIcon" type="question-circle" />
                                    </Popover>
                                    </Col>
                                </Row><br/>
                                <Row>
                                    <Col span={24}>
                                    <TextArea autosize={{ minRows: 3, maxRows: 3 }} onChange = {this.onTextChange} className='customTextarea' value = {this.state.sectionData} placeholder="Data(*)" on  />
                              
                                    </Col>
                                </Row>
                                <Row>
                                <Button  className='applyButton' onClick={this.onApplyClicked}>Apply</Button>
                                </Row>
                            </Card>
                            <br/>
                            <Card
                                className="cardStyle"
                                title="Section Identification"                                
                            >
                                <div className="sectable">
                                <CompactTable size="small" columns={columns} dataSource={this.state.tableData} />
                                </div>
                            </Card>
                                                       
                        </div>
                    ) :
                        val === 'no' ?
                            (

                                <Link to="/RecordTokenizer"></Link>

                            ) : (<div></div>)
                }
               <Modal
                              
                           title="Auto Configuration"
                            onClick = {this.showModal}     
                            visible={this.state.flag}
                            onOk={this.handleOk}
                            okText="Proceed"
                           
                            onCancel={this.handleCancel} 
                            className="customModal"
                            
>                          
                            <AutoConfig/>
                            </Modal> 

                          
                   
            </div>
        )
    }
}
