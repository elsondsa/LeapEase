import React, { useState, useEffect } from "react";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import { Button, TextField, InputLabel, Select } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Collapse from "@material-ui/core/Collapse";
import MenuItem from "@material-ui/core/MenuItem";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import LoadingSpin from "react-loading-spin";
import notepad from "../../images/notepad.png";
import { RingLoader } from "react-spinners";

import configs from "../../configs";
import useStyles from "./styles";
import { element } from "prop-types";

const Home = () => {
  const classes = useStyles();

  const [state, setState] = useState({
    flowName: "customerBundlesForSelf",
    inputSequence: "0,1",
  });

  const [config, setConfig] = useState({
    base_url: "http://172.25.47.157:9003/app_engine/staging",
    leap_app: "c7937ec0-bdd5-11ee-a475-dfd20b9bd272",
    MSISDN: "2349753486565",
  });

  const [curl, setCurl] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [successText, setSuccessText] = useState("");
  const [isFavouritesChanged, setIsFavouritesChanged] = useState(false);
  const [file, setFile] = useState("");
  const [severity, setSeverity] = useState("success");
  const [execution, setExecution] = useState(false);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    setExecution(true);
    generateCurl();
  }, [response, state, config]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setOpen(false);
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  const downHandler = (event) => {
    if (event.code === "Enter") {
      generateCurl();
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleConfigChange = (event) => {
    const name = event.target.name;
    setConfig({
      ...config,
      [name]: event.target.value,
    });
  };

  const addToFavourites = () => {
    setIsFavouritesChanged(true);
    let existingFavourites = localStorage.getItem("favourites")
      ? JSON.parse(localStorage.getItem("favourites"))
      : [];
    existingFavourites = existingFavourites.filter(
      (element) => state.flowName !== element.flowName
    );
    existingFavourites.push(state);
    localStorage.setItem("favourites", JSON.stringify(existingFavourites));
    setSeverity("success");
    setSuccessText("Added to Favourites");
    setOpen(true);
  };

  const getFromFavourites = (event) => {
    setState(JSON.parse(event.target.value));
  };

  const copyCurl = () => {
    navigator.clipboard.writeText(curl);
    setSeverity("success");
    setSuccessText("Successfully Copied!");
    setOpen(true);
  };

  const executeCurl = async () => {
    try {
      //const resp = await axios.post("http://localhost:5000/requests", finalJson);
      let inputSequenceArray = state.inputSequence.split(",");
      let output = "";
      setLoading(true);
      setResponse([]);
      for (var i = 0; i < inputSequenceArray.length; i++) {
        const isNewRequest = i === 0 ? 1 : 0;
        var resp = await axios.get(
          `${config.base_url}/${config.leap_app}?MSISDN=${config.MSISDN}&isNewRequest=${isNewRequest}&subscriberInput=${inputSequenceArray[i]}`
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setResponse((prevResponses) => [...prevResponses, resp.data]);
        if (resp.headers.freeflow == "FB") {
          break;
        }
      }
      setLoading(false);
    } catch (error) {
      setSeverity("error");
      setSuccessText("Error executing CURL");
      setOpen(true);
    }
  };

  const generateCurl = () => {
    let requestCurl = "";
    state.inputSequence.split(",").forEach((element, i) => {
      const isNewRequest = i === 0 ? 1 : 0;
      const temp = `curl -k "${config.base_url}/${config.leap_app}?MSISDN=${config.MSISDN}&isNewRequest=${isNewRequest}&subscriberInput=${element}";`;
      requestCurl += temp;
    });
    setCurl(requestCurl);
  };

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  let fileReader;

  const handleFileRead = () => {
    const content = fileReader.result;
    setIsFavouritesChanged(true);
    localStorage.setItem("favourites", content);
  };

  const handleFileChosen = () => {
    if (file && file !== "") {
      fileReader = new FileReader();
      fileReader.onloadend = handleFileRead;
      fileReader.readAsText(file);
      setSeverity("success");
      setSuccessText("File Successfully uploaded!");
      setOpen(true);
    } else {
      setSeverity("warning");
      setSuccessText("Please select a file!");
      setOpen(true);
    }
  };

  return (
    <div>
      <div>
        <div
          style={{
            fontFamily: "Nunito Sans, sans-serif",
            fontSize: "14px",
            paddingBottom: "15px",
            marginTop:"10px"
          }}
        >
          <strong>Kemi Number</strong> - 2347080240428
          <span style={{ marginRight: "10px" }}></span>
          <strong>Test Number</strong> - 2349753486565
          <span style={{ marginRight: "10px" }}></span>
          <strong>Kemi Agent</strong> - 2348022221241
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <InputLabel
            htmlFor="age-native-simple"
            style={{
              marginRight: "10px",
              fontSize: "18px",
              // fontWeight: "bold",
              color: "black",
              fontFamily: "Nunito Sans, sans-serif",
            }}
          >
            Already Have a flow? Choose HERE
          </InputLabel>
          <Select
            native
            value={state.flowName}
            onChange={getFromFavourites}
            inputProps={{
              name: "flowName",
            }}
            style={{ marginLeft: "10px" }}
          >
            <option aria-label="None" value="" />
            {localStorage.getItem("favourites") &&
              JSON.parse(localStorage.getItem("favourites")).map(
                (element, id) => (
                  <option key={id} value={JSON.stringify(element)}>
                    {element.flowName}
                  </option>
                )
              )}
          </Select>
        </div>

        {configs.isUploadDisplay && (
          <div>
            <Typography>Do you have an existing JSON? UPLOAD here</Typography>
            <input type="file" onChange={onFileChange} />
            <Button
              variant="contained"
              color="primary"
              onClick={handleFileChosen}
            >
              Upload!
            </Button>
          </div>
        )}
        <Paper elevation={3} />
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "20px" }}>
            <form className={classes.root} noValidate autoComplete="off">
              <div className={classes.formField}>
                <TextField
                  value={config.base_url}
                  id="standard-basic"
                  label="Base URL"
                  name="base_url"
                  onChange={handleConfigChange}
                />
              </div>
              <div className={classes.formField}>
                <TextField
                  value={config.leap_app}
                  id="standard-basic"
                  label="LEAP application ID"
                  name="leap_app"
                  onChange={handleConfigChange}
                />
              </div>
              <div className={classes.formField}>
                <TextField
                  value={config.MSISDN}
                  id="standard-basic"
                  label="MSISDN"
                  name="MSISDN"
                  onChange={handleConfigChange}
                />
              </div>
              <div className={classes.formField}>
                <TextField
                  value={state.flowName}
                  id="standard-basic"
                  label="Flow Name"
                  name="flowName"
                  onChange={handleChange}
                />
              </div>
              <div className={classes.formField}>
                <TextField
                  value={state.inputSequence}
                  id="standard-basic"
                  label="Input sequence"
                  name="inputSequence"
                  onChange={handleChange}
                />
              </div>
            </form>
          </div>

          <div>
            <div style={{ display: "flex" }}>
              <img
                src={notepad}
                alt="icon"
                height="30"
                style={{ marginLeft: "200px", marginTop: "-50px" }}
              />
              <h2
                style={{
                  fontFamily: "Nunito Sans, sans-serif",
                  fontSize: "18px",
                  marginLeft: "10px",
                  marginTop: "-45px",
                }}
              >
                Write Notes
              </h2>
            </div>

            <div className={classes.notepadContainer}>
              <textarea
                className={classes.notepad}
                style={{
                  marginLeft: "200px",
                  height: "360px",
                  width: "500px",
                  marginTop: "-10px",
                }}
                placeholder="Enter your text here..."
                autoFocus
              />
            </div>
          </div>
        </div>

        <div>
          {configs.isCurlDisplay && (
            <Typography variant="subtitle1" gutterBottom component="div">
              {curl}
            </Typography>
          )}
          <Button
            style={{
              color: "rgb(237, 28, 36)",
              backgroundColor: "white",
              borderRadius: "30px",
              border: "1px solid rgb(237, 28, 36)",
              marginTop: "-50px",
            }}
            onClick={copyCurl}
          >
            Copy Curl
          </Button>

          <Button
            style={{
              right: -5,
              color: "rgb(237, 28, 36)",
              backgroundColor: "white",
              borderRadius: "30px",
              border: "1px solid rgb(237, 28, 36)",
              marginTop: "-50px",
            }}
            onClick={executeCurl}
          >
            Execute Curl
          </Button>
          <Button
            style={{
              right: -10,
              color: "white",
              backgroundColor: "rgb(237, 28, 36)",
              borderRadius: "30px",
              marginTop: "-50px",
            }}
            onClick={addToFavourites}
          >
            ADD
          </Button>
          <Collapse in={isOpen}>
            <Alert
              severity={severity}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {successText}
            </Alert>
          </Collapse>
          <br />
          <br />
          <div className={classes.parentContainer}>
            {response.map((element, i) => (
              <div key={i}>
                <Collapse in={execution}>
                  <div
                    style={{ whiteSpace: "pre-wrap" }}
                    className={classes.mobileScreen}
                  >
                    <div className={classes.screenHeader}>USSD Response</div>
                    {element}
                    {i < response.length - 1 ? (
                      <div className={classes.inputField}>
                        <div className={classes.text}>
                          {state.inputSequence.split(",")[i + 1]}
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </Collapse>
              </div>
            ))}
            {loading ? (
              <Collapse style={{ padding: "10px" }} in={execution}>
                <RingLoader color="rgb(237, 28, 36)" size={30} />
              </Collapse>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
