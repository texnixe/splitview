<?php echo splitview::css(); ?>
<div class="splitview splitview--hide splitview--columns">
	<div class="splitview--meta">
		<div class="splitview__item splitview__item--panel" title="Panel - Leave Splitview">
			<a href="#" class="splitview__link">
				<i class="fa fa-thumb-tack"></i>
			</a>
		</div>
		<div class="splitview__item splitview__item--site" title="Site - Leave Splitview">
			<a href="#" class="splitview__link">
				<i class="fa fa-thumb-tack"></i>
			</a>
		</div>
		<div class="splitview__item splitview__item--rows" title="Rows switch">
			<div style="font-size: 8px;" class="fa-rotate-90">
				<i class="fa fa-square"></i>
				<i class="fa fa-square"></i>
			</div>
		</div>
		<div class="splitview__item splitview__item--columns" title="Columns switch">
			<div style="font-size: 8px;">
				<i class="fa fa-square"></i>
				<i class="fa fa-square"></i>
			</div>
		</div>
		<div class="splitview__item splitview__item--close" title="Close">
			<i class="fa fa-times"></i>
		</div>
	</div>

	<div class="splitview__section splitview--panel">
		<div class="splitview__nav splitview__nav--panel">
			<div class="splitview__item splitview__item--full" title="Panel fullscreen">
				<i class="fa fa-gear"></i><div class="splitview__text">Panel</div>
			</div>
			<div class="splitview__item splitview__item--back" title="Back to Splitview">
				<i class="fa fa-arrow-circle-left"></i><div class="splitview__text">Back</div>
			</div>
			<div class="splitview__item splitview__item--sync" title="Sync to site">
				<i class="fa fa-mail-forward"></i><div class="splitview__text">Sync</div>
			</div>
		</div>
	</div>
	<div class="splitview__section splitview--site">
		<div class="splitview__nav splitview__nav--site">
			<div class="splitview__item splitview__item--full" title="Site fullscreen">
				<i class="fa fa-globe"></i><div class="splitview__text">Site</div>
			</div>
			<div class="splitview__item splitview__item--back" title="Back to Splitview">
				<i class="fa fa-arrow-circle-left"></i><div class="splitview__text">Back</div>
			</div>
			<div class="splitview__item splitview__item--refresh" title="Refresh site">
				<i class="fa fa-refresh"></i><div class="splitview__text">Refresh</div>
			</div>
			<div class="splitview__item splitview__item--sync" title="Sync to panel">
				<i class="fa fa-mail-reply"></i><div class="splitview__text">Sync</div>
			</div>
		</div>
	</div>

	<div class="splitview__data" data-splitview-mode="" data-splitview-id="<?php echo $page->uri(); ?>"></div>
</div>

<?php echo splitview::js(); ?>
<?php if( c::get('splitview.js', true) === true ) : ?>
<script>
splitview.init({
	<?php foreach( splitview::$options_js as $key => $option ) : ?>
	<?php echo $key . ": " . $option . ",\n"; ?>
	<?php endforeach; ?>
});
<?php if( c::get('splitview.debug', false) === true ) : ?>
if( window.self === window.top ) {
	var php_options = {};
	<?php foreach( splitview::$options_js as $key => $option ) : ?>
	<?php echo "php_options['" . $key . "'] = " . $option . ";\n"; ?>
	<?php endforeach; ?>
	console.log('Options PHP:');
	console.log(php_options);
}
<?php endif; ?>
</script>
<?php endif; ?>