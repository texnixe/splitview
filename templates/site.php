
<!-- Splitview # Start -->
<script class="splitview-trigger" src="<?php echo splitviewSite::url(); ?>"></script>
<script class="splitview-data" data-splitview-id="<?php echo page()->uri(); ?>">
splitviewSite.init({
<?php echo splitviewSite::init(); ?>
})
</script>
<!-- Splitview # End -->
