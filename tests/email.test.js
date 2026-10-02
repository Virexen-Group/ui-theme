import {test} from "node:test";
import assert from "node:assert/strict";
import {renderEmail} from "../src/email.js";
const template = {subject:"Hello {{name}}", html:'<h1>{name}</h1><p>{{code}}</p><a href="{{link}}">Continue</a>', text:"Hello {{name}} {{code}}", urlVariables:["link"]};
test("escapes variables, handles both syntaxes and preserves text",()=>{
 const result=renderEmail(template,{name:'<img src=x onerror=alert(1)>',code:"123456",link:"https://example.com/?a=1&b=2"},{to:"test@example.test"});
 assert.ok(result.html.includes("&lt;img")); assert.ok(!result.html.includes("<img src=x")); assert.ok(result.text.includes("<img")); assert.ok(result.html.includes("123456"));
});
test("rejects missing variables, header injection and unsafe URLs",()=>{
 assert.throws(()=>renderEmail(template,{}),/Missing/);
 assert.throws(()=>renderEmail(template,{name:"Test",code:"123",link:"javascript:alert(1)"}),/Invalid/);
 assert.throws(()=>renderEmail(template,{name:"Test\r\nBcc:x",code:"123",link:"https://example.com"}),/newlines/);
});
test("removes active content from editable HTML",()=>{
 const result=renderEmail({subject:"Test",text:"Test",html:'<script>alert(1)</script><p onclick="alert(1)">Safe</p><a href="javascript:alert(1)">Bad</a><iframe src="https://evil.test"></iframe>'},{});
 assert.ok(!result.html.includes("<script")); assert.ok(!result.html.includes("onclick")); assert.ok(!result.html.includes("javascript:")); assert.ok(!result.html.includes("<iframe"));
});
