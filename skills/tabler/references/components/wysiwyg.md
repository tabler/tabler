# WYSIWYG Editors (TinyMCE/HugeRTE)

Based on `/preview/pages/wysiwyg.html` in this repository.

Tabler supports WYSIWYG editors like TinyMCE and its fork HugeRTE.

## Base structure

```html
<form>
  <div class="mb-3">
    <label class="form-label">Content</label>
    <textarea id="tinymce-default" class="form-control"></textarea>
  </div>
</form>
```

## JavaScript initialization

### Basic setup

```javascript
document.addEventListener('DOMContentLoaded', function() {
  tinymce.init({
    selector: '#tinymce-default',
    height: 300,
    menubar: false,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
    ],
    toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
    content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 14px }'
  });
});
```

### Full toolbar

```javascript
tinymce.init({
  selector: '#tinymce-full',
  height: 500,
  plugins: [
    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
    'insertdatetime', 'media', 'table', 'help', 'wordcount', 'emoticons',
    'template', 'paste', 'textcolor', 'colorpicker', 'hr', 'pagebreak',
    'nonbreaking', 'save', 'directionality'
  ],
  toolbar1: 'undo redo | formatselect | bold italic strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify | outdent indent',
  toolbar2: 'link image media table | bullist numlist | removeformat | code | help',
  image_advtab: true,
  templates: [
    { title: 'Test template 1', content: 'Test 1' },
    { title: 'Test template 2', content: 'Test 2' }
  ]
});
```

### Inline editing

```html
<div id="tinymce-inline" class="border p-3">
  <h2>Click here to edit...</h2>
  <p>This content is editable inline.</p>
</div>
```

```javascript
tinymce.init({
  selector: '#tinymce-inline',
  inline: true,
  toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist',
  menubar: false
});
```

### With placeholder

```javascript
tinymce.init({
  selector: '#tinymce-placeholder',
  height: 300,
  placeholder: 'Type your content here...',
  plugins: 'link lists',
  toolbar: 'bold italic | link | bullist numlist'
});
```

## Inside a card

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Edit Content</h3>
  </div>
  <div class="card-body">
    <div class="mb-3">
      <label class="form-label">Title</label>
      <input type="text" class="form-control" placeholder="Post title">
    </div>
    <div class="mb-3">
      <label class="form-label">Body</label>
      <textarea id="editor-body" class="form-control" rows="10"></textarea>
    </div>
  </div>
  <div class="card-footer text-end">
    <button type="button" class="btn btn-primary">Save</button>
  </div>
</div>
```

## Required libraries

### TinyMCE

```html
<script src="https://cdn.jsdelivr.net/npm/tinymce@7.5.1/tinymce.min.js"></script>
```

Or via npm:
```bash
npm install tinymce
```

### HugeRTE (fork of TinyMCE, included in Tabler)

```html
<script src="https://cdn.jsdelivr.net/npm/hugerte@1.0.10/hugerte.min.js"></script>
```

Or via npm:
```bash
npm install hugerte
```

## Common plugins

| Plugin | Description |
|--------|-------------|
| `advlist` | Advanced lists |
| `autolink` | Auto-convert URLs to links |
| `lists` | List enhancements |
| `link` | Link dialog |
| `image` | Image dialog |
| `charmap` | Special characters |
| `preview` | Preview content |
| `searchreplace` | Find and replace |
| `visualblocks` | Show block elements |
| `code` | Source code editor |
| `fullscreen` | Fullscreen mode |
| `insertdatetime` | Insert date/time |
| `media` | Embed media |
| `table` | Table editing |
| `wordcount` | Word count |
| `emoticons` | Emojis |
| `template` | Content templates |
| `paste` | Paste handling |
| `textcolor` | Text color picker |
| `colorpicker` | Custom colors |
| `hr` | Horizontal rule |
| `pagebreak` | Page breaks |
| `save` | Save button |
| `directionality` | RTL/LTR text |

## Toolbar options

```javascript
// Available toolbar items
[
  'undo', 'redo', '|',
  'bold', 'italic', 'underline', 'strikethrough', '|',
  'forecolor', 'backcolor', '|',
  'alignleft', 'aligncenter', 'alignright', 'alignjustify', '|',
  'bullist', 'numlist', 'outdent', 'indent', '|',
  'link', 'unlink', 'image', 'media', 'table', '|',
  'removeformat', 'code', 'fullscreen', '|',
  'help'
]
```

## Configuration options

| Option | Description |
|--------|-------------|
| `selector` | Target element(s) |
| `height` | Editor height |
| `menubar` | Show/hide menu bar |
| `plugins` | Active plugins |
| `toolbar` | Toolbar buttons |
| `toolbar1`, `toolbar2` | Multiple toolbars |
| `content_style` | Custom CSS for content |
| `placeholder` | Placeholder text |
| `inline` | Inline editing mode |
| `readonly` | Read-only mode |
| `paste_as_text` | Paste without formatting |
| `branding` | Show/hide TinyMCE logo |
| `promotion` | Show/hide promotion button |
| `license_key` | Commercial license |

## API methods

```javascript
// Get content
var content = tinymce.get('editor-id').getContent();

// Set content
tinymce.get('editor-id').setContent('<p>New content</p>');

// Insert content
tinymce.get('editor-id').insertContent('Inserted text');

// Save
tinymce.get('editor-id').save();

// Destroy
tinymce.get('editor-id').remove();
```

## Styling with Tabler

```javascript
tinymce.init({
  selector: '#editor',
  skin: false,  // Use custom skin
  content_css: false,  // Use custom CSS
  content_style: `
    body {
      font-family: var(--tblr-font-sans-serif);
      font-size: 0.875rem;
      line-height: 1.4285714286;
      color: var(--tblr-body-color);
    }
    a { color: var(--tblr-link-color); }
  `
});
```
