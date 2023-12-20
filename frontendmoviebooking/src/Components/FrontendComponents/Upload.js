import React from 'react';


const DragDropFile = () => {
    
        // drag state
        const [dragActive, setDragActive] = React.useState(false);
        // ref
        const inputRef = React.useRef(null);
        
        // handle drag events
        const handleDrag = function(e) {
          e.preventDefault();
          e.stopPropagation();
          if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
          } else if (e.type === "dragleave") {
            setDragActive(false);
          }
        };
        
        // triggers when file is dropped
        const handleDrop = function(e) {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(false);
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // handleFiles(e.dataTransfer.files);
          }
        };
        
        // triggers when file is selected with click
        const handleChange = function(e) {
          e.preventDefault();
          if (e.target.files && e.target.files[0]) {
            // handleFiles(e.target.files);
          }
        };
        
      // triggers the input when the button is clicked
        const onButtonClick = () => {
          inputRef.current.click();
        };
        
        return (
          <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
            <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
            <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
              <div>
                <p>Drag and drop your file here or</p>
                <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
              </div> 
            </label>
            { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
          </form>
        );
      };



const Upload = () => {
  return (
    <div>
      <DragDropFile/>
      <style jsx>{`
        #form-file-upload {
          height: 16rem;
          width: 28rem;
          max-width: 100%;
          text-align: center;
          position: relative;
        }

        #input-file-upload {
          display: none;
        }

        #label-file-upload {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-width: 2px;
          border-radius: 1rem;
          border-style: dashed;
          border-color: #cbd5e1;
          background-color: #f8fafc;
        }

        #label-file-upload.drag-active {
          background-color: #ffffff;
        }

        .upload-button {
          cursor: pointer;
          padding: 0.25rem;
          font-size: 1rem;
          border: none;
          font-family: 'Oswald', sans-serif;
          background-color: transparent;
        }

        .upload-button:hover {
          text-decoration-line: underline;
        }

        #drag-file-element {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 1rem;
          top: 0px;
          right: 0px;
          bottom: 0px;
          left: 0px;
        }
      `}</style>
    </div>
  );
}

export default Upload;
