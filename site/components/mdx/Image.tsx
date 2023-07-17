export default function Image(props) {
  return (
    <figure>
      <img className={'border rounded'} alt="" {...props} />
      <figcaption>{props.alt}</figcaption>
    </figure>
  );
}
