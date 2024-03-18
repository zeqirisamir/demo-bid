import React from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import MainApp from "./src/navigaton/Main";

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
