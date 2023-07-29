import { uiPackageName, uiVersion } from '@/config/site';

export const generateIframeContent = ({
  html,
  wrapper,
  plugins = [],
  backgroundColor = '',
}) => {
  const pluginsHtml = plugins
    .map((plugin) => {
      return `<link href="https://cdn.jsdelivr.net/npm/${uiPackageName}@${uiVersion}/dist/css/tabler-${plugin}.min.css" rel="stylesheet"/>`;
    })
    .join('\n');

  html = (
    html ||
    '<a href="#" class="btn">Button</a><a href="#" class="btn btn-primary">Primary button</a><a href="#" class="btn btn-danger">Danger button</a>'
  ).replace(/href="#"/g, 'href="javascript:void(0)"');

  const code = `
   <!doctype html>
		<html>
		<head>
			<link href="https://cdn.jsdelivr.net/npm/${uiPackageName}@${uiVersion}/dist/css/tabler.min.css" rel="stylesheet"/>
			${pluginsHtml}
		</head>
		<body class="h-100 p-3 overflow-auto${
      backgroundColor ? ` bg-${backgroundColor}` : ''
    }">
			<div class="d-flex h-100 align-items-center">
				<div class="w-100 d-flex flex-column justify-content-center space-x-2">
					${wrapper ? `<div class="${wrapper}">${html}</div>` : html}
				</div>
			</div>

			<script src="https://cdn.jsdelivr.net/npm/${uiPackageName}@${uiVersion}/dist/js/tabler.min.js"></script>
		</body>
	</html>
	`;

  return code.replace(/\t+/g, ' ').replace(/\s+/g, ' ');
};

