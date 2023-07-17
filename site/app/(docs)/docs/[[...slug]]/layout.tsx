// import Link from "next/link";
// import { useRouter } from "next/router";

// import { getCategory, getDocsMenu, getPrevNext } from "@/lib/docs";
import DocsMenu from '@/components/DocsMenu';

// import Icon from "@/components/Icon";

export default function DocsLayout({ children /*, meta = {}, pageProps*/ }) {
  // const docsMenu = getDocsMenu(),
  //   router = useRouter(),
  //   category = getCategory(router.pathname),
  //   [prev, next] = getPrevNext(router.pathname)

  return (
    <div className="border-bottom border-top">
      <div className="container">
        <div className="row g-0">
          <div className="md:col-auto docs-side">
            {/*<input type="search" className="form-control w-100 mb-5" placeholder="Search&hellip;" />*/}
            <DocsMenu />
          </div>
          <div className="md:col">
            <div className="py-6 md:pl-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
