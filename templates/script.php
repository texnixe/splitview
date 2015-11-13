<script>
splitview.init({
	site_url: '<?php echo u(); ?>',
	admin_uri: '/panel/pages/',
	page_uri: '<?php echo $page->uri(); ?>',
	memory: <?php echo $memory; ?>,
	time: '<?php echo $time; ?>'
});
</script>