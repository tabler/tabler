import { Container } from '@tabler/react';

export default function SingleLayout({
  children
}: {
  children: React.ReactNode,
}) {
  return (
    <section className="section">
      <Container size="narrow">{children}</Container>
    </section>
  );
}
