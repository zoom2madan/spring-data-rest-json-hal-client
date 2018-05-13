class IncludeJS {
    constructor() {
        this.targets = new Map();
        this.contents = new Map();
    }

    get targets() {
        return this._targets;
    }

    set targets(value) {
        this._targets = value;
    }

    get contents() {
        return this._contents;
    }

    set contents(value) {
        this._contents = value;
    }

    get defaultContents() {
        return this._defaultContents;
    }

    set defaultContents(value) {
        this._defaultContents = value;
    }

    includeAll(startPoint) {
        startPoint = !startPoint ? document : startPoint;
        let htmlTargets = startPoint.querySelectorAll('[include]');
        /* Map targets using the file URIs and send asynchron requests */
        htmlTargets.forEach(htmlTarget => {
            if (htmlTarget.hasAttribute('include')) {
                let fileUri = htmlTarget.getAttribute('include');
                htmlTarget.removeAttribute('include');
                if (!this.targets.has(fileUri)) {
                    this.targets.set(fileUri, []);
                }
                this.targets.get(fileUri).push(htmlTarget);
                this.loadData(fileUri);
            }
        });
    }

    loadData(fileUri) {
        /* Load once */
        if (this.contents.has(fileUri)) {
            return;
        }
        /* Create XMLHTTPRequester */
        let xmlHttpReguest;
        if (window.XMLHttpRequest) {
            xmlHttpReguest = new XMLHttpRequest();
        } else {
            xmlHttpReguest = new ActiveXObject('Microsoft.XMLHTTP');
        }
        /* Parameterize request */
        let _this = this;
        /* Send request */
        xmlHttpReguest.open('GET', fileUri, true);
        xmlHttpReguest.onreadystatechange = function() {
            if (xmlHttpReguest.readyState === 4 && xmlHttpReguest.status === 200) {
                _this.handleResponse(xmlHttpReguest.responseText, fileUri);
            }
        };
        xmlHttpReguest.send();
    }

    /*
     * This function changes the context of the response according to the state and
     * the status of the request.
     */
    handleResponse(responseText, fileUri) {
        this.contents.set(fileUri, responseText);
        this.updateContent(fileUri);
    }

    updateContent(fileUri) {
        let htmlTargets = this.targets.get(fileUri);
        for (let i = 0; i < htmlTargets.length; i++) {
            if (htmlTargets[i]
                && htmlTargets[i].hasAttribute('replace')
                && htmlTargets[i].getAttribute('replace') === 'true') {
                htmlTargets[i].outerHTML = this.contents.get(fileUri);
                htmlTargets.splice(i, 1);
                this.includeAll();
            } else if (htmlTargets[i]) {
                htmlTargets[i].innerHTML = this.contents.get(fileUri);
                this.includeAll(htmlTargets[i]);
            }
        }
    }
}

(new IncludeJS()).includeAll();