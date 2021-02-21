const fs = require("fs")
const axios = require("axios").default

export const upload_media = (file_path) => {
    // Set or replace these values

    const api_key = process.env.REACT_APP_DOLBY_MEDIA_KEY

    // Declare your dlb:// location

    const config = {
    method: "post",
    url: "https://api.dolby.com/media/input",
    headers: {
        "x-api-key": api_key,
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    data: {
        url: "dlb://in/example.mp4",
    },
    }

    await axios(config)
    .then(function(response) {
        // Upload your media to the pre-signed url response

        const upload_config = {
            method: "put",
            url: response.data.url,
            data: fs.createReadStream(file_path),
            headers: {
                "Content-Type": "application/octet-stream",
                "Content-Length": fs.statSync(file_path).size,
            },
        }
        await axios(upload_config)
        .then(function() {
            console.log("File uploaded")
        })
        .catch(function(error) {
            console.log(error)
        })
    })
    .catch(function(error) {
        console.log(error)
    })
}

export const analyze_media = (output_path = "dlb://out/example.analysis.json") => {
    const axios = require("axios").default

    const config = {
        method: "post",
        url: "https://api.dolby.com/media/analyze",
        headers: {
            "x-api-key": process.env.REACT_APP_DOLBY_MEDIA_KEY,
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        data: {
            input: "s3://dolbyio/public/shelby/airplane.original.mp4",
            output: output_path,
        },
    }

    let job_id = await axios(config)
    .then(function(response) {
        console.log(response.data.job_id)
        return response.data.job_id
    })
    .catch(function(error) {
        console.log(error)
    })

    return {job_id}
}

export const get_job_status = (job_id) => {
    const axios = require("axios").default

    const config = {
        method: "get",
        url: "https://api.dolby.com/media/analyze",
        headers: {
            "x-api-key": process.env.REACT_APP_DOLBY_MEDIA_KEY,
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        params: {
            job_id: job_id,
        },
    }

    axios(config)
    .then(function(response) {
        console.log(JSON.stringify(response.data, null, 4))
    })
    .catch(function(error) {
        console.log(error)
    })
}

export const download_job_output = (file_path, output_path = "dlb://out/example.analysis.json") => {
    const fs = require("fs")
    const axios = require("axios").default

    const config = {
        method: "get",
        url: "https://api.dolby.com/media/output",
        headers: {
            "x-api-key": process.env.REACT_APP_DOLBY_MEDIA_KEY,
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        responseType: "stream",
        params: {
            url: output_path,
        },
    }

    axios(config)
    .then(function(response) {
        response.data.pipe(fs.createWriteStream(file_path))
        response.data.on("error", function(error) {
        console.log(error)
        })
        response.data.on("end", function() {
        console.log("File downloaded!")
        })
    })
    .catch(function(error) {
        console.log(error)
    })
}