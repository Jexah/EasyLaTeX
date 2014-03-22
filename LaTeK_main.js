



























var insert = function(before, after){
	before = before || '';
	after = after || '';
	
	$('#mainText').selection('insert', {
		text: before,
		mode: 'before'
	});
	$('#mainText').selection('insert', {
		text: after,
		mode: 'after'
	});
}

//{ Shortcuts

	var shortcuts = {};
	// i = italic
	shortcuts['73'] = function(){
		insert('\\textit {', '}');
	}

	// b = bold
	shortcuts['66'] = function(){
		insert('\\textbf {', '}');
	}

	// s = section
	shortcuts['83'] = function(){
		insert('\\section {', '}');
	}

	// d = date
	shortcuts['68'] = function(){
		insert('\\today');
	}

	// h = hline
	shortcuts['72'] = function(){
		insert('\\hline');
	}

	// t = tabular
	shortcuts['84'] = function(){
		insert('\\begin {tabular} {|c|c|} \n', '[0,0] & [1,0]\\\\\n[0,1] & [1,1]\\\\\n\\end{tabular}');
	};
	
	// q = quote
	shortcuts['81'] = function(){
		insert('\\begin {quote}\n', '\n\\end{quote}');
	}
	
	// f = footnote
	shortcuts['70'] = function(){
		insert('', '\\footnote {}');
		$('#mainText').selection('setPos', {start: $('#mainText').selection('getPos') + 11, end: $('#mainText').selection('getPos') + 11});
	}
	
	// e = enumerate
	shortcuts['69'] = function(){
		insert('\\begin {enumerate}\n', '\\item [item 1]\n\\item [item 2]\n\\end{enumerate}');
	}
	
	// p = dot points
	shortcuts['80'] = function(){
		insert('\\begin {itemize}\n', '\\item [item 1]\n\\item [item 2]\n\\end{itemize}');
	}
	
//}
	
var oldText;
var clicked;

$(document).ready(function(){

	$('.button').click(function(){
		var encodedSize = encodeURI("http://latex.informatik.uni-halle.de/latex-online/latex.phpspw:1id:$(#textid).val(),ompile:Übersetzen,quellcode:$(#mainText).val(),finit:nothing,aformat:format"+$('#mainText').val()).length;
		if($('#textid').val() === 'unique_id'){
			alert('Please enter a unique identifier.');
		}else if(encodedSize > 9626){
			alert('The text is too long to compile, please compile it elsewhere. Encoded size: '+encodedSize+'/9626');
		}else{
			var format = $(this).text().substring($(this).text().length-3, $(this).text().length);
			oldText = $(this).text();
			clicked = $(this);
			$(this).text('Loading...');
			$.ajax({
				url: "http://latex.informatik.uni-halle.de/latex-online/latex.php",
				dataType: "jsonp",
				data: {
					'spw':'1',
					'id':$('#textid').val(),
					'compile':'Übersetzen',
					'quellcode':$('#mainText').val(),
					'finit':'nothing',
					'aformat':format
				},
				complete: function(response) {
					clicked.text(oldText);
					setTimeout(function(){window.open('http://latex.informatik.uni-halle.de/latex-online/temp/olatex_'+$('#textid').val()+'.'+format.toLowerCase(),(format==='DVI')?('_self'):'_blank');}, 500);
				}
			});
		}
	});

	var takingInput = false;

	$('#mainText').selection('insert', {
		text: 	'\n\n\n\n\n\n\n\n\n'+
				'\\documentclass {article}\n\\begin {document} \n\\author {} \n\\title {} \n\\maketitle \n\n\n\n\\end {document} '+
				'\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
		mode: 'before'
	});

	function KeyPress(e) {
		var evtobj = window.event? event : e
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
			for(var i in shortcuts){
				if(evtobj.keyCode.toString() === i){
					shortcuts[i]();
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
































