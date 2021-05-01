
var ui = {};

document.querySelector('.js-submit').addEventListener('click', function () {
    ui.enter();
});
ui.enter = function () {
    var input1 = document.querySelector('.input-search').value;
    sound.gettrack(input1);
};

document.querySelector('.js-search').addEventListener('keyup', function (e) {

    ui.submit(e);
});
ui.submit = function (e) {
    console.log(e.keyCode);
    var input1 = document.querySelector('.input-search').value;
    if (e.keyCode == 13) {

        sound.gettrack(input1);

    }


};





var input;
var sound = {};
sound.init = function () {
    SC.initialize({
        client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
    });
};
sound.init();
sound.gettrack = function (input) {
    // find all sounds of buskers licensed under 'creative commons share alike'
    SC.get('/tracks', {
        q: input
    }).then(function (tracks) {
        console.log(tracks);

        var sr = document.querySelector(".js-search-results");
        sr.innerHTML="";
        sound.render(tracks);
    });
};




sound.render = function (tracks) {

    tracks.forEach(function (track) {
        console.log(track);
        var gen = track.title;
        //card
        var card = document.createElement('div');
        card.classList.add("card");


        //image
        var imaged = document.createElement('div');
        imaged.classList.add("image");


        //img
        var img = document.createElement('img');
        img.classList.add("image_img");
        img.src = track.artwork_url || 'https://picsum.photos/100/100';
        imaged.appendChild(img);


        //content
        var content = document.createElement('div');
        content.classList.add("content");


        //header
        var header = document.createElement('div');
        header.classList.add("header");
        header.innerHTML = '<a href="' + track.permalink_url + '" target="_blank">' + gen + '</a>'





        //btn
        var btn = document.createElement('div');
        btn.classList.add("ui", "bottom", "attached", "button", "js-button");


        //i
        var icon = document.createElement('i');
        icon.classList.add("add", "icon");



        //span
        var span = document.createElement('span');
        span.innerHTML = "Add to playlist";
        span.addEventListener('click', function () {
            sound.emb(track.permalink_url);
        });

        content.appendChild(header);

        btn.appendChild(icon);
        btn.appendChild(span);

        card.appendChild(imaged);
        card.appendChild(content);
        card.appendChild(btn);

        var sr = document.querySelector(".js-search-results");
        sr.appendChild(card);


    });



};

sound.emb = function (trackurl) {
    SC.oEmbed(trackurl, {
        auto_play: true
    }).then(function (embed) {
        console.log('oEmbed response: ', embed);
        var sidebar = document.querySelector('.js-playlist');
        var box = document.createElement('div');
        box.innerHTML = embed.html;

        sidebar.insertBefore(box, sidebar.firstChild);
        
        
        localStorage.setItem("key", sidebar.innerHTML);
    });
};

var sidebar = document.querySelector('.js-playlist');
sidebar.innerHTML = localStorage.getItem("key");

document.querySelector('.btn').addEventListener('click',function(){
    localStorage.removeItem("key");
    var sidebar = document.querySelector('.js-playlist');
    sidebar.innerHTML= ""
})
   


