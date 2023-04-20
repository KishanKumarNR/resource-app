import { ChangeEvent, useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Radio,
  FormControlLabel,
  Typography,
  Card,
  CardHeader,
  Divider,
  lighten,
  CardActionArea,
  CardContent,
  Tooltip,
  IconButton,
  Avatar,
  styled
} from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Space, Table, Tag, Modal } from 'antd';

const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
`
);

const CardLogo = styled('img')(
  ({ theme }) => `
      border: 1px solid ${theme.colors.alpha.black[30]};
      border-radius: ${theme.general.borderRadius};
      padding: ${theme.spacing(1)};
      margin-right: ${theme.spacing(2)};
      background: ${theme.colors.alpha.white[100]};
`
);

const CardAddAction = styled(Card)(
  ({ theme }) => `
        border: ${theme.colors.primary.main} dashed 1px;
        height: 100%;
        color: ${theme.colors.primary.main};
        box-shadow: none;
        
        .MuiCardActionArea-root {
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        
        .MuiTouchRipple-root {
          opacity: .2;
        }
        
        &:hover {
          border-color: ${theme.colors.alpha.black[100]};
        }
`
);

const IconButtonError = styled(IconButton)(
  ({ theme }) => `
     background: ${theme.colors.error.lighter};
     color: ${theme.colors.error.main};
     padding: ${theme.spacing(0.5)};

     &:hover {
      background: ${lighten(theme.colors.error.lighter, 0.4)};
     }
`
);

const CardCc = styled(Card)(
  ({ theme }) => `
     border: 1px solid ${theme.colors.alpha.black[30]};
     background: ${theme.colors.alpha.black[5]};
     box-shadow: none;
`
);

function MyCards() {

  const [cards, setCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resourceDetails, setResourceDetails] = useState({});
  const [application, setApplication] = useState("");

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

  useEffect(() => {
    fetch(`https://engineering-task.elancoapps.com/api/resources/${resource}`)
      .then(response => response.json())
      .then(result => setResourceDetails(result));
  }, [application]);


  useEffect(() => {
    fetch("https://engineering-task.elancoapps.com/api/applications")
    .then(response => response.json())
    .then(result => setCards(result))
  }, []);

  
  const data = {
    savedCards: 7
  };

  const handleCardClick = (card: any) => {
    // display modal data
  }

  const [selectedValue, setSelectedValue] = useState('a');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleDelete = () => {};

  

  const showModal = (data) => {
    setApplication(data?.name);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Card>
      <CardHeader subheader={data.savedCards + ' saved cards'} title="Cards" />
      <Divider />
      <Box p={3}>
        <Grid container spacing={3}>
          {
            cards.length ? cards.map((card, index) => {
              return (    <Grid key={index} item xs={12} sm={6} onClick={() => showModal(card)}>
                <CardCc sx={{ px: 2, pt: 2, pb: 1 }} onClick={() => handleCardClick(card)}>
                  <Box display="flex" alignItems="center">
                    <CardLogo
                      src="/static/images/placeholders/logo/slack.svg"
                      alt="Visa"
                    />
                    <Box>
                      <Typography variant="h3" fontWeight="normal">
                        {card}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    pt={3}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <FormControlLabel
                      value="a"
                      control={
                        <Radio
                          checked={selectedValue === 'a'}
                          onChange={handleChange}
                          value="a"
                          color="primary"
                          name="primary-card"
                        />
                      }
                      label="Primary"
                    />
                    <Tooltip arrow title="Remove this card">
                      <IconButtonError onClick={() => handleDelete()}>
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButtonError>
                    </Tooltip>
                  </Box>
                </CardCc>
              </Grid>)
            }): null
          }
          <Grid item xs={12} sm={6}>
            <Tooltip arrow title="Click to add a new card">
              <CardAddAction>
                <CardActionArea sx={{ px: 1 }}>
                  <CardContent>
                    <AvatarAddWrapper>
                      <AddTwoToneIcon fontSize="large" />
                    </AvatarAddWrapper>
                  </CardContent>
                </CardActionArea>
              </CardAddAction>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
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
    </Card>
  );
}

export default MyCards;
