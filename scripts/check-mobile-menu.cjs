const vm = require('node:vm');
const fs = require('node:fs');
const assert = require('node:assert/strict');
function element() {
  const events = {}, attrs = {}, classes = new Set();
  return { events, attrs, focused: false,
    addEventListener(type, fn) { events[type] = fn; },
    setAttribute(key, value) { attrs[key] = value; }, getAttribute(key) { return attrs[key]; },
    focus() { this.focused = true; },
    classList: { add(key) { classes.add(key); }, remove(key) { classes.delete(key); }, contains(key) { return classes.has(key); }, toggle(key, on) { on ? classes.add(key) : classes.delete(key); } }
  };
}
const menu = element(), nav = element(), document = element(), media = element();
menu.setAttribute('aria-expanded', 'false');
document.querySelector = selector => selector === '.menu' ? menu : nav;
const source = fs.readFileSync(require('node:path').join(__dirname, '../app.js'),'utf8').split('const lightbox =')[0];
vm.runInNewContext(source, {document, window:{matchMedia:()=>media}});
const isOpen = () => {assert.equal(menu.getAttribute('aria-expanded'),'true');assert(nav.classList.contains('open'));};
const isClosed = () => {assert.equal(menu.getAttribute('aria-expanded'),'false');assert(!nav.classList.contains('open'));};
menu.events.click(); isOpen(); menu.events.click(); isClosed();
menu.events.click(); nav.events.click({target:{closest:()=>({})}}); isClosed();
menu.events.click(); document.events.click({target:{closest:()=>null}}); isClosed();
menu.events.click(); document.events.click({target:{closest:()=>({})}}); isOpen();
document.events.keydown({key:'Escape'}); isClosed(); assert(menu.focused);
menu.events.click(); media.events.change(); isClosed();
console.log('Mobile menu checks passed: toggle, link selection, outside tap, inside tap, Escape focus return and breakpoint change.');
