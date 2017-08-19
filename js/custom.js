// 旧ページの救済

if ( location.pathname.match(/portfolio/) && (location.pathname.match(/learn_from_daiguard/) || location.pathname.match(/2017071501/)) ) {
  // URL変換
  var url = location.href.replace(/portfolio/g, "entry").slice(0,-1);
  document.write("<p>該当のコンテンツは新しいページに移動しました。５秒後に移動します。</p><p>新URL: <a href=\"" + url + "\">" + url + "</a></p>");
  // canonical設定
  var link = document.getElementsByTagName("link")[0];
  link.href = url;
  // redirect
 　　setTimeout("redirect()", 5000);
 　　function redirect(){
 　　 　location.href = url;
 　　}
}
