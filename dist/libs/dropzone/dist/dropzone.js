var $6mU8w$swchelpers = require("@swc/helpers");
var $6mU8w$justextend = require("just-extend");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", function () { return $a601ff30f483e917$export$2e2bcd8739ae039; });
$parcel$export(module.exports, "Dropzone", function () { return $a601ff30f483e917$export$2e2bcd8739ae039; });



var $b1d17cfb1d15c36a$export$2e2bcd8739ae039 = /*#__PURE__*/ function() {
    "use strict";
    function $b1d17cfb1d15c36a$export$2e2bcd8739ae039() {
        $6mU8w$swchelpers.classCallCheck(this, $b1d17cfb1d15c36a$export$2e2bcd8739ae039);
    }
    $6mU8w$swchelpers.createClass($b1d17cfb1d15c36a$export$2e2bcd8739ae039, [
        {
            // Add an event listener for given event
            key: "on",
            value: function on(event, fn) {
                this._callbacks = this._callbacks || {
                };
                // Create namespace for this event
                if (!this._callbacks[event]) this._callbacks[event] = [];
                this._callbacks[event].push(fn);
                return this;
            }
        },
        {
            key: "emit",
            value: function emit(event) {
                for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                    args[_key - 1] = arguments[_key];
                }
                this._callbacks = this._callbacks || {
                };
                var callbacks = this._callbacks[event];
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                if (callbacks) try {
                    for(var _iterator = callbacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var callback = _step.value;
                        callback.apply(this, args);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                // trigger a corresponding DOM event
                if (this.element) this.element.dispatchEvent(this.makeEvent("dropzone:" + event, {
                    args: args
                }));
                return this;
            }
        },
        {
            key: "makeEvent",
            value: function makeEvent(eventName, detail) {
                var params = {
                    bubbles: true,
                    cancelable: true,
                    detail: detail
                };
                if (typeof window.CustomEvent === "function") return new CustomEvent(eventName, params);
                else {
                    // IE 11 support
                    // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
                    var evt = document.createEvent("CustomEvent");
                    evt.initCustomEvent(eventName, params.bubbles, params.cancelable, params.detail);
                    return evt;
                }
            }
        },
        {
            // Remove event listener for given event. If fn is not provided, all event
            // listeners for that event will be removed. If neither is provided, all
            // event listeners will be removed.
            key: "off",
            value: function off(event, fn) {
                if (!this._callbacks || arguments.length === 0) {
                    this._callbacks = {
                    };
                    return this;
                }
                // specific event
                var callbacks = this._callbacks[event];
                if (!callbacks) return this;
                // remove all handlers
                if (arguments.length === 1) {
                    delete this._callbacks[event];
                    return this;
                }
                // remove specific handler
                for(var i = 0; i < callbacks.length; i++){
                    var callback = callbacks[i];
                    if (callback === fn) {
                        callbacks.splice(i, 1);
                        break;
                    }
                }
                return this;
            }
        }
    ]);
    return $b1d17cfb1d15c36a$export$2e2bcd8739ae039;
}();



var $69c61888cc1f4c57$exports = {};
$69c61888cc1f4c57$exports = "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><img data-dz-thumbnail=\"\"></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size=\"\"></span></div>\n    <div class=\"dz-filename\"><span data-dz-name=\"\"></span></div>\n  </div>\n  <div class=\"dz-progress\">\n    <span class=\"dz-upload\" data-dz-uploadprogress=\"\"></span>\n  </div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage=\"\"></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54\" height=\"54\" viewBox=\"0 0 54 54\" fill=\"white\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"M10.2071 29.7929L14.2929 25.7071C14.6834 25.3166 15.3166 25.3166 15.7071 25.7071L21.2929 31.2929C21.6834 31.6834 22.3166 31.6834 22.7071 31.2929L38.2929 15.7071C38.6834 15.3166 39.3166 15.3166 39.7071 15.7071L43.7929 19.7929C44.1834 20.1834 44.1834 20.8166 43.7929 21.2071L22.7071 42.2929C22.3166 42.6834 21.6834 42.6834 21.2929 42.2929L10.2071 31.2071C9.81658 30.8166 9.81658 30.1834 10.2071 29.7929Z\"></path>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54\" height=\"54\" viewBox=\"0 0 54 54\" fill=\"white\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"M26.2929 20.2929L19.2071 13.2071C18.8166 12.8166 18.1834 12.8166 17.7929 13.2071L13.2071 17.7929C12.8166 18.1834 12.8166 18.8166 13.2071 19.2071L20.2929 26.2929C20.6834 26.6834 20.6834 27.3166 20.2929 27.7071L13.2071 34.7929C12.8166 35.1834 12.8166 35.8166 13.2071 36.2071L17.7929 40.7929C18.1834 41.1834 18.8166 41.1834 19.2071 40.7929L26.2929 33.7071C26.6834 33.3166 27.3166 33.3166 27.7071 33.7071L34.7929 40.7929C35.1834 41.1834 35.8166 41.1834 36.2071 40.7929L40.7929 36.2071C41.1834 35.8166 41.1834 35.1834 40.7929 34.7929L33.7071 27.7071C33.3166 27.3166 33.3166 26.6834 33.7071 26.2929L40.7929 19.2071C41.1834 18.8166 41.1834 18.1834 40.7929 17.7929L36.2071 13.2071C35.8166 12.8166 35.1834 12.8166 34.7929 13.2071L27.7071 20.2929C27.3166 20.6834 26.6834 20.6834 26.2929 20.2929Z\"></path>\n    </svg>\n  </div>\n</div>\n";


var $b657c03155fc27e2$var$defaultOptions = {
    /**
   * Has to be specified on elements other than form (or when the form doesn't
   * have an `action` attribute).
   *
   * You can also provide a function that will be called with `files` and
   * `dataBlocks`  and must return the url as string.
   */ url: null,
    /**
   * Can be changed to `"put"` if necessary. You can also provide a function
   * that will be called with `files` and must return the method (since `v3.12.0`).
   */ method: "post",
    /**
   * Will be set on the XHRequest.
   */ withCredentials: false,
    /**
   * The timeout for the XHR requests in milliseconds (since `v4.4.0`).
   * If set to null or 0, no timeout is going to be set.
   */ timeout: null,
    /**
   * How many file uploads to process in parallel (See the
   * Enqueuing file uploads documentation section for more info)
   */ parallelUploads: 2,
    /**
   * Whether to send multiple files in one request. If
   * this it set to true, then the fallback file input element will
   * have the `multiple` attribute as well. This option will
   * also trigger additional events (like `processingmultiple`). See the events
   * documentation section for more information.
   */ uploadMultiple: false,
    /**
   * Whether you want files to be uploaded in chunks to your server. This can't be
   * used in combination with `uploadMultiple`.
   *
   * See [chunksUploaded](#config-chunksUploaded) for the callback to finalise an upload.
   */ chunking: false,
    /**
   * If `chunking` is enabled, this defines whether **every** file should be chunked,
   * even if the file size is below chunkSize. This means, that the additional chunk
   * form data will be submitted and the `chunksUploaded` callback will be invoked.
   */ forceChunking: false,
    /**
   * If `chunking` is `true`, then this defines the chunk size in bytes.
   */ chunkSize: 2097152,
    /**
   * If `true`, the individual chunks of a file are being uploaded simultaneously.
   */ parallelChunkUploads: false,
    /**
   * Whether a chunk should be retried if it fails.
   */ retryChunks: false,
    /**
   * If `retryChunks` is true, how many times should it be retried.
   */ retryChunksLimit: 3,
    /**
   * The maximum filesize (in MiB) that is allowed to be uploaded.
   */ maxFilesize: 256,
    /**
   * The name of the file param that gets transferred.
   * **NOTE**: If you have the option  `uploadMultiple` set to `true`, then
   * Dropzone will append `[]` to the name.
   */ paramName: "file",
    /**
   * Whether thumbnails for images should be generated
   */ createImageThumbnails: true,
    /**
   * In MB. When the filename exceeds this limit, the thumbnail will not be generated.
   */ maxThumbnailFilesize: 10,
    /**
   * If `null`, the ratio of the image will be used to calculate it.
   */ thumbnailWidth: 120,
    /**
   * The same as `thumbnailWidth`. If both are null, images will not be resized.
   */ thumbnailHeight: 120,
    /**
   * How the images should be scaled down in case both, `thumbnailWidth` and `thumbnailHeight` are provided.
   * Can be either `contain` or `crop`.
   */ thumbnailMethod: "crop",
    /**
   * If set, images will be resized to these dimensions before being **uploaded**.
   * If only one, `resizeWidth` **or** `resizeHeight` is provided, the original aspect
   * ratio of the file will be preserved.
   *
   * The `options.transformFile` function uses these options, so if the `transformFile` function
   * is overridden, these options don't do anything.
   */ resizeWidth: null,
    /**
   * See `resizeWidth`.
   */ resizeHeight: null,
    /**
   * The mime type of the resized image (before it gets uploaded to the server).
   * If `null` the original mime type will be used. To force jpeg, for example, use `image/jpeg`.
   * See `resizeWidth` for more information.
   */ resizeMimeType: null,
    /**
   * The quality of the resized images. See `resizeWidth`.
   */ resizeQuality: 0.8,
    /**
   * How the images should be scaled down in case both, `resizeWidth` and `resizeHeight` are provided.
   * Can be either `contain` or `crop`.
   */ resizeMethod: "contain",
    /**
   * The base that is used to calculate the **displayed** filesize. You can
   * change this to 1024 if you would rather display kibibytes, mebibytes,
   * etc... 1024 is technically incorrect, because `1024 bytes` are `1 kibibyte`
   * not `1 kilobyte`. You can change this to `1024` if you don't care about
   * validity.
   */ filesizeBase: 1000,
    /**
   * If not `null` defines how many files this Dropzone handles. If it exceeds,
   * the event `maxfilesexceeded` will be called. The dropzone element gets the
   * class `dz-max-files-reached` accordingly so you can provide visual
   * feedback.
   */ maxFiles: null,
    /**
   * An optional object to send additional headers to the server. Eg:
   * `{ "My-Awesome-Header": "header value" }`
   */ headers: null,
    /**
   * Should the default headers be set or not?
   * Accept: application/json <- for requesting json response
   * Cache-Control: no-cache <- Request shouldnt be cached
   * X-Requested-With: XMLHttpRequest <- We sent the request via XMLHttpRequest
   */ defaultHeaders: true,
    /**
   * If `true`, the dropzone element itself will be clickable, if `false`
   * nothing will be clickable.
   *
   * You can also pass an HTML element, a CSS selector (for multiple elements)
   * or an array of those. In that case, all of those elements will trigger an
   * upload when clicked.
   */ clickable: true,
    /**
   * Whether hidden files in directories should be ignored.
   */ ignoreHiddenFiles: true,
    /**
   * The default implementation of `accept` checks the file's mime type or
   * extension against this list. This is a comma separated list of mime
   * types or file extensions.
   *
   * Eg.: `image/*,application/pdf,.psd`
   *
   * If the Dropzone is `clickable` this option will also be used as
   * [`accept`](https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept)
   * parameter on the hidden file input as well.
   */ acceptedFiles: null,
    /**
   * **Deprecated!**
   * Use acceptedFiles instead.
   */ acceptedMimeTypes: null,
    /**
   * If false, files will be added to the queue but the queue will not be
   * processed automatically.
   * This can be useful if you need some additional user input before sending
   * files (or if you want want all files sent at once).
   * If you're ready to send the file simply call `myDropzone.processQueue()`.
   *
   * See the [enqueuing file uploads](#enqueuing-file-uploads) documentation
   * section for more information.
   */ autoProcessQueue: true,
    /**
   * If false, files added to the dropzone will not be queued by default.
   * You'll have to call `enqueueFile(file)` manually.
   */ autoQueue: true,
    /**
   * If `true`, this will add a link to every file preview to remove or cancel (if
   * already uploading) the file. The `dictCancelUpload`, `dictCancelUploadConfirmation`
   * and `dictRemoveFile` options are used for the wording.
   */ addRemoveLinks: false,
    /**
   * Defines where to display the file previews – if `null` the
   * Dropzone element itself is used. Can be a plain `HTMLElement` or a CSS
   * selector. The element should have the `dropzone-previews` class so
   * the previews are displayed properly.
   */ previewsContainer: null,
    /**
   * Set this to `true` if you don't want previews to be shown.
   */ disablePreviews: false,
    /**
   * This is the element the hidden input field (which is used when clicking on the
   * dropzone to trigger file selection) will be appended to. This might
   * be important in case you use frameworks to switch the content of your page.
   *
   * Can be a selector string, or an element directly.
   */ hiddenInputContainer: "body",
    /**
   * If null, no capture type will be specified
   * If camera, mobile devices will skip the file selection and choose camera
   * If microphone, mobile devices will skip the file selection and choose the microphone
   * If camcorder, mobile devices will skip the file selection and choose the camera in video mode
   * On apple devices multiple must be set to false.  AcceptedFiles may need to
   * be set to an appropriate mime type (e.g. "image/*", "audio/*", or "video/*").
   */ capture: null,
    /**
   * **Deprecated**. Use `renameFile` instead.
   */ renameFilename: null,
    /**
   * A function that is invoked before the file is uploaded to the server and renames the file.
   * This function gets the `File` as argument and can use the `file.name`. The actual name of the
   * file that gets used during the upload can be accessed through `file.upload.filename`.
   */ renameFile: null,
    /**
   * If `true` the fallback will be forced. This is very useful to test your server
   * implementations first and make sure that everything works as
   * expected without dropzone if you experience problems, and to test
   * how your fallbacks will look.
   */ forceFallback: false,
    /**
   * The text used before any files are dropped.
   */ dictDefaultMessage: "Drop files here to upload",
    /**
   * The text that replaces the default message text it the browser is not supported.
   */ dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
    /**
   * The text that will be added before the fallback form.
   * If you provide a  fallback element yourself, or if this option is `null` this will
   * be ignored.
   */ dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
    /**
   * If the filesize is too big.
   * `{{filesize}}` and `{{maxFilesize}}` will be replaced with the respective configuration values.
   */ dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
    /**
   * If the file doesn't match the file type.
   */ dictInvalidFileType: "You can't upload files of this type.",
    /**
   * If the server response was invalid.
   * `{{statusCode}}` will be replaced with the servers status code.
   */ dictResponseError: "Server responded with {{statusCode}} code.",
    /**
   * If `addRemoveLinks` is true, the text to be used for the cancel upload link.
   */ dictCancelUpload: "Cancel upload",
    /**
   * The text that is displayed if an upload was manually canceled
   */ dictUploadCanceled: "Upload canceled.",
    /**
   * If `addRemoveLinks` is true, the text to be used for confirmation when cancelling upload.
   */ dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",
    /**
   * If `addRemoveLinks` is true, the text to be used to remove a file.
   */ dictRemoveFile: "Remove file",
    /**
   * If this is not null, then the user will be prompted before removing a file.
   */ dictRemoveFileConfirmation: null,
    /**
   * Displayed if `maxFiles` is st and exceeded.
   * The string `{{maxFiles}}` will be replaced by the configuration value.
   */ dictMaxFilesExceeded: "You can not upload any more files.",
    /**
   * Allows you to translate the different units. Starting with `tb` for terabytes and going down to
   * `b` for bytes.
   */ dictFileSizeUnits: {
        tb: "TB",
        gb: "GB",
        mb: "MB",
        kb: "KB",
        b: "b"
    },
    /**
   * Called when dropzone initialized
   * You can add event listeners here
   */ init: function() {
    },
    /**
   * Can be an **object** of additional parameters to transfer to the server, **or** a `Function`
   * that gets invoked with the `files`, `xhr` and, if it's a chunked upload, `chunk` arguments. In case
   * of a function, this needs to return a map.
   *
   * The default implementation does nothing for normal uploads, but adds relevant information for
   * chunked uploads.
   *
   * This is the same as adding hidden input fields in the form element.
   */ params: function(files, xhr, chunk) {
        if (chunk) return {
            dzuuid: chunk.file.upload.uuid,
            dzchunkindex: chunk.index,
            dztotalfilesize: chunk.file.size,
            dzchunksize: this.options.chunkSize,
            dztotalchunkcount: chunk.file.upload.totalChunkCount,
            dzchunkbyteoffset: chunk.index * this.options.chunkSize
        };
    },
    /**
   * A function that gets a [file](https://developer.mozilla.org/en-US/docs/DOM/File)
   * and a `done` function as parameters.
   *
   * If the done function is invoked without arguments, the file is "accepted" and will
   * be processed. If you pass an error message, the file is rejected, and the error
   * message will be displayed.
   * This function will not be called if the file is too big or doesn't match the mime types.
   */ accept: function(file, done) {
        return done();
    },
    /**
   * The callback that will be invoked when all chunks have been uploaded for a file.
   * It gets the file for which the chunks have been uploaded as the first parameter,
   * and the `done` function as second. `done()` needs to be invoked when everything
   * needed to finish the upload process is done.
   */ chunksUploaded: function chunksUploaded(file, done) {
        done();
    },
    /**
   * Sends the file as binary blob in body instead of form data.
   * If this is set, the `params` option will be ignored.
   * It's an error to set this to `true` along with `uploadMultiple` since
   * multiple files cannot be in a single binary body.
   */ binaryBody: false,
    /**
   * Gets called when the browser is not supported.
   * The default implementation shows the fallback input field and adds
   * a text.
   */ fallback: function() {
        // This code should pass in IE7... :(
        var messageElement;
        this.element.className = "".concat(this.element.className, " dz-browser-not-supported");
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = this.element.getElementsByTagName("div")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var child = _step.value;
                if (/(^| )dz-message($| )/.test(child.className)) {
                    messageElement = child;
                    child.className = "dz-message"; // Removes the 'dz-default' class
                    break;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        if (!messageElement) {
            messageElement = $a601ff30f483e917$export$2e2bcd8739ae039.createElement('<div class="dz-message"><span></span></div>');
            this.element.appendChild(messageElement);
        }
        var span = messageElement.getElementsByTagName("span")[0];
        if (span) {
            if (span.textContent != null) span.textContent = this.options.dictFallbackMessage;
            else if (span.innerText != null) span.innerText = this.options.dictFallbackMessage;
        }
        return this.element.appendChild(this.getFallbackForm());
    },
    /**
   * Gets called to calculate the thumbnail dimensions.
   *
   * It gets `file`, `width` and `height` (both may be `null`) as parameters and must return an object containing:
   *
   *  - `srcWidth` & `srcHeight` (required)
   *  - `trgWidth` & `trgHeight` (required)
   *  - `srcX` & `srcY` (optional, default `0`)
   *  - `trgX` & `trgY` (optional, default `0`)
   *
   * Those values are going to be used by `ctx.drawImage()`.
   */ resize: function(file, width, height, resizeMethod) {
        var info = {
            srcX: 0,
            srcY: 0,
            srcWidth: file.width,
            srcHeight: file.height
        };
        var srcRatio = file.width / file.height;
        // Automatically calculate dimensions if not specified
        if (width == null && height == null) {
            width = info.srcWidth;
            height = info.srcHeight;
        } else if (width == null) width = height * srcRatio;
        else if (height == null) height = width / srcRatio;
        // Make sure images aren't upscaled
        width = Math.min(width, info.srcWidth);
        height = Math.min(height, info.srcHeight);
        var trgRatio = width / height;
        if (info.srcWidth > width || info.srcHeight > height) {
            // Image is bigger and needs rescaling
            if (resizeMethod === "crop") {
                if (srcRatio > trgRatio) {
                    info.srcHeight = file.height;
                    info.srcWidth = info.srcHeight * trgRatio;
                } else {
                    info.srcWidth = file.width;
                    info.srcHeight = info.srcWidth / trgRatio;
                }
            } else if (resizeMethod === "contain") {
                // Method 'contain'
                if (srcRatio > trgRatio) height = width / srcRatio;
                else width = height * srcRatio;
            } else throw new Error("Unknown resizeMethod '".concat(resizeMethod, "'"));
        }
        info.srcX = (file.width - info.srcWidth) / 2;
        info.srcY = (file.height - info.srcHeight) / 2;
        info.trgWidth = width;
        info.trgHeight = height;
        return info;
    },
    /**
   * Can be used to transform the file (for example, resize an image if necessary).
   *
   * The default implementation uses `resizeWidth` and `resizeHeight` (if provided) and resizes
   * images according to those dimensions.
   *
   * Gets the `file` as the first parameter, and a `done()` function as the second, that needs
   * to be invoked with the file when the transformation is done.
   */ transformFile: function(file, done) {
        if ((this.options.resizeWidth || this.options.resizeHeight) && file.type.match(/image.*/)) return this.resizeImage(file, this.options.resizeWidth, this.options.resizeHeight, this.options.resizeMethod, done);
        else return done(file);
    },
    /**
   * A string that contains the template used for each dropped
   * file. Change it to fulfill your needs but make sure to properly
   * provide all elements.
   *
   * If you want to use an actual HTML element instead of providing a String
   * as a config option, you could create a div with the id `tpl`,
   * put the template inside it and provide the element like this:
   *
   *     document
   *       .querySelector('#tpl')
   *       .innerHTML
   *
   */ previewTemplate: (/*@__PURE__*/$parcel$interopDefault($69c61888cc1f4c57$exports)),
    /*
   Those functions register themselves to the events on init and handle all
   the user interface specific stuff. Overwriting them won't break the upload
   but can break the way it's displayed.
   You can overwrite them if you don't like the default behavior. If you just
   want to add an additional event handler, register it on the dropzone object
   and don't overwrite those options.
   */ // Those are self explanatory and simply concern the DragnDrop.
    drop: function(e) {
        return this.element.classList.remove("dz-drag-hover");
    },
    dragstart: function(e) {
    },
    dragend: function(e) {
        return this.element.classList.remove("dz-drag-hover");
    },
    dragenter: function(e) {
        return this.element.classList.add("dz-drag-hover");
    },
    dragover: function(e) {
        return this.element.classList.add("dz-drag-hover");
    },
    dragleave: function(e) {
        return this.element.classList.remove("dz-drag-hover");
    },
    paste: function(e) {
    },
    // Called whenever there are no files left in the dropzone anymore, and the
    // dropzone should be displayed as if in the initial state.
    reset: function() {
        return this.element.classList.remove("dz-started");
    },
    // Called when a file is added to the queue
    // Receives `file`
    addedfile: function(file) {
        if (this.element === this.previewsContainer) this.element.classList.add("dz-started");
        if (this.previewsContainer && !this.options.disablePreviews) {
            var _this = this;
            file.previewElement = $a601ff30f483e917$export$2e2bcd8739ae039.createElement(this.options.previewTemplate.trim());
            file.previewTemplate = file.previewElement; // Backwards compatibility
            this.previewsContainer.appendChild(file.previewElement);
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                for(var _iterator = file.previewElement.querySelectorAll("[data-dz-name]")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var node = _step.value;
                    node.textContent = file.name;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                    }
                } finally{
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
            var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
            try {
                for(var _iterator1 = file.previewElement.querySelectorAll("[data-dz-size]")[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                    node = _step1.value;
                    node.innerHTML = this.filesize(file.size);
                }
            } catch (err) {
                _didIteratorError1 = true;
                _iteratorError1 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                        _iterator1.return();
                    }
                } finally{
                    if (_didIteratorError1) {
                        throw _iteratorError1;
                    }
                }
            }
            if (this.options.addRemoveLinks) {
                file._removeLink = $a601ff30f483e917$export$2e2bcd8739ae039.createElement("<a class=\"dz-remove\" href=\"javascript:undefined;\" data-dz-remove>".concat(this.options.dictRemoveFile, "</a>"));
                file.previewElement.appendChild(file._removeLink);
            }
            var removeFileEvent = function(e) {
                var _this1 = _this;
                e.preventDefault();
                e.stopPropagation();
                if (file.status === $a601ff30f483e917$export$2e2bcd8739ae039.UPLOADING) return $a601ff30f483e917$export$2e2bcd8739ae039.confirm(_this.options.dictCancelUploadConfirmation, function() {
                    return _this1.removeFile(file);
                });
                else {
                    var _this2 = _this;
                    if (_this.options.dictRemoveFileConfirmation) return $a601ff30f483e917$export$2e2bcd8739ae039.confirm(_this.options.dictRemoveFileConfirmation, function() {
                        return _this2.removeFile(file);
                    });
                    else return _this.removeFile(file);
                }
            };
            var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
            try {
                for(var _iterator2 = file.previewElement.querySelectorAll("[data-dz-remove]")[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
                    var removeLink = _step2.value;
                    removeLink.addEventListener("click", removeFileEvent);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                        _iterator2.return();
                    }
                } finally{
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    },
    // Called whenever a file is removed.
    removedfile: function(file) {
        if (file.previewElement != null && file.previewElement.parentNode != null) file.previewElement.parentNode.removeChild(file.previewElement);
        return this._updateMaxFilesReachedClass();
    },
    // Called when a thumbnail has been generated
    // Receives `file` and `dataUrl`
    thumbnail: function(file, dataUrl) {
        if (file.previewElement) {
            file.previewElement.classList.remove("dz-file-preview");
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                for(var _iterator = file.previewElement.querySelectorAll("[data-dz-thumbnail]")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var thumbnailElement = _step.value;
                    thumbnailElement.alt = file.name;
                    thumbnailElement.src = dataUrl;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                    }
                } finally{
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
            return setTimeout(function() {
                return file.previewElement.classList.add("dz-image-preview");
            }, 1);
        }
    },
    // Called whenever an error occurs
    // Receives `file` and `message`
    error: function(file, message) {
        if (file.previewElement) {
            file.previewElement.classList.add("dz-error");
            if (typeof message !== "string" && message.error) message = message.error;
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                for(var _iterator = file.previewElement.querySelectorAll("[data-dz-errormessage]")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var node = _step.value;
                    node.textContent = message;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                    }
                } finally{
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    },
    errormultiple: function() {
    },
    // Called when a file gets processed. Since there is a cue, not all added
    // files are processed immediately.
    // Receives `file`
    processing: function(file) {
        if (file.previewElement) {
            file.previewElement.classList.add("dz-processing");
            if (file._removeLink) return file._removeLink.innerHTML = this.options.dictCancelUpload;
        }
    },
    processingmultiple: function() {
    },
    // Called whenever the upload progress gets updated.
    // Receives `file`, `progress` (percentage 0-100) and `bytesSent`.
    // To get the total number of bytes of the file, use `file.size`
    uploadprogress: function(file, progress, bytesSent) {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        if (file.previewElement) try {
            for(var _iterator = file.previewElement.querySelectorAll("[data-dz-uploadprogress]")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var node = _step.value;
                node.nodeName === "PROGRESS" ? node.value = progress : node.style.width = "".concat(progress, "%");
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    },
    // Called whenever the total upload progress gets updated.
    // Called with totalUploadProgress (0-100), totalBytes and totalBytesSent
    totaluploadprogress: function() {
    },
    // Called just before the file is sent. Gets the `xhr` object as second
    // parameter, so you can modify it (for example to add a CSRF token) and a
    // `formData` object to add additional information.
    sending: function() {
    },
    sendingmultiple: function() {
    },
    // When the complete upload is finished and successful
    // Receives `file`
    success: function(file) {
        if (file.previewElement) return file.previewElement.classList.add("dz-success");
    },
    successmultiple: function() {
    },
    // When the upload is canceled.
    canceled: function(file) {
        return this.emit("error", file, this.options.dictUploadCanceled);
    },
    canceledmultiple: function() {
    },
    // When the upload is finished, either with success or an error.
    // Receives `file`
    complete: function(file) {
        if (file._removeLink) file._removeLink.innerHTML = this.options.dictRemoveFile;
        if (file.previewElement) return file.previewElement.classList.add("dz-complete");
    },
    completemultiple: function() {
    },
    maxfilesexceeded: function() {
    },
    maxfilesreached: function() {
    },
    queuecomplete: function() {
    },
    addedfiles: function() {
    }
};
var $b657c03155fc27e2$export$2e2bcd8739ae039 = $b657c03155fc27e2$var$defaultOptions;


var $a601ff30f483e917$export$2e2bcd8739ae039 = /*#__PURE__*/ function(Emitter) {
    "use strict";
    $6mU8w$swchelpers.inherits($a601ff30f483e917$export$2e2bcd8739ae039, Emitter);
    function $a601ff30f483e917$export$2e2bcd8739ae039(el, options) {
        $6mU8w$swchelpers.classCallCheck(this, $a601ff30f483e917$export$2e2bcd8739ae039);
        var _this;
        _this = $6mU8w$swchelpers.possibleConstructorReturn(this, $6mU8w$swchelpers.getPrototypeOf($a601ff30f483e917$export$2e2bcd8739ae039).call(this));
        var fallback, left;
        _this.element = el;
        _this.clickableElements = [];
        _this.listeners = [];
        _this.files = []; // All files
        if (typeof _this.element === "string") _this.element = document.querySelector(_this.element);
        // Not checking if instance of HTMLElement or Element since IE9 is extremely weird.
        if (!_this.element || _this.element.nodeType == null) throw new Error("Invalid dropzone element.");
        if (_this.element.dropzone) throw new Error("Dropzone already attached.");
        // Now add this dropzone to the instances.
        $a601ff30f483e917$export$2e2bcd8739ae039.instances.push($6mU8w$swchelpers.assertThisInitialized(_this));
        // Put the dropzone inside the element itself.
        _this.element.dropzone = $6mU8w$swchelpers.assertThisInitialized(_this);
        var elementOptions = (left = $a601ff30f483e917$export$2e2bcd8739ae039.optionsForElement(_this.element)) != null ? left : {
        };
        _this.options = $parcel$interopDefault($6mU8w$justextend)(true, {
        }, $b657c03155fc27e2$export$2e2bcd8739ae039, elementOptions, options != null ? options : {
        });
        _this.options.previewTemplate = _this.options.previewTemplate.replace(/\n*/g, "");
        // If the browser failed, just call the fallback and leave
        if (_this.options.forceFallback || !$a601ff30f483e917$export$2e2bcd8739ae039.isBrowserSupported()) return $6mU8w$swchelpers.possibleConstructorReturn(_this, _this.options.fallback.call($6mU8w$swchelpers.assertThisInitialized(_this)));
        // @options.url = @element.getAttribute "action" unless @options.url?
        if (_this.options.url == null) _this.options.url = _this.element.getAttribute("action");
        if (!_this.options.url) throw new Error("No URL provided.");
        if (_this.options.acceptedFiles && _this.options.acceptedMimeTypes) throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");
        if (_this.options.uploadMultiple && _this.options.chunking) throw new Error("You cannot set both: uploadMultiple and chunking.");
        if (_this.options.binaryBody && _this.options.uploadMultiple) throw new Error("You cannot set both: binaryBody and uploadMultiple.");
        // Backwards compatibility
        if (_this.options.acceptedMimeTypes) {
            _this.options.acceptedFiles = _this.options.acceptedMimeTypes;
            delete _this.options.acceptedMimeTypes;
        }
        // Backwards compatibility
        if (_this.options.renameFilename != null) _this.options.renameFile = function(file) {
            return _this.options.renameFilename.call($6mU8w$swchelpers.assertThisInitialized(_this), file.name, file);
        };
        if (typeof _this.options.method === "string") _this.options.method = _this.options.method.toUpperCase();
        if ((fallback = _this.getExistingFallback()) && fallback.parentNode) // Remove the fallback
        fallback.parentNode.removeChild(fallback);
        // Display previews in the previewsContainer element or the Dropzone element unless explicitly set to false
        if (_this.options.previewsContainer !== false) {
            if (_this.options.previewsContainer) _this.previewsContainer = $a601ff30f483e917$export$2e2bcd8739ae039.getElement(_this.options.previewsContainer, "previewsContainer");
            else _this.previewsContainer = _this.element;
        }
        if (_this.options.clickable) {
            if (_this.options.clickable === true) _this.clickableElements = [
                _this.element
            ];
            else _this.clickableElements = $a601ff30f483e917$export$2e2bcd8739ae039.getElements(_this.options.clickable, "clickable");
        }
        _this.init();
        return _this;
    }
    $6mU8w$swchelpers.createClass($a601ff30f483e917$export$2e2bcd8739ae039, [
        {
            // Returns all files that have been accepted
            key: "getAcceptedFiles",
            value: function getAcceptedFiles() {
                return this.files.filter(function(file) {
                    return file.accepted;
                }).map(function(file) {
                    return file;
                });
            }
        },
        {
            // Returns all files that have been rejected
            // Not sure when that's going to be useful, but added for completeness.
            key: "getRejectedFiles",
            value: function getRejectedFiles() {
                return this.files.filter(function(file) {
                    return !file.accepted;
                }).map(function(file) {
                    return file;
                });
            }
        },
        {
            key: "getFilesWithStatus",
            value: function getFilesWithStatus(status) {
                return this.files.filter(function(file) {
                    return file.status === status;
                }).map(function(file) {
                    return file;
                });
            }
        },
        {
            // Returns all files that are in the queue
            key: "getQueuedFiles",
            value: function getQueuedFiles() {
                return this.getFilesWithStatus($a601ff30f483e917$export$2e2bcd8739ae039.QUEUED);
            }
        },
        {
            key: "getUploadingFiles",
            value: function getUploadingFiles() {
                return this.getFilesWithStatus($a601ff30f483e917$export$2e2bcd8739ae039.UPLOADING);
            }
        },
        {
            key: "getAddedFiles",
            value: function getAddedFiles() {
                return this.getFilesWithStatus($a601ff30f483e917$export$2e2bcd8739ae039.ADDED);
            }
        },
        {
            // Files that are either queued or uploading
            key: "getActiveFiles",
            value: function getActiveFiles() {
                return this.files.filter(function(file) {
                    return file.status === $a601ff30f483e917$export$2e2bcd8739ae039.UPLOADING || file.status === $a601ff30f483e917$export$2e2bcd8739ae039.QUEUED;
                }).map(function(file) {
                    return file;
                });
            }
        },
        {
            // The function that gets called when Dropzone is initialized. You
            // can (and should) setup event listeners inside this function.
            key: "init",
            value: function init() {
                var _this12 = this, _this1 = this, _this2 = this, _this3 = this, _this4 = this, _this5 = this, _this6 = this, _this7 = this, _this8 = this, _this9 = this, _this10 = this;
                // In case it isn't set already
                if (this.element.tagName === "form") this.element.setAttribute("enctype", "multipart/form-data");
                if (this.element.classList.contains("dropzone") && !this.element.querySelector(".dz-message")) this.element.appendChild($a601ff30f483e917$export$2e2bcd8739ae039.createElement("<div class=\"dz-default dz-message\"><button class=\"dz-button\" type=\"button\">".concat(this.options.dictDefaultMessage, "</button></div>")));
                if (this.clickableElements.length) {
                    var _this = this;
                    var setupHiddenFileInput = function() {
                        var _this11 = _this;
                        if (_this.hiddenFileInput) _this.hiddenFileInput.parentNode.removeChild(_this.hiddenFileInput);
                        _this.hiddenFileInput = document.createElement("input");
                        _this.hiddenFileInput.setAttribute("type", "file");
                        if (_this.options.maxFiles === null || _this.options.maxFiles > 1) _this.hiddenFileInput.setAttribute("multiple", "multiple");
                        _this.hiddenFileInput.className = "dz-hidden-input";
                        if (_this.options.acceptedFiles !== null) _this.hiddenFileInput.setAttribute("accept", _this.options.acceptedFiles);
                        if (_this.options.capture !== null) _this.hiddenFileInput.setAttribute("capture", _this.options.capture);
                        // Making sure that no one can "tab" into this field.
                        _this.hiddenFileInput.setAttribute("tabindex", "-1");
                        // Not setting `display="none"` because some browsers don't accept clicks
                        // on elements that aren't displayed.
                        _this.hiddenFileInput.style.visibility = "hidden";
                        _this.hiddenFileInput.style.position = "absolute";
                        _this.hiddenFileInput.style.top = "0";
                        _this.hiddenFileInput.style.left = "0";
                        _this.hiddenFileInput.style.height = "0";
                        _this.hiddenFileInput.style.width = "0";
                        $a601ff30f483e917$export$2e2bcd8739ae039.getElement(_this.options.hiddenInputContainer, "hiddenInputContainer").appendChild(_this.hiddenFileInput);
                        _this.hiddenFileInput.addEventListener("change", function() {
                            var _hiddenFileInput = _this11.hiddenFileInput, files = _hiddenFileInput.files;
                            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                            if (files.length) try {
                                for(var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                    var file = _step.value;
                                    _this11.addFile(file);
                                }
                            } catch (err) {
                                _didIteratorError = true;
                                _iteratorError = err;
                            } finally{
                                try {
                                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                                        _iterator.return();
                                    }
                                } finally{
                                    if (_didIteratorError) {
                                        throw _iteratorError;
                                    }
                                }
                            }
                            _this11.emit("addedfiles", files);
                            setupHiddenFileInput();
                        });
                    };
                    setupHiddenFileInput();
                }
                this.URL = window.URL !== null ? window.URL : window.webkitURL;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    // Setup all event listeners on the Dropzone object itself.
                    // They're not in @setupEventListeners() because they shouldn't be removed
                    // again when the dropzone gets disabled.
                    for(var _iterator = this.events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var eventName = _step.value;
                        this.on(eventName, this.options[eventName]);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                this.on("uploadprogress", function() {
                    return _this12.updateTotalUploadProgress();
                });
                this.on("removedfile", function() {
                    return _this1.updateTotalUploadProgress();
                });
                this.on("canceled", function(file) {
                    return _this2.emit("complete", file);
                });
                // Emit a `queuecomplete` event if all files finished uploading.
                this.on("complete", function(file) {
                    var _this11 = _this3;
                    if (_this3.getAddedFiles().length === 0 && _this3.getUploadingFiles().length === 0 && _this3.getQueuedFiles().length === 0) // This needs to be deferred so that `queuecomplete` really triggers after `complete`
                    return setTimeout(function() {
                        return _this11.emit("queuecomplete");
                    }, 0);
                });
                var containsFiles = function containsFiles(e) {
                    if (e.dataTransfer.types) // Because e.dataTransfer.types is an Object in
                    // IE, we need to iterate like this instead of
                    // using e.dataTransfer.types.some()
                    for(var i = 0; i < e.dataTransfer.types.length; i++){
                        if (e.dataTransfer.types[i] === "Files") return true;
                    }
                    return false;
                };
                var noPropagation = function noPropagation(e) {
                    // If there are no files, we don't want to stop
                    // propagation so we don't interfere with other
                    // drag and drop behaviour.
                    if (!containsFiles(e)) return;
                    e.stopPropagation();
                    if (e.preventDefault) return e.preventDefault();
                    else return e.returnValue = false;
                };
                // Create the listeners
                this.listeners = [
                    {
                        element: this.element,
                        events: {
                            dragstart: function(e) {
                                return _this4.emit("dragstart", e);
                            },
                            dragenter: function(e) {
                                noPropagation(e);
                                return _this5.emit("dragenter", e);
                            },
                            dragover: function(e) {
                                // Makes it possible to drag files from chrome's download bar
                                // http://stackoverflow.com/questions/19526430/drag-and-drop-file-uploads-from-chrome-downloads-bar
                                // Try is required to prevent bug in Internet Explorer 11 (SCRIPT65535 exception)
                                var efct;
                                try {
                                    efct = e.dataTransfer.effectAllowed;
                                } catch (error) {
                                }
                                e.dataTransfer.dropEffect = "move" === efct || "linkMove" === efct ? "move" : "copy";
                                noPropagation(e);
                                return _this6.emit("dragover", e);
                            },
                            dragleave: function(e) {
                                return _this7.emit("dragleave", e);
                            },
                            drop: function(e) {
                                noPropagation(e);
                                return _this8.drop(e);
                            },
                            dragend: function(e) {
                                return _this9.emit("dragend", e);
                            }
                        }
                    }, 
                ];
                this.clickableElements.forEach(function(clickableElement) {
                    var _this11 = _this10;
                    return _this10.listeners.push({
                        element: clickableElement,
                        events: {
                            click: function(evt) {
                                // Only the actual dropzone or the message element should trigger file selection
                                if (clickableElement !== _this11.element || evt.target === _this11.element || $a601ff30f483e917$export$2e2bcd8739ae039.elementInside(evt.target, _this11.element.querySelector(".dz-message"))) _this11.hiddenFileInput.click(); // Forward the click
                                return true;
                            }
                        }
                    });
                });
                this.enable();
                return this.options.init.call(this);
            }
        },
        {
            // Not fully tested yet
            key: "destroy",
            value: function destroy() {
                this.disable();
                this.removeAllFiles(true);
                if (this.hiddenFileInput != null ? this.hiddenFileInput.parentNode : undefined) {
                    this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput);
                    this.hiddenFileInput = null;
                }
                delete this.element.dropzone;
                return $a601ff30f483e917$export$2e2bcd8739ae039.instances.splice($a601ff30f483e917$export$2e2bcd8739ae039.instances.indexOf(this), 1);
            }
        },
        {
            key: "updateTotalUploadProgress",
            value: function updateTotalUploadProgress() {
                var totalUploadProgress;
                var totalBytesSent = 0;
                var totalBytes = 0;
                var activeFiles = this.getActiveFiles();
                if (activeFiles.length) {
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(var _iterator = this.getActiveFiles()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var file = _step.value;
                            totalBytesSent += file.upload.bytesSent;
                            totalBytes += file.upload.total;
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                    totalUploadProgress = 100 * totalBytesSent / totalBytes;
                } else totalUploadProgress = 100;
                return this.emit("totaluploadprogress", totalUploadProgress, totalBytes, totalBytesSent);
            }
        },
        {
            // @options.paramName can be a function taking one parameter rather than a string.
            // A parameter name for a file is obtained simply by calling this with an index number.
            key: "_getParamName",
            value: function _getParamName(n) {
                if (typeof this.options.paramName === "function") return this.options.paramName(n);
                else return "".concat(this.options.paramName).concat(this.options.uploadMultiple ? "[".concat(n, "]") : "");
            }
        },
        {
            // If @options.renameFile is a function,
            // the function will be used to rename the file.name before appending it to the formData
            key: "_renameFile",
            value: function _renameFile(file) {
                if (typeof this.options.renameFile !== "function") return file.name;
                return this.options.renameFile(file);
            }
        },
        {
            // Returns a form that can be used as fallback if the browser does not support DragnDrop
            //
            // If the dropzone is already a form, only the input field and button are returned. Otherwise a complete form element is provided.
            // This code has to pass in IE7 :(
            key: "getFallbackForm",
            value: function getFallbackForm() {
                var existingFallback, form;
                if (existingFallback = this.getExistingFallback()) return existingFallback;
                var fieldsString = '<div class="dz-fallback">';
                if (this.options.dictFallbackText) fieldsString += "<p>".concat(this.options.dictFallbackText, "</p>");
                fieldsString += "<input type=\"file\" name=\"".concat(this._getParamName(0), "\" ").concat(this.options.uploadMultiple ? 'multiple="multiple"' : undefined, " /><input type=\"submit\" value=\"Upload!\"></div>");
                var fields = $a601ff30f483e917$export$2e2bcd8739ae039.createElement(fieldsString);
                if (this.element.tagName !== "FORM") {
                    form = $a601ff30f483e917$export$2e2bcd8739ae039.createElement("<form action=\"".concat(this.options.url, "\" enctype=\"multipart/form-data\" method=\"").concat(this.options.method, "\"></form>"));
                    form.appendChild(fields);
                } else {
                    // Make sure that the enctype and method attributes are set properly
                    this.element.setAttribute("enctype", "multipart/form-data");
                    this.element.setAttribute("method", this.options.method);
                }
                return form != null ? form : fields;
            }
        },
        {
            // Returns the fallback elements if they exist already
            //
            // This code has to pass in IE7 :(
            key: "getExistingFallback",
            value: function getExistingFallback() {
                var getFallback = function getFallback(elements) {
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var el = _step.value;
                            if (/(^| )fallback($| )/.test(el.className)) return el;
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                };
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = [
                        "div",
                        "form"
                    ][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var tagName = _step.value;
                        var fallback;
                        if (fallback = getFallback(this.element.getElementsByTagName(tagName))) return fallback;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        },
        {
            // Activates all listeners stored in @listeners
            key: "setupEventListeners",
            value: function setupEventListeners() {
                return this.listeners.map(function(elementListeners) {
                    return (function() {
                        var result = [];
                        for(var event in elementListeners.events){
                            var listener = elementListeners.events[event];
                            result.push(elementListeners.element.addEventListener(event, listener, false));
                        }
                        return result;
                    })();
                });
            }
        },
        {
            // Deactivates all listeners stored in @listeners
            key: "removeEventListeners",
            value: function removeEventListeners() {
                return this.listeners.map(function(elementListeners) {
                    return (function() {
                        var result = [];
                        for(var event in elementListeners.events){
                            var listener = elementListeners.events[event];
                            result.push(elementListeners.element.removeEventListener(event, listener, false));
                        }
                        return result;
                    })();
                });
            }
        },
        {
            // Removes all event listeners and cancels all files in the queue or being processed.
            key: "disable",
            value: function disable() {
                var _this = this;
                this.clickableElements.forEach(function(element) {
                    return element.classList.remove("dz-clickable");
                });
                this.removeEventListeners();
                this.disabled = true;
                return this.files.map(function(file) {
                    return _this.cancelUpload(file);
                });
            }
        },
        {
            key: "enable",
            value: function enable() {
                delete this.disabled;
                this.clickableElements.forEach(function(element) {
                    return element.classList.add("dz-clickable");
                });
                return this.setupEventListeners();
            }
        },
        {
            // Returns a nicely formatted filesize
            key: "filesize",
            value: function filesize(size) {
                var selectedSize = 0;
                var selectedUnit = "b";
                if (size > 0) {
                    var units = [
                        "tb",
                        "gb",
                        "mb",
                        "kb",
                        "b"
                    ];
                    for(var i = 0; i < units.length; i++){
                        var unit = units[i];
                        var cutoff = Math.pow(this.options.filesizeBase, 4 - i) / 10;
                        if (size >= cutoff) {
                            selectedSize = size / Math.pow(this.options.filesizeBase, 4 - i);
                            selectedUnit = unit;
                            break;
                        }
                    }
                    selectedSize = Math.round(10 * selectedSize) / 10; // Cutting of digits
                }
                return "<strong>".concat(selectedSize, "</strong> ").concat(this.options.dictFileSizeUnits[selectedUnit]);
            }
        },
        {
            // Adds or removes the `dz-max-files-reached` class from the form.
            key: "_updateMaxFilesReachedClass",
            value: function _updateMaxFilesReachedClass() {
                if (this.options.maxFiles != null && this.getAcceptedFiles().length >= this.options.maxFiles) {
                    if (this.getAcceptedFiles().length === this.options.maxFiles) this.emit("maxfilesreached", this.files);
                    return this.element.classList.add("dz-max-files-reached");
                } else return this.element.classList.remove("dz-max-files-reached");
            }
        },
        {
            key: "drop",
            value: function drop(e) {
                if (!e.dataTransfer) return;
                this.emit("drop", e);
                // Convert the FileList to an Array
                // This is necessary for IE11
                var files = [];
                for(var i = 0; i < e.dataTransfer.files.length; i++)files[i] = e.dataTransfer.files[i];
                // Even if it's a folder, files.length will contain the folders.
                if (files.length) {
                    var _dataTransfer = e.dataTransfer, items = _dataTransfer.items;
                    if (items && items.length && items[0].webkitGetAsEntry != null) // The browser supports dropping of folders, so handle items instead of files
                    this._addFilesFromItems(items);
                    else this.handleFiles(files);
                }
                this.emit("addedfiles", files);
            }
        },
        {
            key: "paste",
            value: function paste(e) {
                if ($a601ff30f483e917$var$__guard__(e != null ? e.clipboardData : undefined, function(x) {
                    return x.items;
                }) == null) return;
                this.emit("paste", e);
                var _clipboardData = e.clipboardData, items = _clipboardData.items;
                if (items.length) return this._addFilesFromItems(items);
            }
        },
        {
            key: "handleFiles",
            value: function handleFiles(files) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var file = _step.value;
                        this.addFile(file);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        },
        {
            // When a folder is dropped (or files are pasted), items must be handled
            // instead of files.
            key: "_addFilesFromItems",
            value: function _addFilesFromItems(items) {
                var _this = this;
                return (function() {
                    var result = [];
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var item = _step.value;
                            var entry;
                            if (item.webkitGetAsEntry != null && (entry = item.webkitGetAsEntry())) {
                                if (entry.isFile) result.push(_this.addFile(item.getAsFile()));
                                else if (entry.isDirectory) // Append all files from that directory to files
                                result.push(_this._addFilesFromDirectory(entry, entry.name));
                                else result.push(undefined);
                            } else if (item.getAsFile != null) {
                                if (item.kind == null || item.kind === "file") result.push(_this.addFile(item.getAsFile()));
                                else result.push(undefined);
                            } else result.push(undefined);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                    return result;
                })();
            }
        },
        {
            // Goes through the directory, and adds each file it finds recursively
            key: "_addFilesFromDirectory",
            value: function _addFilesFromDirectory(directory, path) {
                var _this = this;
                var dirReader = directory.createReader();
                var errorHandler = function(error) {
                    return $a601ff30f483e917$var$__guardMethod__(console, "log", function(o) {
                        return o.log(error);
                    });
                };
                var readEntries = function() {
                    var _this1 = _this;
                    return dirReader.readEntries(function(entries) {
                        if (entries.length > 0) {
                            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                            try {
                                for(var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                    var entry = _step.value;
                                    var _this2 = _this1;
                                    if (entry.isFile) entry.file(function(file) {
                                        if (_this2.options.ignoreHiddenFiles && file.name.substring(0, 1) === ".") return;
                                        file.fullPath = "".concat(path, "/").concat(file.name);
                                        return _this2.addFile(file);
                                    });
                                    else if (entry.isDirectory) _this1._addFilesFromDirectory(entry, "".concat(path, "/").concat(entry.name));
                                }
                            } catch (err) {
                                _didIteratorError = true;
                                _iteratorError = err;
                            } finally{
                                try {
                                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                                        _iterator.return();
                                    }
                                } finally{
                                    if (_didIteratorError) {
                                        throw _iteratorError;
                                    }
                                }
                            }
                            // Recursively call readEntries() again, since browser only handle
                            // the first 100 entries.
                            // See: https://developer.mozilla.org/en-US/docs/Web/API/DirectoryReader#readEntries
                            readEntries();
                        }
                        return null;
                    }, errorHandler);
                };
                return readEntries();
            }
        },
        {
            // If `done()` is called without argument the file is accepted
            // If you call it with an error message, the file is rejected
            // (This allows for asynchronous validation)
            //
            // This function checks the filesize, and if the file.type passes the
            // `acceptedFiles` check.
            key: "accept",
            value: function accept(file, done) {
                if (this.options.maxFilesize && file.size > this.options.maxFilesize * 1048576) done(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(file.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize));
                else if (!$a601ff30f483e917$export$2e2bcd8739ae039.isValidFile(file, this.options.acceptedFiles)) done(this.options.dictInvalidFileType);
                else if (this.options.maxFiles != null && this.getAcceptedFiles().length >= this.options.maxFiles) {
                    done(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles));
                    this.emit("maxfilesexceeded", file);
                } else this.options.accept.call(this, file, done);
            }
        },
        {
            key: "addFile",
            value: function addFile(file) {
                var _this = this;
                file.upload = {
                    uuid: $a601ff30f483e917$export$2e2bcd8739ae039.uuidv4(),
                    progress: 0,
                    // Setting the total upload size to file.size for the beginning
                    // It's actual different than the size to be transmitted.
                    total: file.size,
                    bytesSent: 0,
                    filename: this._renameFile(file)
                };
                this.files.push(file);
                file.status = $a601ff30f483e917$export$2e2bcd8739ae039.ADDED;
                this.emit("addedfile", file);
                this._enqueueThumbnail(file);
                this.accept(file, function(error) {
                    if (error) {
                        file.accepted = false;
                        _this._errorProcessing([
                            file
                        ], error); // Will set the file.status
                    } else {
                        file.accepted = true;
                        if (_this.options.autoQueue) _this.enqueueFile(file);
                         // Will set .accepted = true
                    }
                    _this._updateMaxFilesReachedClass();
                });
            }
        },
        {
            // Wrapper for enqueueFile
            key: "enqueueFiles",
            value: function enqueueFiles(files) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var file = _step.value;
                        this.enqueueFile(file);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return null;
            }
        },
        {
            key: "enqueueFile",
            value: function enqueueFile(file) {
                if (file.status === $a601ff30f483e917$export$2e2bcd8739ae039.ADDED && file.accepted === true) {
                    var _this = this;
                    file.status = $a601ff30f483e917$export$2e2bcd8739ae039.QUEUED;
                    if (this.options.autoProcessQueue) return setTimeout(function() {
                        return _this.processQueue();
                    }, 0); // Deferring the call
                } else throw new Error("This file can't be queued because it has already been processed or was rejected.");
            }
        },
        {
            key: "_enqueueThumbnail",
            value: function _enqueueThumbnail(file) {
                if (this.options.createImageThumbnails && file.type.match(/image.*/) && file.size <= this.options.maxThumbnailFilesize * 1048576) {
                    var _this = this;
                    this._thumbnailQueue.push(file);
                    return setTimeout(function() {
                        return _this._processThumbnailQueue();
                    }, 0); // Deferring the call
                }
            }
        },
        {
            key: "_processThumbnailQueue",
            value: function _processThumbnailQueue() {
                var _this = this;
                if (this._processingThumbnail || this._thumbnailQueue.length === 0) return;
                this._processingThumbnail = true;
                var file = this._thumbnailQueue.shift();
                return this.createThumbnail(file, this.options.thumbnailWidth, this.options.thumbnailHeight, this.options.thumbnailMethod, true, function(dataUrl) {
                    _this.emit("thumbnail", file, dataUrl);
                    _this._processingThumbnail = false;
                    return _this._processThumbnailQueue();
                });
            }
        },
        {
            // Can be called by the user to remove a file
            key: "removeFile",
            value: function removeFile(file) {
                if (file.status === $a601ff30f483e917$export$2e2bcd8739ae039.UPLOADING) this.cancelUpload(file);
                this.files = $a601ff30f483e917$var$without(this.files, file);
                this.emit("removedfile", file);
                if (this.files.length === 0) return this.emit("reset");
            }
        },
        {
            // Removes all files that aren't currently processed from the list
            key: "removeAllFiles",
            value: function removeAllFiles(cancelIfNecessary) {
                // Create a copy of files since removeFile() changes the @files array.
                if (cancelIfNecessary == null) cancelIfNecessary = false;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this.files.slice()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var file = _step.value;
                        if (file.status !== $a601ff30f483e917$export$2e2bcd8739ae039.UPLOADING || cancelIfNecessary) this.removeFile(file);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return null;
            }
        },
        {
            // Resizes an image before it gets sent to the server. This function is the default behavior of
            // `options.transformFile` if `resizeWidth` or `resizeHeight` are set. The callback is invoked with
            // the resized blob.
            key: "resizeImage",
            value: function resizeImage(file, width, height, resizeMethod, callback) {
                var _this = this;
                return this.createThumbnail(file, width, height, resizeMethod, true, function(dataUrl, canvas) {
                    if (canvas == null) // The image has not been resized
                    return callback(file);
                    else {
                        var _options = _this.options, resizeMimeType = _options.resizeMimeType;
                        if (resizeMimeType == null) resizeMimeType = file.type;
                        var resizedDataURL = canvas.toDataURL(resizeMimeType, _this.options.resizeQuality);
                        if (resizeMimeType === "image/jpeg" || resizeMimeType === "image/jpg") // Now add the original EXIF information
                        resizedDataURL = $a601ff30f483e917$var$ExifRestore.restore(file.dataURL, resizedDataURL);
                        return callback($a601ff30f483e917$export$2e2bcd8739ae039.dataURItoBlob(resizedDataURL));
                    }
                });
            }
        },
        {
            key: "createThumbnail",
            value: function createThumbnail(file, width, height, resizeMethod, fixOrientation, callback) {
                var _this = this;
                var fileReader = new FileReader();
                fileReader.onload = function() {
                    file.dataURL = fileReader.result;
                    // Don't bother creating a thumbnail for SVG images since they're vector
                    if (file.type === "image/svg+xml") {
                        if (callback != null) callback(fileReader.result);
                        return;
                    }
                    _this.createThumbnailFromUrl(file, width, height, resizeMethod, fixOrientation, callback);
                };
                fileReader.readAsDataURL(file);
            }
        },
        {
            // `mockFile` needs to have these attributes:
            //
            //     { name: 'name', size: 12345, imageUrl: '' }
            //
            // `callback` will be invoked when the image has been downloaded and displayed.
            // `crossOrigin` will be added to the `img` tag when accessing the file.
            key: "displayExistingFile",
            value: function displayExistingFile(mockFile, imageUrl, callback, crossOrigin, param) {
                var resizeThumbnail = param === void 0 ? true : param;
                this.emit("addedfile", mockFile);
                this.emit("complete", mockFile);
                if (!resizeThumbnail) {
                    this.emit("thumbnail", mockFile, imageUrl);
                    if (callback) callback();
                } else {
                    var _this = this;
                    var onDone = function(thumbnail) {
                        _this.emit("thumbnail", mockFile, thumbnail);
                        if (callback) callback();
                    };
                    mockFile.dataURL = imageUrl;
                    this.createThumbnailFromUrl(mockFile, this.options.thumbnailWidth, this.options.thumbnailHeight, this.options.thumbnailMethod, this.options.fixOrientation, onDone, crossOrigin);
                }
            }
        },
        {
            key: "createThumbnailFromUrl",
            value: function createThumbnailFromUrl(file, width, height, resizeMethod, fixOrientation, callback, crossOrigin) {
                var _this = this;
                // Not using `new Image` here because of a bug in latest Chrome versions.
                // See https://github.com/enyo/dropzone/pull/226
                var img = document.createElement("img");
                if (crossOrigin) img.crossOrigin = crossOrigin;
                // fixOrientation is not needed anymore with browsers handling imageOrientation
                fixOrientation = getComputedStyle(document.body)["imageOrientation"] == "from-image" ? false : fixOrientation;
                img.onload = function() {
                    var _this1 = _this;
                    var loadExif = function(callback) {
                        return callback(1);
                    };
                    if (typeof EXIF !== "undefined" && EXIF !== null && fixOrientation) loadExif = function(callback) {
                        return EXIF.getData(img, function() {
                            return callback(EXIF.getTag(this, "Orientation"));
                        });
                    };
                    return loadExif(function(orientation) {
                        file.width = img.width;
                        file.height = img.height;
                        var resizeInfo = _this1.options.resize.call(_this1, file, width, height, resizeMethod);
                        var canvas = document.createElement("canvas");
                        var ctx = canvas.getContext("2d");
                        canvas.width = resizeInfo.trgWidth;
                        canvas.height = resizeInfo.trgHeight;
                        if (orientation > 4) {
                            canvas.width = resizeInfo.trgHeight;
                            canvas.height = resizeInfo.trgWidth;
                        }
                        switch(orientation){
                            case 2:
                                // horizontal flip
                                ctx.translate(canvas.width, 0);
                                ctx.scale(-1, 1);
                                break;
                            case 3:
                                // 180° rotate left
                                ctx.translate(canvas.width, canvas.height);
                                ctx.rotate(Math.PI);
                                break;
                            case 4:
                                // vertical flip
                                ctx.translate(0, canvas.height);
                                ctx.scale(1, -1);
                                break;
                            case 5:
                                // vertical flip + 90 rotate right
                                ctx.rotate(0.5 * Math.PI);
                                ctx.scale(1, -1);
                                break;
                            case 6:
                                // 90° rotate right
                                ctx.rotate(0.5 * Math.PI);
                                ctx.translate(0, -canvas.width);
                                break;
                            case 7:
                                // horizontal flip + 90 rotate right
                                ctx.rotate(0.5 * Math.PI);
                                ctx.translate(canvas.height, -canvas.width);
                                ctx.scale(-1, 1);
                                break;
                            case 8:
                                // 90° rotate left
                                ctx.rotate(-0.5 * Math.PI);
                                ctx.translate(-canvas.height, 0);
                                break;
                        }
                        // This is a bugfix for iOS' scaling bug.
                        $a601ff30f483e917$var$drawImageIOSFix(ctx, img, resizeInfo.srcX != null ? resizeInfo.srcX : 0, resizeInfo.srcY != null ? resizeInfo.srcY : 0, resizeInfo.srcWidth, resizeInfo.srcHeight, resizeInfo.trgX != null ? resizeInfo.trgX : 0, resizeInfo.trgY != null ? resizeInfo.trgY : 0, resizeInfo.trgWidth, resizeInfo.trgHeight);
                        var thumbnail = canvas.toDataURL("image/png");
                        if (callback != null) return callback(thumbnail, canvas);
                    });
                };
                if (callback != null) img.onerror = callback;
                return img.src = file.dataURL;
            }
        },
        {
            // Goes through the queue and processes files if there aren't too many already.
            key: "processQueue",
            value: function processQueue() {
                var _options = this.options, parallelUploads = _options.parallelUploads;
                var processingLength = this.getUploadingFiles().length;
                var i = processingLength;
                // There are already at least as many files uploading than should be
                if (processingLength >= parallelUploads) return;
                var queuedFiles = this.getQueuedFiles();
                if (!(queuedFiles.length > 0)) return;
                if (this.options.uploadMultiple) // The files should be uploaded in one request
                return this.processFiles(queuedFiles.slice(0, parallelUploads - processingLength));
                else while(i < parallelUploads){
                    if (!queuedFiles.length) return;
                     // Nothing left to process
                    this.processFile(queuedFiles.shift());
                    i++;
                }
            }
        },
        {
            // Wrapper for `processFiles`
            key: "processFile",
            value: function processFile(file) {
                return this.processFiles([
                    file
                ]);
            }
        },
        {
            // Loads the file, then calls finishedLoading()
            key: "processFiles",
            value: function processFiles(files) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var file = _step.value;
                        file.processing = true; // Backwards compatibility
                        file.status = $a601ff30f483e917$export$2e2bcd8739ae039.UPLOADING;
                        this.emit("processing", file);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                if (this.options.uploadMultiple) this.emit("processingmultiple", files);
                return this.uploadFiles(files);
            }
        },
        {
            key: "_getFilesWithXhr",
            value: function _getFilesWithXhr(xhr) {
                var files;
                return files = this.files.filter(function(file) {
                    return file.xhr === xhr;
                }).map(function(file) {
                    return file;
                });
            }
        },
        {
            // Cancels the file upload and sets the status to CANCELED
            // **if** the file is actually being uploaded.
            // If it's still in the queue, the file is being removed from it and the status
            // set to CANCELED.
            key: "cancelUpload",
            value: function cancelUpload(file) {
                if (file.status === $a601ff30f483e917$export$2e2bcd8739ae039.UPLOADING) {
                    var groupedFiles = this._getFilesWithXhr(file.xhr);
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(var _iterator = groupedFiles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var groupedFile = _step.value;
                            groupedFile.status = $a601ff30f483e917$export$2e2bcd8739ae039.CANCELED;
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                    if (typeof file.xhr !== "undefined") file.xhr.abort();
                    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                    try {
                        for(var _iterator1 = groupedFiles[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                            var groupedFile = _step1.value;
                            this.emit("canceled", groupedFile);
                        }
                    } catch (err) {
                        _didIteratorError1 = true;
                        _iteratorError1 = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                                _iterator1.return();
                            }
                        } finally{
                            if (_didIteratorError1) {
                                throw _iteratorError1;
                            }
                        }
                    }
                    if (this.options.uploadMultiple) this.emit("canceledmultiple", groupedFiles);
                } else if (file.status === $a601ff30f483e917$export$2e2bcd8739ae039.ADDED || file.status === $a601ff30f483e917$export$2e2bcd8739ae039.QUEUED) {
                    file.status = $a601ff30f483e917$export$2e2bcd8739ae039.CANCELED;
                    this.emit("canceled", file);
                    if (this.options.uploadMultiple) this.emit("canceledmultiple", [
                        file
                    ]);
                }
                if (this.options.autoProcessQueue) return this.processQueue();
            }
        },
        {
            key: "resolveOption",
            value: function resolveOption(option) {
                for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                    args[_key - 1] = arguments[_key];
                }
                if (typeof option === "function") return option.apply(this, args);
                return option;
            }
        },
        {
            key: "uploadFile",
            value: function uploadFile(file) {
                return this.uploadFiles([
                    file
                ]);
            }
        },
        {
            key: "uploadFiles",
            value: function uploadFiles(files) {
                var _this = this;
                this._transformFiles(files, function(transformedFiles) {
                    if (_this.options.chunking) {
                        // Chunking is not allowed to be used with `uploadMultiple` so we know
                        // that there is only __one__file.
                        var transformedFile = transformedFiles[0];
                        files[0].upload.chunked = _this.options.chunking && (_this.options.forceChunking || transformedFile.size > _this.options.chunkSize);
                        files[0].upload.totalChunkCount = Math.ceil(transformedFile.size / _this.options.chunkSize);
                    }
                    if (files[0].upload.chunked) {
                        var _this1 = _this, _this4 = _this;
                        // This file should be sent in chunks!
                        // If the chunking option is set, we **know** that there can only be **one** file, since
                        // uploadMultiple is not allowed with this option.
                        var file = files[0];
                        var transformedFile = transformedFiles[0];
                        var startedChunkCount = 0;
                        file.upload.chunks = [];
                        var handleNextChunk = function() {
                            var chunkIndex = 0;
                            // Find the next item in file.upload.chunks that is not defined yet.
                            while(file.upload.chunks[chunkIndex] !== undefined)chunkIndex++;
                            // This means, that all chunks have already been started.
                            if (chunkIndex >= file.upload.totalChunkCount) return;
                            startedChunkCount++;
                            var start = chunkIndex * _this1.options.chunkSize;
                            var end = Math.min(start + _this1.options.chunkSize, transformedFile.size);
                            var dataBlock = {
                                name: _this1._getParamName(0),
                                data: transformedFile.webkitSlice ? transformedFile.webkitSlice(start, end) : transformedFile.slice(start, end),
                                filename: file.upload.filename,
                                chunkIndex: chunkIndex
                            };
                            file.upload.chunks[chunkIndex] = {
                                file: file,
                                index: chunkIndex,
                                dataBlock: dataBlock,
                                status: $a601ff30f483e917$export$2e2bcd8739ae039.UPLOADING,
                                progress: 0,
                                retries: 0
                            };
                            _this1._uploadData(files, [
                                dataBlock
                            ]);
                        };
                        file.upload.finishedChunkUpload = function(chunk, response) {
                            var _this5 = _this4;
                            var allFinished = true;
                            chunk.status = $a601ff30f483e917$export$2e2bcd8739ae039.SUCCESS;
                            // Clear the data from the chunk
                            chunk.dataBlock = null;
                            chunk.response = chunk.xhr.responseText;
                            chunk.responseHeaders = chunk.xhr.getAllResponseHeaders();
                            // Leaving this reference to xhr will cause memory leaks.
                            chunk.xhr = null;
                            for(var i = 0; i < file.upload.totalChunkCount; i++){
                                if (file.upload.chunks[i] === undefined) return handleNextChunk();
                                if (file.upload.chunks[i].status !== $a601ff30f483e917$export$2e2bcd8739ae039.SUCCESS) allFinished = false;
                            }
                            if (allFinished) _this4.options.chunksUploaded(file, function() {
                                _this5._finished(files, response, null);
                            });
                        };
                        if (_this.options.parallelChunkUploads) for(var i = 0; i < file.upload.totalChunkCount; i++)handleNextChunk();
                        else handleNextChunk();
                    } else {
                        var dataBlocks = [];
                        for(var i = 0; i < files.length; i++)dataBlocks[i] = {
                            name: _this._getParamName(i),
                            data: transformedFiles[i],
                            filename: files[i].upload.filename
                        };
                        _this._uploadData(files, dataBlocks);
                    }
                });
            }
        },
        {
            /// Returns the right chunk for given file and xhr
            key: "_getChunk",
            value: function _getChunk(file, xhr) {
                for(var i = 0; i < file.upload.totalChunkCount; i++){
                    if (file.upload.chunks[i] !== undefined && file.upload.chunks[i].xhr === xhr) return file.upload.chunks[i];
                }
            }
        },
        {
            // This function actually uploads the file(s) to the server.
            //
            //  If dataBlocks contains the actual data to upload (meaning, that this could
            // either be transformed files, or individual chunks for chunked upload) then
            // they will be used for the actual data to upload.
            key: "_uploadData",
            value: function _uploadData(files, dataBlocks) {
                var _this = this, _this7 = this, _this8 = this, _this9 = this;
                var xhr = new XMLHttpRequest();
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    // Put the xhr object in the file objects to be able to reference it later.
                    for(var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var file = _step.value;
                        file.xhr = xhr;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                if (files[0].upload.chunked) // Put the xhr object in the right chunk object, so it can be associated
                // later, and found with _getChunk.
                files[0].upload.chunks[dataBlocks[0].chunkIndex].xhr = xhr;
                var method = this.resolveOption(this.options.method, files, dataBlocks);
                var url = this.resolveOption(this.options.url, files, dataBlocks);
                xhr.open(method, url, true);
                // Setting the timeout after open because of IE11 issue: https://gitlab.com/meno/dropzone/issues/8
                var timeout = this.resolveOption(this.options.timeout, files);
                if (timeout) xhr.timeout = this.resolveOption(this.options.timeout, files);
                // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
                xhr.withCredentials = !!this.options.withCredentials;
                xhr.onload = function(e) {
                    _this._finishedUploading(files, xhr, e);
                };
                xhr.ontimeout = function() {
                    _this7._handleUploadError(files, xhr, "Request timedout after ".concat(_this7.options.timeout / 1000, " seconds"));
                };
                xhr.onerror = function() {
                    _this8._handleUploadError(files, xhr);
                };
                // Some browsers do not have the .upload property
                var progressObj = xhr.upload != null ? xhr.upload : xhr;
                progressObj.onprogress = function(e) {
                    return _this9._updateFilesUploadProgress(files, xhr, e);
                };
                var headers = this.options.defaultHeaders ? {
                    Accept: "application/json",
                    "Cache-Control": "no-cache",
                    "X-Requested-With": "XMLHttpRequest"
                } : {
                };
                if (this.options.binaryBody) headers["Content-Type"] = files[0].type;
                if (this.options.headers) $parcel$interopDefault($6mU8w$justextend)(headers, this.options.headers);
                for(var headerName in headers){
                    var headerValue = headers[headerName];
                    if (headerValue) xhr.setRequestHeader(headerName, headerValue);
                }
                if (this.options.binaryBody) {
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        // Since the file is going to be sent as binary body, it doesn't make
                        // any sense to generate `FormData` for it.
                        for(var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var file = _step.value;
                            this.emit("sending", file, xhr);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                    if (this.options.uploadMultiple) this.emit("sendingmultiple", files, xhr);
                    this.submitRequest(xhr, null, files);
                } else {
                    var formData = new FormData();
                    // Adding all @options parameters
                    if (this.options.params) {
                        var additionalParams = this.options.params;
                        if (typeof additionalParams === "function") additionalParams = additionalParams.call(this, files, xhr, files[0].upload.chunked ? this._getChunk(files[0], xhr) : null);
                        for(var key in additionalParams){
                            var value = additionalParams[key];
                            if (Array.isArray(value)) // The additional parameter contains an array,
                            // so lets iterate over it to attach each value
                            // individually.
                            for(var i = 0; i < value.length; i++)formData.append(key, value[i]);
                            else formData.append(key, value);
                        }
                    }
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        // Let the user add additional data if necessary
                        for(var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var file = _step.value;
                            this.emit("sending", file, xhr, formData);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                    if (this.options.uploadMultiple) this.emit("sendingmultiple", files, xhr, formData);
                    this._addFormElementData(formData);
                    // Finally add the files
                    // Has to be last because some servers (eg: S3) expect the file to be the last parameter
                    for(var i = 0; i < dataBlocks.length; i++){
                        var dataBlock = dataBlocks[i];
                        formData.append(dataBlock.name, dataBlock.data, dataBlock.filename);
                    }
                    this.submitRequest(xhr, formData, files);
                }
            }
        },
        {
            // Transforms all files with this.options.transformFile and invokes done with the transformed files when done.
            key: "_transformFiles",
            value: function _transformFiles(files, done) {
                var _this = this, _loop = function(i) {
                    _this.options.transformFile.call(_this, files[i], function(transformedFile) {
                        transformedFiles[i] = transformedFile;
                        if (++doneCounter === files.length) done(transformedFiles);
                    });
                };
                var transformedFiles = [];
                // Clumsy way of handling asynchronous calls, until I get to add a proper Future library.
                var doneCounter = 0;
                for(var i = 0; i < files.length; i++)_loop(i);
            }
        },
        {
            // Takes care of adding other input elements of the form to the AJAX request
            key: "_addFormElementData",
            value: function _addFormElementData(formData) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                // Take care of other input elements
                if (this.element.tagName === "FORM") try {
                    for(var _iterator = this.element.querySelectorAll("input, textarea, select, button")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var input = _step.value;
                        var inputName = input.getAttribute("name");
                        var inputType = input.getAttribute("type");
                        if (inputType) inputType = inputType.toLowerCase();
                        // If the input doesn't have a name, we can't use it.
                        if (typeof inputName === "undefined" || inputName === null) continue;
                        if (input.tagName === "SELECT" && input.hasAttribute("multiple")) {
                            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                            try {
                                // Possibly multiple values
                                for(var _iterator = input.options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                    var option = _step.value;
                                    if (option.selected) formData.append(inputName, option.value);
                                }
                            } catch (err) {
                                _didIteratorError = true;
                                _iteratorError = err;
                            } finally{
                                try {
                                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                                        _iterator.return();
                                    }
                                } finally{
                                    if (_didIteratorError) {
                                        throw _iteratorError;
                                    }
                                }
                            }
                        } else if (!inputType || inputType !== "checkbox" && inputType !== "radio" || input.checked) formData.append(inputName, input.value);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        },
        {
            // Invoked when there is new progress information about given files.
            // If e is not provided, it is assumed that the upload is finished.
            key: "_updateFilesUploadProgress",
            value: function _updateFilesUploadProgress(files, xhr, e) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                if (!files[0].upload.chunked) try {
                    // Handle file uploads without chunking
                    for(var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var file = _step.value;
                        if (file.upload.total && file.upload.bytesSent && file.upload.bytesSent == file.upload.total) continue;
                        if (e) {
                            file.upload.progress = 100 * e.loaded / e.total;
                            file.upload.total = e.total;
                            file.upload.bytesSent = e.loaded;
                        } else {
                            // No event, so we're at 100%
                            file.upload.progress = 100;
                            file.upload.bytesSent = file.upload.total;
                        }
                        this.emit("uploadprogress", file, file.upload.progress, file.upload.bytesSent);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                else {
                    // Handle chunked file uploads
                    // Chunked upload is not compatible with uploading multiple files in one
                    // request, so we know there's only one file.
                    var file = files[0];
                    // Since this is a chunked upload, we need to update the appropriate chunk
                    // progress.
                    var chunk = this._getChunk(file, xhr);
                    if (e) {
                        chunk.progress = 100 * e.loaded / e.total;
                        chunk.total = e.total;
                        chunk.bytesSent = e.loaded;
                    } else {
                        // No event, so we're at 100%
                        chunk.progress = 100;
                        chunk.bytesSent = chunk.total;
                    }
                    // Now tally the *file* upload progress from its individual chunks
                    file.upload.progress = 0;
                    file.upload.total = 0;
                    file.upload.bytesSent = 0;
                    for(var i = 0; i < file.upload.totalChunkCount; i++)if (file.upload.chunks[i] && typeof file.upload.chunks[i].progress !== "undefined") {
                        file.upload.progress += file.upload.chunks[i].progress;
                        file.upload.total += file.upload.chunks[i].total;
                        file.upload.bytesSent += file.upload.chunks[i].bytesSent;
                    }
                    // Since the process is a percentage, we need to divide by the amount of
                    // chunks we've used.
                    file.upload.progress = file.upload.progress / file.upload.totalChunkCount;
                    this.emit("uploadprogress", file, file.upload.progress, file.upload.bytesSent);
                }
            }
        },
        {
            key: "_finishedUploading",
            value: function _finishedUploading(files, xhr, e) {
                var response;
                if (files[0].status === $a601ff30f483e917$export$2e2bcd8739ae039.CANCELED) return;
                if (xhr.readyState !== 4) return;
                if (xhr.responseType !== "arraybuffer" && xhr.responseType !== "blob") {
                    response = xhr.responseText;
                    if (xhr.getResponseHeader("content-type") && ~xhr.getResponseHeader("content-type").indexOf("application/json")) try {
                        response = JSON.parse(response);
                    } catch (error) {
                        e = error;
                        response = "Invalid JSON response from server.";
                    }
                }
                this._updateFilesUploadProgress(files, xhr);
                if (!(200 <= xhr.status && xhr.status < 300)) this._handleUploadError(files, xhr, response);
                else if (files[0].upload.chunked) files[0].upload.finishedChunkUpload(this._getChunk(files[0], xhr), response);
                else this._finished(files, response, e);
            }
        },
        {
            key: "_handleUploadError",
            value: function _handleUploadError(files, xhr, response) {
                if (files[0].status === $a601ff30f483e917$export$2e2bcd8739ae039.CANCELED) return;
                if (files[0].upload.chunked && this.options.retryChunks) {
                    var chunk = this._getChunk(files[0], xhr);
                    if ((chunk.retries++) < this.options.retryChunksLimit) {
                        this._uploadData(files, [
                            chunk.dataBlock
                        ]);
                        return;
                    } else console.warn("Retried this chunk too often. Giving up.");
                }
                this._errorProcessing(files, response || this.options.dictResponseError.replace("{{statusCode}}", xhr.status), xhr);
            }
        },
        {
            key: "submitRequest",
            value: function submitRequest(xhr, formData, files) {
                if (xhr.readyState != 1) {
                    console.warn("Cannot send this request because the XMLHttpRequest.readyState is not OPENED.");
                    return;
                }
                if (this.options.binaryBody) {
                    if (files[0].upload.chunked) {
                        var chunk = this._getChunk(files[0], xhr);
                        xhr.send(chunk.dataBlock.data);
                    } else xhr.send(files[0]);
                } else xhr.send(formData);
            }
        },
        {
            // Called internally when processing is finished.
            // Individual callbacks have to be called in the appropriate sections.
            key: "_finished",
            value: function _finished(files, responseText, e) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var file = _step.value;
                        file.status = $a601ff30f483e917$export$2e2bcd8739ae039.SUCCESS;
                        this.emit("success", file, responseText, e);
                        this.emit("complete", file);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                if (this.options.uploadMultiple) {
                    this.emit("successmultiple", files, responseText, e);
                    this.emit("completemultiple", files);
                }
                if (this.options.autoProcessQueue) return this.processQueue();
            }
        },
        {
            // Called internally when processing is finished.
            // Individual callbacks have to be called in the appropriate sections.
            key: "_errorProcessing",
            value: function _errorProcessing(files, message, xhr) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var file = _step.value;
                        file.status = $a601ff30f483e917$export$2e2bcd8739ae039.ERROR;
                        this.emit("error", file, message, xhr);
                        this.emit("complete", file);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                if (this.options.uploadMultiple) {
                    this.emit("errormultiple", files, message, xhr);
                    this.emit("completemultiple", files);
                }
                if (this.options.autoProcessQueue) return this.processQueue();
            }
        }
    ], [
        {
            key: "initClass",
            value: function initClass() {
                // Exposing the emitter class, mainly for tests
                this.prototype.Emitter = $b1d17cfb1d15c36a$export$2e2bcd8739ae039;
                /*
     This is a list of all available events you can register on a dropzone object.

     You can register an event handler like this:

     dropzone.on("dragEnter", function() { });

     */ this.prototype.events = [
                    "drop",
                    "dragstart",
                    "dragend",
                    "dragenter",
                    "dragover",
                    "dragleave",
                    "addedfile",
                    "addedfiles",
                    "removedfile",
                    "thumbnail",
                    "error",
                    "errormultiple",
                    "processing",
                    "processingmultiple",
                    "uploadprogress",
                    "totaluploadprogress",
                    "sending",
                    "sendingmultiple",
                    "success",
                    "successmultiple",
                    "canceled",
                    "canceledmultiple",
                    "complete",
                    "completemultiple",
                    "reset",
                    "maxfilesexceeded",
                    "maxfilesreached",
                    "queuecomplete", 
                ];
                this.prototype._thumbnailQueue = [];
                this.prototype._processingThumbnail = false;
            }
        },
        {
            key: "uuidv4",
            value: function uuidv4() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
                    var r = Math.random() * 16 | 0, v = c === "x" ? r : r & 3 | 8;
                    return v.toString(16);
                });
            }
        }
    ]);
    return $a601ff30f483e917$export$2e2bcd8739ae039;
}($b1d17cfb1d15c36a$export$2e2bcd8739ae039);
$a601ff30f483e917$export$2e2bcd8739ae039.initClass();
// This is a map of options for your different dropzones. Add configurations
// to this object for your different dropzone elemens.
//
// Example:
//
//     Dropzone.options.myDropzoneElementId = { maxFilesize: 1 };
//
// And in html:
//
//     <form action="/upload" id="my-dropzone-element-id" class="dropzone"></form>
$a601ff30f483e917$export$2e2bcd8739ae039.options = {
};
// Returns the options for an element or undefined if none available.
$a601ff30f483e917$export$2e2bcd8739ae039.optionsForElement = function(element) {
    // Get the `Dropzone.options.elementId` for this element if it exists
    if (element.getAttribute("id")) return $a601ff30f483e917$export$2e2bcd8739ae039.options[$a601ff30f483e917$var$camelize(element.getAttribute("id"))];
    else return undefined;
};
// Holds a list of all dropzone instances
$a601ff30f483e917$export$2e2bcd8739ae039.instances = [];
// Returns the dropzone for given element if any
$a601ff30f483e917$export$2e2bcd8739ae039.forElement = function(element) {
    if (typeof element === "string") element = document.querySelector(element);
    if ((element != null ? element.dropzone : undefined) == null) throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
    return element.dropzone;
};
// Looks for all .dropzone elements and creates a dropzone for them
$a601ff30f483e917$export$2e2bcd8739ae039.discover = function() {
    var dropzones;
    if (document.querySelectorAll) dropzones = document.querySelectorAll(".dropzone");
    else {
        dropzones = [];
        // IE :(
        var checkElements = function(elements) {
            return (function() {
                var result = [];
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var el = _step.value;
                        if (/(^| )dropzone($| )/.test(el.className)) result.push(dropzones.push(el));
                        else result.push(undefined);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return result;
            })();
        };
        checkElements(document.getElementsByTagName("div"));
        checkElements(document.getElementsByTagName("form"));
    }
    return (function() {
        var result = [];
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = dropzones[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var dropzone = _step.value;
                // Create a dropzone unless auto discover has been disabled for specific element
                if ($a601ff30f483e917$export$2e2bcd8739ae039.optionsForElement(dropzone) !== false) result.push(new $a601ff30f483e917$export$2e2bcd8739ae039(dropzone));
                else result.push(undefined);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        return result;
    })();
};
// Some browsers support drag and drog functionality, but not correctly.
//
// So I created a blocklist of userAgents. Yes, yes. Browser sniffing, I know.
// But what to do when browsers *theoretically* support an API, but crash
// when using it.
//
// This is a list of regular expressions tested against navigator.userAgent
//
// ** It should only be used on browser that *do* support the API, but
// incorrectly **
$a601ff30f483e917$export$2e2bcd8739ae039.blockedBrowsers = [
    // The mac os and windows phone version of opera 12 seems to have a problem with the File drag'n'drop API.
    /opera.*(Macintosh|Windows Phone).*version\/12/i, 
];
// Checks if the browser is supported
$a601ff30f483e917$export$2e2bcd8739ae039.isBrowserSupported = function() {
    var capableBrowser = true;
    if (window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector) {
        if (!("classList" in document.createElement("a"))) capableBrowser = false;
        else {
            if ($a601ff30f483e917$export$2e2bcd8739ae039.blacklistedBrowsers !== undefined) // Since this has been renamed, this makes sure we don't break older
            // configuration.
            $a601ff30f483e917$export$2e2bcd8739ae039.blockedBrowsers = $a601ff30f483e917$export$2e2bcd8739ae039.blacklistedBrowsers;
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                // The browser supports the API, but may be blocked.
                for(var _iterator = $a601ff30f483e917$export$2e2bcd8739ae039.blockedBrowsers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var regex = _step.value;
                    if (regex.test(navigator.userAgent)) {
                        capableBrowser = false;
                        continue;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                    }
                } finally{
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    } else capableBrowser = false;
    return capableBrowser;
};
$a601ff30f483e917$export$2e2bcd8739ae039.dataURItoBlob = function(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(",")[1]);
    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for(var i = 0, end = byteString.length, asc = 0 <= end; asc ? i <= end : i >= end; asc ? i++ : i--)ia[i] = byteString.charCodeAt(i);
    // write the ArrayBuffer to a blob
    return new Blob([
        ab
    ], {
        type: mimeString
    });
};
// Returns an array without the rejected item
var $a601ff30f483e917$var$without = function(list, rejectedItem) {
    return list.filter(function(item) {
        return item !== rejectedItem;
    }).map(function(item) {
        return item;
    });
};
// abc-def_ghi -> abcDefGhi
var $a601ff30f483e917$var$camelize = function(str) {
    return str.replace(/[\-_](\w)/g, function(match) {
        return match.charAt(1).toUpperCase();
    });
};
// Creates an element from string
$a601ff30f483e917$export$2e2bcd8739ae039.createElement = function(string) {
    var div = document.createElement("div");
    div.innerHTML = string;
    return div.childNodes[0];
};
// Tests if given element is inside (or simply is) the container
$a601ff30f483e917$export$2e2bcd8739ae039.elementInside = function(element, container) {
    if (element === container) return true;
     // Coffeescript doesn't support do/while loops
    while(element = element.parentNode){
        if (element === container) return true;
    }
    return false;
};
$a601ff30f483e917$export$2e2bcd8739ae039.getElement = function(el, name) {
    var element;
    if (typeof el === "string") element = document.querySelector(el);
    else if (el.nodeType != null) element = el;
    if (element == null) throw new Error("Invalid `".concat(name, "` option provided. Please provide a CSS selector or a plain HTML element."));
    return element;
};
$a601ff30f483e917$export$2e2bcd8739ae039.getElements = function(els, name) {
    var el, elements;
    if (els instanceof Array) {
        elements = [];
        try {
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                for(var _iterator = els[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    el = _step.value;
                    elements.push(this.getElement(el, name));
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                    }
                } finally{
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        } catch (e) {
            elements = null;
        }
    } else if (typeof els === "string") {
        elements = [];
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = document.querySelectorAll(els)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                el = _step.value;
                elements.push(el);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    } else if (els.nodeType != null) elements = [
        els
    ];
    if (elements == null || !elements.length) throw new Error("Invalid `".concat(name, "` option provided. Please provide a CSS selector, a plain HTML element or a list of those."));
    return elements;
};
// Asks the user the question and calls accepted or rejected accordingly
//
// The default implementation just uses `window.confirm` and then calls the
// appropriate callback.
$a601ff30f483e917$export$2e2bcd8739ae039.confirm = function(question, accepted, rejected) {
    if (window.confirm(question)) return accepted();
    else if (rejected != null) return rejected();
};
// Validates the mime type like this:
//
// https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept
$a601ff30f483e917$export$2e2bcd8739ae039.isValidFile = function(file, acceptedFiles) {
    if (!acceptedFiles) return true;
     // If there are no accepted mime types, it's OK
    acceptedFiles = acceptedFiles.split(",");
    var mimeType = file.type;
    var baseMimeType = mimeType.replace(/\/.*$/, "");
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = acceptedFiles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var validType = _step.value;
            validType = validType.trim();
            if (validType.charAt(0) === ".") {
                if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) return true;
            } else if (/\/\*$/.test(validType)) {
                // This is something like a image/* mime type
                if (baseMimeType === validType.replace(/\/.*$/, "")) return true;
            } else {
                if (mimeType === validType) return true;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    return false;
};
// Augment jQuery
if (typeof jQuery !== "undefined" && jQuery !== null) jQuery.fn.dropzone = function(options) {
    return this.each(function() {
        return new $a601ff30f483e917$export$2e2bcd8739ae039(this, options);
    });
};
// Dropzone file status codes
$a601ff30f483e917$export$2e2bcd8739ae039.ADDED = "added";
$a601ff30f483e917$export$2e2bcd8739ae039.QUEUED = "queued";
// For backwards compatibility. Now, if a file is accepted, it's either queued
// or uploading.
$a601ff30f483e917$export$2e2bcd8739ae039.ACCEPTED = $a601ff30f483e917$export$2e2bcd8739ae039.QUEUED;
$a601ff30f483e917$export$2e2bcd8739ae039.UPLOADING = "uploading";
$a601ff30f483e917$export$2e2bcd8739ae039.PROCESSING = $a601ff30f483e917$export$2e2bcd8739ae039.UPLOADING; // alias
$a601ff30f483e917$export$2e2bcd8739ae039.CANCELED = "canceled";
$a601ff30f483e917$export$2e2bcd8739ae039.ERROR = "error";
$a601ff30f483e917$export$2e2bcd8739ae039.SUCCESS = "success";
/*

 Bugfix for iOS 6 and 7
 Source: http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios
 based on the work of https://github.com/stomita/ios-imagefile-megapixel

 */ // Detecting vertical squash in loaded image.
// Fixes a bug which squash image vertically while drawing into canvas for some images.
// This is a bug in iOS6 devices. This function from https://github.com/stomita/ios-imagefile-megapixel
var $a601ff30f483e917$var$detectVerticalSquash = function $a601ff30f483e917$var$detectVerticalSquash(img) {
    var iw = img.naturalWidth;
    var ih = img.naturalHeight;
    var canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = ih;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var ref = ctx.getImageData(1, 0, 1, ih), data = ref.data;
    // search image edge pixel position in case it is squashed vertically.
    var sy = 0;
    var ey = ih;
    var py = ih;
    while(py > sy){
        var alpha = data[(py - 1) * 4 + 3];
        if (alpha === 0) ey = py;
        else sy = py;
        py = ey + sy >> 1;
    }
    var ratio = py / ih;
    if (ratio === 0) return 1;
    else return ratio;
};
// A replacement for context.drawImage
// (args are for source and destination).
var $a601ff30f483e917$var$drawImageIOSFix = function $a601ff30f483e917$var$drawImageIOSFix(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
    var vertSquashRatio = $a601ff30f483e917$var$detectVerticalSquash(img);
    return ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
};
var $a601ff30f483e917$var$ExifRestore = // Based on MinifyJpeg
// Source: http://www.perry.cz/files/ExifRestorer.js
// http://elicon.blog57.fc2.com/blog-entry-206.html
/*#__PURE__*/ function() {
    "use strict";
    function $a601ff30f483e917$var$ExifRestore() {
        $6mU8w$swchelpers.classCallCheck(this, $a601ff30f483e917$var$ExifRestore);
    }
    $6mU8w$swchelpers.createClass($a601ff30f483e917$var$ExifRestore, null, [
        {
            key: "initClass",
            value: function initClass() {
                this.KEY_STR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            }
        },
        {
            key: "encode64",
            value: function encode64(input) {
                var output = "";
                var chr1 = undefined;
                var chr2 = undefined;
                var chr3 = "";
                var enc1 = undefined;
                var enc2 = undefined;
                var enc3 = undefined;
                var enc4 = "";
                var i = 0;
                while(true){
                    chr1 = input[i++];
                    chr2 = input[i++];
                    chr3 = input[i++];
                    enc1 = chr1 >> 2;
                    enc2 = (chr1 & 3) << 4 | chr2 >> 4;
                    enc3 = (chr2 & 15) << 2 | chr3 >> 6;
                    enc4 = chr3 & 63;
                    if (isNaN(chr2)) enc3 = enc4 = 64;
                    else if (isNaN(chr3)) enc4 = 64;
                    output = output + this.KEY_STR.charAt(enc1) + this.KEY_STR.charAt(enc2) + this.KEY_STR.charAt(enc3) + this.KEY_STR.charAt(enc4);
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                    if (!(i < input.length)) break;
                }
                return output;
            }
        },
        {
            key: "restore",
            value: function restore(origFileBase64, resizedFileBase64) {
                if (!origFileBase64.match("data:image/jpeg;base64,")) return resizedFileBase64;
                var rawImage = this.decode64(origFileBase64.replace("data:image/jpeg;base64,", ""));
                var segments = this.slice2Segments(rawImage);
                var image = this.exifManipulation(resizedFileBase64, segments);
                return "data:image/jpeg;base64,".concat(this.encode64(image));
            }
        },
        {
            key: "exifManipulation",
            value: function exifManipulation(resizedFileBase64, segments) {
                var exifArray = this.getExifArray(segments);
                var newImageArray = this.insertExif(resizedFileBase64, exifArray);
                var aBuffer = new Uint8Array(newImageArray);
                return aBuffer;
            }
        },
        {
            key: "getExifArray",
            value: function getExifArray(segments) {
                var seg = undefined;
                var x = 0;
                while(x < segments.length){
                    seg = segments[x];
                    if (seg[0] === 255 & seg[1] === 225) return seg;
                    x++;
                }
                return [];
            }
        },
        {
            key: "insertExif",
            value: function insertExif(resizedFileBase64, exifArray) {
                var imageData = resizedFileBase64.replace("data:image/jpeg;base64,", "");
                var buf = this.decode64(imageData);
                var separatePoint = buf.indexOf(255, 3);
                var mae = buf.slice(0, separatePoint);
                var ato = buf.slice(separatePoint);
                var array = mae;
                array = array.concat(exifArray);
                array = array.concat(ato);
                return array;
            }
        },
        {
            key: "slice2Segments",
            value: function slice2Segments(rawImageArray) {
                var head = 0;
                var segments = [];
                while(true){
                    var length;
                    if (rawImageArray[head] === 255 & rawImageArray[head + 1] === 218) break;
                    if (rawImageArray[head] === 255 & rawImageArray[head + 1] === 216) head += 2;
                    else {
                        length = rawImageArray[head + 2] * 256 + rawImageArray[head + 3];
                        var endPoint = head + length + 2;
                        var seg = rawImageArray.slice(head, endPoint);
                        segments.push(seg);
                        head = endPoint;
                    }
                    if (head > rawImageArray.length) break;
                }
                return segments;
            }
        },
        {
            key: "decode64",
            value: function decode64(input) {
                var output = "";
                var chr1 = undefined;
                var chr2 = undefined;
                var chr3 = "";
                var enc1 = undefined;
                var enc2 = undefined;
                var enc3 = undefined;
                var enc4 = "";
                var i = 0;
                var buf = [];
                // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                var base64test = /[^A-Za-z0-9\+\/\=]/g;
                if (base64test.exec(input)) console.warn("There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\nExpect errors in decoding.");
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                while(true){
                    enc1 = this.KEY_STR.indexOf(input.charAt(i++));
                    enc2 = this.KEY_STR.indexOf(input.charAt(i++));
                    enc3 = this.KEY_STR.indexOf(input.charAt(i++));
                    enc4 = this.KEY_STR.indexOf(input.charAt(i++));
                    chr1 = enc1 << 2 | enc2 >> 4;
                    chr2 = (enc2 & 15) << 4 | enc3 >> 2;
                    chr3 = (enc3 & 3) << 6 | enc4;
                    buf.push(chr1);
                    if (enc3 !== 64) buf.push(chr2);
                    if (enc4 !== 64) buf.push(chr3);
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                    if (!(i < input.length)) break;
                }
                return buf;
            }
        }
    ]);
    return $a601ff30f483e917$var$ExifRestore;
}();
$a601ff30f483e917$var$ExifRestore.initClass();
/*
 * contentloaded.js
 *
 * Author: Diego Perini (diego.perini at gmail.com)
 * Summary: cross-browser wrapper for DOMContentLoaded
 * Updated: 20101020
 * License: MIT
 * Version: 1.2
 *
 * URL:
 * http://javascript.nwbox.com/ContentLoaded/
 * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
 */ // @win window reference
// @fn function reference
var $a601ff30f483e917$var$contentLoaded = function $a601ff30f483e917$var$contentLoaded(win, fn) {
    var done = false;
    var top = true;
    var doc = win.document;
    var root = doc.documentElement;
    var add = doc.addEventListener ? "addEventListener" : "attachEvent";
    var rem = doc.addEventListener ? "removeEventListener" : "detachEvent";
    var pre = doc.addEventListener ? "" : "on";
    var init = function(e) {
        if (e.type === "readystatechange" && doc.readyState !== "complete") return;
        (e.type === "load" ? win : doc)[rem](pre + e.type, init, false);
        if (!done && (done = true)) return fn.call(win, e.type || e);
    };
    var poll = function() {
        try {
            root.doScroll("left");
        } catch (e) {
            setTimeout(poll, 50);
            return;
        }
        return init("poll");
    };
    if (doc.readyState !== "complete") {
        if (doc.createEventObject && root.doScroll) {
            try {
                top = !win.frameElement;
            } catch (error) {
            }
            if (top) poll();
        }
        doc[add](pre + "DOMContentLoaded", init, false);
        doc[add](pre + "readystatechange", init, false);
        return win[add](pre + "load", init, false);
    }
};
function $a601ff30f483e917$var$__guard__(value, transform) {
    return typeof value !== "undefined" && value !== null ? transform(value) : undefined;
}
function $a601ff30f483e917$var$__guardMethod__(obj, methodName, transform) {
    if (typeof obj !== "undefined" && obj !== null && typeof obj[methodName] === "function") return transform(obj, methodName);
    else return undefined;
}


//# sourceMappingURL=dropzone.js.map
