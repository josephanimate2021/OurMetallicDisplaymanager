const modal = document.getElementById('modal');
const span = document.getElementById('close');
span.onclick = () => characterSaved();
function characterSaved(id) {
        if (!info.isExternal) {
                $("#player-icons").hide();
                modal.style.display = "none";
        } else {
                info.isExternal = false;
                $("#playerdiv").hide();
                $("#modal-title").html(origTitle);
                $("#previewer-buttons").hide();
                $("#obj").css("height", attrs.height).get(0).loadCharacterById(id);
        }
}
function showModal(title, content, extras) {
        $("#modal-title").html(title);
        $(".modal-body").html(content + `<div id="playerdiv" style="display: none"></div>`);
        $(".modal-footer").html(extras);
        modal.style.display = "block"
}
function loadPlayer(id) {
        const d = allData.find(i => i.id == id);
        const params = {
                flashvars: {
                        apiserver: "/",
                        storePath: "https://josephanimate2021.github.io/store/3a981f5cb2739137/<store>",
                        ut: 20,
                        movieTitle: d.title.replace(" ", "+"),
                        autostart: 1,
                        movieDesc: d.desc.replace(" ", "+"),
                        movieOwner: d.movieOwner.replace(" ", "+"),
                        movieOwnerId: d.movieOwnerId,
                        movieId: id,
                        isWide: 0,
                        clientThemePath: "https://josephanimate2021.github.io/static/ad44370a650793d9/<client_theme>",
                },
                allowScriptAccess: "always",
                allowFullScreen: "true",
                bgcolor: userData.uid ? settingsData.darkmode == "on" ? "#000000" : "#FFFFFF" : "#000000"
        };
        settingsData ? params.flashvars.isWixPaid = settingsData.wixwatermark == "on" ? 0 : 1 : '';
        const attrs = {
                data: "https://josephanimate2021.github.io/animation/414827163ad4eb60/player.swf",
                type: "application/x-shockwave-flash",
                width: "1366",
                height: "700"
        }
        $(".close").show();
        $("#player-icons").show();
        showModal(d.title, toObjectString(attrs, params));
}
function displayFeedback(json, hideFeedback = false) {
        const feedback = $(".feedback");
        switch (json.code) {
                case "1": {
                        feedback.css("background-color", "red").css("color", "white").html(json.msg);
                        break;
                } case "0": {
                        feedback.css("background-color", "lightblue").css("color", "black").html(json.msg);
                        break;
                }
        }
        if (hideFeedback) feedback.hide();
}
function toAttrString(table) {
        return typeof table == "object" ? Object.keys(table).filter((key) => table[key] !== null).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(table[key])}`).join("&") : table.replace(/"/g, '\\"');
}
function toParamString(table) {
        return Object.keys(table).map((key) => `<param name="${key}" value="${toAttrString(table[key])}">`).join(" ");
}
function toObjectString(attrs, params) {
        if (settingsData && settingsData.oneyearbacklvm == "on" && info.id == "studio") {
                info.isTryingout2015LVM = true;
                params.flashvars.apiserver = 'https://go2015.joseph-animate.repl.co/';
                params.flashvars.s3base = window.location.origin + '/';
                params.flashvars.usingExternalApiURL = true;
                params.flashvars.tray = "action"
                return `<iframe height="${attrs.height}" width="${attrs.width}" src="https://go2015.joseph-animate.repl.co/lvm/embed?${toAttrString(params.flashvars)}"></iframe>`
        } else return `<object id="obj" ${Object.keys(attrs).map((key) => `${key}="${attrs[key].replace(/"/g, '\\"')}"`).join(" ")}>${toParamString(params)}</object>`;
}
let attrs = {};
let params = {
        flashvars: {}
};
const permissions = (new URLSearchParams(window.location.search));
const interactiveTutorial = {
        neverDisplay: function() {
                return !permissions.get("tutorial") ? true : false
        }
};
if (permissions.get("mId")) loadPlayer(permissions.get("mId"));
function showCCWindow(tId) {
        $(".error-message").html('');
        info.isExternal = true;
        const flashvars = {
                apiserver: window.location.origin + "/",
                m_mode: "school",
                isLogin: !userData.loggedIn ? "N" : "Y",
                isEmbed: "0",
                external: true,
                ctc: "go",
                tlang: "en_US",
                storePath: "/static/store/<store>",
                clientThemePath: "/static/<client_theme>",
                appCode: "go",
                page: "",
                siteId: "go",
                userId: userData.uid,
                themeId: tId,
                ut: "20",
        };
        origTitle = document.getElementById('modal-title').innerHTML;
        $("#obj").css("height", "0");
        $("#modal-title").html('Create a Character');
        $(".save-now-button").hide();
        $("#previewer-buttons").show();
        $("#playerdiv").html(`<iframe height="600" width="960" src="/cc_browser?${toAttrString(flashvars)}"></iframe>`).show();
}
function showImporter() {
        $("#obj")[0].importerStatus("clear");
        $(".back-to-editing").show();
        origTitle = document.getElementById('modal-title').innerHTML;
        $("#obj").css("height", "0");
        $("#modal-title").html('Import An Asset');
        $(".save-now-button").hide();
        $("#previewer-buttons").show();
        $("#playerdiv").html(`<iframe height="${attrs.height}" width="${attrs.width}" src="/html/importer.html"></iframe>`).show();
}
function importFailed(msg, importerWasShown = false) {
        if (!importerWasShown) showImporter();
        $(".error-message").html(msg);
}
function clearImporterErrorMessage() {
        $(".error-message").html('');
}
function importStarted(data, filename) {
        $(".back-to-editing").hide();
        $("#modal-title").html('Importing Your Asset...');
        $("#playerdiv").html(`<img class="center-image" src="/html/loading.gif"/>`).show();
        let b = new FormData();
        b.append("import", data.file);
        b.append("name", filename)
	b.append("type", data.type);
	b.append("subtype", data.subtype);
	b.append("ptype", data.ptype || "");
        b.append("userId", userData.uid);
        $.ajax({
		url: "/ajax/uploadAsset",
		method: "POST",
		data: b,
		processData: false,
		contentType: false,
		dataType: "json"
	}).done(d => {
                if (d.status == "ok") {
                        setTimeout(() => {
                                $("#modal-title").html('Success!');
                                $("#playerdiv").html(`<img class="center-image" src="/html/checkmark.jpg"/>`).show();
                        }, 500);
                        $("#obj")[0].importerStatus("done");
                        $("#obj")[0].importerUploadComplete(d.data.type, d.data.file, d.data);
                        if (settingsData.oneyearbacklvm == "off") $("#obj")[0].openYourLibrary();
                        setTimeout(() => {
                                $("#modal-title").html(origTitle);
                                $("#playerdiv").hide();
                                $("#obj").css("height", "");
                        }, 2500);
                } else importFailed(d.msg);
        }).catch(e => importFailed(e));
}
function exitStudio() {
        refreshVideoList();
        characterSaved();
}
function quitStudio() {
        characterSaved();
}
let movieDataXmlStr = null;
function initPreviewPlayer(dataXmlStr, startFrame) {
        $(".error-message").html('');
        info.id = "previewPlayer";
        movieDataXmlStr = dataXmlStr;
        filmXmlStr = dataXmlStr.split("<filmxml>")[1].split("</filmxml>")[0];
        const params = {
                flashvars: {
                        apiserver: "/",
                        storePath: "https://josephanimate2021.github.io/store/3a981f5cb2739137/<store>",
                        ut: 20,
                        startFrame,
                        autostart: 1,
                        isInitFromExternal: 1,
                        isWide: 0,
                        clientThemePath: "https://josephanimate2021.github.io/static/ad44370a650793d9/<client_theme>"
                },
                allowScriptAccess: "always",
                allowFullScreen: "true",
                bgcolor: settingsData.darkmode == "on" ? "#000000" : "#FFFFFF"
        };
        const attrs = {
                data: "https://josephanimate2021.github.io/animation/414827163ad4eb60/player.swf",
                type: "application/x-shockwave-flash",
                width: "1366",
                height: "700"
        }
        origTitle = document.getElementById('modal-title').innerHTML;
        $("#obj").css("height", "0");
        $("#modal-title").html('Preview Video');
        $("#previewer-buttons").show();
        $("#playerdiv").html(toObjectString(attrs, params)).show();;
}
if (document.getElementsByClassName("back-to-editing")[0]) document.getElementsByClassName("back-to-editing")[0].onclick = () => {
        $(".save-now-button").show();
        info.isExternal = false;
        $("#playerdiv").hide();
        $("#modal-title").html(origTitle);
        $("#previewer-buttons").hide();
        $("#obj").css("height", attrs.height);
}
if (document.getElementsByClassName("save-now-button")[0]) document.getElementsByClassName("save-now-button")[0].onclick = () => {
        info.isExternal = false;
        $("#playerdiv").hide();
        $("#modal-title").html(origTitle);
        $("#previewer-buttons").hide();
        $("#obj").css("height", attrs.height).get(0).onExternalPreviewPlayerPublish();
}
function retrievePreviewPlayerData() { 
        return movieDataXmlStr 
}
class VideoTutorial {
        constructor(a) {
                this.$el = a;
                this.wistiaEmbed = null;
                this.initialize()
        }
        initialize() {
                var a = this;
                $(".close-button").click((b) => {
                        b.preventDefault();
                        a.hide()
                });
        }
        launch(a) {
                if (!VideoTutorial.tutorials[a]) return;
                var b = VideoTutorial.tutorials[a];
                origTitle = document.getElementById('modal-title').innerHTML;
                this.show();
                document.getElementById('modal-title').innerHTML = b.title;
                this.wistiaEmbed = Wistia.embed(b.wistiaId, {
                        autoPlay: true,
                        container: "wistia_player"
                });
        }
        show() {
                this.$el.css("display", "block");
                $("#tutorial-buttons").show();
                $("#obj").css("height", "0");
        }
        hide() {
                if (typeof this.wistiaEmbed == "object") {
                        this.wistiaEmbed.remove();
                        this.wistiaEmbed = null
                }
                $("#tutorial-buttons").hide();
                this.$el.css("display", "none");
                document.getElementById('modal-title').innerHTML = origTitle;
                $("#obj").css("height", "");
        }
};
VideoTutorial.tutorials = {
        composition: {
                title: 'Composition Tutorial',
                wistiaId: 'nuy96pslyp',
        },
        enterexit: {
                title: 'Enter and Exit Effects Tutorial',
                wistiaId: 'fvjsa3jnzc',
        }
};
const videoTutorial = new VideoTutorial($(".tutorial-body"));