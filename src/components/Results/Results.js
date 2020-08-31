import React from "react";
import ReactLoading from "react-loading";
import styles from "./Results.module.css";

function Results(props) {
  const {
    results,
    clickedItem,
    nominations,
    searchItemsLoad,
    resultText,
  } = props;
  let disabled;

  const displaySearchResults = () => {
    if (searchItemsLoad) {
      return (
        <ReactLoading
          type="cylon"
          color="black"
          className={styles.loadingIcon}
        />
      );
    } else if (results.length) {
      return (
        <ul>
          {results.map((searchResultMovie, idx) => {
            disabled = false;
            nominations.forEach((nominatedMovie) => {
              if (nominatedMovie.imdbID === searchResultMovie.imdbID) {
                disabled = true;
                return false;
              }
            });

            if (nominations.length === 5) disabled = true;
            return (
              <div className={styles.item}>
                <li key={idx}>
                  {searchResultMovie.Title} ({searchResultMovie.Year})
                </li>
                <button
                  className={
                    disabled
                      ? styles.resultButtonInactive
                      : styles.resultButtonActive
                  }
                  disabled={disabled}
                  onClick={() => clickedItem(searchResultMovie)}
                >
                  Nominate
                </button>
              </div>
            );
          })}
        </ul>
      );
    } else {
      return <h3>No results at the moment...</h3>;
    }
  };

  return (
    <div className={styles.container}>
      <h2>
        <span className={styles.title}>
          Results {`${resultText ? `for ${resultText}` : ""}`}
        </span>
      </h2>
      {displaySearchResults()}
    </div>
  );
}

export default Results;
