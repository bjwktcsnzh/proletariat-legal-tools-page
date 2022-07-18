//-----------------------------------
// cite.js
//
//     在文档中实现“引用”效果。
//-----------------------------------
// <cite>是H5标签之一，我们直接使用它实现内联引用效果，
//
// <cite>可选属性: 
// dom-id     : 若存在此值，会展开本页面的相应id的元素。
// iframe-src : 此值应当传入一个带请求参数only-dom-id的url。若存在此值，会仅显示该页面的此元素。 
// 

(function () {
    function only_show_other_hidden() {
        let only_dom_id = _common.getQueryVariable("only_dom_id")
        if (only_dom_id) {
            let currentWindowPath = window.location.pathname + window.location.search

            var parent_iframe = null
            if (parent) {
                parent.$("iframe").each(function (idx, iframe) {
                    if (iframe.src.endsWith(currentWindowPath)) {
                        parent_iframe = iframe
                    }
                })
            }

            let only_element = $(`#${only_dom_id}`).clone();
            $("body").append('<div id="hidden_scope" style="display: none;"></div>')
            $("body").children().each(function (idx, ele) {
                $("#hidden_scope").append($(ele))
            })
            $("body").prepend(only_element)

            function _source_href(){
                let l = window.location
                return l.origin + l.pathname + '#' + only_dom_id
            }

            $("body").prepend(`
            <div>
                <a target="_blank" href="${_source_href()}">原文链接</a>
            </div>
            `)

            if (parent_iframe) {
                function _update_parent_iframe_height(parent_iframe) {
                    parent_iframe.height = document.body.scrollHeight
                }

                setInterval(() => _update_parent_iframe_height(parent_iframe), 100)

                $(parent_iframe).css("display", "block")
            }
        }
    }

    function init_cite(cite_seletor = () => $('cite')) {
        let cites = cite_seletor()

        function _throwError(msg) {
            alert(msg)
            throw new Error(msg)
        }

        cites.click(function (click_event) {
            let currentTarget = click_event.currentTarget
            let parentNode = $(currentTarget.parentNode)

            let dom_id = $(currentTarget).attr('dom-id')

            // copy dom when click
            if (typeof dom_id == "string" && dom_id != "") {
                let existedCiteSelector = '[cited_from_dom_id=' + dom_id + ']'

                if ($(parentNode).children(existedCiteSelector).length > 0) {
                    $(existedCiteSelector).remove()
                    return
                }

                let srcElement = $('#' + dom_id)
                if (srcElement.length == 0) {
                    _throwError(`出bug了 , 未找到id为 ${dom_id} 的标签。`)
                }
                let copyedElement = srcElement.clone()[0]
                // remove duplicate id
                $(copyedElement).find('*').removeAttr("id")

                let appendedElement = $(
                    '<div '
                    + 'cited_from_dom_id="' + dom_id + '"'
                    + 'class="cited">'
                    + copyedElement.innerHTML
                    + '</div>'
                )

                parentNode.append(appendedElement)

                init_cite(() => $(appendedElement).find('cite'))

                return
            }


            let iframe_src = $(currentTarget).attr('iframe-src')

            if (typeof iframe_src == "string" && iframe_src != "") {

                let iframe_name = `cited-from-iframe-src-${iframe_src}`
                let existSelector = `iframe[name="${iframe_name}"]`
                if ($(parentNode).children(existSelector).length > 0) {
                    let css_display = $(existSelector).css('display')

                    function _set_css_display(value) { $(existSelector).css('display', value) }

                    if (css_display != "none") {
                        _set_css_display("none")
                    } else {
                        _set_css_display("block")
                    }

                    return
                }

                parentNode.append(
                    ''
                    + `
                    <iframe 
                      class="cited-iframe" 
                      src="${iframe_src}"  
                      name="${iframe_name}" 
                      frameborder="0" 
                      width="100%" 
                      scrolling="no" 
                      style="display:none"
                    >` //  
                    + '</iframe>'
                )

                return
            }
        })
    }

    only_show_other_hidden()
    init_cite()
})()
