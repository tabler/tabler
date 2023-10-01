import Icon from '@/components/Icon';
import IconSvg from '@/components/IconSvg';
import { download, getHtmlChar, toPascalCase } from '@/helpers';
import { useClipboard } from '@/hooks';

const IconModal = ({ name, tags, svg, unicode }: { name: string; tags: string[]; svg: string; unicode: string }) => {
  const clipboard = useClipboard();

  const subNames = [
    { name: 'Icon' + toPascalCase(name), tooltip: 'Copy React name' },
    { name: getHtmlChar(unicode), tooltip: 'Copy HTML char' },
    { name: unicode, tooltip: 'Copy hex' },
  ];

  return (
    <div className="modal-content row">
      <div className="md:col-4">
        <IconSvg svg={svg} key={name} className="icon-lg" />
      </div>
      <div className="md:col-8 icon-details">
        <h2 className="h2 m-0 mb-2">{name}</h2>
        <div className="mb-3">
          <div className="list-inline-dots font-h5">
            {subNames.map((subName) => (
              <div key={subName.name}>
                <a onClick={() => clipboard.copy(subName.name)} className="tooltip" data-title={subName.tooltip}>
                  {subName.name}
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4 d-none sm:d-block">
          <div className="tags-list">
            {tags.map((tag) => (
              <span key={tag} className="tag tag-sm">
                {tag}
              </span>
            ))}
          </div>
          <div className="row row mt-auto">
            <div className="col"></div>
            <div className="col-12 md:col-auto">
              <div className="btn-list flex-column md:flex-row">
                <a className="btn" onClick={() => download(svg, `${name}.svg`, 'image/svg+xml')}>
                  <Icon name="download" /> SVG
                </a>
                <a className="btn" href={'api/icon-image/' + name + '?withName=false&withTags=false&size=240'} download>
                  <Icon name="download" />
                  PNG
                </a>
                <a className="btn btn-primary" onClick={() => clipboard.copy(svg)}>
                  <Icon name="copy" />
                  Copy SVG
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a className="modal-more text-center py-3" href={'/icons-page/' + name}>
        See more icon variants
      </a>
    </div>
  );
};

export default IconModal;
