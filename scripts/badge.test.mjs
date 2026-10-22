import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createElement as h } from 'react';
import { renderToStaticMarkup as render } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import { Badge, Chip, Button, Avatar } from '@friendly-ui/react';

test('Chip retains the compact label and native props', () => {
  assert.equal(render(h(Chip, {className:'custom','data-status':'pending'}, 'Pending')), '<span data-status="pending" class="fui-chip custom">Pending</span>');
});
test('Badge wraps controls, caps the visible count and preserves its accessible value', () => {
  const {window} = new JSDOM(render(h(Badge, {content:120,position:'bottom-left'},h(Button,{},'Notifications'))));
  const wrapper=window.document.querySelector('.fui-badge');
  const marker=wrapper.querySelector('.fui-badge-indicator');
  assert.equal(wrapper.dataset.position,'bottom-left');
  assert.equal(wrapper.querySelector('button').textContent,'Notifications');
  assert.equal(marker.textContent,'99+');
  assert.equal(marker.getAttribute('aria-label'),'120');
  assert.equal(marker.getAttribute('role'),'img');
  window.close();
});
test('Badge hides empty and zero counts unless showZero is enabled', () => {
  for (const content of [undefined, '', 0]) assert.doesNotMatch(render(h(Badge,{content},'Child')),/fui-badge-indicator/);
  assert.match(render(h(Badge,{content:0,showZero:true},'Child')),/>0<\/span>/);
  assert.match(render(h(Badge,{content:50,max:9},'Child')),/>9\+<\/span>/);
});
test('Badge supports named status dots and decorative dots without count text', () => {
  const html=render(h(Badge,{dot:true,label:'Online',position:'bottom-right'},h(Avatar,{alt:'Ada Lovelace'})));
  assert.match(html,/fui-avatar/);assert.match(html,/data-dot="true" role="img" aria-label="Online"/);
  assert.match(render(h(Badge,{dot:true},'Child')),/data-dot="true" aria-hidden="true"/);
});
