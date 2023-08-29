import IconSvg from '@/components/IconSvg';
import { useClipboard } from '@/hooks';

const IconModal = ({ name, tags, svg, unicode }) => {
  const clipboard = useClipboard();

  const subNames = [
    { name: 'Icon' + name.replace('-', ''), tooltip: 'Copy React name' }, // TODO How to get React name?
    { name: '&#x' + unicode + ';', tooltip: 'Copy HTML char' },
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
                {/* TODO Add icons */}
                <a className="btn">SVG</a>
                <a className="btn">PNG</a>
                <a className="btn btn-primary" onClick={() => clipboard.copy(svg)}>
                  Copy SVG
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconModal;
