import loader from './instagramLoader';
import $ from 'jquery';

var instagramLoader = new loader();
instagramLoader
    .load()
    .then(function (data) {
        console.log(data);
        data.data.map(x => x.images.thumbnail.url)
            .forEach(function (url) {
                var imagestring = `<img src="${url}" />`
                $('#images').append(imagestring);
            });
    });