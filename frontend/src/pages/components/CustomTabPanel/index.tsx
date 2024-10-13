import { Box, Typography } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, ...other } = props;

  return (
    <div role="tabpanel" {...other}>
      <Box sx={{ p: 3 }} justifyContent={'center'} alignItems={'center'}>
        <Typography>{children}</Typography>
      </Box>
    </div>
  );
}

export default CustomTabPanel;
