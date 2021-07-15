import moment from 'moment';
import axios from 'axios';

export function getTotalPage(totalItem, itemPerPage) {
    return totalItem % itemPerPage
        ? Math.floor(totalItem / itemPerPage) + 1
        : totalItem / itemPerPage;
}

export function getDateTime(date) {
    return moment(date).format('YYYY/MM/DD');
}

export async function downloadFile(urlFile = '', fileName = '') {
    try {
        const response = await axios({
            method: 'get',
            url: urlFile,
            responseType: 'arraybuffer',
        });

        const fileURL = window.URL.createObjectURL(new Blob([response.data], { type: 'text' }));
        const fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', fileName);
        document.body.appendChild(fileLink);
        fileLink.click();
        return true;
    } catch (e) {
        return false;
    }
}
