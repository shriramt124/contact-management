import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const ContactContext = createContext();

const ContactProvider = ({ children }) => {
    const [contacts, setContacts] = useState([]);
    const API_BASE_URL = "http://localhost:3000/api/v1";

    // Fetch all contacts
    const fetchContacts = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/contacts`);
            setContacts(response.data?.contact);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    // Add a new contact
    const addContact = async (newContact) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/contacts`, newContact);
            setContacts((prev) => [...prev, response.data]);
            fetchContacts()
        } catch (error) {
            console.error("Error adding contact:", error);
        }
    };

    // Update an existing contact
    const updateContact = async (id, updatedContact) => {
        try {
            await axios.put(`${API_BASE_URL}/contacts/${id}`, updatedContact);
            setContacts((prev) =>
                prev.map((contact) =>
                    contact.id === id ? { ...contact, ...updatedContact } : contact
                )
            );
            fetchContacts()
        } catch (error) {
            console.error("Error updating contact:", error);
        }
    };

    // Delete a contact
    const deleteContact = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/contacts/${id}`);
            setContacts((prev) => prev.filter((contact) => contact.id !== id));
            fetchContacts()
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, [setContacts]);

    return (
        <ContactContext.Provider
            value={{ contacts, addContact, updateContact, deleteContact,fetchContacts }}
        >
            {children}
        </ContactContext.Provider>
    );
};

export { ContactContext, ContactProvider };
