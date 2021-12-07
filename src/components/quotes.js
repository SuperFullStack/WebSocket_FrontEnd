import React, { useState, Fragment } from 'react';

const Quotes = (props) => {
  

  const addDepthClass = (index) => {
    if (index === 0) {
      return "depth-show";
    } else if (props.isActive) {
      return "depth-show active";
    } else {
      return "depth-hide";
    }
  }

  const handleDepth = (pk) => {
    props.onSelect(pk);
    const elements = [...document.getElementsByClassName(pk)];

    // elements.forEach((element) => {
    //   if (element.classList.contains("active")) {
    //     //element.classList.remove("active")
    //   } else {
    //     element.classList.add("active")
    //   }

    //   element.classList.toggle("depth-hide");
    // })
  };

  // const handlePause = () => {
  //   // setPause(true);

  //   setInterval(() => {
  //     // setPause(false);
  //   }, 5000);
  // }

  return (
    <Fragment>
      {
        props.quotes.slice(0, 6).map((quote, index) => (
          <tr
            key={index}
            className={`${props.pairKey} ${addDepthClass(index)}`}
            onClick={() => handleDepth(props.pairKey)}
            // onMouseEnter={() => handlePause()}
          //onMouseLeave={() => setPause(false)}
          >
            <td className="pair" onClick={() => handleDepth(props.pairKey)}><strong>{props.pairKey}</strong></td>
            <td>{quote.Spread}</td>
            <td>{quote.BidSize}</td>
            <td>
              {(() => {
                if (quote.BidDirection === "-1") {
                  return (
                    <i className="ex-arrow ex-down"></i>
                  )
                } else if (quote.BidDirection === "1") {
                  return (
                    <i className="ex-arrow ex-up"></i>
                  )
                } else {
                  return (
                    <i className="ex-arrow ex-right"></i>
                  )
                }
              })()}
            </td>
            <td>{quote.BidPx}</td>
            <td>{quote.AskPx}</td>
            <td>{quote.AskSize}</td>
          </tr>
        ))
      }
    </Fragment>
  )
}

export default Quotes;