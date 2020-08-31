import React from 'react';
import ReactLoading from 'react-loading';
import styles from './Results.module.css';
import ReactTooltip from 'react-tooltip';

function Results(props) {
	const { results, clickedItem, nominations, searchItemsLoad, resultText } = props;
	let disabledFullNominations;
	let disabledAlreadyPicked;

	const displaySearchResults = () => {
		if (searchItemsLoad) {
			return <ReactLoading type="cylon" color="black" className={styles.loadingIcon} />;
		} else if (results.length) {
			return (
				<ul>
					{results.map((searchResultMovie, idx) => {
						disabledAlreadyPicked = false;
						nominations.forEach((nominatedMovie) => {
							if (nominatedMovie.imdbID === searchResultMovie.imdbID) {
								disabledAlreadyPicked = true;
								return false;
							}
						});

						if (nominations.length === 5) {
							disabledFullNominations = true;
						}
						return (
							<div className={styles.item}>
								<li key={idx}>
									{searchResultMovie.Title} ({searchResultMovie.Year})
								</li>
								{disabledFullNominations ? (
									<div>
										<span
											data-place="top"
											data-tip="You have already selected 5 nominations! Remove a nomination to select another search result!"
										>
											<button
												className={
													disabledAlreadyPicked || disabledFullNominations ? (
														styles.resultButtonInactive
													) : (
														styles.resultButtonActive
													)
												}
												disabled={disabledAlreadyPicked || disabledFullNominations}
												onClick={() => clickedItem(searchResultMovie)}
											>
												Nominate
											</button>
										</span>
										<ReactTooltip />
									</div>
								) : (
									<div>
										<span
											data-tip-disable={!disabledAlreadyPicked}
											data-tip={
												disabledAlreadyPicked ? (
													'You already have this movie to be nominated!'
												) : (
													''
												)
											}
										>
											<button
												className={
													disabledAlreadyPicked || disabledFullNominations ? (
														styles.resultButtonInactive
													) : (
														styles.resultButtonActive
													)
												}
												disabled={disabledAlreadyPicked || disabledFullNominations}
												onClick={() => clickedItem(searchResultMovie)}
											>
												Nominate
											</button>
										</span>
										<ReactTooltip />
									</div>
								)}
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
				<span className={styles.title}>Results {`${resultText ? `for "${resultText}"` : ''}`}</span>
			</h2>
			{displaySearchResults()}
		</div>
	);
}

export default Results;
