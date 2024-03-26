import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3,
        padding : "0px"
        }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider',
    backgroundColor : "#EBEFF8"
    }}>
        <Tabs value={value} onChange={handleChange} 
        aria-label="basic tabs example"
        TabIndicatorProps={{
            style: {
              backgroundColor: "#D97D54"
            }
          }}
          sx={{ margin: '10px'}}
        >
          <Tab label="Geometry" {...a11yProps(0)} 

          />
          <Tab label="Quick Graph" {...a11yProps(1)} 

          />
       
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {props.tab1}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {props.tab2}
      </CustomTabPanel>

    </Box>
  );
}