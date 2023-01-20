import menu from '../pages/docs/_menu.json'
import Link from 'next/link'

function getDocsMenu() {
  let m = []

  Object.entries(menu).map(([key, group], i) => {
	 if (typeof group === 'object') {
		m.push({
		  title: group.title,
		  url: null,
		  pages: Object.entries(group.pages).map(([subkey, subpage]) => {
			 return {
				title: subpage,
				url: `/docs/${key}/${subkey}`
			 }
		  })
		})
	 } else {
		m.push({
		  title: group,
		  url: `/docs/${key === 'index' ? '' : key}`
		})
	 }
  })

  return m
}

const DocsMenu = () => {
  const menu = getDocsMenu()

  return <nav>
	 <ul role="list" className="list-unstyled">
		{menu.map((page, i) => (
			 <li className="docs-menu-group" key={i}>
				{page.url ? <Link href={page.url} className="d-block text-muted py-1">
				  {page.title}
				</Link> : <div className="text-muted py-1">
              {page.title}
            </div>}
				{page.pages && (
					 <div className="ps-3">
						{page.pages.map((subpage, j) => (
							 <Link href={subpage.url} className="d-block text-muted py-1" key={j}>{subpage.title}</Link>
						))}
					 </div>
				)}
			 </li>
		))}
	 </ul>
  </nav>
}

export default function BaseLayout ({ children }) {
  return (
		<div className="container">
		  <div className="py-5">
			 <div className="row">
				<div className="col-3">
				  <DocsMenu />
				</div>
				<main className="col">
				  <article className="card card-lg">
					 <div className="card-body markdown">
						{children}
					 </div>
				  </article>
				</main>
			 </div>
		  </div>
		</div>
  )
}
