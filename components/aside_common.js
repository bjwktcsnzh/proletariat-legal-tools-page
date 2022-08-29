
function __hide_or_display_aside() {
    let current_element;
    $('article *').not('body, html').each(function () {
        if (typeof current_element == 'undefined' && $(this).isInViewport()) {
            current_element = $(this);
        }
    });

    let isHided = __aside_is_hided()
    $("aside").css("display", isHided ? "block" : "none")
    $("article").css("margin-left", isHided ? 200 : 0)
    $("#aside-hide-button").text(!isHided ? "显示侧边栏" : "隐藏侧边栏")
    current_element[0].scrollIntoView()
}

function __aside_is_hided() {
    return $("aside").css("display") == "none"
}

(function () {
    if (!_common.inIframe()) {
        $("body").append('<div id="aside-hide-button"></div>')
    }
    let isHided = __aside_is_hided()
    $("#aside-hide-button").text(isHided ? "显示侧边栏" : "隐藏侧边栏")
    if (window && window.innerWidth && window.innerWidth < 400) {
        __hide_or_display_aside()
    }
    $("#aside-hide-button").click(function () {
        __hide_or_display_aside()
    })
})()