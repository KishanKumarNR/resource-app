import { Card } from '@mui/material';
import { CryptoOrder } from '@/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import { Space, Table, Tag } from 'antd';
import { useEffect, useMemo, useState } from "react";
import { Button, Modal } from 'antd';
import { Form } from 'antd'
import FormBuilder from 'antd-form-builder'

function RecentOrders() {
  const [data, setData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resource, setResource] = useState("");
  const [resourceDetails, setResourceDetails] = useState([]);


  const meta = useMemo(() => {
    fetch("")
    return {
      fields: [
        // { key: 'username', label: 'User Name' },
        // { key: 'password', label: 'Password', widget: 'password' },
      ],
    };
  }, [resource])

  const details = useMemo(() => {

  }, [resource]);

  useEffect(() => {
    fetch(`https://engineering-task.elancoapps.com/api/resources/${resource}`)
      .then(response => response.json())
      .then(result => setResourceDetails(result));
  }, [resource]);

  const handleFinish = values => {
    console.log('Submit: ', values)
  }

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

  const modalColumns: any = [
    {
      title: 'ConsumedQuantity',
      dataIndex: 'ConsumedQuantity',
      key: 'ConsumedQuantity',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Cost',
      dataIndex: 'Cost',
      key: 'Cost',
    },
    {
      title: 'Date',
      dataIndex: 'Date',
      key: 'Date',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'Tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ]

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
        <Table columns={modalColumns} dataSource={resourceDetails} />
        <Form onFinish={handleFinish}>
          <FormBuilder meta={meta} />
        </Form>
      </Modal>
      {/* <RecentOrdersTable cryptoOrders={cryptoOrders} /> */}
    </Card>
  );
}

export default RecentOrders;
