const moment = require('moment');
const axios = require('axios');

export function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatDate(date) {
    if (date) {
        return moment(date)
            .format('YYYY-MM-DD');
    }
    return null;
}

export function formatHour(date) {
    if (date) {
        return moment(date)
            .format('HH:MM:SS');
    }
    return null;
}

export async function downloadFile(urlFile, fileName) {
    axios({
        method: 'get',
        url: urlFile,
        responseType: 'arraybuffer',
    })
        .then((response) => {
            const fileURL = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }));
            const fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', fileName);
            document.body.appendChild(fileLink);
            fileLink.click();
        })
        .catch(Function.prototype);
}

export function findByIdInTree(id, array, childName) {
    let o;
    array.some(function iter(a) {
        if (a.id === id) {
            o = a;
            return true;
        }
        return Array.isArray(a[childName]) && a[childName].some(iter);
    });
    return o;
}

export function formatPrice(value) {
    const valueABS = Math.abs(value);
    if (Number.isNaN(valueABS)) return value;
    if (valueABS > -1000 && valueABS < 1000) {
        return value;
    }
    const valueNumber = Intl.NumberFormat('ja-US').format(valueABS);
    if (Number(value) < 0) {
        return `-${valueNumber}`;
    }
    return valueNumber;
}

export function base64ImageToBlob(str) {
    // extract content type and base64 payload from original string
    const pos = str.indexOf(';base64,');
    const type = str.substring(5, pos);
    const b64 = str.substr(pos + 8);

    // decode base64
    const imageContent = atob(b64);

    // create an ArrayBuffer and a view (as unsigned 8-bit)
    const buffer = new ArrayBuffer(imageContent.length);
    const view = new Uint8Array(buffer);

    // fill the view, using the decoded base64
    for (let n = 0; n < imageContent.length; n += 1) {
        view[n] = imageContent.charCodeAt(n);
    }

    // convert ArrayBuffer to Blob
    const blob = new Blob([buffer], { type });

    return blob;
}
