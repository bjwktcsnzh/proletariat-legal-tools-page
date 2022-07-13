//-----------------------------------
// cite.js
//
//     在文档中实现“引用”效果。
//-----------------------------------

(function () {
    function init_cite(cite_seletor = () => $('cite')) {
        let cites = cite_seletor()

        cites.click(function (click_event) {
            let currentTarget = click_event.currentTarget
            let dom_id = $(currentTarget).attr('dom-id')
            // copy dom when click
            if (dom_id != undefined && dom_id != null) {
                let parentNode = $(currentTarget.parentNode)

                let existedCiteSelector = '[cited_from_dom_id=' +  dom_id + ']'

                if ($(parentNode).children(existedCiteSelector).length > 0) {
                    $(existedCiteSelector).remove()
                } else {
                    let srcElement = $('#' + dom_id)
                    if (srcElement.length == 0) {
                        let msg = `sorry , 出bug了 , 未找到id为 ${dom_id} 的标签 , 请向作者报告此bug :)`
                        alert(msg)
                        throw new Error(msg)
                    }
                    let copyedElement = srcElement.clone()[0]
                    // remove duplicate id
                    $(copyedElement).find('*').removeAttr("id")

                    console.log("copyedElement=",copyedElement.__proto__)

                    let appendedElement = $(
                        '<div '
                        + 'cited_from_dom_id="' +  dom_id + '"'
                        + 'class="cited-scope">'
                        + copyedElement.innerHTML
                        + '</div>'
                    )

                    parentNode.append(appendedElement)

                    init_cite(() => $(appendedElement).find('cite'))
                }
            }


        })
    }

    init_cite()
})()
