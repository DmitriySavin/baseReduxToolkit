import styles from "../src/App.module.css";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import { Contact } from "./components/Contact/Contact";
import { Filter } from "./components/Filter/Filter";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { addTask, deleteTask } from "./Redux/store";

const App = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");

  const dispatch = useDispatch();
  const initialContacts = useSelector((state) => state.tasks.tasks);

  const changeName = (name) => {
    setName(name);
  };
  const changeNumber = (number) => {
    setNumber(number);
  };

  const addContacts = (e) => {
    e.preventDefault();

    if (initialContacts.some((contact) => contact.name.toLowerCase().includes(name))) {
      return;
    }

    dispatch(addTask({ id: nanoid(), name, number }));

    setName("")
    setNumber("")
  };

  const changeFilter = (filterName) => {
    setFilter(filterName);
  };

  const normalizeFilter = filter.toLowerCase();

  const visibleContacts = initialContacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizeFilter),
  );

  // const deleteContact = (contactId) => {
  //   setContacts((prev) => prev.filter((contact) => contact.id !== contactId));
  // };

  return (
    <>
      <form onSubmit={addContacts} className={styles.form}>
        <h2>Name</h2>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="Name"
          value={name}
          onChange={(e) => changeName(e.target.value)}
        />
        <h2>Number</h2>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="Number"
          value={number}
          onChange={(e) => changeNumber(e.target.value)}
        />
        <button type="submit">Add contact</button>
      </form>

      <ul className={styles.list}>
        {visibleContacts.map((contact) => (
          <Contact
            key={contact.id}
            name={contact.name}
            number={contact.number}
            contactId={contact.id}
          />
        ))}
      </ul>

      <Filter changeFilter={changeFilter} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default App;
