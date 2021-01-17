import React, { Component } from "react";
import PropTypes from "prop-types";
import "./FileUpload.css";

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileselect: "Select a file to upload",
      fileToRead: null,
      isReading: false,
      postUrl: props.url,
      command: props.command,
    };
  }

  onChange(e) {
    let file = e.target.files;
    if (file.length > 0) {
      this.setState({ fileselect: file[0].name, fileToRead: file[0] });
    }
  }

  onClick(c) {
    if (!!this.state.fileToRead) {
      console.log("Reading file", this.state.fileToRead);
      let reader = new FileReader();
      reader.readAsDataURL(this.state.fileToRead);
      reader.onload = (x) => {
        console.log("File loaded");
        const formData = new FormData();
        formData.append("file", this.state.fileToRead);
        formData.append("command", this.state.command);
        const response = fetch(
          sessionStorage.getItem("proxy") + this.state.postUrl,
          {
            method: "POST",
            header: {
              "Content-Type": "multipart/form-data",
            },
            body: formData,
          }
        );

        console.log(response);
      };
    }
  }

  render() {
    return (
      <div className="file-upload-main-container mt-5">
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={(e) => this.onChange(e)}
          />
          <label className="custom-file-label" for="customFile">
            {this.state.fileselect}
          </label>
        </div>
        <button
          className="btn-info w-25 m-3 align-self-center rounded-lg shadow-sm"
          onClick={(c) => this.onClick(c)}
        >
          Upload
        </button>
      </div>
    );
  }
}

FileUpload.propTypes = {
  url: PropTypes.string.isRequired,
  command: PropTypes.string.isRequired,
};

export default FileUpload;
