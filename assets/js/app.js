import "../css/app.css";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function Hub(props) {
  return (
    <div className="hub">
      <div>
        <span className="name">{props.name}</span>
        <span className={`tag ${props.tier}`}>{props.tier}</span>
      </div>

      <div>
        <span>{props.ccu_limit}CCU</span>
        <span>{props.storage_limit_mb}MB</span>
      </div>

      <div>
        {props.status === "ready" ? (
          <a href={`//${props.subdomain}.myhubs.net`}>{props.subdomain}.myhubs.net</a>
        ) : (
          <span>{props.subdomain}.myhubs.net</span>
        )}

        <span className={`tag ${props.status}`}>{props.status}</span>
      </div>
    </div>
  );
}

function useHubs(fxa_uid) {
  const [hubs, setHubs] = useState([]);

  useEffect(async () => {
    setHubs(await fetch(`/api/v1/hubs?fxa_uid=${fxa_uid}`).then((r) => r.json()));
  }, []);

  return hubs;
}

function App() {
  const fxa_uid = new URLSearchParams(location.search).get("fxa_uid");
  const hubs = useHubs(fxa_uid);

  return (
    <>
      <h1>🦃</h1>
      {hubs.map((hub) => (
        <Hub key={hub.subdomain} {...hub} />
      ))}
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
