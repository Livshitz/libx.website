const cheerio = require('cheerio')
const fs = require('fs')
const infra = require('libx.js');
// infra.crypto = require('libx.js/modules/crypto');

(async ()=>{
	var res = await infra.gulp.exec([
		'cd ../base-publish', 
		'http-server --cors'
	], true);
	// console.log('res: ', res);

})();

return;


var index = './build/index.html';
var content = fs.readFileSync('./build/index.html');
var $ = cheerio.load(content)

var dest = './build';

var onFileReady = (elm, attr, file, ext, fname) => {
	console.log('onFileReady: ', file)
	var type = '';
	switch(ext) {
		case '.js': type = 'scripts'; break;
		case '.css': type = 'styles'; break;
		case '.jpg': 
		case '.jpeg': 
		case '.gif': 
		case '.png': type = 'imgs'; break;
		case '.otf': 
		case '.svg': 
		case '.eot': 
		case '.ttf': 
		case '.woff': type = 'fonts'; break;
	}
	var p = `/resources/${type}/lib/`;
	infra.gulp.copy([file], dest + p)

	if (attr != null) $(elm).attr(attr, p + fname);
}

var transform = async (e, attr, avoidRenameFile) => {
	var src = $(e).attr(attr);
	if (src == null) return;
	var m = src.match(/\/.*?([^\/]+)(\.[^\.\/]+)$/);
	if (m == null || m.length == 1) return;
	var ext = m[2];
	var name = m[1];
	var isRemote = src.match(/^(.+:)?\/\/|http/g) != null
	if (!isRemote) return;
	var h = infra.crypto.SHA1(src).toString();
	var p = './lib-cache/';
	var fname = avoidRenameFile ? `${name}${ext}` : `${h}${ext}`;
	console.log('fname: ', fname);
	var f = p + fname;
	if (!fs.existsSync(p)) fs.mkdirSync(p);

	if (!fs.existsSync(f)) {
		console.log('getting: ', src, ext, h);
		infra.network.httpGet(src).then(data=> {
			console.log('got data: ', data.length);
			
			fs.writeFile(f, data, err=> {
				if (err) throw 'Write: error: ', err;
				return onFileReady(e, attr, f, ext, fname);
			});
		})
	} else {
		return onFileReady(e, attr, f, ext, fname,);
	}
}

(async ()=> {
	var p = [];

	$('script').each(async (i, e)=> {
		p.push(transform(e, 'src'));
	})
	$('link').each(async (i, e)=> {
		p.push(transform(e, 'href'));
	})

	$('font').each(async (i, e)=> {
		await transform(e, 'url', true);
		$(e).remove();
	});

	await Promise.all(p);

	console.log('all done, saving')
	fs.writeFileSync(index, $.html());

})();
