//-----------------------------------
// aside_hx_bar.js
//
//     在侧边栏中加入标题目录。
//-----------------------------------

(function(){
    function init_aside_hx_bar() {
        let article = $('article')
        let aside = $('aside')
        aside.append(
            '<p><b>标题目录</b></p>'
            + '<hr />'
        )
        article.find('h1,h2,h3,h4,h5,h6').each(function (idx, item) {
            let name = "aside_hx_bar__anchor_idx_" + idx
    
            $('<a id="' + name + '" name="' + name + '" hx-anchor></a>').insertBefore(item);
    
            // ctrl+click , jump to anchor .
            $(item).mousedown(function(e){
                if(e.ctrlKey) location.hash='#'+name
            })
    
            let level = parseInt(item.tagName.substring(1))
            let marginLeft = 5 + level * 10
            aside.append(
                '<p style="margin-left: ' + marginLeft + 'px;" >'
                + '<a href="#' + name + '"> ' + item.innerText + ' </a>'
                + '</p>'
            )
        })
    }
    
    init_aside_hx_bar()
})()

