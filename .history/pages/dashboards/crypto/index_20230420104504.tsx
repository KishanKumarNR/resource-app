import Head from 'next/head';
import { useEffect, useState } from "react";
import SidebarLayout from '@/layouts/SidebarLayout';

import PageHeader from '@/content/Dashboards/Crypto/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from '@/components/Footer';

import AccountBalance from '@/content/Dashboards/Crypto/AccountBalance';
import Wallets from '@/content/Dashboards/Crypto/Wallets';
import AccountSecurity from '@/content/Dashboards/Crypto/AccountSecurity';
import WatchList from '@/content/Dashboards/Crypto/WatchList';

function DashboardCrypto() {
  
  const [costs, setCosts] = useState([]);
  useEffect(() => {
    fetch("https://engineering-task.elancoapps.com/api/raw")
      .then(response => response.json())
      .then(result => {
        setCosts(result);
        console.log("api data",)
      });
  }, []);
  return (
    <>
      <Head>
        <title>Crypto Dashboard</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          {/* <Grid item xs={12}> */}
            {/* <AccountBalance /> */}
          {/* </Grid> */}
          <Grid item lg={12} xs={12}>
            <Wallets costs={costs} />
          </Grid>
          {/* <Grid item lg={4} xs={12}>
            <AccountSecurity />
          </Grid> */}
          <Grid item xs={12}>
            <WatchList costs={costs} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
