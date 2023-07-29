export default function BlogAuthors({ authors }) {
  return (
    <>
      {authors.map(author => (
        <div key={author.twitter} className="row gx-3 items-center">
          <div className="col-auto">
            <img src={author.avatar} alt="" className="avatar" />
          </div>
          <div className="col">
            <div>{author.name}</div>
            <div>
              <a href={`https://twitter.com/${author.twitter}`} target="_blank" rel="noopener noreferrer">
                @{author.twitter}
              </a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
