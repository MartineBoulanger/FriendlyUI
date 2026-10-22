'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export function Navigation({items}: {items: {slug:string; title:string; group:string}[]}) {
  const pathname = usePathname();
  return <nav aria-label="Documentation">{['Start here', 'Components'].map(group => <div className="nav-group" key={group}><p>{group}</p>{items.filter(item => item.group === group).map(item => {
    const href = `/docs/${item.slug}/`;
    const active = pathname.replace(/\/$/, '') === href.replace(/\/$/, '');
    return <Link key={item.slug} href={href} aria-current={active ? 'page' : undefined}>{item.title}</Link>;
  })}</div>)}</nav>;
}
