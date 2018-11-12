$(function(){"use strict"
function t(){var t=[]
$("#sidebar .panel-body ol > li > a").each(function(a,i){t.push($(i).text().trim())}),$('#sidebar input[type="search"]').autocomplete({source:t,position:{my:"left top",at:"right top"},select:function(t,a){$("#sidebar > li a:contains("+a.item.label+")")[0].click()}})}function a(t){var a=$.trim(t.parent("label").text()).toLowerCase()
t.is(":checked")?($("div."+a).css("display","block"),$("li."+a).css("display","block"),$("span."+a).css("display","inline")):$("."+a).css("display","none")}function i(t){var a=$(".navbar-fixed-top").outerHeight(!0)
$(document).scrollTop(t.offset().top-a)}function e(){var t=window.location.hash,a=t,e=!1,n=$(t)
if(t){if(t.match(/^#method_/))a="#tab_methods"
else if(t.match(/^#property_/))a="#tab_properties"
else if(t.match(/^#event_/))a="#tab_events"
else if(t.match(/^#attr_/))a="#tab_attrs"
else if(t.match(/#l\d+/)){var o=/#l(\d+)/.exec(t)[1],c=parseInt(o,10)-1
n=$("ol.linenums > li").eq(c)}(e=$('[data-toggle=tab][href="'+a+'"]')).length&&e.trigger("click",{ignore:!0}),n.length&&!t.match(/^#tab_/)&&i(n)}}var n,o
$("[data-toggle=tab]").on("click",function(t,a){a&&!0===a.ignore||(window.location.hash=$(this).attr("href"))}),$("[data-tabid]").on("click",function(t){var a=$(this).attr("data-tabid"),e=$(this).attr("data-anchor")
t.preventDefault(),$('[data-toggle=tab][href="'+a+'"]').click()
var n=e.replace(/\./g,"\\.")
i($(n)),window.location.hash=e}),$("#main-nav li").on("click",function(t){t.preventDefault(),localStorage["main-nav"]=$(this).find("a").attr("href")}),$("#main-nav li").on("shown",function(a){a.preventDefault(),t()}),$("#options-form input:checkbox").on("change",function(){a($(this))
var t=[]
$("#options-form input:checkbox").each(function(a,i){t.push($(i).is(":checked"))}),localStorage.options=JSON.stringify(t)}),$(window).keyup(function(t){83===t.keyCode&&$("#api-tabview-filter input").focus()}),$("#sidebar").keydown(function(t){var a=$(this)
t.ctrlKey?37===t.keyCode?$("#main-nav li a:first").tab("show"):39===t.keyCode&&$("#main-nav li a:last").tab("show"):40===t.keyCode?($("#api-tabview-filter input").is(":focus")?a.find(".tab-content .tab-pane.active li:first a").focus():a.find(".tab-content .tab-pane.active li:last a").is(":focus")?$("#api-tabview-filter input").focus():(n=a.find(".tab-content .tab-pane.active li").find("a:focus").parent("li").index()+1,a.find(".tab-content .tab-pane.active li:eq("+n+") a").focus()),t.preventDefault()):38===t.keyCode&&($("#api-tabview-filter input").is(":focus")?a.find(".tab-content .tab-pane.active li:last a").focus():a.find(".tab-content .tab-pane.active li:first a").is(":focus")?$("#api-tabview-filter input").focus():(n=a.find(".tab-content .tab-pane.active li").find("a:focus").parent("li").index()-1,a.find(".tab-content .tab-pane.active li:eq("+n+") a").focus()),t.preventDefault())}),o=new GithubSlugger,$("h1, h2, h3, h4, h5, h6",".module-description, .class-description").each(function(){var t=$(this),a=o.slug(t.text())
t.attr("id",a),t.addClass("anchorable-toc"),t.prepend('<a class="fa fa-link toc-anchor" href="#'+a+'"></a>')}),function(){if(localStorage.getItem("options")){var t=JSON.parse(localStorage.options),i=$("#options-form")
if(!i.length)return
for(var e=0;e<t.length;e++){var n=i.find("input:checkbox").eq(e)
n.prop("checked",t[e]),a(n)}}}(),function(){var t=window.location.pathname
if(t){var a=t.split("/"),i=decodeURIComponent(a.slice(a.length-2,a.length).join("/"))
$("#sidebar li > a").each(function(t){var a=$(this)
a.attr("href").indexOf(i)>-1&&a.parent("li").addClass("active")})}}(),t(),$(window).on("hashchange",e),window.location.hash&&e()})
