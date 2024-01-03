/**
 * FireAnimate Account System For LVM Clones.
 * if you are curious about firebase coding, you can look up some lessons on youtube.
 * that's how i learned firebase coding. -JosephAnimate
 */
// modules (script type must be a module in order for this to work)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
import {
        GoogleAuthProvider, 
        GithubAuthProvider,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        signInWithPopup, 
        getAuth,
        onAuthStateChanged,
        signOut
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
const firebaseConfig = { // config for activating the firebase.
        apiKey: "AIzaSyDFsDeO5u9FL1d862Ef2bmFz1t3mEiIYUM",
        authDomain: "fireanimate-eb62d.firebaseapp.com",
        databaseURL: "https://fireanimate-eb62d-default-rtdb.firebaseio.com",
        projectId: "fireanimate-eb62d",
        storageBucket: "fireanimate-eb62d.appspot.com",
        messagingSenderId: "348300062169",
        appId: "1:348300062169:web:aa79b3d45d63f969abbdc8",
        measurementId: "G-ZSKPET0WXK"
};
const schoolEmails = {
        "carrollk12.org": true,
        "greenvilleschools.us": true,
        "hwschools.org": true
}
let githubLoginComplete = false;
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const auth = getAuth();
if (!window.location.pathname.includes("studio.html")) {
        if (document.getElementById("google-login")) document.getElementById("google-login").onclick = async () => { // opens google login
                await signUp();
        };
        if (document.getElementById("github-login")) document.getElementById("github-login").onclick = async () => { // opens github login
                try {
                        githubLoginComplete = true;
                        await signInWithPopup(auth, githubProvider);
                } catch (e) {
                        console.log(e);
                }
        };
        if (document.getElementById("logout-button")) document.getElementById("logout-button").onclick = async () => { // signs the user out of their account
                try {
                        await signOut(auth)
                } catch (e) {
                        console.log(e);
                }
        };
}
let signupComplete = false;
const load = document.getElementById("loading");
const buttons = document.getElementById("buttons");
const button2 = document.getElementById("signup-button-2015");
const button3 = document.getElementById("login-button-2015");
const buttons2 = document.getElementById("requires-login-buttons");
const loginButton = document.getElementById("login-button") || document.getElementsByClassName("login-button")[0];
const loggedIn = document.getElementById("logged-in");
const logout = document.getElementById("logout-button");
const ccFlashvars = { // flashvars for the char creator
        apiserver: "https://goanimate-wrapper-1.3hj.repl.co/",
        m_mode: "school",
        isLogin: "N",
        isEmbed: "0",
        ctc: "go",
        tlang: "en_US",
        storePath: "https://josephanimate2021.github.io/store/50/<store>",
        clientThemePath: "https://josephanimate2021.github.io/static/477/<client_theme>",
        appCode: "go",
        page: "",
        siteId: "go",
        userId: "",
        themeId: "family",
        ut: "20"
};
const studioFlashVars = { // flashvars for the LVM
        apiserver: "https://goanimate-wrapper-1.3hj.repl.co/",
        storePath: "https://ourmetallicdisplaymanager.joseph-animate.repl.co/static/store/<store>",
        isEmbed: 1,
        ctc: "go",
        username: "",
        ut: 20,
        bs: "default",
        appCode: "go",
        page: "",
        siteId: "go",
        lid: 13,
        isLogin: "N",
        retut: 1,
        userId: "",
        clientThemePath: "https://josephanimate2021.github.io/static/477/<client_theme>",
        tlang: "en_US",
        isWide: 0,
        collab: 0,
        nextUrl: "/go/savedMovie/<movieId>",
}
const actionShopFlashvars = { // actionshop flashvars
        actionshopSWF: "https://josephanimate2021.github.io/animation/24/actionshop.swf",
        apiserver: "/",
        clientThemePath: "https://josephanimate2021.github.io/static/477/<client_theme>",
        userId: ""
};
onAuthStateChanged(auth, (data) => { // refreshes user data for some of the pages
        if (data) {
                if (window.location.pathname == "/business/videoplans") window.location.href = window.location.origin;
                if (window.location.origin == "https://go2015.joseph-animate.repl.co") {
                        if (window.location.pathname.startsWith("/videomaker/full")) {
                                $(document).ready(function() {
                                        if (enable_full_screen) {
                                                if (!false) $('#studio_container').css('top', '0px');
                                                $('#studio_container').show();
                                                $('.site-footer').hide();
                                                $('#studioBlock').css('height', '1800px');
                                                if (false) checkCopyMovie(proceedWithFullscreenStudio(data), '');
                                                else if (false) checkEditMovie('');
                                                else proceedWithFullscreenStudio(data);
                                                $(window).on('resize', function() {
                                                        ajust_studio();
                                                });
                                                $(window).on('studio_resized', function() {
                                                        if (show_cc_ad) _ccad.refreshThumbs();
                                                });
                                                if (studioApiReady) {
                                                        var api = studioApi($('#studio_holder'));
                                                        api.bindStudioEvents();
                                                        studioModule = new StudioModule();
                                                }
                                                $('.ga-importer').prependTo($('#studio_container'));
                                        } else flashData(data);
                                        // Video Tutorial
                                        videoTutorial = new VideoTutorial($("#video-tutorial"));
                                })
                                // restore studio when upsell overlay hidden
                                .on('hidden.bs.modal', '#upsell-modal', function(e) {
                                        if ($(e.target).attr('id') == 'upsell-modal') restoreStudio();
                                }).on('studioApiReady', function() {
                                        var api = studioApi($('#studio_holder'));
                                        api.bindStudioEvents();
                                        studioModule = new StudioModule();
                                })
                        } else if (window.location.pathname.startsWith("/charactercreator")) {
                                params.flashvars.userId = data.uid;
                                jQuery('#char_creator_client').flash(params);
                        } else switch (window.location.pathname) {
                                case "/login":
                                case "/signup": {
                                        if (!data.emailVerified) {
                                                if (signupComplete || githubLoginComplete) {
                                                        githubLoginComplete = false;
                                                        signupComplete = false;
                                                        const listReq = new XMLHttpRequest();
                                                        listReq.open('POST', '/ajax/sendVerificationLinkToUserEmail');
                                                        listReq.send(data.email);
                                                        listReq.onreadystatechange = (e) => {
                                                                const d = JSON.parse(listReq.responseText);
                                                                if (d.status == "ok") {
                                                                        jQuery(".floating-form").not("[data-account-form]").show();
                                                                        document.getElementsByClassName('floating-form')[0].style.display = "none";
                                                                } else displayFeedback(1 + d.msg || "Could not connect to the server");
                                                        };
                                                } else {
                                                        githubLoginComplete = false;
                                                        jQuery(".floating-form").not("[data-account-form]").show();
                                                        document.getElementsByClassName('floating-form')[0].style.display = "none";
                                                }
                                        } else {
                                                githubLoginComplete = false;
                                                const perms = (new URLSearchParams(window.location.search));
                                                if (perms.get("r")) 
                                                        window.location.href = 
                                                                window.location.origin + perms.get("r").replace("%2F", "/");
                                                else window.location.href = window.location.origin;
                                        }
                                        break;
                                } case "/videomaker": {
                                        for (const elements of document.getElementsByTagName("small")) if (elements) elements.innerHTML = "Start in Lil' Peepz";
                                        for (const elements of document.getElementsByClassName("apps")) {
                                                const html = elements.innerHTML;
                                                const pieces = html.split("showSignup(0, ");
                                                elements.innerHTML = pieces.join("fullscreenStudio(");
                                        }
                                        break;
                                } case "/": {
                                        for (const elements of document.getElementsByClassName("btn-large")) {
                                                if (elements) {
                                                        elements.href = "/videomaker";
                                                        elements.innerHTML = "Make a Video";
                                                }
                                        }
                                }
                        }
                }
                if (loggedIn) loggedIn.style.display = "block";
                if (loginButton) loginButton.style.display = "none";
                ccFlashvars.userId = data.uid;
                actionShopFlashvars.userId = data.uid;
                ccFlashvars.isLogin = "Y";
                studioFlashVars.isLogin = "Y";
                studioFlashVars.userId = data.uid;
                studioFlashVars.username = data.displayName ? data.displayName.replace(" ", "+") : "";
                studioFlashVars.uemail = data.email;
                if (window.location.pathname.includes("cc.html")) {
                        jQuery.extend(CCStandaloneBannerAdUI, actionShopFlashvars);
                        jQuery('#char_creator_client').flash({
                                id: "char_creator",
                                swf: "https://josephanimate2021.github.io/goanimate-2010-stuff/2013/cc.swf",
                                height: 500,
                                width: 954,

                                align: "middle",
                                allowScriptAccess: "always",
                                allowFullScreen: "true",
                                wmode: "transparent",

                                hasVersion: "10.0.12",

                                flashvars: ccFlashvars
                        });
                } else if (window.location.pathname.includes("studio.html")) {
                        document.getElementById('lvm').innerHTML = toObjectString(studioFlashVars)
                } else if (window.location.origin == "https://gowdpk.joseph-animate.repl.co" || window.location.origin == "https://gowdpkforschools.joseph-animate.repl.co") {
                        userData = data;
                        userData.loggedIn = true;
                        if (window.location.pathname.includes("settings.html")) new UserSettings();
                        $.post("/ajax/lvmSettings/list", {
                                uid: userData.uid,
                                email: userData.email,
                                emailVerified: userData.emailVerified,
                                displayName: userData.displayName,
                                isAnonymous: userData.isAnonymous,
                                photoURL: userData.photoURL
                        }).done(d => { // lvm settings for the user.
                                const json = JSON.parse(d);
                                settingsData = json;
                                if (window.location.pathname.includes("settings.html")) for (const stuff in json) {
                                        const elem = $(`#${stuff}`);
                                        elem.find(`option[value='${json[stuff]}']`).prop("selected", true);
                                }
                                if (json.darkmode == "off") 
                                        switch (window.location.pathname) {
                                                case "/html/settings.html":
                                                case "/html/list_private.html":
                                                case "/html/list_guest.html":
                                                case "/html/list.html": {
                                                        $("#darkModeChange1").css("background-color", "white").css("color", "black");
                                                        switch (window.location.pathname) {
                                                                case "/html/list_private.html":
                                                                case "/html/list_guest.html":
                                                                case "/html/list.html": {
                                                                        $(".modal-content").css("background-color", "white").css("color", "black");
                                                                        break;
                                                                } case "/html/settings.html": {
                                                                        $("#darkModeChange2").css("background-color", "white").css("color", "black");
                                                                        $("#darkModeChange3").css("background-color", "white").css("color", "black");
                                                                        $("#darkModeChange5").css("background-color", "white").css("color", "black");
                                                                        $("#darkModeChange4").css("background-color", "white").css("color", "black");
                                                                        $("#darkModeChange6").css("background-color", "white").css("color", "black");
                                                                        break;
                                                                }
                                                        }
                                                        break;
                                                }
                                        } 
                        });
                        if (window.location.pathname.includes("list_private.html")) loadVideoList();
                        if (window.location.pathname.includes("list_guest.html")) window.location.href = window.location.origin + "/html/list_private.html";
                }
        } else {
                if (window.location.pathname == "/business/videoplans") startSignupProcess();
                if (window.location.origin == "https://go2015.joseph-animate.repl.co") {
                        if (
                                window.location.pathname.startsWith("/videomaker/full") 
                                || window.location.pathname.startsWith("/charactercreator")
                        ) window.location.href = window.location.origin + '/signup?r=' + window.location.pathname.replace("/", "%2F");
                        switch (window.location.pathname) {
                                case "/dashboard/videos": {
                                        window.location.href = '/';
                                        break;
                                } case "/": {
                                        for (const elements of document.getElementsByClassName("btn-large")) {
                                                if (elements) {
                                                        elements.href = "/signup";
                                                        elements.innerHTML = "Sign up";
                                                }
                                        }
                                        break;
                                } case "/videomaker": {
                                        for (const elements of document.getElementsByTagName("small")) if (elements) elements.innerHTML = "Sign up to try";
                                        for (const elements of document.getElementsByClassName("apps")) {
                                                const html = elements.innerHTML;
                                                const pieces = html.split("fullscreenStudio(");
                                                elements.innerHTML = pieces.join("showSignup(0, ");
                                        }
                                        break;
                                }
                        }
                }
                if (loggedIn) loggedIn.style.display = "none";
                if (loginButton) loginButton.style.display = "block";
                ccFlashvars.userId = "";
                actionShopFlashvars.userId = "";
                ccFlashvars.isLogin = "N";
                studioFlashVars.userId = "";
                studioFlashVars.isLogin = "N";
                studioFlashVars.username = "";
                studioFlashVars.uemail = "";
                if (window.location.pathname.includes("cc.html")) {
                        jQuery.extend(CCStandaloneBannerAdUI, actionShopFlashvars);
                        jQuery('#char_creator_client').flash({
                                id: "char_creator",
                                swf: "https://josephanimate2021.github.io/goanimate-2010-stuff/2013/cc.swf",
                                height: 500,
                                width: 954,

                                align: "middle",
                                allowScriptAccess: "always",
                                allowFullScreen: "true",
                                wmode: "transparent",

                                hasVersion: "10.0.12",

                                flashvars: ccFlashvars
                        });
                } else if (window.location.pathname.includes("studio.html")) {
                        document.getElementById('lvm').innerHTML = toObjectString(studioFlashVars);
                } else if (window.location.origin == "https://gowdpk.joseph-animate.repl.co" || window.location.origin == "https://gowdpkforschools.joseph-animate.repl.co") {
                        if (window.location.pathname.includes("settings.html") || window.location.pathname.includes("list_private.html")) window.location.href = window.location.origin + "/html/list_guest.html";
                        else userData = {
                                loggedIn: false
                        }
                        if (settingsData.darkmode == "off") 
                                switch (window.location.pathname) {
                                        case "/html/list.html": {
                                                $("#darkModeChange1").css("background-color", "black").css("color", "white");
                                                $(".modal-content").css("background-color", "black").css("color", "white");
                                                break;
                                        }
                                } 
                }
        }
});
setTimeout(() => { // plays an effect to make it look like that the login page is loading.
        onAuthStateChanged(auth, (data) => {
                if (load) load.style.display = "none";
                if (buttons) buttons.style.display = "block";
                if (data) {
                        if (loggedIn) loggedIn.style.display = "block";
                        if (button2) button2.style.display = "none";
                        if (button3) button3.style.display = "none";
                        if (loginButton) loginButton.style.display = "none";
                        if (buttons2) buttons2.style.display = "none";
                        if (logout) logout.style.display = "block";
                        if (window.location.origin == "https://gowdpk.joseph-animate.repl.co" || window.location.origin == "https://gowdpkforschools.joseph-animate.repl.co" && window.location.pathname == "/html/settings.html") $("#google-login").hide();
                } else {
                        if (button2) button2.style.display = "block";
                        if (button3) button3.style.display = "block";
                        if (loggedIn) loggedIn.style.display = "none";
                        if (loginButton) loginButton.style.display = "block";
                        if (buttons2) buttons2.style.display = "block";
                        if (logout) logout.style.display = "none";
                }
        });
}, 1000);
const perms = (new URLSearchParams(window.location.search));
if (perms.get("ccId")) ccFlashvars.original_asset_id = perms.get("ccId");
if (perms.get("tutorial")) showStudio();
studioFlashVars.tray = perms.get("tray") || "custom";
async function signUp() {
        try {
                await signInWithPopup(auth, googleProvider)
        } catch (e) {
                console.log(e);
        }
}
function startSignupProcess() {
        signUp();
}
function showStudio() {
        if (schoolEmails[studioFlashVars.uemail.split("@")[1]]) $(".close").show();
        else $("#close").hide();
        if (window.location.origin == "https://gowdpk.joseph-animate.repl.co" || window.location.origin == "https://gowdpkforschools.joseph-animate.repl.co") studioFlashVars.nextUrl = 'javascript:refreshVideoList()'
        attrs.data = "/static/animation/go_full.swf";
        info.id = "studio";
	attrs.type = "application/x-shockwave-flash";
        if (window.location.pathname != "/html/settings.html") {
                attrs.width = "1366";
                attrs.height = "700"
        } else {
                attrs.width = "778";
                attrs.height = "669"
        }
        studioFlashVars.apiserver = window.location.origin + "/";
        if (studioFlashVars.userId) studioFlashVars.ut = 20;
        else studioFlashVars.ut = 10;
        studioFlashVars.storePath = "/static/store/<store>";
        studioFlashVars.clientThemePath = "/static/<client_theme>";
        params.flashvars = studioFlashVars;
        params.align = "middle"; 
        params.allowScriptAccess = "always";
        params.allowFullScreen = "true";
        params.wmode = "window";
        params.hasVersion = "10.3";
	params.movie = "/static/animation/go_full.swf";
        if (studioFlashVars.isLogin == "Y") {
                if (schoolEmails[studioFlashVars.uemail.split("@")[1]]) {
                        if (window.location.origin != "https://gowdpkforschools.joseph-animate.repl.co") showModal('Your Google Account Is A School Account', 'If you want to make a video with your school account, please use GoWDPK for schools as this version of GoWDPK contains some props that are not school appropriate like weapons and eta. If you want to use GoWDPK For Schools, please click <a href="https://gowdpkforschools.joseph-animate.repl.co/">Here</a>.');
                        else showModal('Create a Video', toObjectString(attrs, params));
                } else if (window.location.origin == "https://gowdpkforschools.joseph-animate.repl.co") 
                        showModal('Your Google Account Is A Personal Account', 'If you want to make a video with your personal account, please use the normal version of GoWDPK. If you want to use GoWDPK, please click <a href="https://gowdpk.joseph-animate.repl.co/">Here</a>.');
                else showModal('Create a Video', toObjectString(attrs, params));
        } else if (window.location.origin == "https://gowdpkforschools.joseph-animate.repl.co") showModal('Login Required', 'Please login to your google account in order to use the LVM.');
        else window.location.href = window.location.origin + '/go_full?tray=custom';
}
if (document.getElementById("char-button")) document.getElementById("char-button").onclick = () => {
        $(".close").show();
        attrs.data = "/static/animation/cc.swf";
	attrs.type = "application/x-shockwave-flash";
        info.id = "char_creator";
	if (window.location.pathname != "/html/settings.html") {
                attrs.width = "960";
                attrs.height = "600"
        } else {
                attrs.width = screen.width;
                attrs.height = screen.height;
        }
        if (!ccFlashvars.userId) ccFlashvars.ut = 10;
        else ccFlashvars.ut = 20;
        ccFlashvars.apiserver = window.location.origin + "/";
        ccFlashvars.storePath = "/static/store/<store>";
        ccFlashvars.clientThemePath = "/static/<client_theme>";
        params.flashvars = ccFlashvars;
        params.align = "middle"; 
        params.allowScriptAccess = "always";
        params.allowFullScreen = "true";
        params.wmode = "transparent";
	params.movie = "/static/animation/cc.swf";
        if (schoolEmails[studioFlashVars.uemail.split("@")[1]]) {
                if (window.location.origin != "https://gowdpkforschools.joseph-animate.repl.co") showModal('Your Google Account Is A School Account', 'If you want to make a character with your school account, please use GoWDPK For Schools because some people may create their characters here witch may not be school appropriate. If you want to use GoWDPK For Schools, please click <a href="https://gowdpkforschools.joseph-animate.repl.co/">Here</a>.');
                else showModal('Create a Character', `<iframe id="obj" height="${attrs.height}" width="${screen.height}" src="/cc_browser?${toAttrString(params.flashvars)}"></iframe>`);
        } else {
                if (window.location.origin == "https://gowdpkforschools.joseph-animate.repl.co" && userData.loggedIn) showModal('Your Google Account Is A Personal Account', 'If you want to make a character with your personal account, please use the normal version of GoWDPK. If you want to use GoWDPK, please click <a href="https://gowdpk.joseph-animate.repl.co/">Here</a>.');
                else {
                        if (window.location.origin != "https://gowdpkforschools.joseph-animate.repl.co") showModal('Create a Character', `<iframe id="obj" height="600" width="960" src="/cc_browser?${toAttrString(params.flashvars)}"></iframe>`)
                        else if (ccFlashvars.isLogin == "N") showModal('Login Required', 'Please login to your google account in order to create characters.');
                }
        }
}
if (document.getElementById("studio-button")) document.getElementById("studio-button").onclick = () => { // sets up a studio modal
        showStudio();
}
if (window.location.origin == "https://go2015.joseph-animate.repl.co") {
        var processing = false;
        var buttonText;
        switch (window.location.pathname) {
                case "/signup": {
                        function submitSignUp() {
                                if (!validateSignUp()) return;
                                if (processing) return;
                                processing = true;
                                buttonText = jQuery('#btn-signup').text();
                                jQuery('#btn-signup').text('Please wait...');
                                jQuery.post("/ajax/hashUserPassword", jQuery('#signup-form').serialize(), (d) => {
                                        const json = JSON.parse(d);
                                        console.log(json);
                                        if (json.code == 0) {
                                                signupComplete = true;
                                                signUp(jQuery.trim(jQuery('#signup-email').val()), jQuery('#signup-password').val());
                                        } else {
                                                processing = false;
                                                formErrorMessage(json.msg);
                                                jQuery('#btn-signup').text(buttonText);
                                        }
                                });
                        }
                        async function signUp(email, password) {
                                try {
                                        await createUserWithEmailAndPassword(auth, email, password)
                                } catch (e) {
                                        processing = false;
                                        formErrorMessage(e.message);
                                        jQuery('#btn-signup').text(buttonText);
                                }
                        }
                        function validateSignUp() {
                                var email = jQuery('#signup-email'),
                                        email_val = jQuery.trim(email.val()),
                                        password = jQuery('#signup-password');
                                formErrorMessage('');
                                if (!email_val) {
                                        email.focus();
                                        formErrorMessage('Email address required');
                                        return false;
                                }
                                if (!email_val.match(/^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i)) {
                                        email.focus();
                                        formErrorMessage('Invalid email address');
                                        return false;
                                }
                                if (!password.val()) {
                                        password.focus();
                                        formErrorMessage('Password required');
                                        return false;
                                }
                                if (password.val().length <= 3) {
                                        password.focus();
                                        formErrorMessage('Password must be longer than 3 characters');
                                        return false;
                                }
                                return true;
                        }
                        function formErrorMessage(message) {
                                jQuery('#signup-form-message').text(message);
                        }
                        jQuery('#signup-form').submit(function(e) {
                                e.preventDefault();
                                submitSignUp();
                        });
                        break;
                } case "/login": {
                        function validateLogin() {
                                var email = jQuery('#login-email'), email_val = jQuery.trim(email.val()), password = jQuery('#login-password');
                                formErrorMessage('');
                                if (!email_val) {
                                        jQuery('#login-email').focus();
                                        formErrorMessage('Please enter your email');
                                        return false;
                                }
                                if (!password.val()) {
                                        jQuery('#login-password').focus();
                                        formErrorMessage('Please enter your password');
                                        return false;
                                }
                                return true;
                        }
                        function submitLogin() {
                                if (!validateLogin()) return;
                                if (processing) return;
                                processing = true;
                                buttonText = jQuery('#btn-login').text();
                                jQuery('#btn-login').text('Logging in...');
                                jQuery.post('/ajax/compareUserEmailAndPassword', jQuery('#login-form').serialize(), (d) => {
                                        const json = JSON.parse(d);
                                        if (json.code != 0) {
                                                processing = false;
                                                formErrorMessage(json.msg);
                                                jQuery('#btn-login').text(buttonText);
                                        } else signIn(jQuery.trim(jQuery('#login-email').val()), jQuery('#login-password').val());
                                });
                        }
                        async function signIn(email, password) {
                                try {
                                        await signInWithEmailAndPassword(auth, email, password)
                                } catch (e) {
                                        processing = false;
                                        formErrorMessage(e.message);
                                        jQuery('#btn-login').text(buttonText);
                                }
                        }
                        function formErrorMessage(message) {
                                jQuery('#login-form-message').text(message);
                        }
                        jQuery('#login-form').submit(function() {
                                submitLogin();
                                return false;
                        });
                        break;
                } case "/forgotemail": {
                        let gotEmail = false;
                        function validateLogin() {
                                formErrorMessage('');
                                if (!jQuery('#login-password').val()) {
                                        jQuery('#login-password').focus();
                                        formErrorMessage('Please enter your password');
                                        return false;
                                }
                                return true;
                        }
                        function submitLogin() {
                                if (!validateLogin()) return;
                                if (processing) return;
                                processing = true;
                                buttonText = jQuery('#btn-login').text();
                                jQuery('#btn-login').text('Getting your email...');
                                jQuery.post('/ajax/getUserEmail', {
                                        password: jQuery('#login-password').val()
                                }, (d) => {
                                        const json = JSON.parse(d);
                                        if (json.code == 0) {
                                                jQuery(".floating-form").hide().not("[data-account-form]").show();
                                                jQuery("#myemail").text(json.email);
                                                gotEmail = true;
                                        }
                                });
                                setTimeout(() => {
                                        if (!gotEmail) {
                                                processing = false;
                                                jQuery('#btn-login').text(buttonText);
                                                formErrorMessage('Unable to get your email address. please try again later.');
                                        }
                                }, 9999)
                        }
                        function formErrorMessage(message) {
                                jQuery('#login-form-message').text(message);
                        }
                        jQuery('#login-form').submit(function() {
                                submitLogin();
                                return false;
                        });
                        break;
                }
        }
}