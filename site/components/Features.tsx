import Shape from '@/components/Shape';

export default function Features({ list }) {
  return (
    <div className="row items-center text-center lg:g-6">
      {list.map((feature, i) => (
        <div className="md:col-6 lg:col" key={i} data-aos="fade-up" data-aos-delay={i * 150}>
          <Shape icon={feature.icon} size="md" className="mb-3" color="primary" />
          <h2 className="h3">{feature.title}</h2>
          <p className="text-muted">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
