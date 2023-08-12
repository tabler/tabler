import EntryHeader from '@/components/layout/EntryHeader';

export default function CoreLayout({
  children
}: {
  children: React.ReactNode,
}) {
  return (
    <>
      <EntryHeader />
      <div className="page page-center">
        <div className="container container-tight py-4">
          {children}
        </div>
      </div>
    </>
  );
}
