import React, { useState, useEffect } from 'react';
import styles from './App.module.css'
import { fetchData } from './api';
import { Search, Results, Nominations } from './components';

function App() {

  const[searchText, setSearchText] = useState("");
  const[searchItems, setSearchItems] = useState([]);
  const[nominationItems, setNominationItems] = useState([]);

  const newSearchValue = (searchResult) => {
    setSearchText(searchResult)
  }

  const onClickedItem = (item) => {
    setNominationItems([...nominationItems, item])
  }

  const removeNomination = (item) => {
    let filteredNominations = nominationItems.filter(nomination => nomination.imdbID != item.imdbID);
    setNominationItems(filteredNominations);
  }

  useEffect(() => {
  async function fetchMovieTitles() {
    const data = await fetchData(searchText);
    if(data) {
      setSearchItems([...data])
    }
    else{
      setSearchItems([])
    }
  }


  fetchMovieTitles();
  console.log(searchItems)
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[searchText]);

  return (
    <div className={styles.container}>
      <h1>The Shoppies</h1>
      <Search onChangedText={newSearchValue}/>
      <div className={styles.dataContainer}>
        <Results results={searchItems} resultText={searchText} clickedItem={onClickedItem} nominations={nominationItems}/>
        <Nominations nominations={nominationItems} removeNom={removeNomination}/>
      </div>
    </div>
  );
}

export default App;
