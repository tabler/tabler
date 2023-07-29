import ResponsiveImage from '@/components/ResponsiveImage';

export default function EmailImage({ email, dark = false, full = false, ...props }) {
  const width = full ? email.widthFull : email.width;
  const height = full ? email.heightFull : email.height;

  return (
    <ResponsiveImage
      src={`/img/tabler-emails/screenshots/${email.screenshot}${dark ? '-dark' : ''}${full ? '-full' : ''}.png`}
      width={width}
      height={height}
      {...props}
    />
  );

  // return (
  //     <div className="rounded bg-white border-light" style={{ position: 'relative', paddingTop: `${height / width * 100}%`, overflow: 'hidden'}}>
  //       <div style={{ background: `url() no-repeat top center/cover`, position: 'absolute', top: -2, left: -2, right: -2, bottom: -2 }} />
  //     </div>
  // )
}
