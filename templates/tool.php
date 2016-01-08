<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<title>Splitview</title>
	<?php echo css( splitviewTool::css() ); ?>
	<?php echo splitviewTool::cssDebug(); ?>
</head>
<body data-flip="false">
<div class="splitview">
	<section data-section="1">
		<?php echo SplitviewTool::snippet('tool-view'); ?>
	</section>
	<section data-section="2">
		<?php echo SplitviewTool::snippet('tool-view'); ?>
	</section>
</div>

<?php echo js( splitviewTool::js() ); ?>
<script>
splitview.init({

<?php echo splitviewTool::init(); ?>

});
</script>
</body>
</html>