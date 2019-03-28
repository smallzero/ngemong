var listAudio = [];
var listAudioTempForSearch = [];
$(function () {
    $.getJSON("./api/playlist.json", function (data) {
        listAudio = data;
        listAudioTempForSearch = data;
        for (var i = 0; i < listAudio.length; i++) {
            $('.list-group').append('<a href="#" id="item-' + i + '" onclick="btnPlay(' + i + ')" class="list-group-item">' + listAudio[i].title + '</a>');
        }

        $('.list-group').css({ "height": "200px", "overflow-y": "auto" });

        $('#title').text(listAudio[0].title);
        $('#describe').html(listAudio[0].describe);
        var myCirclePlayer = new CirclePlayer("#jquery_jplayer_1", {
            mp3: listAudio[0].path
        }, {
                cssSelectorAncestor: "#cp_container_1",
                swfPath: "jplayer",
                wmode: "window",
                keyEnabled: true,
                supplied: "mp3",
                preload: "none",
            });

        $('#playlist').hide();
    });


});
var statusPlaylist = false;

function btnPlaylist() {
    $(function () {
        if (statusPlaylist) {
            $('#playlist').hide();
            statusPlaylist = false;
        } else {
            $('#playlist').show();
            statusPlaylist = true;
        }
    });
}

var itemSelectedTmp = 0;
function btnPlay(i) {
    $(function () {
        $('#title').text(listAudio[i].title);
        $('#describe').html(listAudio[i].describe);
        if (itemSelectedTmp != i) {
            $('#item-' + i).css({ "background-color": "#ddd" });
            $('#item-' + itemSelectedTmp).css({ "background-color": "#fff" });
            itemSelectedTmp = i;
        }
        var $player = $("#jquery_jplayer_1");
        if ($player.data().jPlayer && $player.data().jPlayer.internal.ready === true) {
            $player.jPlayer("setMedia", {
                mp3: listAudio[i].path
            }, {
                    cssSelectorAncestor: "#cp_container_1",
                    swfPath: "jplayer",
                    wmode: "window",
                    keyEnabled: true,
                    supplied: "mp3",
                    preload: "none",
                }).jPlayer("play");
        } else {
            $player.jPlayer({
                ready: function () {
                    $(this).jPlayer("setMedia", {
                        mp3: listAudio[i].path
                    }).jPlayer("play");
                },
                cssSelectorAncestor: "#cp_container_1",
                swfPath: "jplayer",
                wmode: "window",
                keyEnabled: true,
                supplied: "mp3",
                preload: "none",
            });
        }
    });
}


function searchList(keyword) {
    var matches = [];
    var regexp = new RegExp(keyword.toLowerCase(), 'g');

    for (var i = 0; i < listAudioTempForSearch.length; i++) {
        if (listAudioTempForSearch[i].title.toLowerCase().match(regexp)) matches.push(listAudioTempForSearch[i]);
    }

    listAudio = matches;
    $('.list-group').html('');
    for (var i = 0; i < listAudio.length; i++) {
        $('.list-group').append('<a href="#" id="item-' + i + '" onclick="btnPlay(' + i + ')" class="list-group-item">' + listAudio[i].title + '</a>');
    }
}