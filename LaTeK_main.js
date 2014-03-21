






























var shortcuts = {};
// i = italic
shortcuts['73'] = ['\\textit {','}'];
// b = bold
shortcuts['66'] = ['\\textbf {','}'];
// s = section
shortcuts['83'] = ['\\section {','}'];
// d = date
shortcuts['68'] = ['\\today',''];
// h = hline
shortcuts['72'] = ['\\hline',''];
// t = tabular
shortcuts['84'] = ['\\begin {tabular} {|c|c|} \n','[0,0] & [1,0]\\\\\n[0,1] & [1,1]\\\\\n\\end{tabular}'];
// q = quote
shortcuts['81'] = ['\\begin {quote}\n','\n\\end{quote}'];
// f = footnote
shortcuts['70'] = ['','\\footnote {}'];
// e = enumerate
shortcuts['69'] = ['\\begin {enumerate}\n','\\item [item 1]\n\\item [item 2]\n\\end{enumerate}'];
// p = dot points
shortcuts['80'] = ['\\begin {itemize}\n','\\item [item 1]\n\\item [item 2]\n\\end{itemize}'];

$(document).ready(function(){

	var takingInput = false;

	$('#mainText').selection('insert', {
		text: 	'\n\n\n\n\n\n\n\n\n'+
				'\\documentclass{article}\n\\begin {document} \n\\author {} \n\\title {} \n\\maketitle \n\n\n\n\\end {document} '+
				'\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
		mode: 'before'
	});

	function KeyPress(e) {
		var evtobj = window.event? event : e
		//alert(evtobj.keyCode);
		if(evtobj.keyCode == 9){
			$('#mainText').selection('insert', {
				text: '\t',
				mode: 'before'
			});
			e.preventDefault();
		}else if(evtobj.keyCode == 192){
			if(takingInput){
				$('#mainText').css({'background-color':'#555555'});
				$('#guide').html('');
				takingInput = false;
			}
			else{
				var guideHTML = "";
				for(var i in shortcuts){
					guideHTML += '<span class="big">'+String.fromCharCode(i).toLowerCase()+'</span>:' + '' + shortcuts[i][0]+shortcuts[i][1] + '<br /><br />';
				}
				$('#guide').html(guideHTML);
			
				takingInput = true;
				$('#mainText').css({'background-color':'#996666'});
				e.preventDefault();
			}
		}else if(takingInput){
			
			//alert(evtobj.keyCode);
			// i
			for(var i in shortcuts){
				if(evtobj.keyCode.toString() === i){
					$('#mainText').selection('insert', {
					text: shortcuts[i][0],
					mode: 'before'
					});
					$('#mainText').selection('insert', {
						text: shortcuts[i][1],
						mode: 'after'
					});
				}
			}
			$('#mainText').css({'background-color':'#555555'});
			$('#guide').html('');
			takingInput = false;
			e.preventDefault();
		}
	}

	document.onkeydown = KeyPress;

});

	






































