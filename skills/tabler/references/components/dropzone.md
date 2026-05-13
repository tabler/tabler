# Dropzone (File Upload)

Based on `/preview/pages/dropzone.html` in this repository.

Dropzone.js is a lightweight open source library that provides drag-and-drop file uploads with image previews.

## Base structure

```html
<form class="dropzone" id="dropzone-default" action="./" autocomplete="off" novalidate>
  <div class="fallback">
    <input name="file" type="file" />
  </div>
</form>
```

## With custom preview

```html
<form class="dropzone" id="dropzone-custom" action="./" autocomplete="off" novalidate>
  <div class="dz-message">
    <svg class="icon icon-7x"><use xlink:href="#icon-upload"/></svg>
    <h3 class="mt-4">Drop files here to upload</h3>
    <span class="text-secondary">or click to browse</span>
  </div>
</form>
```

## Multiple files

```html
<form class="dropzone" id="dropzone-multiple" action="./" autocomplete="off" novalidate>
  <div class="fallback">
    <input name="file" type="file" multiple />
  </div>
</form>
```

## With remove links

```html
<form class="dropzone dz-clickable" id="dropzone-removal" action="./" autocomplete="off" novalidate>
  <div class="dz-message">
    <h3>Drop files here or click to upload</h3>
  </div>
</form>
```

```javascript
// Initialize with remove links
new Dropzone("#dropzone-removal", {
  addRemoveLinks: true,
  dictRemoveFile: "Remove file"
});
```

## Single file upload

```html
<form class="dropzone" id="dropzone-single" action="./" autocomplete="off" novalidate>
  <div class="fallback">
    <input name="file" type="file" />
  </div>
</form>
```

```javascript
// Initialize for single file
new Dropzone("#dropzone-single", {
  maxFiles: 1
});
```

## Inside a card

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Upload Files</h3>
  </div>
  <div class="card-body">
    <form class="dropzone" id="dropzone-card" action="./" autocomplete="off" novalidate>
      <div class="fallback">
        <input name="file" type="file" multiple />
      </div>
    </form>
  </div>
</div>
```

## JavaScript initialization

```javascript
document.addEventListener("DOMContentLoaded", function () {
  new Dropzone("#dropzone-default", {
    url: "/upload",           // Upload endpoint
    paramName: "file",        // Name of the file param
    maxFilesize: 2,           // MB
    maxFiles: 10,             // Maximum number of files
    acceptedFiles: "image/*", // Accept only images
    addRemoveLinks: true,     // Show remove links
    dictDefaultMessage: "Drop files here to upload",
    dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
    dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
    dictInvalidFileType: "You can't upload files of this type.",
    dictResponseError: "Server responded with {{statusCode}} code.",
    dictCancelUpload: "Cancel upload",
    dictUploadCanceled: "Upload canceled.",
    dictRemoveFile: "Remove file",
    dictMaxFilesExceeded: "You can not upload any more files.",
    
    // Events
    init: function() {
      this.on("success", function(file, response) {
        console.log("File uploaded:", response);
      });
      this.on("error", function(file, errorMessage) {
        console.error("Upload error:", errorMessage);
      });
      this.on("removedfile", function(file) {
        console.log("File removed:", file.name);
      });
    }
  });
});
```

## Required libraries

Add these to your page:

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/dropzone@6.0.0-beta.2/dist/dropzone.css">

<!-- JS -->
<script src="https://cdn.jsdelivr.net/npm/dropzone@6.0.0-beta.2/dist/dropzone-min.js"></script>
```

Or install via npm:
```bash
npm install dropzone
```

## Common options

| Option | Type | Description |
|--------|------|-------------|
| `url` | String | Upload URL endpoint |
| `paramName` | String | Name used to transfer the file |
| `maxFilesize` | Number | Maximum file size in MB |
| `maxFiles` | Number | Maximum number of files |
| `acceptedFiles` | String | Accepted MIME types (e.g., "image/*,.pdf") |
| `addRemoveLinks` | Boolean | Add links to remove files |
| `autoProcessQueue` | Boolean | Auto upload or manual trigger |
| `parallelUploads` | Number | Number of parallel uploads |
| `thumbnailWidth/Height` | Number | Thumbnail dimensions |

## Styling classes

| Class | Purpose |
|-------|-----------|
| `dropzone` | Base container |
| `dz-message` | Message shown when empty |
| `dz-clickable` | Clickable area |
| `dz-started` | Class added when files are present |
| `dz-drag-hover` | Class added on drag hover |
| `dz-preview` | File preview container |
| `dz-image` | Image preview |
| `dz-details` | File details (name, size) |
| `dz-progress` | Upload progress bar |
| `dz-success` | Success state |
| `dz-error` | Error state |
| `dz-remove` | Remove button |
