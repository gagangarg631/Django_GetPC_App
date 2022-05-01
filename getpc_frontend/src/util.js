const baseUrl = `http://192.168.43.244:8000`;
const apiUrl = `${baseUrl}/api`

export const dirsUrl = apiUrl + '/dirs/';
export const streamTokenUrl = apiUrl + '/getStreamToken/';
export const streamUrl = apiUrl + '/stream/';
export const downloadDirUrl = apiUrl + '/downloadDir/';
export const downloadUrl = apiUrl + '/downloadFile/';

const getToken = async (filePath) => {
    let url = streamTokenUrl;

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