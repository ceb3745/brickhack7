import React, {useState} from 'react';
import '../styles/Media.css';
import MediaRecorder from './MediaRecorder';
import { Download, X } from 'react-feather';

const Media = () =>{
    const [files, setFiles] = useState([]);

    const saveFile = (file) => {
        setFiles([...files, file])
    }

    const handleAudioUpload = (file) => {
        console.log(file)
        
        const url = window.URL.createObjectURL(file.file)
        const click = document.createEvent('Event')
        click.initEvent('click', true, true)
        const link = document.createElement('A')
        link.href = url
        link.download = '../media/output.wav'
        link.dispatchEvent(click)
        link.click()
        return link
    }

    const removeFile = input_file => {
        setFiles(files.filter((file)=>file !== input_file))
    }

    return(
        <div className="pageContainer">
            <div className="fileContainer">
                <div className="fileContainerHeader">Files</div>
                {files.map((file)=>{
                        return (
                            <div key={files.indexOf(file)} className="file">
                                {file.name === ''? 'Unnamed File': file.name}: {file.file.size}         
                                <Download className="downloadButton" onClick={()=>{handleAudioUpload(file)}} color="black" size={40}/>
                                <X className="cancelButton" onClick={()=>{removeFile(file)}} color="black" size={40}/>
                            </div>
                        )
                })}
            </div>
            <div className="contentContainer">
                <div className="descriptionContainer">
                    Record the media around you for analysis.
                    Audio Gaurdian will analyze the audio against our samples
                    to determine if the audio around you could be threatening.
                </div>
                <MediaRecorder
                    className="recorder"
                    saveFile={saveFile}
                />
            </div>
        </div>)
}

export default Media;