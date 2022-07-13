
(function( ){
    switch (window.location.hostname) {
        case "127.0.0.1":
        case "localhost":
            $('.visit-when-dev').css({
                'visibility':'visible'
            })
            break;
        default:
            break;
    }
})()