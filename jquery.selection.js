/*!
 * jQuery.selection - jQuery Plugin
 *
 * Copyright (c) 2010-2014 IWASAKI Koji (@madapaja).
 * http://blog.madapaja.net/
 * Under The MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function(e,t,n){var r=function(e){var r={text:"",start:0,end:0};if(!e.value){return r}try{if(t.getSelection){r.start=e.selectionStart;r.end=e.selectionEnd;r.text=e.value.slice(r.start,r.end)}else if(n.selection){e.focus();var i=n.selection.createRange(),s=n.body.createTextRange(),o;r.text=i.text;try{s.moveToElementText(e);s.setEndPoint("StartToStart",i)}catch(u){s=e.createTextRange();s.setEndPoint("StartToStart",i)}r.start=e.value.length-s.text.length;r.end=r.start+i.text.length}}catch(u){}return r};var i={getPos:function(e){var t=r(e);return{start:t.start,end:t.end}},setPos:function(e,n,r){r=this._caretMode(r);if(r=="start"){n.end=n.start}else if(r=="end"){n.start=n.end}e.focus();try{if(e.createTextRange){var i=e.createTextRange();if(t.navigator.userAgent.toLowerCase().indexOf("msie")>=0){n.start=e.value.substr(0,n.start).replace(/\r/g,"").length;n.end=e.value.substr(0,n.end).replace(/\r/g,"").length}i.collapse(true);i.moveStart("character",n.start);i.moveEnd("character",n.end-n.start);i.select()}else if(e.setSelectionRange){e.setSelectionRange(n.start,n.end)}}catch(s){}},getText:function(e){return r(e).text},_caretMode:function(e){e=e||"keep";if(e===false){e="end"}switch(e){case"keep":case"start":case"end":break;default:e="keep"}return e},replace:function(t,n,i){var s=r(t),o=t.value,u=e(t).scrollTop(),a={start:s.start,end:s.start+n.length};t.value=o.substr(0,s.start)+n+o.substr(s.end);e(t).scrollTop(u);this.setPos(t,a,i)},insertBefore:function(t,n,i){var s=r(t),o=t.value,u=e(t).scrollTop(),a={start:s.start+n.length,end:s.end+n.length};t.value=o.substr(0,s.start)+n+o.substr(s.start);e(t).scrollTop(u);this.setPos(t,a,i)},insertAfter:function(t,n,i){var s=r(t),o=t.value,u=e(t).scrollTop(),a={start:s.start,end:s.end};t.value=o.substr(0,s.end)+n+o.substr(s.end);e(t).scrollTop(u);this.setPos(t,a,i)}};e.extend({selection:function(r){var i=(r||"text").toLowerCase()=="text";try{if(t.getSelection){if(i){return t.getSelection().toString()}else{var s=t.getSelection(),o;if(s.getRangeAt){o=s.getRangeAt(0)}else{o=n.createRange();o.setStart(s.anchorNode,s.anchorOffset);o.setEnd(s.focusNode,s.focusOffset)}return e("<div></div>").append(o.cloneContents()).html()}}else if(n.selection){if(i){return n.selection.createRange().text}else{return n.selection.createRange().htmlText}}}catch(u){}return""}});e.fn.extend({selection:function(e,t){t=t||{};switch(e){case"getPos":return i.getPos(this[0]);case"setPos":return this.each(function(){i.setPos(this,t)});case"replace":return this.each(function(){i.replace(this,t.text,t.caret)});case"insert":return this.each(function(){if(t.mode=="before"){i.insertBefore(this,t.text,t.caret)}else{i.insertAfter(this,t.text,t.caret)}});case"get":default:return i.getText(this[0])}return this}})})(jQuery,window,window.document)