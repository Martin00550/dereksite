import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import assert from 'node:assert/strict';
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','--host','127.0.0.1','--port','4175','--strictPort'],{stdio:'pipe'});
let browser;
try {
 let ready=false;for(let i=0;i<100;i++){try{if((await fetch('http://127.0.0.1:4175')).ok){ready=true;break}}catch{}await new Promise(r=>setTimeout(r,100));}assert.ok(ready);
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4175');
 for(const width of [320,375,390,768,1024,1440]){await page.setViewportSize({width,height:900});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow at ${width}`);}
 assert.equal(await page.locator('h1').count(),1);assert.equal(await page.locator('.service-card').count(),6);
 const text=await page.locator('body').innerText();assert.doesNotMatch(text,/Oak & Fern|landscaping|Galway|€|353/);assert.match(text,/call-out fee/);assert.match(text,/credited toward your labor cost/);assert.match(text,/U.S. by arrangement/);
 for(const link of await page.locator('a[target="_blank"]').all()){assert.equal(await link.getAttribute('href'),'https://www.facebook.com/profile.php?id=61594562596712');assert.match(await link.getAttribute('rel'),/noopener/);}
 for(const a of await page.locator('a[href^="#"]').all()){const id=await a.getAttribute('href');assert.equal(await page.locator(id).count(),1);}
 await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Open navigation'}).click();assert.equal(await page.locator('#mobile-nav').isVisible(),true);await page.locator('#mobile-nav a').first().click();assert.equal(await page.locator('#mobile-nav').isVisible(),false);
 await page.locator('details').first().locator('summary').click();assert.equal(await page.locator('details').first().getAttribute('open'),'');assert.deepEqual(errors,[]);
 mkdirSync('test-results',{recursive:true});await page.screenshot({path:'test-results/derek-mobile.png',fullPage:true});await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'test-results/derek-desktop.png',fullPage:true});
 console.log('PASS: six widths, services, booking policy, Facebook links, section links, mobile navigation, FAQs, no browser errors.');
}finally{await browser?.close();server.kill();}
