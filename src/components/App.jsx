import React, { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout/Layout';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import initialContacts from './contacts.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactList } from './ContactList/ContactList';
import { Header } from './Header/Header';
import Filter from './Filter/Filter';

const notifyOptions = {
  position: 'bottom-left',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

export default class App extends Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };

  addContact = newContact => {
    const { contacts } = this.state;

    contacts.some(
      contact =>
        contact.name.toLowerCase().trim() ===
          newContact.name.toLowerCase().trim() ||
        contact.number.trim() === newContact.number.trim()
    )
      ? toast.error(`${newContact.name}: is already in contacts`, notifyOptions)
      : this.setState(prevState => ({
          contacts: [newContact, ...prevState.contacts],
        }));
  };

  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value.toLowerCase().trim() });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().trim().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <Layout>
        <Section title="Phonebook">
          <ContactForm onAddContact={this.addContact} />
          <Header title="Contacts" />
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList
            onDelete={this.deleteContact}
            contacts={visibleContacts}
          />
        </Section>
        <ToastContainer />
        <GlobalStyle />
      </Layout>
    );
  }
}
