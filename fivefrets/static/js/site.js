
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

    Logo("fflogo");
    $('#fflogo > svg').addClass("ui centered image");

    Logo("ffsidebarlogo");
    $('#ffsidebarlogo > svg').addClass("ui centered image");

});
$(document).ready(function(){
    $.fn.search.settings.templates.youtube = function(response) {
        var html = '';
        html += '<div class="ui basic segment">';
        html += '<div class="ui celled list">';
        $.each(response.results, function(index, result) {
            html += '<div class="item">';
            html += '<div class="right floated content">';
            html += '<div class="ui green mini button">Get Chords</div>';
            html += '</div>';
            html += '<img class="ui tiny image" src="'+result.image+'">';
            html += '<div class="content">';
            html += '<div class="header">'+result.title+'</div>';
            //html += '<p>'+result.description+'</p>';
            html += '</div>';
            html += '</div>';
        });
        html += '</div>';
        html += '</div>';
        return html;
    };
    $('#ffsidebarmenu').click(function(){
        $('.ui.sidebar')
            .sidebar('setting', 'transition', 'overlay')
            .sidebar('toggle')
        ;
    });
    $('.special.cards .image').dimmer({
        on: 'hover'
    });
    $('.ui.search')
        .search({
        //type          : 'youtube',
        minCharacters : 3,
        apiSettings   : {
            onResponse: function(youtubeResponse) {
                var
                response = {
                    results : []
                }
                ;
                // translate GitHub API response to work with search
                $.each(youtubeResponse.items, function(index, item) {
                    response.results.push({
                        title       : item.snippet.title,
                        //description : item.snippet.description,
                        image       : item.snippet.thumbnails.default.url
                    });
                });
                return response;
            },
            url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q={query}&type=video&videoCategoryId=10&key=AIzaSyCpVWdjX0SBFRSfsYcxltR50IhOncXl0YU'
        }
    })
    ;
});
