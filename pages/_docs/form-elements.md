---
title: Form Elements
bootstrap-link: components/forms/
---

### Classic Input

{% capture code %}
<div class="mb-2">
  <label class="form-label">Static</label>
<div class="form-control-plaintext">Username</div>
</div>

<div class="mb-2">
  <label class="form-label">Text</label>
  <input type="text" class="form-control" name="example-text-input" placeholder="Text..">
</div>

<div class="mb-2">
   <label class="form-label">Disabled</label>
   <input type="text" class="form-control" name="example-disabled-input" placeholder="Disabled.."
          value="Well, she turned me into a newt." disabled>
</div>
<div class="mb-2">
   <label class="form-label">Readonly</label>
   <input type="text" class="form-control" name="example-disabled-input" placeholder="Disabled.."
          value="Well, how'd you become king, then?" readonly>
</div>
{% endcapture %}
{% include example.html code=code %}

### Password and validation
{% capture code %}
<div class="mb-2">
   <label class="form-label">Password</label>
   <input type="password" class="form-control" name="example-password-input" placeholder="Password..">
</div>

<div class="mb-2">
   <label class="form-label">Valid State</label>
   <input type="text" class="form-control is-valid" name="example-text-input-valid"
          placeholder="Valid State..">

   <input type="text" class="form-control mt-3 state-valid" value="Valid state">
</div>

<div class="mb-2">
   <label class="form-label">Invalid State</label>
   <input type="text" class="form-control is-invalid" name="example-text-input-invalid"
          placeholder="Invalid State..">
   <div class="invalid-feedback">Invalid feedback</div>

   <input type="text" class="form-control mt-3 state-invalid" value="Invalid state">
</div>
{% endcapture %}
{% include example.html code=code %}

### Input size

{% include parts/form/input-sizes.html %}


### Select
{% capture code %}
{% include parts/form/select.html options="Germany,USA,Poland" %}
{% endcapture %}
{% include example.html code=code %}

### Textarea
{% capture code %}
<div class="mb-2">
   <label class="form-label">Textarea <span class="form-label-description">56/100</span></label>
   <textarea class="form-control" name="example-textarea-input" rows="6" placeholder="Content..">Oh! Come and see the violence inherent in the system! Help, help, I'm being repressed! We shall say 'Ni' again to you, if you do not appease us. I'm not a witch. I'm not a witch. Camelot!</textarea>
</div>
{% endcapture %}
{% include example.html code=code %}

### Image check
{% capture code %}
{% include parts/form/input-image.html %}
{% endcapture %}
{% include example.html code=code %}

### Input color
{% capture code %}
{% include parts/form/input-color.html %}
{% endcapture %}
{% include example.html code=code %}

### Input color picker
{% capture code %}
{% include parts/form/input-colorpicker.html %}
{% endcapture %}
{% include example.html code=code %}

### Datalists
{% capture code %}
{% include parts/form/input-datalist.html %}
{% endcapture %}
{% include example.html code=code %}

### Custom selectboxes
{% capture code %}
{% include parts/form/input-selectgroups.html %}
{% endcapture %}
{% include example.html code=code %}

### Toggle switches
{% capture code %}
{% include parts/form/input-toggle.html %}
{% include parts/form/input-toggle-single.html %}
{% endcapture %}
{% include example.html code=code %}

### Radios
{% capture code %}
{% include parts/form/input-radios.html %}
{% include parts/form/input-radios-inline.html %}
{% endcapture %}
{% include example.html code=code %}

### Checkboxes
{% capture code %}
{% include parts/form/input-checkboxes.html %}
{% include parts/form/input-checkboxes-inline.html %}
{% endcapture %}
{% include example.html code=code %}

### Range input
{% capture code %}
{% include parts/form/input-range.html %}
{% endcapture %}
{% include example.html code=code %}

### Sample form
{% capture code %}
{% include parts/form/fieldset.html %}
{% endcapture %}
{% include example.html code=code %}

### Input group
{% capture code %}
<div class="mb-2">
   <label class="form-label">Input group</label>
   <div class="input-group">
      <input type="text" class="form-control" placeholder="Search for…">
      <span class="input-group-append">
							<button class="btn btn-primary" type="button">Go!</button>
						</span>
   </div>
</div>
<div class="mb-2">
   <label class="form-label">Input group buttons</label>
   <div class="input-group">
      <input type="text" class="form-control">
      <div class="input-group-append">
         <button type="button" class="btn btn-primary">Action</button>
         <button data-toggle="dropdown" type="button"
                 class="btn btn-primary dropdown-toggle"></button>
         <div class="dropdown-menu dropdown-menu-right">
            <a class="dropdown-item" href="#">
               News
            </a>
            <a class="dropdown-item" href="#">
               Messages
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">
               Edit Profile
            </a>
         </div>
      </div>
   </div>
</div>
{% endcapture %}
{% include example.html code=code %}

### Input with icon
{% capture code %}
{% include parts/form/input-icon.html %}
{% endcapture %}
{% include example.html code=code %}

### Separated inputs
{% capture code %}
{% include parts/form/input-icon-separated.html %}
{% endcapture %}
{% include example.html code=code %}

### Custom Input examples
{% capture code %}
<div class="mb-2">
   <label class="form-label">Username</label>
   {% include ui/form/input-group.html prepend="@" placeholder="username" %}
</div>

<div class="mb-2">
   <label class="form-label">Subdomain</label>
   {% include ui/form/input-group.html append=".tabler.io" placeholder="subdomain" %}
</div>

<div class="mb-2">
   <label class="form-label">Your vanity URL</label>
   {% include ui/form/input-group.html prepend="https://tabler.io/users/" %}
</div>

<div class="mb-2">
   <label class="form-label">Price</label>
   {% include ui/form/input-group.html prepend="$" append=".00" %}
</div>
{% endcapture %}
{% include example.html code=code %}

### Date component
{% capture code %}
<div class="mb-2">
   <label class="form-label">Date of birth</label>
   <div class="row row-sm">
      <div class="col-5">
         <select name="user[month]" class="form-select">
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
         <select name="user[day]" class="form-select">
            <option value="">Day</option>
            {% for i in (1..31) %}
            <option value="{{ i }}"{% if i == 20 %} selected{% endif %}>{{ i }}</option>{% endfor %}
         </select>
      </div>
      <div class="col-4">
         <select name="user[year]" class="form-select">
            <option value="">Year</option>
            {% for i in (1897..2014) reversed %}
            <option value="{{ i }}"{% if i == 1989 %} selected{% endif %}>{{ i }}</option>{% endfor %}
         </select>
      </div>
   </div>
</div>
{% endcapture %}
{% include example.html code=code %}

### Input with button
{% capture code %}
<div class="mb-2">
   <label class="form-label">Button input</label>
   <div class="input-group">
      <div class="input-group-prepend">
         <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown"
                 aria-haspopup="true" aria-expanded="false">
            Action
         </button>
         <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
            <div role="separator" class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
         </div>
      </div>
      <input type="text" class="form-control" aria-label="Text input with dropdown button">
   </div>
</div>
{% endcapture %}
{% include example.html code=code %}
