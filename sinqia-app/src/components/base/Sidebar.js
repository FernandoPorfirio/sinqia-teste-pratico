import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/navigation';

export default function Sidebar({ open, onClose }) {
  const router = useRouter();

  return (
    <Drawer open={open} onClose={onClose}>
      <List sx={{ width: 240 }}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => { router.push('/'); onClose(); }}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}