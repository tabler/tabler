import IconSvg from '@/components/IconSvg';
import { useClipboard } from '@/hooks';

const IconModal = ({ name, category, tags, svg, unicode }) => {
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
        <h2>{name}</h2>
        <div className="list-inline-dots">
          {subNames.map((subName) => (
            <div key={subName.name}>
              <a onClick={() => clipboard.copy(subName.name)} className="tooltip" data-title={subName.tooltip}>
                {subName.name}
              </a>
            </div>
          ))}
        </div>
        <div className="tags-list">
          {tags.map((tag) => (
            <span key={tag} className="tag tag-sm">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IconModal;
