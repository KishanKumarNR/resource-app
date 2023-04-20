import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import Footer from '@/components/Footer';

import { Grid, Container } from '@mui/material';
import { Space, Table, Tag, Modal } from 'antd';

import ProfileCover from '@/content/Management/Users/details/ProfileCover';
import RecentActivity from '@/content/Management/Users/details/RecentActivity';
import Feed from '@/content/Management/Users/details/Feed';
import PopularTags from '@/content/Management/Users/details/PopularTags';
import MyCards from '@/content/Management/Users/details/MyCards';
import Addresses from '@/content/Management/Users/details/Addresses';

function ManagementUserProfile() {
  const user = {
    savedCards: 7,
    name: 'Catherine Pike',
    coverImg: '/static/images/placeholders/covers/5.jpg',
    avatar: '/static/images/avatars/4.jpg',
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage",
    jobtitle: 'Web Developer',
    location: 'Barcelona, Spain',
    followers: '465'
  };

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
      title: 'MeterCategory',
      dataIndex: 'MeterCategory',
      key: 'MeterCategory',
    },
    {
      title: 'ResourceGroup',
      dataIndex: 'ResourceGroup',
      key: 'ResourceGroup',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'Tags',
      render: (_, { Tags }) => (
        <>
          {Object.keys(typeof Tags === 'object' ? Tags : {})?.map((tag) => {
            let color = tag === "app-name" ? "volcano" : 'geekblue';
            if (tag === 'environment') {
              color = 'green';
            }
            return (
              <Tag color={color} key={tag}>
                {Tags[tag].toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'Location',
      key: 'Location',
    },
    {
      title: 'ServiceName',
      dataIndex: 'ServiceName',
      key: 'ServiceName',
    },
    {
      title: 'Date',
      dataIndex: 'Date',
      key: 'Date',
    },
  ]

  return (
    <>
      <Head>
        <title>User Details - Management</title>
      </Head>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          {/* <Grid item xs={12} md={8}>
            <ProfileCover user={user} />
          </Grid>
          <Grid item xs={12} md={4}>
            <RecentActivity />
          </Grid>
          <Grid item xs={12} md={8}>
            <Feed />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularTags />
          </Grid> */}
          <Grid item xs={12} md={7}>
            <MyCards />
          </Grid>
          {/* <Grid item xs={12} md={5}>
            <Addresses />
          </Grid> */}
        </Grid>
      </Container>
      <Modal centered title="Resources" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000} style={{
        overflow: "auto",
        height: "calc(100vh - 300px)"
      }}>
        
        <Table columns={modalColumns} dataSource={resourceDetails}
          style={{
            overflow: "auto",
            width: "calc(100vh)",
            // height: "calc(100vh)"
          }} />
      </Modal>
      <Footer />
    </>
  );
}

ManagementUserProfile.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementUserProfile;