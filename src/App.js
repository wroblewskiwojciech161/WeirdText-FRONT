import "./App.css";
import React, { useState } from "react";
import { getCoding } from "./Api.js";
import { useTheme, useMediaQuery } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Alert from "@material-ui/lab/Alert";
import { errorAlertText, styleTheme } from "./constants";
import {
  createEncodeModel,
  createDecodingModel,
  updateLastEncodeResult,
} from "./utils";

const useStyles = makeStyles(styleTheme);

function App() {
  const [encodeInput, setEncodeInput] = useState("");
  const [traceData, setTraceData] = useState("tracedata");
  const [type, setType] = useState("encode");
  const [decodeInputString, setDecodeInputString] = useState("");
  const [decodeInputWords, setDecodeInputWordSet] = useState("");
  const [storage, setStorage] = useState({
    string: "",
    words: "",
  });

  const classes = useStyles();
  // take care of mobile
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));

  /* immediately assigning an input values to states*/

  function setEncodeInputValue(event) {
    setEncodeInput(event.target.value);
  }

  function setDecodeInputValue(event) {
    setDecodeInputString(event.target.value);
  }

  function setDecodeInputWords(event) {
    setDecodeInputWordSet(event.target.value);
  }

  function clear() {
    setEncodeInput("");
    setDecodeInputString("");
    setDecodeInputWordSet("");
  }

  function makeEncode() {
    setType("encode");
    getData(type, createEncodeModel(encodeInput));
  }
  function makeDecode() {
    setType("decode");
    getData(type, createDecodingModel(decodeInputString, decodeInputWords));
  }

  function getLastEncodedResult() {
    let temp = {
      string: localStorage.getItem("string"),
      words: localStorage.getItem("words"),
    };

    setStorage(temp);
  }

  /* fetch data from api based on operation type and input data*/

  function getData(type, params) {
    getCoding(
      type,
      params,
      (data) => {
        setTraceData(data);
        if (type === "encode") {
          updateLastEncodeResult(data.string, data.words);
          getLastEncodedResult();
        }
      },
      (error) => {
        alert(error);
      }
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={isLargeScreen ? classes.pageWrapper : classes.pageW}>
        <Card
          className={isLargeScreen ? classes.root : classes.rootMobile}
          variant="outlined"
        >
          <p className={classes.heading}>WIRED TEXT CONVERTER</p>
          {type === "decode" && (
            <Button
              className={classes.button}
              onClick={() => {
                setType("encode");
                setTraceData("");
              }}
              variant="outlined"
            >
              START ENCODING
            </Button>
          )}

          {type === "encode" && (
            <>
              <Card
                className={
                  type === "encode" ? classes.sectionActive : classes.section
                }
                variant="outlined"
              >
                <Button
                  className={classes.button}
                  onClick={() => makeEncode()}
                  variant="outlined"
                >
                  Encode
                </Button>
                <TextField
                  required
                  id="standard-required"
                  label="sentence to encode "
                  defaultValue="Encodeing sentence example"
                  onChange={setEncodeInputValue}
                  value={encodeInput}
                />
                <div className={classes.fieldWrapper}>
                  <p className={classes.paragraphBold}>ENCODED: </p>
                  <TextField
                    className={classes.tfOutput}
                    id="standard-basic"
                    label=""
                    value={traceData.string}
                  />
                </div>

                <div className={classes.fieldWrapper}>
                  <p className={classes.paragraphBold}>WORDS SET: </p>
                  <TextField
                    className={classes.tfOutput}
                    id="standard-basic"
                    label=""
                    value={traceData.words}
                  />
                </div>
              </Card>
            </>
          )}

          {type === "encode" && (
            <Button
              className={classes.button}
              onClick={() => {
                setType("decode");
                setTraceData("");
              }}
              variant="outlined"
            >
              START DECODING
            </Button>
          )}

          {type === "decode" && (
            <>
              <Card
                className={
                  type === "decode" ? classes.sectionActive : classes.section
                }
                variant="outlined"
              >
                <Button
                  className={classes.button}
                  onClick={() => makeDecode()}
                  variant="outlined"
                >
                  Decode
                </Button>
                <TextField
                  required
                  id="standard-required"
                  label="Sentence to decode"
                  defaultValue="srintg to eondce"
                  onChange={setDecodeInputValue}
                  value={decodeInputString}
                />
                <TextField
                  required
                  id="standard-required"
                  label="words set"
                  defaultValue="string encode"
                  onChange={setDecodeInputWords}
                  value={decodeInputWords}
                />
                <div className={classes.fieldWrapper}>
                  <p className={classes.paragraphBold}>DECODED: </p>
                  <TextField
                    className={classes.tfOutput}
                    id="standard-basic"
                    label=""
                    value={traceData.string}
                  />
                </div>
              </Card>
            </>
          )}

          <Button
            className={classes.button}
            onClick={() => clear()}
            variant="outlined"
          >
            CLEAR FIELDS
          </Button>

          {traceData.string === "" && (
            <Alert severity="error">{errorAlertText}</Alert>
          )}

          <Card className={classes.section} variant="outlined">
            <div className={classes.fieldWrapper}>
              <p className={classes.paragraph}> recently encoded</p>
            </div>

            <div className={classes.fieldWrapper}>
              <p className={classes.paragraphBold}>ENCODED STRING: </p>
              <TextField
                className={classes.tfOutput}
                id="standard-basic"
                label=""
                value={storage.string}
              />
            </div>

            <div className={classes.fieldWrapper}>
              <p className={classes.paragraphBold}>WORDS SET: </p>
              <TextField
                className={classes.tfOutput}
                id="standard-basic"
                label=""
                value={storage.words}
              />
            </div>
          </Card>
        </Card>
      </div>
    </ThemeProvider>
  );
}

export default App;
