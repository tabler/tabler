---
title: Form Elements
---

### Classic Input

{% example %}
<div class="form-group">
  <label class="form-label">Static</label>
<div class="form-control-plaintext">Username</div>
</div>

<div class="form-group">
  <label class="form-label">Text</label>
  <input type="text" class="form-control" name="example-text-input" placeholder="Text..">
</div>

<div class="form-group">
   <label class="form-label">Disabled</label>
   <input type="text" class="form-control" name="example-disabled-input" placeholder="Disabled.."
          value="Well, she turned me into a newt." disabled>
</div>
<div class="form-group">
   <label class="form-label">Readonly</label>
   <input type="text" class="form-control" name="example-disabled-input" placeholder="Disabled.."
          value="Well, how'd you become king, then?" readonly>
</div>
{% endexample %}

### Password and validation
{% example %}
<div class="form-group">
   <label class="form-label">Password</label>
   <input type="password" class="form-control" name="example-password-input" placeholder="Password..">
</div>

<div class="form-group">
   <label class="form-label">Valid State</label>
   <input type="text" class="form-control is-valid" name="example-text-input-valid"
          placeholder="Valid State..">

   <input type="text" class="form-control mt-3 state-valid" value="Valid state">
</div>

<div class="form-group">
   <label class="form-label">Invalid State</label>
   <input type="text" class="form-control is-invalid" name="example-text-input-invalid"
          placeholder="Invalid State..">
   <div class="invalid-feedback">Invalid feedback</div>

   <input type="text" class="form-control mt-3 state-invalid" value="Invalid state">
</div>
{% endexample %}

### Select
{% example %}
<div class="form-group">
   <label class="form-label">Country</label>
   <select class="form-control custom-select">
      <option value="">Germany</option>
      <option value="">USA</option>
      <option value="">Poland</option>
   </select>
</div>
{% endexample %}

### Textarea
{% example %}
<div class="form-group">
   <label class="form-label">Textarea <span class="float-right text-muted-light">56/100</span></label>
   <textarea class="form-control" name="example-textarea-input" rows="6" placeholder="Content..">Oh! Come and see the violence inherent in the system! Help, help, I'm being repressed! We shall say 'Ni' again to you, if you do not appease us. I'm not a witch. I'm not a witch. Camelot!</textarea>
</div>
{% endexample %}

### Image check
{% example %}
{% include parts/input-image.html %}
{% endexample %}

### Input color
{% example %}
{% include parts/input-color.html %}
{% endexample %}

### Custom Checkbox examples
{% example %}
<div class="form-group">
   <label class="form-label">Icons input</label>
   {% include ui/input-selectgroup.html values="i:smartphone,i:tablet,i:monitor,i:x" class="w-100" type="radio" name="device" %}
</div>

<div class="form-group">
   <label class="form-label">Icon input</label>
   {% include ui/input-selectgroup.html values="i:sun,i:moon,i:cloud-rain,i:cloud,Other" class="selectgroup-pills" %}
</div>

<div class="form-group">
   <label class="form-label">Your skills</label>
   {% include ui/input-selectgroup.html values="HTML,CSS,PHP,JavaScript" class="selectgroup-pills" %}
</div>

<div class="form-group">
   <label class="form-label">Size</label>
   {% include ui/input-selectgroup.html values="S,M,L,XL,XXL" type="radio" name="size" %}
</div>

<div class="form-group">
   <label class="form-label">Shipping methods</label>
   {% include ui/input-selectgroup.html values="Unregistered,Priority Mail,Express Mail" class="selectgroup-vertical" type="radio" name="shipping-method" %}
</div>
{% endexample %}

### Toggle switches
{% example %}
{% include parts/input-toggle.html %}

<div class="form-group">
   <div class="form-label">Toggle switch single</div>
   <label class="custom-control custom-switch">
      <input type="checkbox" class="custom-control-input">
      <div class="custom-control-label">I agree with terms and conditions</div>
   </label>
</div>
{% endexample %}

### Radios
{% example %}
<div class="form-group">
   <div class="form-label">Radios</div>
   <div class="custom-controls-stacked">
      <label class="custom-control custom-radio">
         <input type="radio" class="custom-control-input" name="example-radios" value="option1"
                checked>
         <div class="custom-control-label">Option 1</div>
      </label>
      <label class="custom-control custom-radio">
         <input type="radio" class="custom-control-input" name="example-radios" value="option2">
         <div class="custom-control-label">Option 2</div>
      </label>
      <label class="custom-control custom-radio">
         <input type="radio" class="custom-control-input" name="example-radios" value="option3"
                disabled>
         <div class="custom-control-label">Option Disabled</div>
      </label>
      <label class="custom-control custom-radio">
         <input type="radio" class="custom-control-input" name="example-radios2" value="option4"
                disabled checked>
         <div class="custom-control-label">Option Disabled Checked</div>
      </label>
   </div>
</div>
<div class="form-group">
   <div class="form-label">Inline Radios</div>
   <div class="custom-controls-stacked">
      <label class="custom-control custom-radio custom-control-inline">
         <input type="radio" class="custom-control-input" name="example-inline-radios"
                value="option1" checked>
         <span class="custom-control-label">Option 1</span>
      </label>
      <label class="custom-control custom-radio custom-control-inline">
         <input type="radio" class="custom-control-input" name="example-inline-radios"
                value="option2">
         <span class="custom-control-label">Option 2</span>
      </label>
      <label class="custom-control custom-radio custom-control-inline">
         <input type="radio" class="custom-control-input" name="example-inline-radios"
                value="option3">
         <span class="custom-control-label">Option 3</span>
      </label>
   </div>
</div>
{% endexample %}

### Checkboxes
{% example %}
<div class="form-group">
   <div class="form-label">Checkboxes</div>
   <div class="custom-controls-stacked">
      <label class="custom-control custom-checkbox">
         <input type="checkbox" class="custom-control-input" name="example-checkbox1" value="option1"
                checked>
         <span class="custom-control-label">Option 1</span>
      </label>
      <label class="custom-control custom-checkbox">
         <input type="checkbox" class="custom-control-input" name="example-checkbox2"
                value="option2">
         <span class="custom-control-label">Option 2</span>
      </label>
      <label class="custom-control custom-checkbox">
         <input type="checkbox" class="custom-control-input" name="example-checkbox3" value="option3"
                disabled>
         <span class="custom-control-label">Option Disabled</span>
      </label>
      <label class="custom-control custom-checkbox">
         <input type="checkbox" class="custom-control-input" name="example-checkbox4" value="option4"
                checked disabled>
         <span class="custom-control-label">Option Disabled Checked</span>
      </label>
   </div>
</div>
<div class="form-group">
   <div class="form-label">Inline Checkboxes</div>
   <div>
      <label class="custom-control custom-checkbox custom-control-inline">
         <input type="checkbox" class="custom-control-input" name="example-inline-checkbox1"
                value="option1" checked>
         <span class="custom-control-label">Option 1</span>
      </label>
      <label class="custom-control custom-checkbox custom-control-inline">
         <input type="checkbox" class="custom-control-input" name="example-inline-checkbox2"
                value="option2">
         <span class="custom-control-label">Option 2</span>
      </label>
      <label class="custom-control custom-checkbox custom-control-inline">
         <input type="checkbox" class="custom-control-input" name="example-inline-checkbox3"
                value="option3">
         <span class="custom-control-label">Option 3</span>
      </label>
   </div>
</div>
{% endexample%}

### Ratios
{% example %}
<div class="form-group">
   <label class="form-label">Ratios</label>
   <input type="range" class="custom-range" step="5" min="0" max="50">
</div>
{% endexample %}

### Sample form
{% example %}
<fieldset class="form-fieldset">
	<div class="form-group">
		<label class="form-label">Full name<span class="form-required">*</span></label>
		<input type="text" class="form-control"/>
	</div>
	<div class="form-group">
		<label class="form-label">Company<span class="form-required">*</span></label>
		<input type="text" class="form-control"/>
	</div>
	<div class="form-group">
		<label class="form-label">Email<span class="form-required">*</span></label>
		<input type="email" class="form-control"/>
	</div>
	<div class="form-group mb-0">
		<label class="form-label">Phone number</label>
		<input type="tel" class="form-control"/>
	</div>
</fieldset>
{% endexample %}

### Input group
{% example %}
<div class="form-group">
   <label class="form-label">Input group</label>
   <div class="input-group">
      <input type="text" class="form-control" placeholder="Search for&hellip;">
      <span class="input-group-append">
							<button class="btn btn-primary" type="button">Go!</button>
						</span>
   </div>
</div>
<div class="form-group">
   <label class="form-label">Input group buttons</label>
   <div class="input-group">
      <input type="text" class="form-control">
      <div class="input-group-append">
         <button type="button" class="btn btn-primary">Action</button>
         <button data-toggle="dropdown" type="button"
                 class="btn btn-primary dropdown-toggle"></button>
         <div class="dropdown-menu dropdown-menu-right">
            <a class="dropdown-item" href="javascript:void(0)">
               News
            </a>
            <a class="dropdown-item" href="javascript:void(0)">
               Messages
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="javascript:void(0)">
               Edit Profile
            </a>
         </div>
      </div>
   </div>
</div>
{% endexample %}

### Input with icon
{% example %}
{% include parts/input-icon.html %}
{% endexample %}

### Separated inputs
{% example %}
<div class="form-group">
   <label class="form-label">Separated inputs</label>
   <div class="row row-xs">
      <div class="col">
         <input type="text" class="form-control" placeholder="Search for&hellip;">
      </div>
      <span class="col-auto">
							<button class="btn btn-secondary" type="button">{% include ui/icon.html icon="search" %}</button>
						</span>
</div>
</div>{% endexample %}

### Custom Input examples
{% example %}
<div class="form-group">
   <label class="form-label">Username</label>
   {% include ui/input-group.html prepend="@" placeholder="username" %}
</div>

<div class="form-group">
   <label class="form-label">Subdomain</label>
   {% include ui/input-group.html append=".tabler.io" placeholder="subdomain" %}
</div>

<div class="form-group">
   <label class="form-label">Your vanity URL</label>
   {% include ui/input-group.html prepend="https://example.com/users/" %}
</div>

<div class="form-group">
   <label class="form-label">Price</label>
   {% include ui/input-group.html prepend="$" append=".00" %}
</div>
{% endexample %}

### Date component
{% example %}
<div class="form-group">
   <label class="form-label">Date of birth</label>
   <div class="row row-xs">
      <div class="col-5">
         <select name="user[month]" class="form-control custom-select">
            <option value="">Month</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option selected="selected" value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
         </select>
      </div>
      <div class="col-3">
         <select name="user[day]" class="form-control custom-select">
            <option value="">Day</option>
            {% for i in (1..31) %}
            <option value="{{ i }}"{% if i == 20 %} selected{% endif %}>{{ i }}</option>{% endfor %}
         </select>
      </div>
      <div class="col-4">
         <select name="user[year]" class="form-control custom-select">
            <option value="">Year</option>
            {% for i in (1897..2014) reversed %}
            <option value="{{ i }}"{% if i == 1989 %} selected{% endif %}>{{ i }}</option>{% endfor %}
         </select>
      </div>
   </div>
</div>
{% endexample %}

### Input with button
{% example %}
<div class="form-group">
   <label class="form-label">Button input</label>
   <div class="input-group">
      <div class="input-group-prepend">
         <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown"
                 aria-haspopup="true" aria-expanded="false">
            Action
         </button>
         <div class="dropdown-menu">
            <a class="dropdown-item" href="javascript:void(0)">Action</a>
            <a class="dropdown-item" href="javascript:void(0)">Another action</a>
            <a class="dropdown-item" href="javascript:void(0)">Something else here</a>
            <div role="separator" class="dropdown-divider"></div>
            <a class="dropdown-item" href="javascript:void(0)">Separated link</a>
         </div>
      </div>
      <input type="text" class="form-control" aria-label="Text input with dropdown button">
   </div>
</div>
{% endexample %}
