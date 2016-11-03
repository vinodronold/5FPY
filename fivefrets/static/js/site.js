$(document).ready(function() {
    function Logo(id) {
        var paper = new Raphael(id, 110, 55);
        var frets = paper.set();
        frets.push(
            paper.rect(5, 5, 100, 25, 2),
            paper.path("M5 10L105 10M5 15L105 15M5 20L105 20M5 25L105 25M27.82 5L27.82 30M46.57 5L46.57 30M66.57 5L66.57 30M87.66 5L87.66 30"),
            paper.circle(56.57, 17.5, 0.75),
            paper.circle(18.91, 17.5, 0.75)
        );
        frets.attr({
            stroke: "#ffffff"
        });
        var brand = paper.text(55, 40, "f i v e f r e t s")
        brand.attr({
            stroke: "#ffffff",
            'stroke-width': 0.5,
            'fill': '#ffffff',
            'stroke-opacity': 0,
            'font-size': 16
        });
    }
    $("div[id^='fflogo_']").each(function(index) {
        Logo($(this).attr('id'));
    });
    $("div[id^='fflogo_'] > svg").addClass("ui centered image");
});
$(document).ready(function() {
    $("div[id^='ffcdia_']").each(function(index) {
        var startx = 15,
            starty = 10,
            stringSpace = 10,
            fretSpace = 15,
            strings = 6,
            frets = 4,
            padding = 5,
            //position = [1,0,0,3,3,3,0]; // [BARRE, STRING6, STRING5, STRING4, STRING3, STRING2, STRING1]
            ffcdia = $(this).data('ffcdia').split(","); // [START_FRET, BARRE, STRING6, STRING5, STRING4, STRING3, STRING2, STRING1]
        var paperx = startx + (stringSpace * (strings - 1)) + padding,
            papery = starty + (fretSpace * frets) + padding,
            fretWidth = stringSpace * (strings - 1),
            chordNamex = startx + ((stringSpace * (strings - 1)) / 2),
            chordNamey = starty - padding,
            startFretNum = ffcdia.slice(0, 1),
            position = ffcdia.slice(1, 8),
            stringPath,
            fretPath;
        stringPath = "";
        for (cnt = 1; cnt < strings - 1; cnt++) {
            var stringStartx = (startx + (stringSpace * cnt));
            stringPath = stringPath + "M" + stringStartx + " " + starty + " " + "L" + stringStartx + " " + (starty + (fretSpace * frets));
        }
        fretPath = "";
        if (startFretNum == 1) {
            fretPath = fretPath + "M" + startx + " " + (starty + 1) + "L" + (startx + fretWidth) + " " + (starty + 1);
        }
        for (cnt = 1; cnt < frets; cnt++) {
            var fretStarty = starty + (fretSpace * cnt);
            fretPath = fretPath + "M" + startx + " " + fretStarty + "L" + (startx + fretWidth) + " " + fretStarty;
        }
        var cdia = new Raphael($(this).attr('id'), paperx, papery);
        cdia.setViewBox(0, 0, paperx, paperx, 1)
        var cdia_frets = cdia.set();
        cdia_frets.push(
            cdia.text(chordNamex, chordNamey, $(this).data('ffcdianame')),
            cdia.rect(startx, starty, fretWidth, (fretSpace * frets), 2),
            cdia.path(stringPath + fretPath)
        );
        for (cnt = 0; cnt < frets; cnt++) {
            cdia_frets.push(
                cdia.text(padding, starty + ((fretSpace * cnt) + (fretSpace / 2)), (Number(startFretNum[0]) + cnt))
            );
        }

        var cdia_finger = cdia.set();
        if (position[0] > 0 && position[0] <= frets) {
            var barreStarty = starty + (fretSpace * (position[0] - 1)) + (fretSpace / 3);
            var barrePath = "M" + startx + " " + barreStarty +
                "L" + (startx + fretWidth) + " " + barreStarty +
                "A1 1 0 0 1 " + (startx + fretWidth) + " " + (barreStarty + 5) +
                "L" + startx + " " + (barreStarty + 5) +
                "A1 1 0 0 1 " + startx + " " + barreStarty;
            cdia_finger.push(
                cdia.path(barrePath)
            );
        }
        $.each(position, function(index, value) {
            if (index > 0 && value > 0) {
                cdia_finger.push(
                    cdia.circle((startx + (stringSpace * (index - 1))), (starty + (fretSpace * (value - 1)) + (fretSpace / 2)), 3)
                );
            }

        })
        cdia_finger.attr({
            stroke: '#333',
            'fill': '#333'
        });
    });
    $("div[id^='ffcdia_'] > svg").addClass("ui fluid centered image");
});
$(document).ready(function() {
    $.fn.embed.settings.sources = {
        ff_youtube: {
            name: 'ff_youtube',
            type: 'video',
            icon: 'video play',
            domain: 'youtube.com',
            url: '//www.youtube.com/embed/{id}',
            parameters: function(settings) {
                return {
                    autohide: !settings.showUI,
                    autoplay: settings.autoplay,
                    color: settings.colors || undefined,
                    hq: settings.hd,
                    jsapi: settings.api,
                    modestbranding: 1,
                    fs: 0,
                    rel: 0,
                    showinfo: 0,
                    playsinline: 1,
                    enablejsapi: 1
                };
            }
        }
    };
    $('#ffsidebarmenu').click(function() {
        $('.ui.sidebar')
            .sidebar('setting', 'transition', 'overlay')
            .sidebar('toggle');
    });
    $('.special.cards .image').dimmer({
        on: 'hover'
    });

    $('#ff_transpose_plus').click(function() {
        $(".ui.segment.chordslist").each(function(index) {
            var m_chordid = $(this).attr('data-chordid');
            if (m_chordid != 'N') {
                if (m_chordid == '12') {
                    m_chordid = 0;
                }
                m_chordid = Number(m_chordid) + 1;
                $(this).attr('data-chordid', m_chordid);
            }
        });
        var transpose_num = $("#ff_transpose_num").text();
        $("#ff_transpose_num").text(Number(transpose_num) + 1);
    });

    $('#ff_transpose_minus').click(function() {
        $(".ui.segment.chordslist").each(function(index) {
            var m_chordid = $(this).attr('data-chordid');
            if (m_chordid != 'N') {
                if (m_chordid == '1') {
                    m_chordid = 13;
                }
                m_chordid = Number(m_chordid) - 1;
                $(this).attr('data-chordid', m_chordid);
            }
        });
        var transpose_num = $("#ff_transpose_num").text();
        $("#ff_transpose_num").text(Number(transpose_num) - 1);
    });

    $('.ui.search')
        .search({
            //type          : 'youtube',
            minCharacters: 3,
            apiSettings: {
                onResponse: function(youtubeResponse) {
                    var response = {
                        results: []
                    };
                    // translate YouTube API response to work with search
                    $.each(youtubeResponse.items, function(index, item) {
                        response.results.push({
                            title: item.snippet.title,
                            url: '/chords/display/' + item.id.videoId,
                            //description : item.snippet.description,
                            image: item.snippet.thumbnails.default.url
                        });
                    });
                    return response;
                },
                url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q={query}&type=video&videoCategoryId=10&key=AIzaSyCpVWdjX0SBFRSfsYcxltR50IhOncXl0YU'
            }
        });

    // youtube api
    var player;
    $('.ui.embed').embed({
        onDisplay: function() {
            $('.embed > iframe').attr('id', 'ff_ytplayer');
            var tag = document.createElement('script');
            tag.id = 'iframe-demo';
            tag.src = 'https://www.youtube.com/iframe_api';
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        }
    });
    window.onYouTubeIframeAPIReady = function() {
        console.log('onYouTubeIframeAPIReady');
        player = new YT.Player('ff_ytplayer', {
            events: {
                //'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    };
    if (typeof playing === 'undefined' || playing === null) {
        var playing = false;
    };
    if (typeof traverse_chord === 'undefined' || traverse_chord === null) {
        var traverse_chord = function(idx) {
            ffchordlist_pos = 0;
            var traverse_chord_int = setInterval(function() {
                var ffchordlist = '#ffchordlist_' + idx,
                    ffchordlist_f = '#ffchordlist_',
                    ffchordlist_p = '#ffchordlist_';
                if (player.getCurrentTime() >= ffchordlist_pos) {
                    if (idx > 1) {
                        ffchordlist_p = ffchordlist_p + (idx - 1)
                    }
                    $(ffchordlist).addClass("orange inverted");
                    $(ffchordlist_p).removeClass("orange inverted");

                    ffchordlist_f = ffchordlist_f + (idx + 1);
                    ffchordlist_pos = $(ffchordlist_p).data('postn')
                    idx += 1;
                }
                console.log(ffchordlist_f, ffchordlist, ffchordlist_p, player.getCurrentTime(), ffchordlist_pos);

            }, 250);
        }
    }
    var pausingVideo = function(triggerPause) {
        if (triggerPause === true) {
            player.pauseVideo();
        };
        $('#ff_play').html('<i class="play icon"></i>');
        playing = false;
        console.log('pausingVideo');
    };
    var playingVideo = function(triggerPlay) {
        if (triggerPlay === true) {
            player.playVideo();
        }
        $('#ff_play').html('<i class="pause icon"></i>');
        playing = true;
        console.log('playingVideo');
    };
    $('#ff_start').click(function() {
        if (player) {
            player.seekTo(0, true)
        }
    });
    $('#ff_play').click(function() {
        if (!player) {
            $('.ui.embed > i.video.play').click();
        } else {
            if (playing === true) {
                pausingVideo(true);
            } else {
                playingVideo(true);
            }
        };
    });
    $('.ui.segment.chordslist').click(function() {
        console.log($(this).data('postn'));
        if (player) {
            player.seekTo(Number($(this).data('postn')), true)
        }
    });

    function onPlayerStateChange(event) {
        if (event.data == -1) {
            console.log('unstarted'); // unstarted = gray
        } else if (event.data == YT.PlayerState.ENDED) {
            pausingVideo(false);
            console.log('ENDED');
        } else if (event.data == YT.PlayerState.PLAYING) {
            traverse_chord(1);
            playingVideo(false);
            console.log('PLAYING');
        } else if (event.data == YT.PlayerState.PAUSED) {
            //clearInterval(traverse_chord_int);
            pausingVideo(false);
            console.log('PAUSED');
        } else if (event.data == YT.PlayerState.BUFFERING) {
            pausingVideo(false);
            console.log('BUFFERING');
        } else if (event.data == YT.PlayerState.CUED) {
            console.log('video cued'); // video cued = orange
        }
    }

});
