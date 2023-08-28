import IconSvg from '@/components/IconSvg';

const IconModal = ({name, category, tags, svg, unicode}) => (
  <div className="modal-content row">
    <div className="md:col-4">
      <IconSvg svg={svg} key={name} className="icon-lg"/>
    </div>
    <div className="md:col-8 icon-details">
      <h2>{name}</h2>

    </div>
  </div>
);

export default IconModal;
