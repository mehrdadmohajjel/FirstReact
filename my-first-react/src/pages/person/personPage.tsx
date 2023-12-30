import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Space, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { IPerson } from 'models/IPerson';
import React, { useEffect } from 'react';
import {EditTwoTone,DeleteTwoTone,ManOutlined,WomanOutlined,PlusCircleTwoTone,CheckCircleOutlined,StopOutlined} from '@ant-design/icons';
import "moment/locale/fa";
import moment from "moment";

const { Option } = Select;

type Props = {}

const personPage = ({}: Props) => {
    const [myForm] = Form.useForm<IPerson>();
    const [modelOpen,setModalOpen] = React.useState(false);
    const [isLoading,setIsLoading] = React.useState(false);
    const [persons,setPersons]=React.useState<IPerson[]>([]);
    const getPersons =async () => {
        // setIsLoading(true);

        const response = await fetch("https://localhost:7236/api/Users/GetAllUsers");
        const jSonData = await response.json();
        console.log(jSonData);
        setPersons(jSonData);
        console.log(jSonData);
        setIsLoading(false);

    }
    React.useEffect(() =>{
        getPersons(); 

    });
    // const [persons,setPersons]=React.useState<IPerson[]>([
    //     {
    //         id:1,
    //         firstName:"مهرداد",
    //         lastName:"محجل",
    //         address:"asasasasa",
    //         isActive:true,
    //         password:"4767997",
    //         salt:"2288"

    //     },
    //     {
    //         id:2,
    //         firstName:"سمیرا",
    //         lastName:"نورمحمدی",
    //         address:"asasasasa",
    //         isActive:true,
    //         password:"4767997",
    //         salt:"2288"

    //     },
    //     {
    //         id:3,
    //         firstName:"مهدی",
    //         lastName:"محجل",
    //         address:"asasasasa",
    //         isActive:true,
    //         password:"4767997",
    //         salt:"2288"

    //     },
    //     {
    //         id:4,
    //         firstName:"وحید",
    //         lastName:"یزدانیان",
    //         address:"asasasasa",
    //         isActive:true,
    //         password:"4767997",
    //         salt:"2288"

    //     },
    //     {
    //         id:5,
    //         firstName:"رضا",
    //         lastName:"کارگر",
    //         address:"asasasasa",
    //         isActive:true,
    //         password:"4767997",
    //         salt:"2288"

    //     },
    //     {
    //         id:6,
    //         firstName:"محمدرضا",
    //         lastName:"تازیان",
    //         address:"asasasasa",
    //         isActive:true,
    //         password:"4767997",
    //         salt:"2288"


    //     }
        
    // ])
    const columns :ColumnsType<IPerson> = [
        {
          title: 'شناسه',
          dataIndex: 'id',
          key: 'id',

        },
        {
          title: 'نام',
          dataIndex: 'firstName',
          key: 'firstName',

        },
        {
          title: 'نام خانوادگی',
          dataIndex: 'lastName',
          key: 'lastName',
        },
        {
            title: 'تاریخ تولد',
            dataIndex: 'birthFaDate',
            key: 'birthFaDate',
            // render:(age:number) => <span style={{color: age>30 ?'red':'blue'}}>{age}</span>
        },
          {
            title: 'آدرس',
            dataIndex: 'address',
            key: 'address',
            // render: (gender: string) => 
            // <Space>
            //     {gender == 'male' ? <ManOutlined /> :<WomanOutlined />}
            // </Space>
        },
        {
            title: 'وضعیت',
            dataIndex: 'isActive',
            key: 'isActive',
             render: (isActive: boolean) => 
             <Space>
                 {isActive  ? <CheckCircleOutlined /> :<StopOutlined />}
             </Space>
        },
        {
            title:'عملیات',
            dataIndex: 'id',
            key:'id',
            render: (id: number) => 
                <Space>
                    <Button shape='round' icon={<EditTwoTone />} onClick={()=> onDEdit(id)} /> 
                    <Button shape='round' icon={<DeleteTwoTone />} onClick={()=> onDelete(id)}/>
                </Space>
  
              
            },
        
      ];
 const onDelete =(id:number)=>{
    const tempPerson =   persons.filter(p => p.id !== id)
    setPersons(tempPerson)
 }
 const onDEdit =(id:React.Key)=>{
    const person = persons.find(p =>p.id === id)
    if(person)
    {
        myForm.setFieldsValue(person)
        setModalOpen(true);
    }
 }  

 const onSave=()=>{
    setIsLoading(true);
    myForm.submit();
    myForm.validateFields().then(onSaveValidate)
    .catch().finally(() => {setIsLoading(false)});
 }
 const onSaveValidate =(person:IPerson)=>{
    if(person.id){
    const tempPerson1 = persons.filter(p=>p.id<person.id)
    const tempPerson2 = persons.filter(p=>p.id>person.id)
    setPersons([...tempPerson1,person,...tempPerson2])
    }
    else
    {
      person.id =Math.max(...persons.map(p => p.id!))+1
      setPersons([...persons,person])
    }
    setModalOpen(false);
 }

 const onNew=()=>
 {
    myForm.resetFields();
    setModalOpen(true);
 }

  return (
    <>
    <Spin spinning={false} >
    <Row>
        <Col>
        <Button shape='round' icon={<PlusCircleTwoTone />} onClick={()=> onNew()  } />
        </Col>
    </Row>
    <Table dataSource={persons} columns={columns}  pagination={{ pageSize: 5 ,defaultCurrent :1, showSizeChanger:true, showQuickJumper:true}}  loading={isLoading} />
    <Modal title="ویرایش اطلاعات" open={modelOpen} onCancel={()=>setModalOpen(false)} onOk={()=>onSave()}  >
    <Form
        name="basic"
        initialValues={{ remember: true }}
        autoComplete="off"
        dir='rtl'
        form={myForm}
    >
        <Form.Item name ="id" label="id" hidden ><Input /> </Form.Item>
        <Form.Item name="firstName" label="نام" rules={[{required:true},{type:'string',min:3,max:10}]} labelCol={{span:5}}>
        <Input />
        </Form.Item>
        <Form.Item name="lastName" label="نام خانوادگی" rules={[{required:true},{type:'string',min:5,max:20}]} labelCol={{span:5}}>
        <Input /> 
        </Form.Item>
        <Row>
            <Col span={12}>
            <Form.Item name="BirthDate" label="تاریخ تولد" rules={[{required:false},{type:'date'}]} labelCol={{span:10}} wrapperCol={{span:10}}        
            >
        <Input />
        </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item name="address" label="آدرس" rules={[{required:false},{type:'string'}]} labelCol={{span:10}} wrapperCol={{span:10}}        
            >
        <Input />
        </Form.Item>
            </Col>

        </Row>

  </Form>
    </Modal>
    </Spin>
    </>
  )
}

export default personPage 