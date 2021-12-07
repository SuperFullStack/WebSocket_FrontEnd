import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import QuotesTable from './components/quotestable';

const App = () => {

  const [forexOrders, setForexOrders] = useState({})
  const [indicesOrders, setIndicesOrders] = useState({})
  const [cryptoOrders, setCryptoOrders] = useState({})
  const [stockOrders, setStockOrders] = useState({})
  const [commoditiesOrders, setCommoditiesOrders] = useState({})
  const [activeTab, setActiveTab] = useState("exclusive-tab1");

  const [isPaused, setPause] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("wss://lq.exclusivecapital.com");
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");
    return () => {
      ws.current.close();
    };
    
  }, []);

  // console.log(quotes);

  useEffect(() => {
     if (!ws.current) return;

    ws.current.onmessage = (event) => {
      // setInterval(() => {
      //   if (isPaused) return;
      //   const response = JSON.parse(event.data);
      //   const { Symbol, Quotes, Group } = response;

      //   switch (Group) {
      //     case 'FOREX':
      //       setForexOrders({ ...forexOrders, [Symbol]: Quotes });
      //       break;
      //     case 'COMMODITIES':
      //       setCommoditiesOrders({ ...commoditiesOrders, [Symbol]: Quotes });
      //       break;
      //     case 'INDICES':
      //       setIndicesOrders({ ...indicesOrders, [Symbol]: Quotes });
      //       break;
      //     case 'STOCKS':
      //       setStockOrders({ ...stockOrders, [Symbol]: Quotes });
      //       break;
      //     case 'CRYPTOS':
      //       setCryptoOrders({ ...cryptoOrders, [Symbol]: Quotes });
      //       break;
      //     default:
      //       return;
      //   }
      // }, 2000);

      if (isPaused) return;
      const response = JSON.parse(event.data);
      const { Symbol, Quotes, Group } = response;
      switch (Group) {
        case 'FOREX':
          setForexOrders({ ...forexOrders, [Symbol]: Quotes });
          break;
        case 'COMMODITIES':
          setCommoditiesOrders({ ...commoditiesOrders, [Symbol]: Quotes });
          break;
        case 'INDICES':
          setIndicesOrders({ ...indicesOrders, [Symbol]: Quotes });
          break;
        case 'STOCKS':
          setStockOrders({ ...stockOrders, [Symbol]: Quotes });
          break;
        case 'CRYPTOS':
          setCryptoOrders({ ...cryptoOrders, [Symbol]: Quotes });
          break;
        default:
          return;
      }
    };
    
  }, [forexOrders, commoditiesOrders, indicesOrders, cryptoOrders, stockOrders]);
  return (
    <div className="exclusive-tabs">
      {/* Tab nav */}
      <ul className="nav">
        <li className={activeTab === "exclusive-tab1" ? "active" : ""} onClick={() => setActiveTab("exclusive-tab1")}>{activeTab === "exclusive-tab1" ? <i className="ex-arrow ex-down"></i> : <i className="ex-arrow ex-right"></i>} Forex</li>
        <li className={activeTab === "exclusive-tab2" ? "active" : ""} onClick={() => setActiveTab("exclusive-tab2")}>{activeTab === "exclusive-tab2" ? <i className="ex-arrow ex-down"></i> : <i className="ex-arrow ex-right"></i>} Commodities</li>
        <li className={activeTab === "exclusive-tab3" ? "active" : ""} onClick={() => setActiveTab("exclusive-tab3")}>{activeTab === "exclusive-tab3" ? <i className="ex-arrow ex-down"></i> : <i className="ex-arrow ex-right"></i>} Indices</li>
        <li className={activeTab === "exclusive-tab4" ? "active" : ""} onClick={() => setActiveTab("exclusive-tab4")}>{activeTab === "exclusive-tab4" ? <i className="ex-arrow ex-down"></i> : <i className="ex-arrow ex-right"></i>} Stock</li>
        <li className={activeTab === "exclusive-tab5" ? "active" : ""} onClick={() => setActiveTab("exclusive-tab5")}>{activeTab === "exclusive-tab5" ? <i className="ex-arrow ex-down"></i> : <i className="ex-arrow ex-right"></i>} Crypto</li>
      </ul>
      <div className="exclusive-outlet">
        {activeTab === "exclusive-tab1" ? <QuotesTable GroupOrders={forexOrders} /> : ""}
        {activeTab === "exclusive-tab2" ? <QuotesTable GroupOrders={commoditiesOrders} /> : ""}
        {activeTab === "exclusive-tab3" ? <QuotesTable GroupOrders={indicesOrders} /> : ""}
        {activeTab === "exclusive-tab4" ? <QuotesTable GroupOrders={stockOrders} /> : ""}
        {activeTab === "exclusive-tab5" ? <QuotesTable GroupOrders={cryptoOrders} /> : ""}
      </div>

      <button onClick={() => setPause(!isPaused)}>
        {isPaused ? "Resume" : "Pause"}
      </button>
    </div>

  )
}

export default App;
