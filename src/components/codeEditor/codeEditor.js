import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-min-noconflict/ext-language_tools";
import Typography from "@material-ui/core/Typography";
import { Button, TextField, InputLabel, Select } from "@material-ui/core";
import app from "./app.json";
const langTools = require("ace-builds/src-min-noconflict/ext-language_tools");

function CodeEditor() {
  const [code, setCode] = React.useState(
    app.appData.modules["0b61ee0"].output.customCode
  );
  const [file, setFile] = React.useState("");
  const [moduleId, setModuleId] = React.useState("");
  const [appInfo, setAppInfo] = React.useState("");

  let fileReader;

  React.useEffect(() => {
    if (appInfo != "" && moduleId != "") {
      setCode(appInfo.appData.modules[moduleId].output.customCode);
    }
  }, [moduleId]);

  React.useEffect(() => {
    if (file && file != "") {
      fileReader = new FileReader();
      fileReader.onloadend = handleFileRead;
      fileReader.readAsText(file);
      const content = JSON.parse(fileReader.result);
      console.log(content);
      setAppInfo(content);
    } else {
      alert("No file chosen");
    }
  }, [file]);

  const onChangeCodeEditorValue = (value) => {
    setCode(value);
  };

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileRead = (e) => {
    const content = JSON.parse(fileReader.result);
    console.log(content);
    setAppInfo(content);
  };

  const handleFileChosen = () => {
    if (file && file != "") {
      fileReader = new FileReader();
      fileReader.onloadend = handleFileRead;
      fileReader.readAsText(file);
    } else {
      alert("No file chosen");
    }
  };

  const handleChange = (event) => {
    setModuleId(event.target.value);
  };

  const handleSaveApp = (event) => {
    saveJSON(appInfo, file.name);
  };

  const handleSaveModule = (event) => {
    appInfo.appData.modules[moduleId].output.customCode = code;
    alert("Module Saved");
  };

  return (
    <div>
      <Typography
        style={{
          marginLeft: "15px",
          fontSize: "20px",
          fontFamily: "Nunito Sans",
        }}
      >
        {" "}
        Upload your application here:
      </Typography>
      <input type="file" onChange={onFileChange} />
      <Select
        native
        value={moduleId}
        onChange={handleChange}
        inputProps={{
          name: "moduleId",
        }}
      >
        <option aria-label="None" value="" />
        {appInfo &&
          appInfo != "" &&
          Object.keys(appInfo.appData.modules).map((element, id, arr) => (
            <option value={element}>{element}</option>
          ))}
      </Select>
      <Button
        style={{
          color: "white",
          backgroundColor: "rgb(237, 28, 36)",
          borderRadius: "30px",
          left: "590px",
        }}
        onClick={handleSaveModule}
      >
        Save Module
      </Button>
      <Button
        style={{
          color: "rgb(237, 28, 36)",
          backgroundColor: "white",
          borderRadius: "30px",
          border: "1px solid rgb(237, 28, 36)",
          left: "600px",
        }}
        onClick={handleSaveApp}
      >
        Save App
      </Button>
      <AceEditor
        width="100%"
        mode="javascript"
        theme="github"
        name="codeEditor"
        onChange={onChangeCodeEditorValue}
        fontSize={14}
        placeholder="Custom code editor"
        value={code}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        wrapEnabled={true}
        editorProps={{ $blockScrolling: true }}
        enableLiveAutocompletion={true}
        enableBasicAutocompletion={true}
        setOptions={{
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </div>
  );
}

function saveJSON(data, filename) {
  if (!data) {
    return;
  }

  if (!filename) filename = "console.json";

  if (typeof data === "object") {
    data = JSON.stringify(data, undefined, 4);
  }

  let blob = new Blob([data], { type: "text/json" }),
    e = document.createEvent("MouseEvents"),
    a = document.createElement("a");

  a.download = filename;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
  e.initMouseEvent(
    "click",
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  a.dispatchEvent(e);
}

export default CodeEditor;
