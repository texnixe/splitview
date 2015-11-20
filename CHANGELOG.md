# Changelog

## 0.2 - Memory edition

### Options

- Debug. See in the browser console what the options are and when they change
- Time refresh. Good to change on slow computers
- Memory. Remember orientation, view and visible on page reload by local storage
- Orientation. Flip from columns to rows
- Renamed option `splitview.key` to `splitview.shortcut`
- Renamed option value from `splitview.shortcut('s')` to `splitview.shortcut('alt+s')`. The old version is deprecated but still works

### Buttons

- Orientation. Flip from columns to rows
- Hard link buttons to the panel and the site. This will leave splitview

### Misc

- Complete rewrite to make it smaller and simpler
- Possible to send args to splitview.init(). Good for anyone who want's to control the splitview in a custom template
- Added license. Seems like "CC - Attribution 4.0 International". Do what you want but don't sell or take credit for it
- Bugs and fixes