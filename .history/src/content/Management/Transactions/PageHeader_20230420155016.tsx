import { Typography, Button, Grid } from '@mui/material';
import { Space, Table, Tag } from 'antd';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader() {

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }];

  const user = {
    name: 'User',
    avatar: ''
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Resources
        </Typography>
        <Typography variant="subtitle2">
           These are your recent resouces
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Create resource
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
