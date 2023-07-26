import Shape from '@/components/Shape';

export const metadata = {
  title: 'Support',
  description: 'Get help and assistance on our Support page. Find answers to your queries and resolve issues quickly. We\'re here to support you.',
};

export default function Support() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h1 className="section-title section-title-lg">Tabler Support</h1>
          <p className="section-description">
            If you have any questions regarding our theme, feel free to contact us using one of the methods below. We
            usually reply within 24 hours.
          </p>
        </div>

        <div className="row xl:g-6">
          <div className="sm:col-6 lg:col-4">
            <div className="box text-center">
              <Shape icon="message" color="primary" size="md" className="mb-4" />
              <h3>General Inquiry</h3>
              <p className="text-muted">
                Have a question? Something is not clear? Or maybe you just want to say ‘Hi!’ We usually reply within 24
                hours.
              </p>
              <a href="mailto:hello@tabler.io" className="btn">
                Send a Message
              </a>
            </div>
          </div>

          <div className="sm:col-6 lg:col-4">
            <div className="box text-center">
              <Shape icon="settings" color="primary" size="md" className="mb-4" />
              <h3>Technical Support</h3>
              <p className="text-muted">
                Something is wrong with one of our theme? Found a bug or have a feature request?
              </p>
              <a
                href="https://github.com/tabler/tabler/issues/new/choose"
                className="btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open a new issue
              </a>
            </div>
          </div>

          <div className="sm:col-6 lg:col-4">
            <div className="box text-center">
              <Shape icon="adjustments" color="primary" size="md" className="mb-4" />
              <h3>Customization</h3>
              <p className="text-muted">
                Need one of theme customized? Let us know exactly what you need and we’ll get back to you with a quote.
              </p>
              <a href="mailto:support@tabler.io" className="btn">
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
