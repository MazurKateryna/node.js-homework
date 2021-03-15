const fs = require('fs');
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    console.table(JSON.parse(data));
  });
};

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    const contactsList = JSON.parse(data);
    const findContact = contactsList.find(el => el.id === contactId);
    console.table(findContact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    const contactsList = JSON.parse(data);
    const withoutContactId = contactsList.filter(el => el.id !== contactId);

    if (contactsList.length === withoutContactId.length) {
      console.log(`No contact with id: ${contactId}`);
      return;
    }
    let newContactsJSON = JSON.stringify(withoutContactId);

    fs.writeFile(contactsPath, newContactsJSON, err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`Contact with id: ${contactId} has been deleted`);
      console.table(withoutContactId);
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    const contactsList = JSON.parse(data);
    const newId = contactsList.reduce((acc, el) => (el.id > acc ? el.id : acc), 0) + 1;

    const newContact = { id: newId, name, email, phone };
    contactsList.push(newContact);

    const newContactsJSON = JSON.stringify(contactsList);

    fs.writeFile(contactsPath, newContactsJSON, err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`Contact with id: ${newId} has been created`);
      console.table(contactsList);
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};