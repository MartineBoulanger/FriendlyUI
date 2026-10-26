import type { ReactNode } from 'react';
import Link from 'next/link';
import { docs } from '../lib/docs';
import { Navigation } from './navigation';
import './globals.css';

export const metadata = {
  title: {
    default: 'Friendly UI — Built for the server. Ready for you.',
    template: '%s · Friendly UI',
  },
  description:
    'Small, server-first React components for Next.js. One theme file. Your choice of CSS.',
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <a className='skip-link' href='#content'>
          Skip to content
        </a>
        <header className='site-header'>
          <Link className='brand' href='/'>
            <span aria-hidden='true' className='brand-icon'>
              fui
            </span>
            Friendly UI<span className='version'>0.1</span>
          </Link>
          <Link className='header-link' href='/docs/installation/'>
            Documentation <span aria-hidden='true'>↗</span>
          </Link>
        </header>
        <div className='site-layout'>
          <aside className='sidebar'>
            <Navigation
              items={docs.map(({ slug, title, group }) => ({
                slug,
                title,
                group,
              }))}
            />
            <div className='sidebar-note'>
              Small by design.
              <br />
              Yours to make your own.
            </div>
          </aside>
          <main id='content' tabIndex={-1}>
            {children}
            <footer className='site-footer'>
              Friendly UI · An independent project.
              <span>Built with its own components.</span>
            </footer>
          </main>
        </div>
      </body>
    </html>
  );
}
