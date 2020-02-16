---
title: Form Elements
bootstrap-link: components/forms/
---


## Classic Inputs

{% capture code %}
{% include parts/form/input.html type="text" hint="Here's some more info." %}
{% include parts/form/input.html type="password" hint="Here's some more info." %}
{% endcapture %}
{% include example.html code=code %}


## Form control rounded

{% capture code %}
<div class="mb-3">
	<label class="form-label">Form control rounded</label>
	<input type="text" class="form-control form-control-rounded mb-2" name="Form control rounded" placeholder="Text..">
	{% include ui/form/input-icon.html input-class="form-control-rounded" %}
</div>
{% endcapture %}
{% include example.html code=code %}


## Form control flush

{% capture code %}
<div class="mb-3">
	<label class="form-label">Form control flush</label>
	<input type="text" class="form-control form-control-flush" name="Form control flush" placeholder="Text..">
</div>
{% endcapture %}
{% include example.html code=code %}


## Input with icon

{% capture code %}
{% include parts/form/input-icon.html %}
{% endcapture %}
{% include example.html code=code %}


## Separated inputs

{% capture code %}
{% include parts/form/input-icon-separated.html %}
{% endcapture %}
{% include example.html code=code %}

## Textarea and select

{% capture code %}
{% include parts/form/input.html type="textarea" %}

{% include parts/form/select.html %}
{% include parts/form/select.html label="Select multiple" multiple=true %}
{% endcapture %}
{% include example.html code=code %}


## Validation states

{% capture code %}
{% include parts/form/validation-states.html %}
{% endcapture %}
{% include example.html code=code %}


### Subtle validation states

{% capture code %}
{% include parts/form/validation-states.html lite=true %}
{% endcapture %}
{% include example.html code=code %}


## Input size

{% capture code %}
{% include parts/form/input-sizes.html %}
{% endcapture %}
{% include example.html code=code %}


## Image check

{% capture code %}
{% include parts/form/input-image.html %}
{% endcapture %}
{% include example.html code=code max-width="25rem" %}


## Input color

{% capture code %}
{% include parts/form/input-color.html %}
{% endcapture %}
{% include example.html code=code %}


## Input color picker

{% capture code %}
{% include parts/form/input-colorpicker.html %}
{% endcapture %}
{% include example.html code=code %}


## Datalists

{% capture code %}
{% include parts/form/input-datalist.html %}
{% endcapture %}
{% include example.html code=code %}


## Custom selectboxes

{% capture code %}
{% include parts/form/input-selectgroups.html %}
{% endcapture %}
{% include example.html code=code %}


## Advanced selectboxes

{% capture code %}
{% include parts/form/selectgroup-payments.html %}
{% include parts/form/selectgroup-project-manager.html %}
{% endcapture %}
{% include example.html code=code %}


## Toggle switches

{% capture code %}
{% include parts/form/input-toggle.html %}
{% include parts/form/input-toggle-single.html %}
{% endcapture %}
{% include example.html code=code %}


## Radios

{% capture code %}
{% include parts/form/input-radios.html %}
{% include parts/form/input-radios-inline.html %}
{% endcapture %}
{% include example.html code=code %}


## Checkboxes

{% capture code %}
{% include parts/form/input-checkboxes.html %}
{% include parts/form/input-checkboxes-inline.html %}
{% endcapture %}
{% include example.html code=code %}


## Range input

{% capture code %}
{% include parts/form/input-range.html %}
{% endcapture %}
{% include example.html code=code %}


## Fieldset

{% capture code %}
{% include parts/form/fieldset.html %}
{% endcapture %}
{% include example.html code=code %}


## Input group

{% capture code %}
<div class="mb-3">
	<label class="form-label">Input group</label>
	{% include ui/form/input-group.html prepend="@" placeholder="username" class="mb-2" %}
	{% include ui/form/input-group.html append=".tabler.io" placeholder="subdomain" class="mb-2" %}
	{% include ui/form/input-group.html prepend="https://" append=".tabler.io" placeholder="subdomain" %}
</div>
{% endcapture %}
{% include example.html code=code %}


## Input with checkbox or radios

{% capture code %}
<div class="mb-3">
	<label class="form-label">Input with checkbox or radios</label>
	{% include ui/form/input-group.html prepend="checkbox" class="mb-2" %}
	{% include ui/form/input-group.html append="radio" %}
</div>
{% endcapture %}
{% include example.html code=code %}

## Input with prepended or appended text

{% capture code %}
<div class="mb-3">
	<label class="form-label">Input with prepended text</label>
	{% include ui/form/input-group.html prepend="https://tabler.io/users/" flat=true input-class="pl-0" value="yourfancyusername" class="mb-2" %}
	{% include ui/form/input-group.html append=".tabler.io" input-class="text-right pr-0" flat=true value="yourfancydomain" %}
</div>
{% endcapture %}
{% include example.html code=code %}

## Input with appended link

{% capture code %}
<div class="mb-3">
	<label class="form-label">Input with appended link</label>
	{% include ui/form/input-group.html append-link="Show password" flat=true type="password" value="ultrastrongpassword" %}
</div>
{% endcapture %}
{% include example.html code=code %}


## Input with appended icon links

{% capture code %}
<div class="mb-3">
	<label class="form-label">Input with appended icon links</label>
	{% include ui/form/input-group.html append-button="x:Clear search,sliders:Search settings,bell:Add notification" flat=true %}
</div>
{% endcapture %}
{% include example.html code=code %}