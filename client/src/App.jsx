import { useContext, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Alert,
  Snackbar,
} from "@mui/material";
import ContactForm from "./components/ContactForm";
import ContactTable from "./components/ContactTable";
import { ContactContext } from "./context/ContactContext";

function App() {
  const { contacts, addContact, updateContact, deleteContact } = useContext(ContactContext);

  const [openForm, setOpenForm] = useState(false);
  const [editContact, setEditContact] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Handle adding or updating a contact
  const handleAddContact = (newContact) => {
    if (editContact) {
      // Update an existing contact
      updateContact(editContact._id, newContact)
        .then(() => {
          setAlert({
            open: true,
            message: "Contact updated successfully!",
            severity: "success",
          });
        })
        .catch(() => {
          setAlert({
            open: true,
            message: "Failed to update contact!",
            severity: "error",
          });
        });
    } else {
      // Add a new contact
      addContact(newContact)
        .then(() => {
          setAlert({
            open: true,
            message: "Contact added successfully!",
            severity: "success",
          });
        })
        .catch(() => {
          setAlert({
            open: true,
            message: "Failed to add contact!",
            severity: "error",
          });
        });
    }
    setEditContact(null);
    setOpenForm(false);
  };

  // Handle editing a contact
  const handleEditContact = (contact) => {
    console.log(contact ,"from handle edit contact");
    setEditContact(contact);
    setOpenForm(true);
  };

  // Handle deleting a contact
  const handleDeleteContact = (id) => {
    console.log(id ,"from handle delte contact")
    deleteContact(id)
      .then(() => {
        setAlert({
          open: true,
          message: "Contact deleted successfully!",
          severity: "success",
        });
      })
      .catch(() => {
        setAlert({
          open: true,
          message: "Failed to delete contact!",
          severity: "error",
        });
      });
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditContact(null);
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Contact Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenForm(true)}
        >
          Add New Contact
        </Button>
      </Box>

      <ContactTable
        contacts={contacts}
        onEdit={handleEditContact}
        onDelete={handleDeleteContact}
      />

      <ContactForm
        open={openForm}
        handleClose={handleCloseForm}
        handleSubmit={handleAddContact}
        editData={editContact}
      />

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
