//-----------------------------------
// aside_hx_bar.js
//
//     在侧边栏中加入标题目录。
//-----------------------------------

(function () {
    function init_aside_hx_bar() {
        let article = $('article')
        let aside = $('aside')
        aside.append(
            '<p><b>标题目录</b></p>'
            + '<hr />'
        )
        article.find('h1,h2,h3,h4,h5,h6').each(function (idx, item) {
            let a_name = '__title__' + item.innerText

            $('<a name="' + a_name + '" aside-hx-bar-anchor></a>').insertBefore(item);

            let level = parseInt(item.tagName.substring(1))
            aside.append(
                '<p class="aside-h' + level + '" >'
                + '<a href="#' + a_name + '"> ' + item.innerText + ' </a>'
                + '</p>'
            )
        })
        aside.append('<br /><br />')
    }

    init_aside_hx_bar()
})()

