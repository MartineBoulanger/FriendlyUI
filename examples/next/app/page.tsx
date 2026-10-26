import Link from 'next/link';
import {
  Chip,
  Button,
  Card,
  Input,
  Label,
  Accordion,
} from '@fwenthehunter/friendly-ui';
import { Counter } from './counter';

export default function Home() {
  return (
    <div className='home'>
      <section className='hero'>
        <Chip>Server-first. Simply styled.</Chip>
        <h1>
          A friendly start
          <br />
          for your next UI.
        </h1>
        <p className='lead'>
          Small components for Next.js. Render on the server, add interaction
          when you need it, and make everything yours with one theme file.
        </p>
        <div className='hero-actions'>
          <Link className='link-button' href='/docs/installation/'>
            Start building <span aria-hidden='true'>→</span>
          </Link>
          <Link className='text-link' href='/docs/button/'>
            Explore components
          </Link>
        </div>
        <div className='hero-footnote'>
          React 19 <span> / </span> Next.js App Router <span> / </span> Tailwind
          optional
        </div>
      </section>
      <section className='home-section'>
        <div className='section-heading'>
          <div>
            <span className='eyebrow'>A few good basics</span>
            <h2>Familiar on purpose.</h2>
          </div>
          <span className='muted'>Real components. Right here.</span>
        </div>
        <div className='showcase-grid'>
          <Card className='showcase'>
            <div className='preview-row'>
              <Button>Get started</Button>
              <Button variant='secondary'>Cancel</Button>
            </div>
            <div>
              <h3>Just the right defaults</h3>
              <p>A quiet palette, native elements, and familiar props.</p>
            </div>
          </Card>
          <Card className='showcase'>
            <div className='field'>
              <Label htmlFor='home-email'>Email address</Label>
              <Input
                id='home-email'
                type='email'
                autoComplete='email'
                placeholder='you@example.com'
              />
            </div>
            <div>
              <h3>Form follows function</h3>
              <p>Labels, inputs, and the browser’s built-in behavior.</p>
            </div>
          </Card>
          <Card className='showcase'>
            <Accordion title='Less JavaScript? Absolutely.'>
              This disclosure works with JavaScript turned off.
            </Accordion>
            <div>
              <h3>Server by default</h3>
              <p>Native HTML can do more than you think.</p>
            </div>
          </Card>
          <Card className='showcase'>
            <Counter />
            <div>
              <h3>Interactive when you choose</h3>
              <p>The same Button, inside a small client wrapper.</p>
            </div>
          </Card>
        </div>
      </section>
      <section className='home-section recipe'>
        <div>
          <span className='eyebrow'>Nothing between you and your UI</span>
          <h2>Import. Compose. Done.</h2>
          <p className='muted'>
            No provider to wrap. No configuration ceremony. Start with a
            component and let your application grow from there.
          </p>
          <Link className='text-link' href='/docs/server-and-client/'>
            Understand server & client →
          </Link>
        </div>
        <pre>
          <code>{`import { Button, Card } from '@fwenthehunter/friendly-ui';\n\nexport default function Page() {\n  return (\n    <Card>\n      <h2>Make something yours.</h2>\n      <Button>Let’s go</Button>\n    </Card>\n  );\n}`}</code>
        </pre>
      </section>
    </div>
  );
}
