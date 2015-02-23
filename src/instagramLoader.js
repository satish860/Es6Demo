import jsonp from 'request'
let accessToken = 'db3e8e27d73c4a0a83699012432520aa';
export default class InstagramLoader {
    constructor() {
        this.url = `https://api.instagram.com/v1/media/popular?client_id=${accessToken}`;
    }

    load() {
        var promise = new Promise((resolve, reject) => {
            jsonp(this.url, (err, data) => {
                resolve(data);
            });
        });
        return promise;
    }
}