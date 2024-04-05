import * as React from 'react';
import { Select, MenuItem, ListItemText, ListItemButton, Avatar } from '@mui/material';
import ItsAvatar from '@/components/modules/ItsAvatar';
import { useRouter } from 'next/navigation';
import { ListItemAvatar } from '@mui/material-next';

const CustomAvatarSelect = ({ user, onChange }) => {
  const router = useRouter();
  const [selectedBusinessId, setSelectedBusinessId] = React.useState(user?.primeJob); // Initially no selection

  const handleBusinessChange = (event) => {
    setSelectedBusinessId(event.target.value);
    // onChange(event.target.value); // Pass the selected value to the parent component
  };

  return (
    <Select
      sx={{ display: 'flex', flexWrap: 'wrap' }}
      value={selectedBusinessId} // Use the state value for default display
      onChange={handleBusinessChange}
    >
      {user?.businesses.map((business) => (
        <MenuItem
          key={business._id}
          value={business._id} // Use business._id as the value for each option
          sx={{ display: 'flex', alignItems: 'center', minWidth: '150px' }}
        >
          <ListItemAvatar>
            <Avatar sx={{ width: 40, height: 40 }}>
              <ItsAvatar userCodeOrBusinessBrand={business.businessName} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={business.businessName} secondary={business.businessBrand} />
        </MenuItem>
      ))}
    </Select>
  );
};

export default CustomAvatarSelect;
