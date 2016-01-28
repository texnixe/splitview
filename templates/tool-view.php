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
				<img src="<?php echo SplitviewTool::uri(); ?>/svg/inverted/chevron-left">
			</div>
		</li>
		<li class="flash">
			<div class="button">
				<img src="<?php echo SplitviewTool::uri(); ?>/svg/inverted/flash">
			</div>
			<ul class="dropdown list">
				<li class="refresh">
					<div class="icon-right">
						<img src="<?php echo SplitviewTool::uri(); ?>/svg/cw">
					</div>
					<div class="label"><?php echo l('refresh', 'Refresh'); ?></div>
				</li>
				<li class="copy">
					<div class="icon-right">
						<div class="icon-arrow-right">
							<img src="<?php echo SplitviewTool::uri(); ?>/svg/arrow-long-right">
						</div>
						<div class="icon-arrow-left">
							<img src="<?php echo SplitviewTool::uri(); ?>/svg/arrow-long-left">
						</div>
						<div class="icon-arrow-up">
							<img src="<?php echo SplitviewTool::uri(); ?>/svg/arrow-long-up">
						</div>
						<div class="icon-arrow-down">
							<img src="<?php echo SplitviewTool::uri(); ?>/svg/arrow-long-down">
						</div>
					</div>
					<div class="label"><?php echo l('copy', 'Copy'); ?></div>
				</li>
				<li class="sync">
					<div class="icon-right">
						<div class="icon-arrow-right">
							<img src="<?php echo SplitviewTool::uri(); ?>/svg/arrow-long-right">
						</div>
						<div class="icon-arrow-left">
							<img src="<?php echo SplitviewTool::uri(); ?>/svg/arrow-long-left">
						</div>
						<div class="icon-arrow-up">
							<img src="<?php echo SplitviewTool::uri(); ?>/svg/arrow-long-up">
						</div>
						<div class="icon-arrow-down">
							<img src="<?php echo SplitviewTool::uri(); ?>/svg/arrow-long-down">
						</div>
					</div>
					<div class="label"><?php echo l('sync', 'Sync'); ?></div>
				</li>
				<li class="autosync">
					<div class="icon-right">
						<img class="default" src="<?php echo SplitviewTool::uri(); ?>/svg/loop">
						<img class="inverted" src="<?php echo SplitviewTool::uri(); ?>/svg/inverted/loop">
					</div>
					<div class="label"><?php echo l('autosync', 'Autosync'); ?></div>
				</li>
			</ul>
		</li>
		<li class="zoom">
			<div class="button">
				<img src="<?php echo SplitviewTool::uri(); ?>/svg/inverted/magnifying-glass">
			</div>
			<ul class="dropdown">
				<li class="zoom-form">
					<div class="title"><?php echo l('zoom-factor', 'Zoom factor'); ?></div>
					<div class="zoom-group">
						<div class="zoom-minus">
							<div class="zoom-button">
								<img src="<?php echo SplitviewTool::uri(); ?>/svg/minus">
							</div>
						</div>						

						<div class="zoom-custom">
							<input type="number" min="0" step="0.1" value="1">
						</div>

						<div class="zoom-plus">
							<div class="zoom-button">
								<img src="<?php echo SplitviewTool::uri(); ?>/svg/plus">
							</div>
						</div>
					</div>
				</li>
				<li class="zoom-reset">
					<div class="zoom-reset-button"><?php echo l('reset', 'Reset'); ?></div>
				</li>
			</ul>
		</li>
		<li class="screen">
			<div class="button">
				<img src="<?php echo SplitviewTool::uri(); ?>/svg/inverted/tablet-mobile-combo">
			</div>
			<ul class="dropdown">
				<li class="sizes">
					<div class="title"><?php echo l('pixels', 'Pixels (px)'); ?></div>
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
					<div class="title"><?php echo l('percentage', 'Percentage (%)'); ?></div>
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
				<img src="<?php echo SplitviewTool::uri(); ?>/svg/inverted/grid">
			</div>
			<ul class="dropdown list">
				<li class="section1">
					<div class="icon-right">
						<div class="icon-orientation">
							<div class="icon-single"></div>
						</div>
					</div>
					<div class="label label-single"><?php echo l('switch', 'Switch'); ?></div>
					<div class="label label-multiple"><?php echo l('current', 'Current'); ?></div>
				</li>
				<li class="section2">
					<div class="icon-right">
						<div class="icon-orientation">
							<div class="icon-single"></div>
						</div>
					</div>
					<div class="label-single"><?php echo l('switch', 'Switch'); ?></div>
					<div class="label-multiple"><?php echo l('current', 'Current'); ?></div>
				</li>
				<li class="rows">
					<div class="icon-right">
						<div class="icon-orientation">
							<div class="icon-row"></div><br>
							<div class="icon-row"></div>
						</div>
					</div>
					<div class="label"><?php echo l('rows', 'Rows'); ?></div>
				</li>
				<li class="columns">
					<div class="icon-right">
						<div class="icon-orientation">
							<div class="icon-columns"></div>
							<div class="icon-columns"></div>
						</div>
					</div>
					<div class="label"><?php echo l('columns', 'Columns'); ?></div>
				</li>
				<li class="flip">
					<div class="icon-right">
						<img src="<?php echo SplitviewTool::uri(); ?>/svg/swap">
					</div>
					<div class="label"><?php echo l('flip', 'Flip'); ?></div>
				</li>
				<li class="free">
					<div class="icon-right">
						<img src="<?php echo SplitviewTool::uri(); ?>/svg/eye">
					</div>
					<div class="label"><?php echo l('distraction-free', 'Distraction free'); ?></div>
				</li>
			</ul>
		</li>
		<li class="close">
			<div class="button">
				<img src="<?php echo SplitviewTool::uri(); ?>/svg/inverted/cross">
			</div>
			<ul class="dropdown list">
				<li class="exit">
					<div class="icon-right">
						<img src="<?php echo SplitviewTool::uri(); ?>/svg/log-out">
					</div>
					<div class="label"><?php echo l('exit-to-this-view', 'Exit to this view'); ?></div>
				</li>
			</ul>
		</li>
	</ul>
</div>
<div class="iframe">
	<div class="address"></div>
	<div class="message message-saved">
		<img src="<?php echo SplitviewTool::uri(); ?>/svg/inverted/check">
	</div>
	<div class="message message-error">
		<img src="<?php echo SplitviewTool::uri(); ?>/svg/inverted/cross">
	</div>
</div>