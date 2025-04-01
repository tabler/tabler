# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.0.9 - 2025-03-15

### Fixed
- PrismJS license info has not been present in the codesample plugin files.

## 1.0.8 - 2025-03-11

### Fixed
- Updated dependencies including those with security vulnerabilities.
- Switched from a polynomial regular expression possibly creating a ReDoS vulnerabiliy to the native string trim method in hugerte.utils.Tools.trim.

## 1.0.7 - 2025-01-11

### Fixed
- Fixed bundling HugeRTE together with a skin. (Tested with Vite/ES6 only.)
- Dompurify license info has been present in files not containing Dompurify (e.g. plugins).

## 1.0.6 - 2024-12-20

### Fixed
- Dompurify license info has not been present in the minified build.

## 1.0.5 - 2024-12-19

### Fixed
- Fixed links to TinyMCE docs #GH-29

### Removed
- Slimmed README.md. Docs are now in the separate hugerte/hugerte-docs repo.

## 1.0.4 - 2024-10-28

### Added
- Copyright and license info has been added to the build header. #GH-27

### Fixed
- The used dompurify version has been upgraded, fixing the issue that invalid HTML elements within an `svg` element weren't removed. #GH-26

## 1.0.3 - 2024-10-04

### Improved
- Updated references to bad HugeRTE 1.0.0 build in README.md #GH-23

## 1.0.2 - 2024-10-04

### Fixed
- The license field in composer.json was set to MIT-only instead of MIT. The `-only` prefix makes sense for GPL licenses but not MIT.

## 1.0.1 - 2024-10-04

### Improved
- The package.json and composer.json files now include better metadata.

### Fixed
- Wrong files were published at npm. #GH-23

## 1.0.0 - 2024-10-01

### Added
- New custom tooltip functionality, tooltip will be shown when hovering with a mouse or with keyboard focus. #TINY-9275
- New `sandbox_iframes_exclusions` option that holds a list of URL host names to be excluded from iframe sandboxing when `sandbox_iframes` is set to `true`. #TINY-10350
- Added 'getAllEmojis' api function to the emoticons plugin #TINY-10572
- Element preset support for the `valid_children` option and Schema.addValidChildren API. #TINY-9979
- A new `trigger` property for block text pattern configurations, allowing pattern activation with either Space or Enter keys. #TINY-10324
- Added onFocus callback for CustomEditor dialog component. #TINY-10596
- Added icons for the import from Word, export to Word and export to PDF premium plugins. #TINY-10612
- Added `data` to Schema as a valid element. #TINY-10611
- More advanced schema config for custom elements. #TINY-9980
- Added custom tooltip for autocompleter, now visible on both mouse hover and keyboard focus, except single column cases. #TINY-9638
- Added importword, exportpdf and exportword menu items to default file menu. #TINY-10670

### Improved
- Included keyboard shortcut in custom tooltip for `ToolbarButton` and `ToolbarToggleButton`. #TINY-10487
- Improved showing which element has focus for keyboard navigation. #TINY-9176
- Custom tooltips will now show for items in `collection` which is rendered inside a dialog, on mouse hover and keyboard focus. #TINY-9637
- Autocompleter will now work with IMEs. #TINY-10637
- Make table ghost element better reflect height changes when resizing. #TINY-10658

### Changed
- `convert_unsafe_embeds` editor option is now defaulted to `true`. #TINY-10351
- `sandbox_iframes` editor option is now defaulted to `true`. #TINY-10350
- The DOMUtils.isEmpty API function has been modified to consider nodes containing only comments as empty. #TINY-10459
- The `highlight_on_focus` option now defaults to true, adding a focus outline to every editor. #TINY-10574
- Delay before the tooltip to show up, from 800ms to 300ms. #TINY-10475
- Now `tox-view__pane` has `position: relative` instead of `static`. #TINY-10561
- Update outbound link for statusbar Tiny logo #TINY-10494
- Remove the height field from the `table` plugin cell dialog. The `table` plugin row dialog now controls the row height by setting the height on the `tr` element, not the `td` elements. #TINY-10617
- Change table height resizing handling to remove heights from `td`/`th` elements and only apply to `tr` elements. #TINY-10589
- Removed incorrect `aria-placeholder` attribute from editor body when `placeholder` option is set. #TINY-10452
- The `tooltip` property for dialog's footer `togglebutton` is now optional. #TINY-10672
- `TinyMCE`, `tinymce`, `Tinymce`, `TinyMce`, `tinyMCE`, `tinyMce` have been replaced by appropiate HugeRTE variants, especially the global `tinymce` object #GH-8

### Removed
- Removed the deprecated `remove_trailing_brs` option from DomParser. #TINY-10454
- Removed `title` attribute for buttons with visible label. #TINY-10453
- Removed `InsertOrderedList` and `InsertUnorderedList` from core. #TINY-10644
- Removed `closeButton` from `NotificationSpec`, close button in notification is now rendered by default. #TINY-10646
- The autocompleter `ch` configuration property has been removed. Use the `trigger` property instead. #TINY-8929
- The `promotion` init option has been removed. HugeRTE doesn't show an upgrade button regardless of it being present or not.

### Fixed
- When deleting the last row in a table, the cursor would jump to the first cell (top left), instead of moving to the next adjacent cell in some cases. #TINY-6309
- Heading formatting would be partially applied to the content within the `summary` element when the caret was positioned between words. #TINY-10312
- Moving focus to the outside of the editor after having clicked a menu would not fire a `blur` event as expected. #TINY-10310
- Autocomplete would sometimes cause corrupt data when starting during text composition. #TINY-10317
- Inline mode with persisted toolbar would show regardless of the skin being loaded, causing css issues #TINY-10482
- Table classes couldn't be removed via setting an empty value in `table_class_list`. Also fixed being forced to pick the first class option. #TINY-6653
- Directly right clicking on a ol's li in FireFox didn't enable the button `List Properties...` in the context menu. #TINY-10490
- The `link_default_target` option wasn't considered when inserting a link via `quicklink` toolbar. #TINY-10439
- When inline editor toolbar wrapped to multiple lines the top wasn't always calculated correctly. #TINY-10580
- Removed manually dispatching dragend event on drop in Firefox. #TINY-10389
- Slovenian help dialog content had a dot in the wrong place. #TINY-10601
- Pressing Backspace at the start of an empty `summary` element within a `details` element nested in a list item no longer removes the `summary` element. #TINY-10303
- The toolbar width was miscalculated for the inline editor positioned inside a scrollable container. #TINY-10581
- Fixed incorrect object processor for `event_root` option. #TINY-10433
- Adding newline after using `selection.setContent` to insert a block element would throw an unhandled exception. #TINY-10560
- Floating toolbar buttons in inline editor incorrectly wrapped into multiple rows on window resizing or zooming. #TINY-10570
- When setting table border width and `table_style_by_css` is true, only the border attribute is set to 0 and border-width styling is no longer used #TINY-10308

