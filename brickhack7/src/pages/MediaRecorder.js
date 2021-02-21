import React, {useState} from 'react';
import {Recorder} from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'

const Media = ({saveFile}) =>{
    const [audioDetails, setAudioDetails] = useState( {
        url: null,
        blob: null,
        chunks: null,
        duration: {
        h: 0,
        m: 0,
        s: 0
        }
    });
    const [fileName, setFileName] = useState('');
    
    const handleAudioStop = (data) => {
        // console.log(data)
        setAudioDetails(data);
    }

    const handleAudioUpload = (file) => {
        if(file !== null){
            console.log(fileName);
            saveFile({file, name: fileName});
        }
        // console.log(file);
    }

    const handleReset = () => {
        const reset = {
        url: null,
        blob: null,
        chunks: null,
        duration: {
            h: 0,
            m: 0,
            s: 0
        }
        };
        setAudioDetails(reset);
    }

    const onChangeInput = (e) => {
        setFileName(e.target.value);
    }

    return(
        <div>
            <div>Enter File Name: <input value={fileName} onChange={onChangeInput}/></div>
            <Recorder
                record={true}
                title={"Record You Audio for Processing..."}
                audioURL={audioDetails.url}
                showUIAudio
                handleAudioStop={handleAudioStop}
                handleAudioUpload={handleAudioUpload}
                handleRest={handleReset} 
            />
        </div>)
}

export default Media;