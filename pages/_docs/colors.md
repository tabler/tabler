---
title: Colors
menu: docs.colors
description: 
bootstrap-link: https://getbootstrap.com/docs/4.4/utilities/colors/
---

<div class="row">
	<div class="col-sm-6 col-md-6">
		<div class="card">
			<div class="card-header">
				<h3 class="card-title">
					Default colors
				</h3>
			</div>
			<div class="card-body">
				<ul class="list-unstyled">
					{% for color in site.colors %}
					<li class="d-flex align-items-center mb-3">
						<div class="stamp bg-{{ color[0] }} text-white mr-3"></div>
						<div>
							<strong>{{ color[1].title }}</strong><br />
							<code>.bg-{{ color[0] }}</code>
						</div>
					</li>
					{% endfor %}
				</ul>
			</div>
		</div>
	</div>
	<div class="col-sm-6 col-md-6">
		<div class="card">
			<div class="card-header">
				<h3 class="card-title">
					Light colors
				</h3>
			</div>
			<div class="card-body">
				<ul class="list-unstyled">
					{% for color in site.colors %}
					<li class="d-flex align-items-center mb-3">
						<div class="stamp bg-{{ color[0] }}-lt mr-3"></div>
						<div>
							<strong>{{ color[1].title }} lite</strong><br />
							<code class="bg-{{color[0]}}-lt">.bg-{{ color[0] }}-lt</code>
						</div>
					</li>
					{% endfor %}
				</ul>
			</div>
		</div>
	</div>
</div>
