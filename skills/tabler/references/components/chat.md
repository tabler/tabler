# Chat

Based on `/preview/pages/chat.html` in this repository.

## Base structure

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Chat with John Doe</h3>
  </div>
  <div class="card-body p-0">
    <div class="chat">
      <div class="chat-messages" id="chat-messages">
        <!-- Messages will be rendered here -->
      </div>
    </div>
  </div>
  <div class="card-footer">
    <div class="input-group">
      <input type="text" class="form-control" placeholder="Type a message..." id="message-input">
      <button class="btn btn-primary" type="button" id="send-btn">
        <svg class="icon"><use xlink:href="#icon-send"/></svg>
      </button>
    </div>
  </div>
</div>
```

## Message types

### Incoming message

```html
<div class="chat-message chat-message-in">
  <div class="row">
    <div class="col-auto">
      <span class="avatar" style="background-image: url(...)"></span>
    </div>
    <div class="col">
      <div class="chat-message-body">
        <div class="chat-message-text">Hello! How are you?</div>
        <div class="chat-message-meta">
          <span class="chat-message-time">10:30 AM</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Outgoing message

```html
<div class="chat-message chat-message-out">
  <div class="row">
    <div class="col">
      <div class="chat-message-body">
        <div class="chat-message-text">I'm doing great, thanks!</div>
        <div class="chat-message-meta">
          <span class="chat-message-time">10:32 AM</span>
          <span class="chat-message-status">
            <svg class="icon text-success"><use xlink:href="#icon-check"/></svg>
          </span>
        </div>
      </div>
    </div>
    <div class="col-auto">
      <span class="avatar">ME</span>
    </div>
  </div>
</div>
```

### System message

```html
<div class="chat-message chat-message-system">
  <div class="chat-message-body text-center">
    <span class="text-secondary">John Doe joined the conversation</span>
  </div>
</div>
```

## Messages with attachments

### Image

```html
<div class="chat-message chat-message-in">
  <div class="row">
    <div class="col-auto">
      <span class="avatar" style="background-image: url(...)"></span>
    </div>
    <div class="col">
      <div class="chat-message-body">
        <div class="chat-message-text">Check out this photo!</div>
        <div class="chat-message-attachment mt-2">
          <img src="photo.jpg" class="img-fluid rounded" alt="Photo" style="max-width: 300px;">
        </div>
        <div class="chat-message-meta">
          <span class="chat-message-time">10:35 AM</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

### File

```html
<div class="chat-message chat-message-in">
  <div class="row">
    <div class="col-auto">
      <span class="avatar" style="background-image: url(...)"></span>
    </div>
    <div class="col">
      <div class="chat-message-body">
        <div class="chat-message-attachment">
          <div class="card">
            <div class="card-body d-flex align-items-center">
              <svg class="icon icon-lg text-secondary me-3"><use xlink:href="#icon-file"/></svg>
              <div>
                <div class="font-weight-medium">document.pdf</div>
                <div class="text-secondary">2.4 MB</div>
              </div>
              <a href="#" class="btn btn-icon btn-sm ms-auto">
                <svg class="icon"><use xlink:href="#icon-download"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div class="chat-message-meta">
          <span class="chat-message-time">10:40 AM</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Complete chat layout

```html
<div class="row g-0">
  <!-- Chat list sidebar -->
  <div class="col-md-4 col-lg-3 border-end">
    <div class="card card-flush">
      <div class="card-header">
        <h3 class="card-title">Messages</h3>
      </div>
      <div class="list-group list-group-flush overflow-auto" style="max-height: 600px;">
        <a href="#" class="list-group-item list-group-item-action active">
          <div class="row align-items-center">
            <div class="col-auto">
              <span class="avatar" style="background-image: url(...)"></span>
            </div>
            <div class="col text-truncate">
              <div class="font-weight-medium">John Doe</div>
              <div class="text-secondary text-truncate">Hey, how's it going?</div>
            </div>
            <div class="col-auto">
              <span class="badge bg-primary">2</span>
            </div>
          </div>
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <div class="row align-items-center">
            <div class="col-auto">
              <span class="avatar">JL</span>
            </div>
            <div class="col text-truncate">
              <div class="font-weight-medium">Jane Lee</div>
              <div class="text-secondary text-truncate">Thanks!</div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
  
  <!-- Chat conversation -->
  <div class="col-md-8 col-lg-9">
    <div class="card d-flex flex-column" style="height: 600px;">
      <div class="card-header">
        <div class="d-flex align-items-center">
          <span class="avatar me-3" style="background-image: url(...)"></span>
          <div>
            <div class="font-weight-medium">John Doe</div>
            <div class="text-secondary small">Online</div>
          </div>
        </div>
      </div>
      <div class="card-body scrollable" id="chat-container">
        <div class="chat-messages">
          <div class="chat-message chat-message-in">
            <div class="row">
              <div class="col-auto">
                <span class="avatar" style="background-image: url(...)"></span>
              </div>
              <div class="col">
                <div class="chat-message-body">
                  <div class="chat-message-text">Hi there!</div>
                  <div class="chat-message-meta">
                    <span class="chat-message-time">10:30 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="chat-message chat-message-out">
            <div class="row">
              <div class="col">
                <div class="chat-message-body">
                  <div class="chat-message-text">Hello! How can I help you?</div>
                  <div class="chat-message-meta">
                    <span class="chat-message-time">10:31 AM</span>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <span class="avatar">ME</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="input-group">
          <button class="btn btn-icon" type="button" title="Attach file">
            <svg class="icon"><use xlink:href="#icon-paperclip"/></svg>
          </button>
          <input type="text" class="form-control" placeholder="Type a message...">
          <button class="btn btn-primary" type="button">
            <svg class="icon"><use xlink:href="#icon-send"/></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
```

## JavaScript for dynamic messages

```javascript
function addMessage(text, type = 'out') {
  var container = document.querySelector('.chat-messages');
  var time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  var messageHtml = '';
  if (type === 'out') {
    messageHtml = `
      <div class="chat-message chat-message-out">
        <div class="row">
          <div class="col">
            <div class="chat-message-body">
              <div class="chat-message-text">${escapeHtml(text)}</div>
              <div class="chat-message-meta">
                <span class="chat-message-time">${time}</span>
              </div>
            </div>
          </div>
          <div class="col-auto">
            <span class="avatar">ME</span>
          </div>
        </div>
      </div>
    `;
  } else {
    messageHtml = `
      <div class="chat-message chat-message-in">
        <div class="row">
          <div class="col-auto">
            <span class="avatar" style="background-image: url(...)"></span>
          </div>
          <div class="col">
            <div class="chat-message-body">
              <div class="chat-message-text">${escapeHtml(text)}</div>
              <div class="chat-message-meta">
                <span class="chat-message-time">${time}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  container.insertAdjacentHTML('beforeend', messageHtml);
  container.scrollTop = container.scrollHeight;
}

function escapeHtml(text) {
  var div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Handle send
document.getElementById('send-btn').addEventListener('click', function() {
  var input = document.getElementById('message-input');
  var text = input.value.trim();
  if (text) {
    addMessage(text, 'out');
    input.value = '';
  }
});

// Handle enter key
document.getElementById('message-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    document.getElementById('send-btn').click();
  }
});
```

## Classes

| Class | Purpose |
|-------|-----------|
| `chat` | Chat container |
| `chat-messages` | Messages wrapper |
| `chat-message` | Single message |
| `chat-message-in` | Incoming message |
| `chat-message-out` | Outgoing message |
| `chat-message-system` | System message |
| `chat-message-body` | Message content |
| `chat-message-text` | Message text |
| `chat-message-meta` | Metadata wrapper |
| `chat-message-time` | Timestamp |
| `chat-message-status` | Delivery status |
| `chat-message-attachment` | File/image attachment |
