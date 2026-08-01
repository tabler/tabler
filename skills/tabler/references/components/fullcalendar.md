# FullCalendar

Based on `/preview/pages/fullcalendar.html` in this repository.

FullCalendar is a full-sized drag-and-drop JavaScript event calendar.

## Base structure

```html
<div class="card">
  <div class="card-body">
    <div id="calendar"></div>
  </div>
</div>
```

## JavaScript initialization

```javascript
document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  
  var calendar = new FullCalendar.Calendar(calendarEl, {
    // Basic configuration
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    
    // Events
    events: [
      {
        title: 'All Day Event',
        start: '2024-01-01'
      },
      {
        title: 'Long Event',
        start: '2024-01-07',
        end: '2024-01-10'
      },
      {
        title: 'Meeting',
        start: '2024-01-12T10:30:00',
        end: '2024-01-12T12:30:00'
      }
    ],
    
    // Options
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    
    // Callbacks
    select: function(arg) {
      var title = prompt('Event Title:');
      if (title) {
        calendar.addEvent({
          title: title,
          start: arg.start,
          end: arg.end,
          allDay: arg.allDay
        });
      }
      calendar.unselect();
    },
    
    eventClick: function(arg) {
      if (confirm('Delete this event?')) {
        arg.event.remove();
      }
    }
  });
  
  calendar.render();
});
```

## With sidebar

```html
<div class="row">
  <div class="col-md-9">
    <div class="card">
      <div class="card-body">
        <div id="calendar"></div>
      </div>
    </div>
  </div>
  <div class="col-md-3">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Draggable Events</h3>
      </div>
      <div class="card-body">
        <div id="external-events">
          <div class="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event bg-primary">
            <div class="fc-event-main">Meeting</div>
          </div>
          <div class="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event bg-warning">
            <div class="fc-event-main">Lunch</div>
          </div>
          <div class="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event bg-success">
            <div class="fc-event-main">Report</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

```javascript
// Draggable events
var containerEl = document.getElementById('external-events');
new FullCalendar.Draggable(containerEl, {
  itemSelector: '.fc-event',
  eventData: function(eventEl) {
    return {
      title: eventEl.innerText,
      color: window.getComputedStyle(eventEl).backgroundColor
    };
  }
});
```

## Required libraries

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/main.min.css">

<!-- JS -->
<script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.js'></script>
```

Or install via npm:
```bash
npm install fullcalendar
```

## Available views

| View | Description |
|------|-------------|
| `dayGridMonth` | Month view (default) |
| `dayGridWeek` | Week view (day grid) |
| `dayGridDay` | Day view (day grid) |
| `timeGridWeek` | Week view with time slots |
| `timeGridDay` | Day view with time slots |
| `listWeek` | List view for a week |
| `listMonth` | List view for a month |

## Common options

| Option | Type | Description |
|--------|------|-------------|
| `initialView` | String | Default view |
| `headerToolbar` | Object | Header buttons configuration |
| `events` | Array/URL | Event data source |
| `editable` | Boolean | Allow drag and drop |
| `selectable` | Boolean | Allow date selection |
| `selectMirror` | Boolean | Mirror selection visually |
| `dayMaxEvents` | Boolean/Number | Limit visible events per day |
| `weekends` | Boolean | Show weekends |
| `hiddenDays` | Array | Hide specific days [0,6] for Sun,Sat |
| `businessHours` | Object/Array | Highlight business hours |
| `slotDuration` | String | Time slot duration ('00:30:00') |
| `snapDuration` | String | Drag snap duration |
| `scrollTime` | String | Initial scroll time ('08:00:00') |

## Event object

```javascript
{
  id: '1',                    // Unique ID
  title: 'Event Title',       // Display title
  start: '2024-01-01',        // Start date/time (ISO8601)
  end: '2024-01-02',          // End date/time
  allDay: true,               // All day event
  color: '#3788d8',           // Background color
  textColor: '#ffffff',       // Text color
  className: 'custom-class',  // CSS classes
  editable: true,             // Allow editing
  startEditable: true,        // Allow resize/move
  durationEditable: true,     // Allow duration change
  resourceId: 'a',            // Resource ID (for resource views)
  extendedProps: {            // Custom properties
    description: 'Details...'
  }
}
```

## Callbacks

| Callback | Description |
|----------|-------------|
| `select` | Date/time selection |
| `eventClick` | Event clicked |
| `eventDrop` | Event dragged and dropped |
| `eventResize` | Event resized |
| `eventAdd` | New event added |
| `eventChange` | Event modified |
| `eventRemove` | Event removed |
| `dateClick` | Empty date clicked |
| `loading` | Loading state change |
| `viewDidMount` | View rendered |

## Methods

```javascript
// API methods
calendar.prev();              // Go to previous
calendar.next();              // Go to next
calendar.today();             // Go to today
calendar.gotoDate('2024-01-15'); // Go to specific date
calendar.changeView('timeGridWeek'); // Change view
calendar.addEvent({...});     // Add event
calendar.getEventById('1');   // Get event
calendar.removeAllEvents();   // Remove all
calendar.refetchEvents();     // Refresh events
calendar.render();            // Re-render
```
