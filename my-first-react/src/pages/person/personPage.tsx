import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { IPerson } from 'models/IPerson';
import React from 'react';
import {EditTwoTone,DeleteTwoTone,ManOutlined,WomanOutlined} from '@ant-design/icons';

type Props = {}

const personPage = ({}: Props) => {

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
                    <Button shape='round' icon={<EditTwoTone />} /> 
                    <Button shape='round' icon={<DeleteTwoTone />} onClick={()=> onDelete(id)}/>
                </Space>
  
              
            },
        
      ];
 const onDelete =(id:number)=>{
    const tempPerson =   persons.filter(p => p.id !== id)
    setPersons(tempPerson)
 }
  return (
    <Table dataSource={persons} columns={columns}  pagination={{ pageSize: 5 ,defaultCurrent :1, showSizeChanger:true, showQuickJumper:true}}  />

  )
}

export default personPage 