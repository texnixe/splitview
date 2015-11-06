<div class="splitbar__wrap splitbar--hide">
	<div class="splitbar__menu">
		<div class="splitbar__menu--panel">
			<div class="splitbar__menu__item--full" title="Full panel view">
				<i class="fa fa-arrows-alt"></i><span>Panel</span>
			</div>
			<div class="splitbar__menu__item--columns splitbar--hide" title="Split preview">
				<i class="fa fa-columns"></i><span>Columns</span>
			</div>
		</div>
		<div class="splitbar__menu--site">
			<div class="splitbar__menu__item--full" title="Full site view">
				<i class="fa fa-arrows-alt"></i><span>Site</span>
			</div>
			<div class="splitbar__menu__item--columns splitbar--hide" title="Split preview">
				<i class="fa fa-columns"></i><span>Columns</span>
			</div>
			<div class="splitbar__menu__item--refresh" title="Reload site view">
				<i class="fa fa-refresh"></i><span>Refresh</span>
			</div>
		</div>
		<div class="splitbar__menu--close">
			<div class="splitbar__menu__item--close" title="Close split preview">
				<i class="fa fa-times"></i>
			</div>
		</div>
	</div>
	<div class="splitbar__columns">
		<div class="splitbar__panel" data-splitbar-url="<?php echo u(); ?>/panel/pages/<?php echo $page->uri(); ?>/edit"></div>
		<div class="splitbar__site" data-splitbar-url="<?php echo $page->url(); ?>"></div>
	</div>
</div>

<div class="splitbar__message splitbar--hide">Sorry! Splitbar does not work in this resolution.</div>