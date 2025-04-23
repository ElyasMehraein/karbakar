'use client';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { Business } from '@/types';

import { useSnackbar } from './SnackbarProvider';


interface ContactEditProps {
  business: Business;
}

interface Contact {
  id: number;
  type: string;
  value: string;
}

export default function ContactEdit({ business }: ContactEditProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [newContactType, setNewContactType] = useState('');
  const [newContactValue, setNewContactValue] = useState('');
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(
          `/api/business/${business.businessCode}/contacts`
        );
        if (response.ok) {
          const data = await response.json();
          setContacts(data);
        } else {
          showSnackbar('خطا در دریافت اطلاعات تماس', 'error');
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
        showSnackbar('خطا در ارتباط با سرور', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [business.businessCode, showSnackbar]);

  const handleEditClick = (contact: Contact) => {
    setSelectedContact(contact);
    setNewContactType(contact.type);
    setNewContactValue(contact.value);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = async (contactId: number) => {
    try {
      const response = await fetch(
        `/api/business/${business.businessCode}/contacts/${contactId}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        setContacts(contacts.filter((contact) => contact.id !== contactId));
        showSnackbar('اطلاعات تماس با موفقیت حذف شد', 'success');
      } else {
        showSnackbar('خطا در حذف اطلاعات تماس', 'error');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      showSnackbar('خطا در ارتباط با سرور', 'error');
    }
  };

  const handleDialogClose = () => {
    setEditDialogOpen(false);
    setSelectedContact(null);
    setNewContactType('');
    setNewContactValue('');
  };

  const handleDialogSubmit = async () => {
    try {
      const url = selectedContact
        ? `/api/business/${business.businessCode}/contacts/${selectedContact.id}`
        : `/api/business/${business.businessCode}/contacts`;

      const response = await fetch(url, {
        method: selectedContact ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: newContactType,
          value: newContactValue,
        }),
      });

      if (response.ok) {
        const updatedContact = await response.json();
        if (selectedContact) {
          setContacts(
            contacts.map((contact) =>
              contact.id === selectedContact.id ? updatedContact : contact
            )
          );
          showSnackbar('اطلاعات تماس با موفقیت به‌روزرسانی شد', 'success');
        } else {
          setContacts([...contacts, updatedContact]);
          showSnackbar('اطلاعات تماس با موفقیت اضافه شد', 'success');
        }
        handleDialogClose();
      } else {
        showSnackbar('خطا در ذخیره اطلاعات تماس', 'error');
      }
    } catch (error) {
      console.error('Error saving contact:', error);
      showSnackbar('خطا در ارتباط با سرور', 'error');
    }
  };

  if (loading) {
    return <Typography>در حال بارگذاری...</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        ویرایش اطلاعات تماس
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setEditDialogOpen(true)}
        sx={{ mb: 2 }}
      >
        افزودن اطلاعات تماس جدید
      </Button>

      <List>
        {contacts.map((contact) => (
          <ListItem key={contact.id}>
            <ListItemText primary={contact.type} secondary={contact.value} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEditClick(contact)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteClick(contact.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={editDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          {selectedContact ? 'ویرایش اطلاعات تماس' : 'افزودن اطلاعات تماس جدید'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="نوع"
            type="text"
            fullWidth
            value={newContactType}
            onChange={(e) => setNewContactType(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="مقدار"
            type="text"
            fullWidth
            value={newContactValue}
            onChange={(e) => setNewContactValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>انصراف</Button>
          <Button
            onClick={handleDialogSubmit}
            color="primary"
            disabled={!newContactType.trim() || !newContactValue.trim()}
          >
            {selectedContact ? 'ذخیره تغییرات' : 'افزودن'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
