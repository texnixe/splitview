# Changelog

## 0.3 - Sync edition

This is a really big release so it's good for you to know the changes.

### Changed the way it works

In version 0.2 splitview was a function that you could activate with pressing a shortcut. It has evolved from a function to a complete tool.

#### Downsides
- It will be redirected to a new page. This means that it will take about 0.5 seconds to load (depending on your hosting).

#### Benefits
- Back in your browser just works. No fancy javascript needed for it to work as expected.
- CSS problems depending on your site will never appear, as it's now on an own page with own CSS.
- BEM is no longer needed because it cannot collide with other CSS. It results in much cleaner HTML, CSS and JS.
- Easier to link to Splitview from anywhere.
- Easier to add to the panel because it's now linkable.
- The pin buttons are no longer needed. Just a close button that will take you to the right place.
- The script code for triggering the shortcut is much smaller which makes your site faster than before. Most of the code loads on the Splitview page.
- Does not need to autorefresh on close if page has been saved.

### Urls

- Urls to tell you where you are on the panel and on the site.
- When clicking links on the panel or on the site the urls update automatically.
- When changing an url and clicking enter, the view will load that page.

### Sync

- When clicking the arrow buttons the page is synced to the other view.
- It will figure out the url to the panel when syncing from right to left.
- It will figure out the url to the site when syncing from left to right.

### Menu

- New menu system because everything will not fit into the bar in the future.
- Click on "Sync" to try it out.

### Options

- Many options are removed as they are not longer. The options docs till be updated in time.
- Some new options are added. I will wait with the docs on it in case I change my mind about things.

### Save

- There was a bug that when saved two times very fast, the site view was not refreshed. That problem is now solved.
- Panel saved message is disabled.
- Splitview not uses own save and error messages. It fixes a bug and works better visually.

### Other changes

- Smaller bar with smaller icons. Not so much waste of screen space.
- Reload is now also available to the panel view, in case it needs to be refreshed.
- When closing on a view with both panel and site, there is a dropdown to choose what you want to close to, the panel or the site.
- When closing on the panel or the site view, Splitview closes to these pages.
- Gulp is now used instead of Prepros for better file structure more.

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