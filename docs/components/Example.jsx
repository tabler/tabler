export default function Example (props) {
  console.log('props', props.children)

  return (
		<div>{props.children}</div>
  )
}