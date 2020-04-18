---
title: Form elements
description: Forms are one of the most important types of interaction with a website or app. Since their aim is to enable users to make a purchase, subscribe to a service or sign up to create an account, it's important to make sure they are easy to complete and help increase conversion rates. Use the available elements to create forms which are well-structured and user-friendly.
bootstrap-link: components/forms/
libs: nouislider
---


## Classic inputs

Use classic, user-friendly inputs, label them appropriately and include input placeholders that will help users avoid confusion when completing a form.

{% capture code %}
{% include parts/form/input.html type="text" hint="Here's some more info." %}
{% include parts/form/input.html type="password" hint="Here's some more info." %}
{% endcapture %}
{% include example.html code=code %}


## Form control rounded

Use the ``form-control-rounded`` class if you prefer form controls with rounded corners.

{% capture code %}
<div class="mb-3">
	<label class="form-label">Form control rounded</label>
	<input type="text" class="form-control form-control-rounded mb-2" name="Form control rounded" placeholder="Text..">
	{% include ui/form/input-icon.html input-class="form-control-rounded" %}
</div>
{% endcapture %}
{% include example.html code=code %}


## Form control flush

You can remove borders from your form control by adding the ``form-control-flush`` class.

{% capture code %}
<div class="mb-3">
	<label class="form-label">Form control flush</label>
	<input type="text" class="form-control form-control-flush" name="Form control flush" placeholder="Text..">
</div>
{% endcapture %}
{% include example.html code=code %}


## Input with icon

Add icons to your input controls to suggest users what they should enter or inform them of the current state of a form element.

{% capture code %}
{% include parts/form/input-icon.html %}
{% endcapture %}
{% include example.html code=code %}


## Separated inputs

Include an additional element in your input section, such as a button which can be used to submit the information enetered in the input control. 

{% capture code %}
{% include parts/form/input-icon-separated.html %}
{% endcapture %}
{% include example.html code=code %}

## Textarea and select

Use a multi-line text input control to enable users to enter longer pieces of text. The control will automatically adjust to the length of the text entered.

Add one of the available selects - either a dropdown or a multiple choice select - to let users choose from a predefined set of options.

{% capture code %}
{% include parts/form/input.html type="textarea" %}

{% include parts/form/select.html %}
{% include parts/form/select.html label="Select multiple" multiple=true %}
{% endcapture %}
{% include example.html code=code %}


## Validation states

To inform users whether the entered value is correct or not, use either of the validation states. Thanks to that, users will immediately know which form elements they need to correct and, if the state displays as invalid, why the value is incorrect.

{% capture code %}
{% include parts/form/validation-states.html %}
{% endcapture %}
{% include example.html code=code %}


### Subtle validation states

If you prefer a more subtle manner of informing users of the input control validation state, you can use tick and cross symbols and resign from colored control frames and the validation feedback. 

{% capture code %}
{% include parts/form/validation-states.html lite=true %}
{% endcapture %}
{% include example.html code=code %}


## Input size

Choose the size of an input control that will go well with your form design. Apart from the default size, you can also use small and large input controls.

{% capture code %}
{% include parts/form/input-sizes.html %}
{% endcapture %}
{% include example.html code=code %}


## Image check

Add an image check to your form and give users visually attractive options to choose from. 

{% capture code %}
{% include parts/form/input-image.html %}
{% endcapture %}
{% include example.html code=code max-width="25rem" %}


## Input color

Your input controls can come in a variety of colors, depending on your preferences. Click [here]({% docs_url colors %}) to see the list of available colors.

{% capture code %}
{% include parts/form/input-color.html %}
{% endcapture %}
{% include example.html code=code %}


## Input color picker

Add an color picker to your form to let users customise it according to their preferences. 

{% capture code %}
{% include parts/form/input-colorpicker.html %}
{% endcapture %}
{% include example.html code=code %}


## Datalists

Use the ``datalist`` element to add an autocomplete feature to your input control. The list of available options will display once a user starts to type and will make it quicker to complete form sections. 

{% capture code %}
{% include parts/form/input-datalist.html %}
{% endcapture %}
{% include example.html code=code %}


## Custom selectboxes

Add selectboxes to make your form more intuitive by providing users with a set of options to choose from. You can add simple selectboxes with a label, use icons only or icons with labels. Alternatively, you can use pill selectboxes if they go well with your design.  

{% capture code %}
{% include parts/form/input-selectgroups.html %}
{% endcapture %}
{% include example.html code=code %}


## Advanced selectboxes

Use more advanced selectboxes to display the range of available options. You can choose selectboxes with radio buttons, if you want users to select only one option or with checkboxes, if they are allowed to choose multiple options. 

{% capture code %}
{% include parts/form/selectgroup-payments.html %}
{% include parts/form/selectgroup-project-manager.html %}
{% endcapture %}
{% include example.html code=code %}


## Toggle switches

Use toggle switches for the elements of your form which require choosing between two opposing states.  

{% capture code %}
{% include parts/form/input-toggle.html %}
{% include parts/form/input-toggle-single.html %}
{% endcapture %}
{% include example.html code=code %}


## Radios

Use radio buttons for the parts of your form which require users to choose one option from a set of two or more mutually exclusive options.  

{% capture code %}
{% include parts/form/input-radios.html %}
{% include parts/form/input-radios-inline.html %}
{% endcapture %}
{% include example.html code=code %}


## Checkboxes

Use checkoxes if you want to allow users to select more than one option from a set of predefined options or to turn an option on or off.

{% capture code %}
{% include parts/form/input-checkboxes.html %}
{% include parts/form/input-checkboxes-inline.html %}
{% endcapture %}
{% include example.html code=code %}


## Range input

Add a range slider to make it possible for users to set a value or range, such as a price range or a time frame.

{% capture code %}
{% include parts/form/input-range.html %}
{% endcapture %}
{% include example.html code=code %}


## Fieldset

Group parts of your form to make it well-structured and clearer for users, using the ``fieldset`` element.

{% capture code %}
{% include parts/form/fieldset.html %}
{% endcapture %}
{% include example.html code=code %}


## Input group

Create a group of input controls and place add-ons on either side of an input.

{% capture code %}
<div class="mb-3">
	<label class="form-label">Input group</label>
	{% include ui/form/input-group.html prepend="@" placeholder="username" class="mb-2" %}
	{% include ui/form/input-group.html append=".tabler.io" placeholder="subdomain" class="mb-2" %}
	{% include ui/form/input-group.html prepend="https://" append=".tabler.io" placeholder="subdomain" %}
</div>
{% endcapture %}
{% include example.html code=code %}


## Input with checkboxes or radios

Add checkboxes or radio buttons on either side of your input control. 

{% capture code %}
<div class="mb-3">
	<label class="form-label">Input with checkbox or radios</label>
	{% include ui/form/input-group.html prepend="checkbox" class="mb-2" %}
	{% include ui/form/input-group.html append="radio" %}
</div>
{% endcapture %}
{% include example.html code=code %}

## Input with prepended or appended text

Add text to your input control, either before or after the text which is to be entered by a user. 

{% capture code %}
<div class="mb-3">
	<label class="form-label">Input with prepended text</label>
	{% include ui/form/input-group.html prepend="https://tabler.io/users/" flat=true input-class="pl-0" value="yourfancyusername" class="mb-2" %}
	{% include ui/form/input-group.html append=".tabler.io" input-class="text-right pr-0" flat=true value="yourfancydomain" %}
</div>
{% endcapture %}
{% include example.html code=code %}

## Input with appended link

Include a link in your input control to add a clickable element within the control. 

{% capture code %}
<div class="mb-3">
	<label class="form-label">Input with appended link</label>
	{% include ui/form/input-group.html append-link="Show password" flat=true type="password" value="ultrastrongpassword" %}
</div>
{% endcapture %}
{% include example.html code=code %}


## Input with appended icon links

Add an icon link which you want to display at the end of your input control to visually represent actions which a user can take.

{% capture code %}
<div class="mb-3">
	<label class="form-label">Input with appended icon links</label>
	{% include ui/form/input-group.html append-button="x:Clear search,adjustments:Search settings,bell:Add notification" flat=true %}
</div>
{% endcapture %}
{% include example.html code=code %}