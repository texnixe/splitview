<?php echo splitview::css(); ?>
<div class="splitview splitview--hide splitview--columns">
	<div class="splitview--meta">
		<div class="splitview__item splitview__item--rows">
			<i class="fa fa-columns fa-rotate-90"></i>
		</div>
		<div class="splitview__item splitview__item--columns">
			<i class="fa fa-columns"></i>
		</div>
		<div class="splitview__item splitview__item--close">
			<i class="fa fa-times"></i>
		</div>
	</div>

	<div class="splitview__section splitview--panel">
		<div class="splitview__nav splitview__nav--panel">
			<div class="splitview__item splitview__item--home">
				<a href="#" class="splitview__link">
					<i class="fa fa-gear"></i>
				</a>
			</div>
			<div class="splitview__item splitview__item--full">
				<i class="fa fa-expand"></i><div class="splitview__text">Expand</div>
			</div>
			<div class="splitview__item splitview__item--columns">
				<i class="fa fa-compress"></i><div class="splitview__text">Columns</div>
			</div>
		</div>
	</div>
	<div class="splitview__section splitview--site">
		<div class="splitview__nav splitview__nav--site">
			<div class="splitview__item splitview__item--home">
				<a href="#" class="splitview__link">
					<i class="fa fa-desktop"></i>
				</a>
			</div>
			<div class="splitview__item splitview__item--full">
				<i class="fa fa-expand"></i><div class="splitview__text">Expand</div>
			</div>
			<div class="splitview__item splitview__item--columns">
				<i class="fa fa-compress"></i><div class="splitview__text">Columns</div>
			</div>
			<div class="splitview__item splitview__item--refresh">
				<i class="fa fa-refresh"></i><div class="splitview__text">Refresh</div>
			</div>
			<div class="splitview__item splitview__item--sync">
				<i class="fa fa-arrow-left"></i><div class="splitview__text">SyncKVAR</div>
			</div>
		</div>
	</div>


	<?php if( $page->hasImages() ) : ?>
	<?php echo u() . '/panel/pages/' . $page->uri(); ?>
	<?php endif; ?>

	<div class="splitview__data" data-splitbar-mode="" data-splitbar-id="<?php echo $page->uri(); ?>"></div>
</div>

<?php echo splitview::js(); ?>
<?php if( c::get('splitview.js', true) === true ) : ?>
<script>
splitview.init({
	site_url: '<?php echo u(); ?>',
		admin_uri: 'panel/pages/',
		page_uri: '<?php echo $page->uri(); ?>',
		<?php
		echo splitview::arg('css');
		echo splitview::arg('js');
		echo splitview::arg('memory');
		echo splitview::arg('orientation');
		echo splitview::arg('time');
		echo splitview::arg('shortcut');
		echo splitview::arg('visible');
		echo splitview::arg('view');
		?>
	});
	</script>
<?php endif; ?>

<div class="splitview__message splitview--hide">Sorry! Splitview does not work in this resolution.</div>