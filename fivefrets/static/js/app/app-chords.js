define(["app/logo"], function(logo) {

    var init = function() {
        logo.draw();
    };

    return {
        init: init
    }
});
