import styles from "./contact.module.css";
import { deleteTask } from "../../Redux/store";
import { useDispatch } from "react-redux";

export const Contact = ({ name, number, contactId }) => {
  const dispatch = useDispatch()

  // const deleteTask = () => {
   
  //   ;

  // };

  return (
    <li key={contactId} className={styles.item}>
      <h2 className={styles.title}>
        {name}: {number}{" "}
      </h2>
      <button
        type="button"
        className={styles.btn}
        onClick={() => dispatch(deleteTask(contactId))}
      >
        delete
      </button>
    </li>
  );
};
