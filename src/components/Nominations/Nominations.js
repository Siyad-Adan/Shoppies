import React from "react";
import styles from "./Nominations.module.css";

function Nominations(props) {
  const { nominations, removeNom } = props;
  const displayNominations = () => {
    if (nominations.length) {
      return (
        <ul>
          {nominations.map((item, idx) => {
            return (
              <div className={styles.item}>
                <li key={idx}>
                  {item.Title} ({item.Year})
                </li>
                <button
                  className={styles.nominateButton}
                  onClick={() => removeNom(item)}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </ul>
      );
    } else {
      return <h3>No nominations at the moment...</h3>;
    }
  };
  return (
    <div className={styles.container}>
      <h2>
        <span className={styles.title}>Nominations</span>
      </h2>
      {displayNominations()}
    </div>
  );
}

export default Nominations;
