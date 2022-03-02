export let streamUrl = `http://192.168.29.246:8000/api/stream/`;
export let downloadDirUrl = `http://192.168.29.246:8000/api/downloadDir/`;
export let downloadUrl = `http://192.168.29.246:8000/api/downloadFile/`;

const getToken = async (filePath) => {
    let url = `http://192.168.29.246:8000/api/getStreamToken/`;

    let js_res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({'filePath': filePath}),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res => res.json());
    
    return js_res['token'];
}

export { getToken };