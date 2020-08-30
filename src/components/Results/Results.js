import React, { useState, useEffect } from 'react';
import styles from './Results.module.css'

function Results(props) {
    const { results, clickedItem, nominations }  = props;
    let disabled;

    const displaySearchResults = () => {
        if(results.length){
            return (
                <ul>
                {results.map((searchResultMovie, idx) => {
                    disabled = false;
                    nominations.forEach(nominatedMovie => {
                        if(nominatedMovie.imdbID === searchResultMovie.imdbID){
                            disabled = true;
                            return false;
                        }
            
                    })
                    return (
                        <li key={idx}>{searchResultMovie.Title} ({searchResultMovie.Year})<button disabled={disabled} onClick={() => clickedItem(searchResultMovie)}>Nominate</button></li>
                    )
                })}
                </ul>
            );
        }
        else{
            return(
                <h3>No Results at the moment...</h3>
            )
        }
    }

  return (
    <div className ={styles.container}>
      <h2>Results for {props.resultText}</h2>
        {displaySearchResults()}
    </div>
  );
}

export default Results;
