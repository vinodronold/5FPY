
$(document).ready(function(){
    function Logo(id){
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
    $("div[id^='fflogo_']").each(function(index){
      Logo($(this).attr('id'));
    });
    $("div[id^='fflogo_'] > svg").addClass("ui centered image");
});
$(document).ready(function(){
    $("div[id^='ffcdia_']").each(function(index){
        var startx = 15,
            starty = 10,
            stringSpace = 10,
            fretSpace = 15,
            strings = 6,
            frets = 4,
            padding = 5,
            //position = [1,0,0,3,3,3,0]; // [BARRE, STRING6, STRING5, STRING4, STRING3, STRING2, STRING1]
            ffcdia = $(this).attr('data-ffcdia').split(","); // [START_FRET, BARRE, STRING6, STRING5, STRING4, STRING3, STRING2, STRING1]
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
        for (cnt = 1; cnt < strings - 1; cnt++){
            var stringStartx = (startx + (stringSpace * cnt));
            stringPath = stringPath + "M"+ stringStartx + " " + starty + " " + "L" + stringStartx + " " + (starty + (fretSpace * frets));
        }
        fretPath = "";
        for (cnt = 1; cnt < frets; cnt++){
            var fretStarty = starty + (fretSpace * cnt);
            fretPath = fretPath + "M" + startx + " " + fretStarty + "L" + (startx + fretWidth) + " " + fretStarty;
        }
        var cdia = new Raphael($(this).attr('id'), paperx, papery);
        var cdia_frets = cdia.set();
        cdia_frets.push(
            cdia.text(chordNamex, chordNamey, $(this).attr('data-ffcdianame')),
            cdia.rect(startx, starty, fretWidth, (fretSpace * frets), 2),
            cdia.path(stringPath + fretPath)
        );
        for (cnt = 0; cnt < frets; cnt++){
            cdia_frets.push(
                cdia.text(padding, starty + ((fretSpace * cnt)+(fretSpace / 2)), (Number(startFretNum[0]) + cnt))
            );
        }

        var cdia_finger = cdia.set();
        if (position[0] > 0 && position[0] <= frets){
            var barreStarty = starty + (fretSpace * (position[0] - 1)) + (fretSpace / 3);
            var barrePath = "M" + startx + " " + barreStarty
            + "L" + (startx + fretWidth) + " " + barreStarty
            + "A1 1 0 0 1 " + (startx + fretWidth) + " " + (barreStarty + 5)
            + "L" + startx + " " + (barreStarty + 5)
            + "A1 1 0 0 1 " + startx + " " + barreStarty;
            cdia_finger.push(
                cdia.path(barrePath)
            );
        }
        $.each(position,function(index, value){
            if (index > 0 && value > 0){
                cdia_finger.push(
                    cdia.circle((startx + (stringSpace * (index - 1))), (starty + (fretSpace * (value - 1)) + (fretSpace / 2)), 3)
                );
            }

        })
        cdia_finger.attr({stroke: "#333",'fill': '#333'});
    });
    $("div[id^='ffcdia_'] > svg").addClass("ui centered image");
});
$(document).ready(function(){
    $.fn.embed.settings.sources = {
        ff_youtube: {
            name   : 'ff_youtube',
            type   : 'video',
            icon   : 'video play',
            domain : 'youtube.com',
            url    : '//www.youtube.com/embed/{id}',
            parameters: function(settings) {
                return {
                    autohide       : !settings.showUI,
                    autoplay       : settings.autoplay,
                    color          : settings.colors || undefined,
                    hq             : settings.hd,
                    jsapi          : settings.api,
                    modestbranding : 1,
                    fs             : 0,
                    rel            : 0,
                    showinfo       : 0,
                    playsinline    : 1
                };
            }
        }
    };
    $('.ui.embed').embed();
    $('#ffsidebarmenu').click(function(){
        $('.ui.sidebar')
            .sidebar('setting', 'transition', 'overlay')
            .sidebar('toggle')
        ;
    });
    $('.special.cards .image').dimmer({
        on: 'hover'
    });

    var pos = 0;
    function scrollList(){
        $(".chordsList").css("left", pos+"em");
        pos = pos - 0.2;
        // FOR 0.1em shift and 25ms - 1s is 4em
        if (pos == -10) {
            $(".chordsList").css("left", "0em");
            clearInterval(timer);
        }
    }

    var timer = setInterval(scrollList, 25);

    $('.ui.search')
        .search({
        //type          : 'youtube',
        minCharacters : 3,
        apiSettings   : {
            onResponse: function(youtubeResponse) {
                var response = {
                  results : []
                }
                ;
                // translate YouTube API response to work with search
                $.each(youtubeResponse.items, function(index, item) {
                    response.results.push({
                        title       : item.snippet.title,
                        url         : '/chords/display/'+item.id.videoId,
                        //description : item.snippet.description,
                        image       : item.snippet.thumbnails.default.url
                    });
                });
                return response;
            },
            url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q={query}&type=video&videoCategoryId=10&key=AIzaSyCpVWdjX0SBFRSfsYcxltR50IhOncXl0YU'
        }
    });
});
