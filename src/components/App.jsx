// import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../components/Form/Form';
import Filter from '../components/FilterContacts/Filter';
import CreatContactList from './ContactList/CreatContactList';
import { Section } from './App.styled';
import { useState, useEffect } from 'react';

export function App() {
  const [contacts, setContacts] = useState(() => {
    if (JSON.parse(localStorage.getItem('contacts'))) {
      return JSON.parse(localStorage.getItem('contacts'));
    } else {
      return [];
    }
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    return window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  function hendleSubmit(values, { resetForm }) {
    console.log(values);
    const contact = {
      id: nanoid(),
      ...values,
    };
    const isAdded = checkContactIsAdded(contact);

    if (isAdded) {
      resetForm();
      return alert(`${contact.name} is already in contacts`);
    } else {
      setContacts(prevState => {
        return [...prevState, contact];
      });
      resetForm();
    }
  }

  function checkContactIsAdded({ name }) {
    // const { contacts } = this.state;
    const normalizedContactName = name.toLowerCase();

    return contacts.find(
      ({ name }) => name.toLowerCase() === normalizedContactName
    );
  }

  function changeFilter(e) {
    setFilter(e.target.value);
  }

  function deletContacte(Id) {
    setContacts(prevState => prevState.filter(({ id }) => id !== Id));
  }

  let contactList = contacts.filter(({ name }) =>
    name.toLocaleLowerCase().trim().includes(filter.toLocaleLowerCase().trim())
  );

  return (
    <Section>
      <ContactForm hendleSubmit={hendleSubmit} />

      <h2>Contacts</h2>
      <h2>Find Contacts by name</h2>
      <Filter changeFilter={changeFilter} value={filter} />
      <CreatContactList array={contactList} deletContacte={deletContacte} />
    </Section>
  );
}
