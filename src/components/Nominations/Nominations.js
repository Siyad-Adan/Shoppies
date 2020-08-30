import React, { useState, useEffect } from 'react';
import styles from './Nominations.module.css'

function Nominations(props) {
    const { nominations, removeNom } = props;
    const displayNominations = () => {
        if(nominations.length){
            return (
                <ul>
                {nominations.map((item, idx) => {
                    return (
                        <li key={idx}>{item.Title} ({item.Year})<button onClick={() => removeNom(item)}>Remove</button></li>
                    )
                })}
                </ul>
            );
        }
        else{
            return(
                <h3>No nominations at the moment...</h3>
            )
        }
    }
  return (
    <div className ={styles.container}>
      <h2>Nominations</h2>
      {displayNominations()}
    </div>
  );
}

export default Nominations;
