import { notFound } from 'next/navigation';
import { docs } from '../../../lib/docs';
import { CustomizationGuide } from '../../../lib/customizations';

export const dynamicParams = false;
export function generateStaticParams() {
  return docs.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = docs.find((doc) => doc.slug === slug);
  return { title: doc?.title ?? 'Not found', description: doc?.description };
}
export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = docs.find((doc) => doc.slug === slug);
  if (!doc) notFound();
  return (
    <article className='doc-article'>
      <header>
        <span className='eyebrow'>{doc.group}</span>
        <h1>{doc.title}</h1>
        <p className='lead'>{doc.description}</p>
      </header>
      {doc.preview && (
        <section aria-label={`${doc.title} preview`} className='demo'>
          <div className='demo-label'>Preview</div>
          <div className='demo-body'>{doc.preview}</div>
        </section>
      )}
      <section>
        <h2>{doc.group === 'Components' ? 'Usage' : 'Get started'}</h2>
        <pre>
          <code>{doc.code}</code>
        </pre>
      </section>
      <section className='prose'>{doc.content}</section>
      <CustomizationGuide slug={slug} />
      {doc.group === 'Components' && (
        <section>
          <h2>Props</h2>
          <p className='muted'>
            Components accept native HTML props, className, and style. Server-compatible primitives also forward React 19 refs; Modal manages its own dialog ref.
          </p>
          {doc.props && (
            <div className='table-wrap'>
              <table>
                <thead>
                  <tr>
                    <th>Prop</th>
                    <th>Type</th>
                    <th>Default</th>
                  </tr>
                </thead>
                <tbody>
                  {doc.props.map(([name, type, value]) => (
                    <tr key={name}>
                      <td>
                        <code>{name}</code>
                      </td>
                      <td>{type}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </article>
  );
}
