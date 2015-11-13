# Options

If options are not set a default value will be used.

## config.php

### Shortcut

To trigger Splitview `alt + s` is used as a default keyboard shortcut. You can change the `s` letter if you want.

**Default:** `s`

```php
c::set('splitview.shortcut', 's');
```

### Active

You can disable Splitview without removing the plugin. Set this option to `false` to disable it.

**Default:** `true`

```php
c::set('splitview.active', true);
```

### HTML, CSS and JS

You can't add custom HTML, CSS or JS through the plugin, but you can disable it. Then you can set your own in your template. Set this option to `false` disable it.

**Warning:** If you disable these option the Splitview will probably not work like expected.

**Default:** `true`

```php
c::set('splitview.css', true);
c::set('splitview.html', true);
c::set('splitview.js', true);
c::set('splitview.script', true);
```

## splitview.init()

If overriding the script with custom values, this is how arguments are inserted to the init function.

```php
splitview.init({
    key1: 'string1',
    key2: 'string2'
});
```

## Active

## View



## Page uri

The page uri can be for example `projects/project-1`, the address to the page.

**Key:** `page_uri`
**Default:** Loads `$page->uri`


	var admin_uri;
	var site_url;