export default function Pre (props) {
  console.log('pre', props.children)

  return (
		<pre>{props.children}</pre>
  )
}