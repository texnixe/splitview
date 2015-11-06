# Splitview

Splitview makes it possible to edit your pages in a splitscreen view. See what you change directly after pressing save.

![Splitview](assets/images/screenshot-1.png)

## Benefits

- A real WYSIWYG. See exactly what you get on save.
- Totally invisible until you need it.
- Lightning fast.
- Dependecy free JS - No libraries required, not even jQuery.
- Remember if Splitview active state until next browser refresh.

## Requirements

- Kirby 2.2 or later.
- A modern browser. Some testing remains.

### Tested browsers

- Firefox (PC - Windows)
- Google Chrome (PC - Windows)
- Internet Exploder 11
- Microsoft Edge (PC - Windows)

## Setup

1. Download the [Splitview plugin](https://github.com/jenstornell/splitview/archive/master.zip)
1. Put the `splitview` folder in /plugins/
2. Add `<?php echo splitview(); ?>` right before `</body>` in your footer of all your pages.
3. Login to the panel. When logged in, go to the frontend of your site.
4. Press `alt + s` to activate the Splitbar.

## Views

There are two columns, panel and site. Panel is the Kirby panel and site is your frontend. You can make each column expand to full width.

### Panel - Fullscreen

![Splitview](assets/images/screenshot-2.png)

### Site - Fullscreen

![Splitview](assets/images/screenshot-3.png)

## Buttons

- **Fullscreen:** Expand the current view to 100%.
- **Columns:** Go back to the column view.
- **Close:** Close the Splitview.
- **Refresh:** Reload the site view. Good if somehow it is not reloaded on save.

## Options

If options are not set a default value will be used.

### Shortcut

To trigger Splitview `alt + s` is used as a default keyboard shortcut. You can change the `s` letter if you want.

**Default:** `s`

```php
c::set('splitview.key', 's');
```

### Active

You can disable Splitview without removing the plugin. Set this option to `false` to disable it.

**Default:** `true`

```php
c::set('splitview.active', true);
```

### CSS and JS

There is currently no way to add your custom CSS or JS through the plugin, but you can disable it if you want. Set this option to `false` disable it.

**Warning:** If you disable these option the Splitview will probably not work like expected.

**Default:** `true`

```php
c::set('splitview.css', true);
c::set('splitview.js', true);
```

## Troubleshooting

### Mobile device

Splitview does not work well on mobile devices because the screen is too narrow. Don't even try it.

### Desktop

- Make sure you followed all steps correctly in Setup.
- If you have added splitview options, try to remove them and see if that works.
- Check for javascript errors. If other scripts don't work, Splitview javascript can be prevented from runnig.
- Look for `<!-- Splitview # Start -->` in your source. If it's not there, the plugin does not run.

If problem remains, add an issue and describe as good as you can what does not work.

## Help needed

### Different environments

- Does it work on Linux?
- Does it work on Mac?
- Help me to test different browsers

### Issues

What breaks? Flood me with issues.

### Ideas

Ideas are always welcome. Add them as issues.

### Pull requests and code improvements

Help to improve the code with pull requests or suggestions as issues.

## Future

Possuble future ideas is added to the issues tagged `ideas` or `features`. Also look at milestones.