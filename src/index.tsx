import * as React from "react";
import * as ReactDOM from "react-dom";
import {Root} from "./components/root";
import "./index.scss";
import {SETTINGS} from "./settings";
import styles from "./theme.module.scss";

ReactDOM.render(
  <React.StrictMode>
    <div
      className={styles[SETTINGS.theme]}
      onClick={() => {
        document.body.requestFullscreen().catch((error) => {
          console.error("failed to fullscreen", error);
        });
      }}
    >
      <Root />
    </div>
  </React.StrictMode>,
  document.getElementById("root"),
);
