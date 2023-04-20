import { Card } from '@mui/material';
import { CryptoOrder } from '@/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import { Space, Table, Tag } from 'antd';
import { useEffect, useState } from "react";
import { Button, Modal } from 'antd';
import { Form } from 'antd'
import FormBuilder from 'antd-form-builder'

function RecentOrders() {
  const [data, setData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resource,  setResource] = useState("");


  const meta = {
    fields: [
      { key: 'username', label: 'User Name' },
      { key: 'password', label: 'Password', widget: 'password' },
    ],
  }

  useEffect(() => {
    
  }, [resource]);

  const handleFinish = React.useCallback(values => {
    console.log('Submit: ', values)
  }, [])

  useEffect(() => {
    fetch("https://engineering-task.elancoapps.com/api/resources")
      .then(response => response.json())
      .then(result => setData(result.map((item, index) => ({
        key: index,
        name: item
      }))));
  }, []);


  const showModal = (data) => {
    setResource(data?.name);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: any = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>
    }];

  return (
    <Card>

      <Table columns={columns} dataSource={data} 
      onRow={(record, rowIndex) => {
        return {
          onClick: event => {
            console.log(record)
            showModal(record);
          }, // click row
        }
      }} />
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form onFinish={handleFinish}>
      <FormBuilder meta={meta} />
      <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Okay
        </Button>
      </Form.Item>
    </Form>
      </Modal>
      {/* <RecentOrdersTable cryptoOrders={cryptoOrders} /> */}
    </Card>
  );
}

export default RecentOrders;
