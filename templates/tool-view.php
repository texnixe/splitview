<div class="bar">
	<ul class="left">
		<li class="url">
			<div class="input">
				<input type="text" placeholder="https://">
			</div>
		</li>
	</ul>
	<ul class="right">
		<li class="show">
			<div class="button">
				<img src="<?php echo SplitviewTool::uri(); ?>/images/svg/inverted/chevron-left.svg">
			</div>
		</li>
		<li class="flash">
			<div class="button">
				<img src="<?php echo SplitviewTool::uri(); ?>/images/svg/inverted/flash.svg">
			</div>
			<ul class="dropdown list">
				<li class="refresh">
					<div class="icon-right">
						<img src="<?php echo SplitviewTool::uri(); ?>/images/svg/cw.svg">
					</div>
					<div class="label">Refresh</div>
				</li>
				<li class="copy">
					<div class="icon-right">
						<div class="icon-arrow-right">
							<img src="<?php echo SplitviewTool::uri(); ?>/images/svg/arrow-long-right.svg">
						</div>
						<div class="icon-arrow-left">
							<img src="<?php echo SplitviewTool::uri(); ?>/images/svg/arrow-long-left.svg">
						</div>
						<div class="icon-arrow-up">
							<img src="<?php echo SplitviewTool::uri(); ?>/images/svg/arrow-long-up.svg">
						</div>
						<div class="icon-arrow-down">
							<img src="<?php echo SplitviewTool::uri(); ?>/images/svg/arrow-long-down.svg">
						</div>
					</div>
					<div class="label">Copy</div>
				</li>
				<li class="sync">
					<div class="icon-right">
						<div class="icon-arrow-right">
							<img src="<?php echo SplitviewTool::uri(); ?>/images/svg/arrow-long-right.svg">
						</div>
						<div class="icon-arrow-left">
							<img src="<?php echo SplitviewTool::uri(); ?>/images/svg/arrow-long-left.svg">
						</div>
						<div class="icon-arrow-up">
							<img src="<?php echo SplitviewTool::uri(); ?>/images/svg/arrow-long-up.svg">
						</div>
						<div class="icon-arrow-down">
							<img src="<?php echo SplitviewTool::uri(); ?>/images/svg/arrow-long-down.svg">
						</div>
					</div>
					<div class="label">Sync</div>
				</li>
				<li class="autosync">
					<div class="icon-right">
						<img class="default" src="<?php echo SplitviewTool::uri(); ?>/images/svg/loop.svg">
						<img class="inverted" src="<?php echo SplitviewTool::uri(); ?>/images/svg/inverted/loop.svg">
					</div>
					<div class="label">Autosync</div>
				</li>
			</ul>
		</li>
		<li class="zoom">
			<div class="button">
				<img src="<?php echo SplitviewTool::uri(); ?>/images/svg/inverted/magnifying-glass.svg">
			</div>
			<ul class="dropdown">
				<li class="zoom-form">
					<div class="title">Zoom factor</div>
					<div class="zoom-group">
						<div class="zoom-minus">
							<div class="zoom-button">
								<img src="<?php echo SplitviewTool::uri(); ?>/images/svg/minus.svg">
							</div>
						</div>						

						<div class="zoom-custom">
							<input type="number" min="0" step="0.1" value="1">
						</div>

						<div class="zoom-plus">
							<div class="zoom-button">
								<img src="<?php echo SplitviewTool::uri(); ?>/images/svg/plus.svg">
							</div>
						</div>
					</div>
				</li>
				<li class="zoom-reset">
					<div class="zoom-reset-button">Reset</div>
				</li>
			</ul>
		</li>
		<li class="screen">
			<div class="button">
				<img src="<?php echo SplitviewTool::uri(); ?>/images/svg/inverted/tablet-mobile-combo.svg">
			</div>
			<ul class="dropdown">
				<li class="sizes">
					<div class="title">Pixels (px)</div>
					<table class="size-list">
						<tr>
							<td>
								<div class="size" data-width="320" data-unit="px"><div class="size-inside">320</div></div>
							</td>
							<td>
								<div class="size" data-width="480" data-unit="px"><div class="size-inside">480</div></div>
							</td>
							<td>
								<div class="size" data-width="640" data-unit="px"><div class="size-inside">640</div></div>
							</td>
						</tr>
						<tr>
							<td>
								<div class="size" data-width="800" data-unit="px"><div class="size-inside">800</div></div>
							</td>
							<td>
								<div class="size" data-width="1024" data-unit="px"><div class="size-inside">1024</div></div>
							</td>
							<td>
								<div class="size" data-width="1140" data-unit="px"><div class="size-inside">1140</div></div>
							</td>
						</tr>
					</table>
				</li>
				<li class="sizes">
					<div class="title">Percentage (%)</div>
					<table class="size-list">
						<tr>
							<td>
								<div class="size" data-width="25" data-unit="%"><div class="size-inside">25</div></div>
							</td>
							<td>
								<div class="size" data-width="33" data-unit="%"><div class="size-inside">33</div></div>
							</td>
							<td>
								<div class="size" data-width="50" data-unit="%"><div class="size-inside">50</div></div>
							</td>
						</tr>
					</table>
				</li>
				<li class="size-form">
					<div class="size-form-inside">
						<input type="number" min="0">
						<select>
							<option value="px">px</option>
							<option value="%">%</option>
						</select>
					</div>
				</li>
			</ul>
		</li>
		<li class="views">
			<div class="button">
				<img src="<?php echo SplitviewTool::uri(); ?>/images/svg/inverted/grid.svg">
			</div>
			<ul class="dropdown list">
				<li class="section1">
					<div class="icon-right">
						<div class="icon-orientation">
							<div class="icon-single"></div>
						</div>
					</div>
					<div class="label label-single">Switch</div>
					<div class="label label-multiple">Current</div>
				</li>
				<li class="section2">
					<div class="icon-right">
						<div class="icon-orientation">
							<div class="icon-single"></div>
						</div>
					</div>
					<div class="label-single">Switch</div>
					<div class="label-multiple">Current</div>
				</li>
				<li class="rows">
					<div class="icon-right">
						<div class="icon-orientation">
							<div class="icon-row"></div><br>
							<div class="icon-row"></div>
						</div>
					</div>
					<div class="label">Rows</div>
				</li>
				<li class="columns">
					<div class="icon-right">
						<div class="icon-orientation">
							<div class="icon-columns"></div>
							<div class="icon-columns"></div>
						</div>
					</div>
					<div class="label">Columns</div>
				</li>
				<li class="flip">
					<div class="icon-right">
						<img src="<?php echo SplitviewTool::uri(); ?>/images/svg/swap.svg">
					</div>
					<div class="label">Flip</div>
				</li>
				<li class="free">
					<div class="icon-right">
						<img src="<?php echo SplitviewTool::uri(); ?>/images/svg/eye.svg">
					</div>
					<div class="label">Distraction free</div>
				</li>
			</ul>
		</li>
		<li class="close">
			<div class="button">
				<img src="<?php echo SplitviewTool::uri(); ?>/images/svg/inverted/cross.svg">
			</div>
			<ul class="dropdown list">
				<li class="exit">
					<div class="icon-right">
						<img src="<?php echo SplitviewTool::uri(); ?>/images/svg/log-out.svg">
					</div>
					<div class="label">Exit to this view</div>
				</li>
			</ul>
		</li>
	</ul>
</div>
<div class="iframe">
	<div class="address"></div>
	<div class="message message-saved">
		<img src="<?php echo SplitviewTool::uri(); ?>/images/svg/inverted/check.svg">
	</div>
	<div class="message message-error">
		<img src="<?php echo SplitviewTool::uri(); ?>/images/svg/inverted/cross.svg">
	</div>
</div>