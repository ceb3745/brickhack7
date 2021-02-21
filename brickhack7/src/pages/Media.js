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
        
        const url = window.URL.createObjectURL(file)
        const click = document.createEvent('Event')
        click.initEvent('click', true, true)
        const link = document.createElement('A')
        link.href = url
        link.download = '../media/output.mp3'
        link.dispatchEvent(click)
        link.click()
        return link
    }

    const removeFile = input_file => {
        setFiles(files.filter((file)=>file !== input_file))
    }

    return(
        <div className="pageContainer">
            <div className="contentContainer">
                <div className="descriptionContainer">
                    Record the media around you for analysis.
                    Audio Gaurdian will analyze the audio against our samples
                    to determine if the audio around you could be threatening.
                </div>
                <MediaRecorder
                    saveFile={saveFile}
                />
            </div>
            <div>
                <div>Files</div>
                {files.map((file)=>{
                        return (
                            <div className="file">
                                {file.size}: {file.type}         
                                <Download className="downloadButton" onClick={()=>{handleAudioUpload(file)}} color="white" size={40}/>
                                <X className="cancelButton" onClick={()=>{removeFile(file)}} color="white" size={40}/>
                            </div>
                        )
                })}
            </div>
        </div>)
}

export default Media;