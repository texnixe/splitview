<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<title>Splitview</title>
	<?php echo css( splitviewTool::css() ); ?>
	<?php echo splitviewTool::cssDebug(); ?>
</head>
<body>
<div class="splitview">
	<section class="panel">
		<?php echo SplitviewTool::snippet('tool-view', array('view' => 1)); ?>
	</section>
	<section class="site">
		<?php echo SplitviewTool::snippet('tool-view', array('view' => 2)); ?>
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