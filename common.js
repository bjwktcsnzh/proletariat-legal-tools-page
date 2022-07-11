



function init_refers(refer_seletor) {
    let refers = refer_seletor()

    refers.addClass("referstyle")

    refers.click(function (click_event) {
        let currentTarget = click_event.currentTarget
        let referValue = $(currentTarget).attr('refer-id')
        let targetParent = $(currentTarget.parentNode)

        let referredAttr = 'refer_from_id_' + referValue

        let existedReferSelector = '[referred=' + referredAttr + ']'

        if ($(targetParent).children(existedReferSelector).length > 0) {
            $(existedReferSelector).remove()
        } else {
            let srcElement = $('#' + referValue)
            if (srcElement.length == 0) {
                let msg = `sorry , 出bug了 , 未找到id为 ${referValue} 的标签 , 请向程序猿报告此bug :)`
                alert(msg)
                throw new Error(msg)
            }
            let copyedElement = srcElement.clone()[0]
            // remove duplicate id
            $(copyedElement).find('*').removeAttr("id")

            let appendedElement = $(
                '<div referred="' + referredAttr
                + '" class="referred"><div class="referred-headbar"></div><div>'
                + copyedElement.innerHTML
                + '</div><div class="referred-tailbar"></div></div>'
            )

            targetParent.append(appendedElement)

            init_refers(() => $(appendedElement).find('[refer-id]'))
        }

    })
}

function init_hx_left_bar(hx_anchor_prefix, src_id, dst_id) {
    let src = $(`#${src_id}`)
    let dst = $(`#${dst_id}`)
    src.find('h1,h2,h3,h4,h5,h6').each(function (idx, item) {
        let name = hx_anchor_prefix + idx

        $('<a id="' + name + '" name="' + name + '" hx-anchor></a>').insertBefore(item);

        let level = parseInt(item.tagName.substring(1))
        let marginLeft = 5 + level * 8
        dst.append(
            '<div style="overflow:auto;margin: 0px 3px 10px ' + marginLeft + 'px;" >'
            + '<a href="#' + name + '"  class="title-lebel"> ' + item.innerText + ' </a>'
            + '</div>'
        )
    })
}

