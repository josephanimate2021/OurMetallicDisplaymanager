var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

var URL_MOST_WATCHED_MOVIES="/ajax/mostWatchedMovies";var URL_STAFF_PICKS_MOVIES="/ajax/staffPicksMovies";var URL_MOST_SHARED_MOVIES="/ajax/mostSharedMovies";var URL_TOP_SCORED_MOVIES="/ajax/topScoredMovies";function switchIndexTab(G){var F=G.split(",");var E=F[0].split("-");var B=F[1];var C=F[2];var D=0;var A;switch(B){case"staffpicks":A=URL_STAFF_PICKS_MOVIES+"/"+C+"/"+D+"/0/all/thumb/homepage";break;case"mostrecent":A=URL_MOST_SHARED_MOVIES+"/"+C+"/"+D+"/30/all/thumb/homepage";break;case"mostpopular":A=URL_TOP_SCORED_MOVIES+"/"+C+"/"+D+"/30/all/thumb/homepage";break;case"mostviewed":A=URL_MOST_WATCHED_MOVIES+"/"+C+"/"+D+"/30/all/thumb/homepage";break}if($(E[0]).innerHTML==""||$(E[0]).innerHTML=="Loading..."){new Ajax.Request(A,{method:"post",onSuccess:function(I){var H=I.responseText;parseResponse(H);if(responseArray.code=="0"){$(E[0]).innerHTML=responseArray.html}else{displayFeedback(responseArray.code+responseArray.json.error)}resetResponse()},onFailure:function(){displayFeedback("1Error contacting the server")}})}for(i=1;i<E.length;i++){$(E[i]).hide()}$(E[0]).show()}function ssChooseTemplate(A){if(typeof pageTracker!="undefined"&&pageTracker){pageTracker._trackPageview("/pageTracker/slideshow/chooseTemplate/"+A)}window.location="/go/slideshow/"+A}var jtw_divname="jtw_widget1";var jtw_search="domokun";var jtw_width="0px";var jtw_height="0px";var jtw_scroll="yes";var jtw_widget_background="#a6e21b";var jtw_widget_border="1px #aaa";var jtw_center_widget="yes";var jtw_tweet_textcolor="";var jtw_tweet_background="#a6e21b";var jtw_tweet_newbackground="";var jtw_tweet_border="0px";var jtw_tweet_margin="5px";var jtw_tweet_fontsize="11px";var jtw_hide_img="";var jtw_tweet_textcolor="#333";var jtw_tweet_linkcolor="#777";var jtw_widget_style_misc="font-family: verdana, arial, sans;";var jtw_pre_html="<nbsp;";var jtw_post_html="";var jtw_mid_html="";var jtw_num_tweets="100";var jtw_tweet_lang="en";var jtw_widget_refresh_interval="15";

}
/*
     FILE ARCHIVED ON 21:01:34 Apr 09, 2011 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 07:14:48 Mar 19, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 221.549
  exclusion.robots: 0.058
  exclusion.robots.policy: 0.051
  cdx.remote: 0.094
  esindex: 0.009
  LoadShardBlock: 181.271 (3)
  PetaboxLoader3.datanode: 136.491 (5)
  PetaboxLoader3.resolve: 139.08 (3)
  load_resource: 170.575 (2)
*/