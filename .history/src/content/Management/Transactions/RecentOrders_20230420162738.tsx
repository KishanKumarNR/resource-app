import { Card } from '@mui/material';
import { CryptoOrder } from '@/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import { Space, Table, Tag } from 'antd';
import { useEffect, useState } from "react";

function RecentOrders() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://engineering-task.elancoapps.com/api/resources")
      .then(response => response.json())
      .then(result => setData(result.map((item, index) => ({
        key: index,
        name: item
      }))));
  }, []);
  // const cryptoOrders: CryptoOrder[] = [
  //   {
  //     id: '1',
  //     orderDetails: 'Fiat Deposit',
  //     orderDate: new Date().getTime(),
  //     status: 'completed',
  //     orderID: 'VUVX709ET7BY',
  //     sourceName: 'Bank Account',
  //     sourceDesc: '*** 1111',
  //     amountCrypto: 34.4565,
  //     amount: 56787,
  //     cryptoCurrency: 'ETH',
  //     currency: '$'
  //   },
  //   {
  //     id: '2',
  //     orderDetails: 'Fiat Deposit',
  //     orderDate: subDays(new Date(), 1).getTime(),
  //     status: 'completed',
  //     orderID: '23M3UOG65G8K',
  //     sourceName: 'Bank Account',
  //     sourceDesc: '*** 1111',
  //     amountCrypto: 6.58454334,
  //     amount: 8734587,
  //     cryptoCurrency: 'BTC',
  //     currency: '$'
  //   },
  //   {
  //     id: '3',
  //     orderDetails: 'Fiat Deposit',
  //     orderDate: subDays(new Date(), 5).getTime(),
  //     status: 'failed',
  //     orderID: 'F6JHK65MS818',
  //     sourceName: 'Bank Account',
  //     sourceDesc: '*** 1111',
  //     amountCrypto: 6.58454334,
  //     amount: 8734587,
  //     cryptoCurrency: 'BTC',
  //     currency: '$'
  //   },
  //   {
  //     id: '4',
  //     orderDetails: 'Fiat Deposit',
  //     orderDate: subDays(new Date(), 55).getTime(),
  //     status: 'completed',
  //     orderID: 'QJFAI7N84LGM',
  //     sourceName: 'Bank Account',
  //     sourceDesc: '*** 1111',
  //     amountCrypto: 6.58454334,
  //     amount: 8734587,
  //     cryptoCurrency: 'BTC',
  //     currency: '$'
  //   },
  //   {
  //     id: '5',
  //     orderDetails: 'Fiat Deposit',
  //     orderDate: subDays(new Date(), 56).getTime(),
  //     status: 'pending',
  //     orderID: 'BO5KFSYGC0YW',
  //     sourceName: 'Bank Account',
  //     sourceDesc: '*** 1111',
  //     amountCrypto: 6.58454334,
  //     amount: 8734587,
  //     cryptoCurrency: 'BTC',
  //     currency: '$'
  //   },
  //   {
  //     id: '6',
  //     orderDetails: 'Fiat Deposit',
  //     orderDate: subDays(new Date(), 33).getTime(),
  //     status: 'completed',
  //     orderID: '6RS606CBMKVQ',
  //     sourceName: 'Bank Account',
  //     sourceDesc: '*** 1111',
  //     amountCrypto: 6.58454334,
  //     amount: 8734587,
  //     cryptoCurrency: 'BTC',
  //     currency: '$'
  //   },
  //   {
  //     id: '7',
  //     orderDetails: 'Fiat Deposit',
  //     orderDate: new Date().getTime(),
  //     status: 'pending',
  //     orderID: '479KUYHOBMJS',
  //     sourceName: 'Bank Account',
  //     sourceDesc: '*** 1212',
  //     amountCrypto: 2.346546,
  //     amount: 234234,
  //     cryptoCurrency: 'BTC',
  //     currency: '$'
  //   },
  //   {
  //     id: '8',
  //     orderDetails: 'Paypal Withdraw',
  //     orderDate: subDays(new Date(), 22).getTime(),
  //     status: 'completed',
  //     orderID: 'W67CFZNT71KR',
  //     sourceName: 'Paypal Account',
  //     sourceDesc: '*** 1111',
  //     amountCrypto: 3.345456,
  //     amount: 34544,
  //     cryptoCurrency: 'BTC',
  //     currency: '$'
  //   },
  //   {
  //     id: '9',
  //     orderDetails: 'Fiat Deposit',
  //     orderDate: subDays(new Date(), 11).getTime(),
  //     status: 'completed',
  //     orderID: '63GJ5DJFKS4H',
  //     sourceName: 'Bank Account',
  //     sourceDesc: '*** 2222',
  //     amountCrypto: 1.4389567945,
  //     amount: 123843,
  //     cryptoCurrency: 'BTC',
  //     currency: '$'
  //   },
  //   {
  //     id: '10',
  //     orderDetails: 'Wallet Transfer',
  //     orderDate: subDays(new Date(), 123).getTime(),
  //     status: 'failed',
  //     orderID: '17KRZHY8T05M',
  //     sourceName: 'Wallet Transfer',
  //     sourceDesc: "John's Cardano Wallet",
  //     amountCrypto: 765.5695,
  //     amount: 7567,
  //     cryptoCurrency: 'ADA',
  //     currency: '$'
  //   }
  // ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resource,  ] = useState("");
  const showModal = () => {
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

          }, // click row
        }
      }} />
      {/* <RecentOrdersTable cryptoOrders={cryptoOrders} /> */}
    </Card>
  );
}

export default RecentOrders;
