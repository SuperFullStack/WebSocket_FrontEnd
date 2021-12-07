import React, { useState } from 'react';

import Quotes from './quotes';

const QuotesTable = (props) => {
  const [activePair, setActivePair] = useState("EURUSD");
  return (
    <table cellSpacing="0" cellPadding="0">
      <tbody>
        {
          Object.keys(props.GroupOrders).map((pairKey, index) => (
            // const quotes = props.GroupOrders[pairKey];
            // console.log("quotesTabel", pairKey)
            // return (
              <Quotes
                key={index}
                className={pairKey}
                pairKey={pairKey}
                quotes={props.GroupOrders[pairKey]}
                isActive={pairKey == activePair}
                onSelect={()=>setActivePair(pairKey)} />
            // )
          ))
        }
      </tbody>
      <tfoot>
        <tr>
          <th width="15%">PAIR</th>
          <th width="15%">SPREAD</th>
          <th width="15%">SIZE</th>
          <th width="10%"></th>
          <th width="15%">BID</th>
          <th width="15%">ASK</th>
          <th width="15%">SIZE</th>
        </tr>
      </tfoot>
    </table>
  )
}

export default QuotesTable;