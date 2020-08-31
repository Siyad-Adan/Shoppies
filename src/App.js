import React, { useState, useEffect } from 'react';
import Banner from 'react-js-banner';
import styles from './App.module.css';
import { fetchData } from './api';
import { Search, Results, Nominations } from './components';
import checkMark from './images/checkMark.png';
import animatedStar from './images/AnimatedStar.png';
import useLocalStorage from './cache/cache';

function App() {
	const [ searchText, setSearchText ] = useState('');
	const [ searchItems, setSearchItems ] = useState([]);
	const [ searchItemsLoading, setSearchItemsLoading ] = useState(false);
	const [ nominationItems, setNominationItems ] = useLocalStorage('appState', []);

	const newSearchValue = (searchResult) => {
		setSearchText(searchResult);
	};

	const onClickedItem = (item) => {
		setNominationItems([ ...nominationItems, item ]);
	};

	const removeNomination = (item) => {
		let filteredNominations = nominationItems.filter((nomination) => nomination.imdbID !== item.imdbID);
		setNominationItems(filteredNominations);
	};

	const showBanner = () => {
		if (nominationItems.length === 5) {
			return (
				<Banner
					title="You have made five nominations! Thanks for picking!"
					css={{ color: 'black', backgroundColor: 'yellow', fontSize: 20, marginBottom: 0 }}
					image={checkMark}
          imageClass={styles.checkmark}
				/>
			);
		}
	};

	useEffect(
		() => {
			async function fetchMovieTitles() {
				if (searchText) setSearchItemsLoading(true);
				const data = await fetchData(searchText);
				setSearchItemsLoading(false);
				if (data) {
					setSearchItems([ ...data ]);
				} else {
					setSearchItems([]);
				}
			}

			fetchMovieTitles();

			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[ searchText ]
	);

	return (
		<div className={styles.container}>
			{showBanner()}
			<h1 className={styles.title}>
				The Shoppies<img className={styles.starImg} src={animatedStar} alt="animatedStar" />
			</h1>
			<Search onChangedText={newSearchValue} />
			<div className={styles.dataContainer}>
				<Results
					results={searchItems}
					resultText={searchText}
					clickedItem={onClickedItem}
					nominations={nominationItems}
					searchItemsLoad={searchItemsLoading}
				/>
				<Nominations nominations={nominationItems} removeNom={removeNomination} />
			</div>
		</div>
	);
}

export default App;
