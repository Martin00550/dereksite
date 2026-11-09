import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { client } from '../src/client-config.js';
test('business metadata and contact identify Derek without old template claims',()=>{const html=readFileSync('index.html','utf8');assert.match(html,/<title>Derek-AutoForge/);assert.match(html,/Travel across the U.S. by arrangement/);assert.doesNotMatch(html,/Landscaping|Galway|Oak &amp; Fern/);assert.equal(new URL(client.facebook).searchParams.get('id'),'61594562596712');assert.equal(client.services.length,6);});
