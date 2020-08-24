import React from "react";
import SearchBox from "./components/searchBox/searchBox";
import Spinner from "./components/spinner/spinner";
import WordGrouping from "./components/wordGrouping/wordGrouping";
import BackToTop from "./components/backToTop/backToTop";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./store";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <SearchBox />
      <Spinner />
      <WordGrouping />
      <BackToTop />
    </Provider>
  );
}

export default App;
