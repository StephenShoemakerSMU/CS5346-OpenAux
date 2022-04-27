import React from "react";
import axios from 'axios';
 
export class SongInput extends React.Component {
  state = {
    selectedFile:null
  }

  onFileChange = event => {
    
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  
  };

 
  onFileUpload = () => {
   // Create an object of formData
   const formData = new FormData();
    
   // Update the formData object
   formData.append(
     "file",
     this.state.selectedFile,
     this.state.selectedFile.name
   );
    const backendUrl = process.env.REACT_APP_BACKEND || "http://localhost:8000";
    
    fetch(`${backendUrl}/upload`, {
      method: 'POST',
      body: formData,
    })
        
  };

  fileData = () => {
    
    if (this.state.selectedFile) {
       
      return (
        <div>
          <h2>File Details:</h2>
           
          <p>File Name: {this.state.selectedFile.name}</p>

           
          <p>File Type: {this.state.selectedFile.type}</p>

           
          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate && this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>

        </div>
      );
      } else {
        return (
          <div>
            <br />
            <h4>Choose before Pressing the Upload button</h4>
          </div>
        );
      }
  };

  render() {
    
    return (
      <div>
          <div>
              <input type="file" onChange={this.onFileChange} />
              <button onClick={this.onFileUpload}>
                Upload!
              </button>
          </div>
        {this.fileData()}
      </div>
    );
  }
  



}