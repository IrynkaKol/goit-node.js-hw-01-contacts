const fs = require("fs").promises;
const path = require("path");

const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "/db", "contacts.json");


const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
console.log(`Error: ${error.message}`)
  }
  
  
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find((contact) => contact.id === contactId);
    if (!result) {
      return null;
    }
    return result;
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
  
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((contact) => contact.id === contactId);
    if (idx === -1) {
      return null;
    }
    const newContact = contacts.filter((_, index) => index !== idx);
    await fs.writeFile(contactsPath, JSON.stringify(newContact));
  
    return contacts[idx];
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
  
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: v4(),
      name,
      email,
      phone,
    };
    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    return newContact;
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
  
};

listContacts();

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
