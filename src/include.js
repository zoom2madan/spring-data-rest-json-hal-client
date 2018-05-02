class IncludeJS {
    constructor() {
        this.targets = new Map();
        this.contents = new Map();
        this.defaultContents = {
            readyState0: "Request not initialized",
            readyState1: "Server connection established",
            readyState2: "Request received",
            readyState3: "Processing request",
            readyState4: "Request finished and response is ready",
            status0: "Failed to load: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.",
            status200: "OK",
            status403: "Forbidden",
            status404: "Page not found"
        }
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
        var htmlTargets = startPoint.querySelectorAll("[include]");
        // Map targets using the file URIs and send asynchron requests
        htmlTargets.forEach(htmlTarget => {
            if (htmlTarget.hasAttribute("include")) {
                var fileUri = htmlTarget.getAttribute("include");
                htmlTarget.removeAttribute("include");
                if (!this.targets.has(fileUri)) {
                    this.targets.set(fileUri, []);
                }
                this.targets.get(fileUri).push(htmlTarget);
                if (!this.contents.has(fileUri)) {
                    this.loadData(fileUri);
                }
            }
        });
    }

    loadData(fileUri) {
        // Create XMLHTTPRequester
        var xmlHttpReguest;
        if (window.XMLHttpRequest) {
            xmlHttpReguest = new XMLHttpRequest();
        } else {
            xmlHttpReguest = new ActiveXObject("Microsoft.XMLHTTP");
        }
        // Parameterize request
        xmlHttpReguest.onreadystatechange = this.handleResponse(this.readyState, this.status, this.responseText, fileUri);
        // Send request
        xmlHttpReguest.open("GET", fileUri, true);
        xmlHttpReguest.send();
    }

    /*
     * This function changes the context of the response according to the state and
     * the status of the request.
     */
    handleResponse(readyState, status, responseText, fileUri) {
        // Consider the state of the request
        switch (readyState) {
            case 0: // Request not initialized
                this.contents.set(fileUri, this.defaultContents.readyState0);
                break;
            case 1: // Server connection established
                this.contents.set(fileUri, this.defaultContents.readyState1);
                break;
            case 2: // Request received
                this.contents.set(fileUri, this.defaultContents.readyState2);
                break;
            case 3: // Processing request
                this.contents.set(fileUri, this.defaultContents.readyState3);
                break;
            case 4: // Request finished and response is ready
                this.contents.set(fileUri, this.defaultContents.readyState4);
                // Now consider the status of the request
                switch (status) {
                    case 200: // OK
                        this.contents.set(fileUri, responseText);
                        break;
                    case 403: // Forbidden
                        this.contents.set(fileUri, this.defaultContents.status403);
                        break;
                    case 404: // Page not found
                        this.contents.set(fileUri, this.defaultContents.status404);
                        break;
                    case 0:
                        this.contents.set(fileUri, this.defaultContents.status0);
                        break;
                    default:
                        this.contents.set(fileUri, "Unknown status: " + status + " (state: " + readyState + ").");
                        break;
                }
                break;
        }
        this.updateContent(readyState, status, fileUri);
    }

    updateContent(readyState, status, fileUri) {
        var htmlTargets = this.targets.get(fileUri);
        for (var i = 0; i < htmlTargets.length; i++) {
            var htmlTarget = htmlTargets[i];
            if (readyState === 4 && status === 200
                && htmlTarget
                && htmlTarget.hasAttribute("replace")
                && htmlTarget.getAttribute("replace") === "true") {
                htmlTarget.outerHTML = this.contents.get(fileUri);
                this.includeAll(document);
            } else if (htmlTarget) {
                htmlTarget.innerHTML = this.contents.get(fileUri);
                this.includeAll(htmlTarget);
            }
        }
    }
}

(new IncludeJS()).includeAll();