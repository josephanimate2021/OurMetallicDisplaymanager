function set_cookie(b, g, i, f, h, j, e, a) {
        var d = b + "=" + escape(g);
        if (i) {
                var c = new Date(i, f, h);
                d += "; expires=" + c.toGMTString()
        }
        if (j) {
                d += "; path=" + escape(j)
        }
        if (e) {
                d += "; domain=" + escape(e)
        }
        if (a) {
                d += "; secure"
        }
        document.cookie = d
}
function delete_cookie(b) {
        var a = new Date();
        a.setUTCFullYear(1970, 0, 1);
        a.setUTCHours(0, 0, 1);
        document.cookie = b += "=; expires=" + a.toUTCString()
}
function get_cookie(b) {
        var a = document.cookie.match("(^|;) ?" + b + "=([^;]*)(;|$)");
        if (a) {
                return(unescape(a[2]))
        } else {
                return null
        }
};
