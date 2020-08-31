import React, { useState, useEffect } from "react";
import Banner from "react-js-banner";
import styles from "./App.module.css";
import { fetchData } from "./api";
import { Search, Results, Nominations } from "./components";
import checkMark from "./images/checkMark.png";

function App() {
  const [searchText, setSearchText] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const [searchItemsLoading, setSearchItemsLoading] = useState(false);
  const [nominationItems, setNominationItems] = useLocalStorage("appState", []);

  const newSearchValue = (searchResult) => {
    setSearchText(searchResult);
  };

  const onClickedItem = (item) => {
    setNominationItems([...nominationItems, item]);
  };

  const removeNomination = (item) => {
    let filteredNominations = nominationItems.filter(
      (nomination) => nomination.imdbID !== item.imdbID
    );
    setNominationItems(filteredNominations);
  };

  const showBanner = () => {
    if (nominationItems.length === 5) {
      return (
        <Banner
          title="You have made five nominations! Thanks for picking!"
          css={{ color: "white", backgroundColor: "#aaa", fontSize: 20 }}
          image={checkMark}
          imageClass={styles.checkmark}
        />
      );
    }
  };

  useEffect(() => {
    async function fetchMovieTitles() {
      if (searchText) setSearchItemsLoading(true);
      const data = await fetchData(searchText);
      setSearchItemsLoading(false);
      if (data) {
        setSearchItems([...data]);
      } else {
        setSearchItems([]);
      }
    }

    fetchMovieTitles();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  return (
    <div className={styles.container}>
      {showBanner()}
      <h1 className={styles.title}>The Shoppies</h1>
      <Search onChangedText={newSearchValue} />
      <div className={styles.dataContainer}>
        <Results
          results={searchItems}
          resultText={searchText}
          clickedItem={onClickedItem}
          nominations={nominationItems}
          searchItemsLoad={searchItemsLoading}
        />
        <Nominations
          nominations={nominationItems}
          removeNom={removeNomination}
        />
      </div>
    </div>
  );
}

// Hook
function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default App;
