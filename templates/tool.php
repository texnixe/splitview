<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<title>Splitview</title>
	<?php echo css( splitviewTool::css() ); ?>
	
</head>
<body data-view="grid" data-orientation="columns">
<div class="splitview">
	<section class="panel">
		<nav>
			<ul class="left">
				<li class="rows">
					<div class="scale-50 fa-rotate-90">
						<i class="fa fa-square"></i>
						<i class="fa fa-square"></i>
					</div>
				</li>
				<li class="columns">
					<div class="scale-50">
						<i class="fa fa-square"></i>
						<i class="fa fa-square"></i>
					</div>
				</li>
				<li class="panel"><i class="fa fa-gear"></i></li>
				<li class="url">
					<input type="text" placeholder="https://">
				</li>
			</ul>
			<ul class="right">
				<li class="sync sync-right"><i class="fa fa-long-arrow-right"></i></li>
				<li class="sync sync-down"><i class="fa fa-long-arrow-down"></i></li>
				<li class="refresh"><i class="fa fa-refresh"></i></li>

				<li class="rows">
					<div class="scale-50 fa-rotate-90">
						<i class="fa fa-square"></i>
						<i class="fa fa-square"></i>
					</div>
				</li>
				<li class="columns">
					<div class="scale-50">
						<i class="fa fa-square"></i>
						<i class="fa fa-square"></i>
					</div>
				</li>

				<li class="close-panel"><i class="fa fa-sign-out"></i></li>
				<li class="close-dropdown"><i class="fa fa-sign-out"></i>
					<ul class="dropdown">
						<li class="close-panel"><i class="fa fa-gear"></i><span>Panel</span></li>
						<li class="close-site"><i class="fa fa-globe"></i>Site</li>
					</ul>
				</li>
			</ul>
		</nav>
		<div class="iframe">
			<div class="message message-saved"><i class="fa fa-check"></i></div>
			<div class="message message-error"><i class="fa fa-exclamation"></i></div>
		</div>
	</section>
	<section class="site">
		<nav>
			<ul class="left">
				<li class="rows">
					<div class="scale-50 fa-rotate-90">
						<i class="fa fa-square"></i>
						<i class="fa fa-square"></i>
					</div>
				</li>
				<li class="columns">
					<div class="scale-50">
						<i class="fa fa-square"></i>
						<i class="fa fa-square"></i>
					</div>
				</li>
				<li class="site"><i class="fa fa-globe"></i></li>
				<li class="url">
					<input type="text" placeholder="https://">
				</li>
			</ul>
			<ul class="right">
				<li class="sync sync-left"><i class="fa fa-long-arrow-left"></i></li>
				<li class="sync sync-up"><i class="fa fa-long-arrow-up"></i></li>
				<li class="refresh"><i class="fa fa-refresh"></i></li>
				
				<li class="rows">
					<div class="scale-50 fa-rotate-90">
						<i class="fa fa-square"></i>
						<i class="fa fa-square"></i>
					</div>
				</li>
				<li class="columns">
					<div class="scale-50">
						<i class="fa fa-square"></i>
						<i class="fa fa-square"></i>
					</div>
				</li>

				<li class="close-site"><i class="fa fa-sign-out"></i></li>
				<li class="close-dropdown"><i class="fa fa-sign-out"></i>
					<ul class="dropdown">
						<li class="close-panel"><i class="fa fa-gear"></i><span>Panel</span></li>
						<li class="close-site"><i class="fa fa-globe"></i>Site</li>
					</ul>
				</li>
			</ul>
		</nav>
		<div class="iframe">
			<div class="message message-saved"><i class="fa fa-check"></i></div>
			<div class="message message-error"><i class="fa fa-exclamation"></i></div>
		</div>
	</section>
</div>

<?php echo js( splitviewTool::js() ); ?>
<script>
splitview.init( '<?php echo json_encode( $_GET ); ?>' );
</script>
</body>
</html>