import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { IPerson } from 'models/IPerson';
import React from 'react';
import {EditTwoTone,DeleteTwoTone,ManOutlined,WomanOutlined} from '@ant-design/icons';

const { Option } = Select;

type Props = {}

const personPage = ({}: Props) => {
    const [myForm] = Form.useForm();
    const [modelOpen,setModalOpen] = React.useState(false);
    const [persons,setPersons]=React.useState<IPerson[]>([
        {
            id:1,
            age:37,
            firstName:"مهرداد",
            gender:'male',
            lastName:"محجل"
        },
        {
            id:2,
            age:34,
            firstName:"سمیرا",
            gender:'female',
            lastName:"نورمحمدی"
        },
        {
            id:3,
            age:18,
            firstName:"مهدی",
            gender:'male',
            lastName:"محجل"
        },
        {
            id:4,
            age:36,
            firstName:"وحید",
            gender:'male',
            lastName:"یزدانیان"
        },
        {
            id:5,
            age:22,
            firstName:"رضا",
            gender:'male',
            lastName:"کارگر"
        },
        {
            id:6,
            age:18,
            firstName:"محمدرضا",
            gender:'male',
            lastName:"تازیان"
        }
        
    ])
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
            title: 'سن',
            dataIndex: 'age',
            key: 'age',
            render:(age:number) => <span style={{color: age>30 ?'red':'blue'}}>{age}</span>
        },
          {
            title: 'جنسیت',
            dataIndex: 'gender',
            key: 'gender',
            render: (gender: string) => 
            <Space>
                {gender == 'male' ? <ManOutlined /> :<WomanOutlined />}
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
 const onDEdit =(id:number)=>{
    const person = persons.find(p =>p.id === id)
    myForm.setFieldsValue(person)
    setModalOpen(true);
 } 

 const onSave=()=>{
    myForm.submit();
    myForm.validateFields().then().catch().finally();
 }
  return (
    <>
    <Table dataSource={persons} columns={columns}  pagination={{ pageSize: 5 ,defaultCurrent :1, showSizeChanger:true, showQuickJumper:true}}  />
    <Modal title="ویرایش اطلاعات" open={modelOpen} onCancel={()=>setModalOpen(false)} onOk={()=>onSave()}  >
    <Form
        name="basic"
        initialValues={{ remember: true }}
        autoComplete="off"
        dir='rtl'
        form={myForm}
    >
        <Form.Item name="firstName" label="نام" rules={[{required:true},{type:'string',min:3,max:10}]} labelCol={{span:5}}>
        <Input />
        </Form.Item>
        <Form.Item name="lastName" label="نام خانوادگی" rules={[{required:true},{type:'string',min:5,max:20}]} labelCol={{span:5}}>
        <Input /> 
        </Form.Item>
        <Row>
            <Col span={12}>
            <Form.Item name="age" label="سن" rules={[{required:false},{type:'number',min:15,max:80}]} labelCol={{span:10}} wrapperCol={{span:10}}            
            >
        <InputNumber />
        </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item name="gender" label="جنسیت" rules={[{required:true}]} labelCol={{span:10}} wrapperCol={{span:10}}>
        <Select   >
            <Option value="male"> مرد </Option>
            <Option value="female"> زن </Option>
        </Select>
        </Form.Item>

            </Col>
        </Row>
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
    </Modal>
    </>
  )
}

export default personPage 