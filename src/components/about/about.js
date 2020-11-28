import React, { useEffect } from "react";
import "./about.scss";
import { connect } from "react-redux";

import { selectCharacters } from "../../actions/characters";
import { getCharactersLength, getCharacters } from "../../reducers/characters";

function About({ charactersLength, selectCharacters, characters }) {
  //return <p>This app belongs to Jesus Lopez</p>;
  useEffect(() => {
    selectCharacters();
  }, []);

  console.log("Characters: ", characters);
  console.log("Characters length: ", charactersLength);

  return <p>El numero es {charactersLength}</p>;
}

const mapStateToProps = (state, props) => ({
  charactersLength: getCharactersLength(state),
  characters: getCharacters(state),
});

const mapDispatchToProps = (dispatch) => ({
  selectCharacters: () => dispatch(selectCharacters()),
});

export default connect(mapStateToProps, mapDispatchToProps)(About);
