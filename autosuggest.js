

if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}

if( typeof String.prototype.trim !== 'function' ) {
  String.prototype.trim = function() {
    //Your implementation here. Might be worth looking at perf comparison at
    //http://blog.stevenlevithan.com/archives/faster-trim-javascript
    //
    //The most common one is perhaps this:
    return this.replace(/^\s+|\s+$/g, ''); 
  }
}
var defaultDiacriticsRemovalMap = [
    {'base':'A', 'letters':/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g},
    {'base':'AA','letters':/[\uA732]/g},
    {'base':'AE','letters':/[\u00C6\u01FC\u01E2]/g},
    {'base':'AO','letters':/[\uA734]/g},
    {'base':'AU','letters':/[\uA736]/g},
    {'base':'AV','letters':/[\uA738\uA73A]/g},
    {'base':'AY','letters':/[\uA73C]/g},
    {'base':'B', 'letters':/[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g},
    {'base':'C', 'letters':/[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g},
    {'base':'D', 'letters':/[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g},
    {'base':'DZ','letters':/[\u01F1\u01C4]/g},
    {'base':'Dz','letters':/[\u01F2\u01C5]/g},
    {'base':'E', 'letters':/[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g},
    {'base':'F', 'letters':/[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g},
    {'base':'G', 'letters':/[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g},
    {'base':'H', 'letters':/[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g},
    {'base':'I', 'letters':/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g},
    {'base':'J', 'letters':/[\u004A\u24BF\uFF2A\u0134\u0248]/g},
    {'base':'K', 'letters':/[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g},
    {'base':'L', 'letters':/[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g},
    {'base':'LJ','letters':/[\u01C7]/g},
    {'base':'Lj','letters':/[\u01C8]/g},
    {'base':'M', 'letters':/[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g},
    {'base':'N', 'letters':/[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g},
    {'base':'NJ','letters':/[\u01CA]/g},
    {'base':'Nj','letters':/[\u01CB]/g},
    {'base':'O', 'letters':/[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g},
    {'base':'OI','letters':/[\u01A2]/g},
    {'base':'OO','letters':/[\uA74E]/g},
    {'base':'OU','letters':/[\u0222]/g},
    {'base':'P', 'letters':/[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g},
    {'base':'Q', 'letters':/[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g},
    {'base':'R', 'letters':/[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g},
    {'base':'S', 'letters':/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g},
    {'base':'T', 'letters':/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g},
    {'base':'TZ','letters':/[\uA728]/g},
    {'base':'U', 'letters':/[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g},
    {'base':'V', 'letters':/[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g},
    {'base':'VY','letters':/[\uA760]/g},
    {'base':'W', 'letters':/[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g},
    {'base':'X', 'letters':/[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g},
    {'base':'Y', 'letters':/[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g},
    {'base':'Z', 'letters':/[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g},
    {'base':'a', 'letters':/[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g},
    {'base':'aa','letters':/[\uA733]/g},
    {'base':'ae','letters':/[\u00E6\u01FD\u01E3]/g},
    {'base':'ao','letters':/[\uA735]/g},
    {'base':'au','letters':/[\uA737]/g},
    {'base':'av','letters':/[\uA739\uA73B]/g},
    {'base':'ay','letters':/[\uA73D]/g},
    {'base':'b', 'letters':/[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g},
    {'base':'c', 'letters':/[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g},
    {'base':'d', 'letters':/[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g},
    {'base':'dz','letters':/[\u01F3\u01C6]/g},
    {'base':'e', 'letters':/[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g},
    {'base':'f', 'letters':/[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g},
    {'base':'g', 'letters':/[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g},
    {'base':'h', 'letters':/[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g},
    {'base':'hv','letters':/[\u0195]/g},
    {'base':'i', 'letters':/[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g},
    {'base':'j', 'letters':/[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g},
    {'base':'k', 'letters':/[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g},
    {'base':'l', 'letters':/[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g},
    {'base':'lj','letters':/[\u01C9]/g},
    {'base':'m', 'letters':/[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g},
    {'base':'n', 'letters':/[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g},
    {'base':'nj','letters':/[\u01CC]/g},
    {'base':'o', 'letters':/[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g},
    {'base':'oi','letters':/[\u01A3]/g},
    {'base':'ou','letters':/[\u0223]/g},
    {'base':'oo','letters':/[\uA74F]/g},
    {'base':'p','letters':/[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g},
    {'base':'q','letters':/[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g},
    {'base':'r','letters':/[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g},
    {'base':'s','letters':/[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g},
    {'base':'t','letters':/[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g},
    {'base':'tz','letters':/[\uA729]/g},
    {'base':'u','letters':/[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g},
    {'base':'v','letters':/[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g},
    {'base':'vy','letters':/[\uA761]/g},
    {'base':'w','letters':/[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g},
    {'base':'x','letters':/[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g},
    {'base':'y','letters':/[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g},
    {'base':'z','letters':/[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g}
];

var changes;
function removeDiacritics (str) {
    if(!changes) {
        changes = defaultDiacriticsRemovalMap;
    }
    for(var i=0; i<changes.length; i++) {
        str = str.replace(changes[i].letters, changes[i].base);
    }
    return str;
}

 var descriptorsuggestionEl = did('searchsuggestions'); 
 var descriptorinSuggest = false;
 var gkUp = 38, gkDown = 40, gkEnter = 13, gkEsc = 27;
 var descriptorsuggestions = new Array('16-bit', '2-step', '2 tone', 'aak', 'abkhazian folk music', 'abstract hip hop', 'a cappella', 'acidcore', 'acid croft', 'acid house', 'acid jazz', 'acid rock', 'acid techno', 'acid trance', 'acoustic blues', 'acoustic chicago blues', 'acoustic rock', 'acoustic texas blues', 'adult contemporary', 'afoxé', 'african folk music', 'african music', 'afrobeat', 'afrobeats', 'afro-cuban jazz', 'afro-funk', 'afro-house', 'afro-jazz', 'afro-rock', 'afroswing', 'afro trap', 'aggrotech', 'ainu folk music', 'akan music', 'albanian folk music', 'alevi folk music', 'algerian chaabi', 'al-maqam al-iraqi', 'alpenrock', 'alpine folk music', 'alsatian folk music', 'altai traditional music', 'alt-country', 'alternative dance', 'alternative metal', 'alternative r&b', 'alternative rock', 'amami shimauta', 'ambasse bey', 'ambient', 'ambient dub', 'ambient house', 'ambient pop', 'ambient techno', 'ambient trance', 'americana', 'american folk music', 'american primitivism', 'anarcho-punk', 'anasheed', 'anatolian rock', 'ancient chinese music', 'ancient egyptian music', 'ancient greek music', 'ancient music', 'ancient roman music', 'andalusian classical music', 'andalusian folk music', 'andalusian rock', 'andean folk music', 'andean new age', 'andean rock', 'animal sounds', 'anti-folk', 'aor', 'apala', 'appalachian folk music', 'arabesque', 'arabesque rap', 'arabic bellydance music', 'arabic classical music', 'arabic folk music', 'arabic jazz', 'arabic music', 'arabic pop', 'aragonese folk music', 'armenian church music', 'armenian folk music', 'armenian music', 'ars antiqua', 'ars nova', 'ars subtilior', 'art pop', 'art punk', 'art rock', 'ashkenazi music', 'assamese folk music', 'assiko', 'assyrian folk music', 'asturian folk music', 'atlanta bass', 'atmospheric black metal', 'atmospheric drum and bass', 'atmospheric sludge metal', 'australian folk music', 'austronesian traditional music', 'auvergnat folk music', 'avant-folk', 'avant-garde jazz', 'avant-garde metal', 'avant-prog', 'avar folk music', 'axé', 'azerbaijani traditional music', 'bachata', 'bagad', 'baggy / madchester', 'baião', 'baila', 'baisha xiyue', 'bakersfield sound', 'balani show', 'balearic beat', 'balitaw', 'balkan brass band', 'balkan folk music', 'balkan music', 'balkan pop-folk', 'ballroom', 'balochi traditional music', 'baltimore club', 'bambuco', 'bandari', 'bandas de viento de méxico', 'banda sinaloense', 'barbershop', 'bard music', 'baroque music', 'baroque pop', 'bashkir folk music', 'basque folk music', 'bass house', 'bassline', 'batak pop', 'batida', 'batucada', 'batuque', 'beatdown hardcore', 'beat music', 'beat poetry', 'bebop', 'belarusian folk music', 'bend-skin', 'benga', 'bengali folk music', 'berber music', 'bérite club', 'berlin school', 'bhangra', 'bhojpuri folk music', 'big band', 'big beat', 'big room', 'biguine', 'bikutsi', 'birdsong', 'bit music', 'bitpop', 'black \'n\' roll', 'black ambient', 'blackgaze', 'black metal', 'bleep techno', 'blue-eyed soul', 'bluegrass', 'bluegrass gospel', 'blues', 'blues rock', 'bocet', 'bogino duu', 'bolero', 'bolero español', 'bolero son', 'bomba', 'bongo flava', 'boogaloo', 'boogie', 'boogie rock', 'boogie woogie', 'boom bap', 'bop', 'bossa nova', 'bounce', 'bouncy techno', 'bouyon', 'boy band', 'brass band', 'brazilian classical music', 'brazilian music', 'breakbeat', 'breakbeat hardcore', 'breakcore', 'breakstep', 'brega', 'brega-funk', 'breton celtic folk music', 'breton folk music', 'brill building', 'britcore', 'british blues', 'british dance band', 'british folk rock', 'british rhythm & blues', 'britpop', 'bro-country', 'broken beat', 'brostep', 'brutal death metal', 'brutal prog', 'bubblegum', 'bubblegum bass', 'bubblegum dance', 'bubbling', 'bubbling house', 'bulawayo jazz', 'bulgarian folk music', 'bullerengue', 'burger-highlife', 'burmese classical music', 'buryat folk music', 'byzantine chant', 'byzantine music', 'c86', 'cabaret', 'cabo-zouk', 'cadence lypso', 'cadence rampa', 'cải lương', 'cajun', 'cakewalk', 'caklempong', 'čalgija', 'calypso', 'cambodian pop', 'campus folk', 'canadian folk music', 'canadian maritime folk', 'canarian folk music', 'canción melódica', 'candombe', 'candomblé music', 'cante alentejano', 'canterbury scene', 'cantillation', 'canto a lo poeta', 'canto cardenche', 'cantonese opera', 'cantopop', 'cantu a tenore', 'canzone d\'autore', 'canzone napoletana', 'cape breton fiddling', 'cape breton folk music', 'cape jazz', 'cape verdean music', 'capoeira music', 'car audio bass', 'caribbean folk music', 'caribbean music', 'carimbó', 'carnatic classical music', 'carols', 'cartoon music', 'catalan folk music', 'caucasian folk music', 'caucasian music', 'ccm', 'celtic folk music', 'celtic metal', 'celtic new age', 'celtic punk', 'celtic rock', 'central african music', 'chacarera', 'chachachá', 'chalga', 'chamamé', 'chamarrita açoriana', 'chamarrita rioplatense', 'chamber folk', 'chamber jazz', 'chamber music', 'chamber pop', 'champeta', 'changüí', 'chanson', 'chanson alternative', 'chanson à texte', 'chanson réaliste', 'chechen folk music', 'chicago blues', 'chicago hard house', 'chicago house', 'chicago soul', 'chicano rap', 'children\'s music', 'chilena', 'chillstep', 'chillwave', 'chimurenga', 'chinese classical music', 'chinese folk music', 'chinese opera', 'chiptune', 'chopped and screwed', 'choral', 'choro', 'chotis madrileño', 'christian hip hop', 'christian liturgical music', 'christian rock', 'christmas music', 'chutney', 'chuvash folk music', 'cinematic classical', 'ciranda', 'circassian folk music', 'circus march', 'city pop', 'classical crossover', 'classical marches', 'classical music', 'classical period', 'classical waltz', 'close harmony', 'cloud rap', 'cocktail', 'coco', 'coladeira', 'coldwave', 'colinde', 'comedy', 'comedy rap', 'comedy rock', 'comorian music', 'compas', 'complextro', 'concerto', 'conga', 'conscious hip hop', 'contemporary country', 'contemporary folk', 'contemporary r&b', 'cool jazz', 'coon song', 'copla', 'coptic music', 'cornish folk music', 'corrido', 'corsican folk music', 'country', 'country & irish', 'country blues', 'country boogie', 'country gospel', 'country pop', 'country rap', 'country rock', 'country soul', 'country yodeling', 'coupé-décalé', 'cowboy', 'cowpunk', 'c-pop', 'croatian folk music', 'crossover thrash', 'crunk', 'crunkcore', 'crust punk', 'csango folk music', 'cuarteto', 'cuban charanga', 'cuban music', 'cuban rumba', 'cueca', 'cumbia', 'cumbia argentina', 'cumbia cheta', 'cumbia mexicana', 'cumbia peruana', 'cumbia santafesina', 'cumbia sonidera', 'cumbia villera', 'cuplé', 'currulao', 'cybergrind', 'cyber metal', 'czech folk music', 'dabke', 'dagomba music', 'dance', 'dancefloor drum and bass', 'dancehall', 'dance-pop', 'dance-punk', 'dang-ak', 'dangdut', 'dangdut koplo', 'danish folk music', 'danmono', 'dansbandsmusik', 'dansktop', 'danzón', 'dark ambient', 'dark cabaret', 'dark electro', 'dark folk', 'dark jazz', 'dark psytrance', 'darkstep', 'darksynth', 'darkwave', 'd-beat', 'death \'n\' roll', 'deathcore', 'death doom metal', 'deathgrind', 'death industrial', 'death metal', 'deathrock', 'deathstep', 'deconstructed club', 'deejay', 'deep funk', 'deep house', 'deep soul', 'delta blues', 'dembow', 'dennery segment', 'denpa', 'depressive black metal', 'descarga', 'descriptor', 'detroit techno', 'deutschpunk', 'deutschrock', 'dhrupad', 'digital cumbia', 'digital dancehall', 'digital hardcore', 'dimotika', 'dirty south', 'disco', 'disco polo', 'disco rap', 'dixieland', 'djanba', 'djent', 'doina', 'dongjing', 'doom metal', 'doo-wop', 'downtempo', 'dream pop', 'dream trance', 'drill', 'drill and bass', 'drone', 'drone metal', 'drum and bass', 'drumfunk', 'drumstep', 'dub', 'dub poetry', 'dubstep', 'dubstyle', 'dub techno', 'duma', 'dunedin sound', 'dungeon synth', 'duranguense', 'dutch cabaret', 'dutch folk music', 'dutch house', 'eai', 'east african music', 'east asian classical music', 'east asian folk music', 'east asian music', 'east coast hip hop', 'easycore', 'easy listening', 'ebm', 'ecm style jazz', 'educational music', 'electric blues', 'electric texas blues', 'electro', 'electroacoustic', 'electroclash', 'electro-disco', 'electro house', 'electro-industrial', 'electro latino', 'electronic', 'electronic dance music', 'electropop', 'electro swing', 'electrotango', 'eleki', 'emo', 'emocore', 'emo-pop', 'emo rap', 'emoviolence', 'english folk music', 'enka', 'entechna', 'entechna laika', 'estonian folk music', 'ethereal wave', 'ethio-jazz', 'ethiopian church music', 'eurobeat', 'eurodance', 'euro-disco', 'euro house', 'european folk music', 'european free jazz', 'europop', 'euro-trance', 'euskal kantagintza berria', 'ewe music', 'exotica', 'experimental', 'experimental big band', 'experimental hip hop', 'experimental rock', 'expressionism', 'extratone', 'fado', 'fado de coimbra', 'fairy tales', 'famo', 'fanfare', 'fantezi', 'faroese folk music', 'fidget house', 'field hollers', 'field recordings', 'fijian music', 'filin', 'filmi', 'film score', 'film soundtrack', 'finnish folk music', 'finnish tango', 'flamenco', 'flamenco jazz', 'flamenco nuevo', 'flamenco pop', 'flashcore', 'flemish folk music', 'flex dance music', 'fm synthesis', 'folk', 'folk baroque', 'folk metal', 'folk pop', 'folk punk', 'folk rock', 'folktronica', 'fon music', 'footwork', 'forró', 'forró eletrônico', 'forró universitário', 'freakbeat', 'freak folk', 'free folk', 'freeform', 'free improvisation', 'free jazz', 'freestyle', 'freetekno', 'french-canadian folk music', 'french caribbean music', 'frenchcore', 'french folk music', 'french hip hop', 'french house', 'french pop', 'frevo', 'fuji', 'fula music', 'full-on psytrance', 'funaná', 'funeral doom metal', 'fungi', 'funk', 'funk carioca', 'funk melody', 'funk metal', 'funknejo', 'funk ostentação', 'funkot', 'funk proibidão', 'funk rock', 'funktronica', 'funky house', 'future bass', 'future funk', 'future garage', 'future house', 'futurepop', 'futurism', 'gabber', 'gaelic psalm', 'gagaku', 'gagauz folk music', 'gagok', 'galician folk music', 'gamelan', 'gamelan angklung', 'gamelan beleganjur', 'gamelan degung', 'gamelan gender wayang', 'gamelan gong gede', 'gamelan gong kebyar', 'gamelan jawa', 'gamelan jegog', 'gamelan sekaten', 'gamelan selonding', 'gamelan semar pegulingan', 'gangsta rap', 'garage house', 'garage punk', 'garage rock', 'garage rock revival', 'garba', 'garifuna folk music', 'gascon folk music', 'genge', 'georgian folk music', 'german folk music', 'g-funk', 'għana', 'ghazal', 'ghetto house', 'ghettotech', 'girl group', 'glam metal', 'glam punk', 'glam rock', 'glitch', 'glitch hop', 'glitch pop', 'gnawa', 'goa trance', 'go-go', 'gondang', 'goombay', 'goral music', 'goregrind', 'gorenoise', 'gospel', 'gothic country', 'gothic metal', 'gothic rock', 'gqom', 'grebo', 'greek folk music', 'greek music', 'gregorian chant', 'grime', 'grindcore', 'groove metal', 'group sounds', 'grunge', 'guaguancó', 'guajira', 'guaracha', 'guarania', 'gujarati folk music', 'gumbe', 'guoyue', 'gwo ka', 'gypsy jazz', 'gypsy punk', 'habanera', 'halftime', 'halloween music', 'hamburger schule', 'han folk music', 'happy hardcore', 'harawi', 'hardbass', 'hard bop', 'hardcore breaks', 'hardcore [edm]', 'hardcore hip hop', 'hardcore punk', 'hard rock', 'hardstep', 'hardstyle', 'hard trance', 'harsh noise', 'harsh noise wall', 'hausa music', 'hawaiian music', 'heartland rock', 'heavy metal', 'heavy psych', 'heikyoku', 'highlife', 'hill country blues', 'hill tribe music', 'himene tarava', 'hindustani classical music', 'hi-nrg', 'hip hop', 'hip house', 'hiplife', 'hispanic music', 'hi-tech psytrance', 'hmong folk music', 'hmong pop', 'holiday music', 'honky tonk', 'horrorcore', 'horror punk', 'horror synth', 'house', 'huayno', 'humppa', 'hungarian folk music', 'hyang-ak', 'hymns', 'hyphy', 'hypnagogic pop', 'ibiza trance', 'icelandic folk music', 'idm', 'igbo music', 'illbient', 'impressionism', 'indeterminacy', 'indian pop', 'indie folk', 'indie pop', 'indie rock', 'indietronica', 'indigenous australian music', 'indigenous taiwanese music', 'indorock', 'industrial', 'industrial hip hop', 'industrial metal', 'industrial music', 'industrial rock', 'industrial techno', 'instrumental hip hop', 'integral serialism', 'interview', 'inuit music', 'inuit vocal games', 'iranian folk music', 'iranian music', 'irish folk music', 'islamic modal music', 'israeli folk music', 'italian folk music', 'italo dance', 'italo-disco', 'italo house', 'italo pop', 'izlan', 'jaipongan', 'jamaican music', 'jamaican ska', 'jam band', 'jangle pop', 'japanese classical music', 'japanese folk music', 'japanese hardcore', 'japanese hip hop', 'japanese music', 'jazz', 'jazz-funk', 'jazz fusion', 'jazz poetry', 'jazz pop', 'jazz rap', 'jazz-rock', 'jazzstep', 'j-core', 'al jeel', 'jeong-ak', 'jerk rap', 'jersey club', 'jewish liturgical music', 'jewish music', 'jiangnan sizhu', 'jibaro', 'jingles', 'jit', 'jiuta', 'joik', 'jongo', 'jook', 'joropo', 'jōruri', 'jovem guarda', 'j-pop', 'jug band', 'jùjú', 'juke', 'jump-blues', 'jumpstyle', 'jump-up', 'jungle', 'jungle terror', 'junkanoo', 'kabarett', 'kabye folk music', 'kafi', 'kagura', 'kalindula', 'kalmyk traditional music', 'kanto', 'kapuka', 'karadeniz folk music', 'karakalpak traditional music', 'kaseko', 'kawaii future bass', 'kayōkyoku', 'kazakh traditional music', 'kecak', 'kecapi suling', 'kef music', 'keroncong', 'khakas traditional music', 'khoisan folk music', 'khyal', 'kidumbak', 'kilapanga', 'kirtan', 'kizomba', 'klapa', 'klezmer', 'kliningan', 'könsrock', 'korean classical music', 'korean folk music', 'kouta', 'k-pop', 'krautrock', 'kritika', 'kuda lumping', 'kuduro', 'kulintang', 'kumiuta', 'kundiman', 'kurdish folk music', 'kwaito', 'kwassa kwassa', 'kwela', 'kyrgyz traditional music', 'lab polyphony', 'laika', 'lambada', 'latin alternative', 'latin american music', 'latin classical music', 'latin disco', 'latin electronic', 'latin freestyle', 'latin funk', 'latin house', 'latin jazz', 'latin pop', 'latin rap', 'latin rock', 'latin soul', 'latvian folk music', 'lăutărească', 'lectures', 'levenslied', 'library music', 'lieder', 'liedermacher', 'light music', 'lilat', 'liquid funk', 'lithuanian folk music', 'lo-fi hip hop', 'lo-fi indie', 'lokal musik', 'lolicore', 'lounge', 'lovers rock', 'lowercase', 'luk krung', 'luk thung', 'lullabies', 'macedonian folk music', 'maddahi', 'madrigal', 'maftirim', 'mahori', 'mahraganat', 'makina', 'makossa', 'malagasy folk music', 'malagasy music', 'malagueña venezolana', 'malayali folk music', 'malay classical music', 'malay folk music', 'maloya', 'mambo', 'mande music', 'mandopop', 'manele', 'mangue beat', 'manila sound', 'manx folk music', 'māori traditional music', 'mapuche music', 'marabi', 'maracatu', 'marchinha', 'mariachi', 'mari folk music', 'marinera', 'marrabenta', 'martial industrial', 'mashup', 'mathcore', 'math rock', 'maxixe', 'mbalax', 'mbaqanga', 'mbenga-mbuti music', 'mbube', 'medieval classical music', 'medieval folk metal', 'medieval rock', 'melbourne bounce', 'melodic black metal', 'melodic death metal', 'melodic dubstep', 'melodic hardcore', 'melodic metalcore', 'memphis rap', 'mento', 'merecumbé', 'merengue', 'méringue', 'merseybeat', 'mesopotamian music', 'metal', 'metalcore', 'mexican folk music', 'mexican music', 'miami bass', 'microhouse', 'micronesian traditional music', 'microsound', 'microtonal', 'midwest emo', 'milonga', 'min\'yō', 'minimal drum and bass', 'minimalism', 'minimal synth', 'minimal techno', 'minimal wave', 'mizrahi music', 'mobb music', 'mod', 'moda de viola', 'modal jazz', 'modern classical', 'modern laika', 'mod revival', 'molam', 'mongolian long song', 'mongolian throat singing', 'mongolian traditional music', 'mono', 'mood kayō', 'moombahcore', 'moombahton', 'moorish music', 'moravian folk music', 'morna', 'motown sound', 'moutya', 'movimiento alterado', 'mozambique', 'mpb', 'muliza', 'murga', 'musette', 'música criolla peruana', 'música de intervenção', 'música gaúcha', 'musical comedy', 'musical parody', 'musical theatre and entertainment', 'music hall', 'musika popullore', 'musique concrète', 'muzică de mahala', 'muziki wa dansi', 'nagauta', 'narodno zabavna glasba', 'nashville sound', 'native american music', 'nature recordings', 'naturjodel', 'nederbeat', 'nederpop', 'neoclassical darkwave', 'neoclassical metal', 'neoclassical new age', 'neoclassicism', 'neofolk', 'neo kyma', 'neo-medieval folk', 'neo-prog', 'neo-psychedelia', 'neo-soul', 'neo-traditionalist country', 'nerdcore', 'neue deutsche härte', 'neue deutsche welle', 'neurofunk', 'neurohop', 'newa folk music', 'new age', 'new beat', 'new complexity', 'newfoundland folk music', 'new jack swing', 'new orleans blues', 'new orleans brass band', 'new orleans r&b', 'new romantic', 'new wave', 'new york hardcore', 'ngoma', 'nguni folk music', 'nhạc vàng', 'nightcore', 'nintendocore', 'nisiotika aigaiou', 'nisiotika ioniou', 'nitzhonot', 'noh', 'noise', 'noisecore', 'noise pop', 'noise rock', 'nordic folk music', 'nordic folk rock', 'nordic old time dance music', 'nortec', 'norteño', 'north african music', 'northeastern african music', 'northern soul', 'northumbrian folk music', 'norwegian folk music', 'nouvelle chanson française', 'nova cançó', 'nòva cançon', 'novelty', 'novelty piano', 'novo dub', 'no wave', 'nrg', 'nubian music', 'nu-disco', 'nueva canción', 'nueva canción española', 'nueva canción latinoamericana', 'nueva trova', 'nu jazz', 'nu metal', 'nursery rhymes', 'nu style gabber', 'nwobhm', 'nyahbinghi', 'occitan folk music', 'odia folk music', 'odissi classical music', 'oi!', 'old-time', 'onda nueva', 'ondō', 'onkyo', 'opera', 'opera buffa', 'opera semiseria', 'opera seria', 'operetta', 'oratorio', 'orchestral', 'oriental jewish music', 'ossetian folk music', 'ottoman military music', 'outlaw country', 'outsider house', 'özgün müzik', 'pachanga', 'pagan black metal', 'pagode', 'pagode romântico', 'paisley underground', 'pakacaping music', 'palingsound', 'palm wine music', 'pansori', 'papuan traditional music', 'parang', 'partido alto', 'pashto folk music', 'pasillo', 'pasodoble', 'peking opera', 'persian classical music', 'persian pop', 'p-funk', 'philippine music', 'philly soul', 'phleng phuea chiwit', 'piano blues', 'piano rock', 'pibroch', 'picopop', 'piedmont blues', 'pilón', 'pimba', 'pinoy folk rock', 'pinpeat', 'pipe band', 'piphat', 'plainsong', 'plena', 'plunderphonics', 'poetry', 'poezja śpiewana', 'polish carpathian folk music', 'polish folk music', 'political hip hop', 'polka', 'polynesian music', 'polyphonic chant', 'pop', 'pop ghazal', 'pop punk', 'pop raï', 'pop rap', 'pop reggae', 'pop rock', 'pops orchestra', 'pop soul', 'pop sunda', 'porn groove', 'porro', 'portuguese folk music', 'portuguese music', 'post-bop', 'post-grunge', 'post-hardcore', 'post-industrial', 'post-metal', 'post-minimalism', 'post-punk', 'post-punk revival', 'post-rock', 'power electronics', 'power metal', 'power noise', 'power pop', 'powerviolence', 'powwow music', 'praise & worship', 'prank calls', 'prehistoric music', 'progressive big band', 'progressive bluegrass', 'progressive country', 'progressive electronic', 'progressive folk', 'progressive house', 'progressive metal', 'progressive pop', 'progressive psytrance', 'progressive rock', 'progressive trance', 'proto-punk', 'psybient', 'psychedelia', 'psychedelic folk', 'psychedelic pop', 'psychedelic rock', 'psychedelic soul', 'psychobilly', 'psytrance', 'pub rock', 'punjabi folk music', 'punk', 'punk blues', 'punk rock', 'punta', 'purple sound', 'qaraami', 'qasidah modern', 'qawwali', 'quan họ', 'queercore', 'rabiz', 'radio broadcast recordings', 'radio drama', 'raga rock', 'ragga', 'raggacore', 'ragga jungle', 'ragtime', 'raï', 'rajasthani folk music', 'r&b', 'ranchera', 'rapai dabõih', 'rap metal', 'rap rock', 'rapso', 'rara', 'rasin', 'rasqueado', 'rautalanka', 'red dirt', 'reductionism', 'reggae', 'reggaeton', 'regional music', 'rembetika', 'renaissance music', 'repente', 'revue', 'rhumba', 'rhythm & blues', 'riddim', 'rigsar', 'riot grrrl', 'ripsaw', 'ritual ambient', 'rock', 'rockabilly', 'rock & roll', 'rock in opposition', 'rock opera', 'rocksteady', 'rock urbano español', 'rōkyoku', 'romanian dance-pop', 'romanian etno music', 'romanian folk music', 'romanian music', 'romani folk music', 'romanţe', 'romanticism', 'roots reggae', 'roots rock', 'rumba catalana', 'rumba flamenca', 'runolaulu', 'russian chanson', 'russian folk music', 'russian music', 'russian orthodox liturgical music', 'russian romance', 'ryūkōka', 'sacred harp music', 'saeta', 'sahrawi music', 'sakha traditional music', 'salegy', 'salsa', 'salsa dura', 'salsa romántica', 'saluang klasik', 'samba', 'samba-canção', 'samba-choro', 'samba de breque', 'samba de roda', 'samba-enredo', 'samba-exaltação', 'samba-jazz', 'samba-reggae', 'samba-rock', 'samba soul', 'sambass', 'samoan music', 'samoyedic traditional music', 'sanjo', 'santé engagé', 'santería music', 'sarala gee', 'sardana', 'satire', 'schlager', 'schranz', 'scottish folk music', 'scouse house', 'screamo', 'scrumpy and western', 'sean-nós', 'sea shanties', 'séga', 'seggae', 'semba', 'sephardic music', 'sequencer & tracker', 'serialism', 'sertanejo', 'sertanejo de raiz', 'sertanejo romântico', 'sertanejo universitário', 'sevdalinka', 'sevillanas', 'seychelles & mascarene islands music', 'shaʻabi', 'shadow music', 'shangaan electro', 'shaoxing opera', 'shashmaqam', 'shetland and orkney islands folk music', 'shibuya-kei', 'shidaiqu', 'shinkyoku', 'shoegaze', 'shōmyō', 'shona mbira music', 'show tunes', 'sinawi', 'singeli', 'singer/songwriter', 'sinhalese folk music', 'ska', 'ska punk', 'skate punk', 'sketch comedy', 'skiffle', 'skiladika', 'skinhead reggae', 'skweee', 'slack-key guitar', 'slam death metal', 'slavic folk music', 'slovak folk music', 'slovenian folk music', 'slowcore', 'sludge metal', 'smooth jazz', 'smooth soul', 'snap', 'soca', 'soft rock', 'sōkyoku', 'son calentano', 'son cubano', 'songhai music', 'songo', 'son huasteco', 'son istmeño', 'son jarocho', 'sonorism', 'sophisti-pop', 'sotho-tswana folk music', 'soukous', 'soul', 'soul blues', 'soul jazz', 'sound art', 'sound collage', 'sound poetry', 'sounds and effects', 'soundtracks', 'south american folk music', 'south asian classical music', 'south asian folk music', 'south asian music', 'southeast asian classical music', 'southeast asian folk music', 'southeast asian music', 'southern african folk music', 'southern african music', 'southern gospel', 'southern hip hop', 'southern rock', 'southern soul', 'soviet estrada', 'space age pop', 'space ambient', 'space disco', 'space rock', 'spacesynth', 'spaghetti western', 'spanish classical music', 'spanish folk music', 'spanish music', 'spectralism', 'speeches', 'speedcore', 'speed garage', 'speed metal', 'spiritual jazz', 'spirituals', 'splittercore', 'spoken word', 'spouge', 'standards', 'stand-up comedy', 'starogradska muzika', 'stereo', 'stochastic music', 'stoner metal', 'stoner rock', 'stride', 'sufiana kalam', 'sufi rock', 'sungura', 'sunshine pop', 'suomisaundi', 'surf music', 'surf punk', 'surf rock', 'sutartinės', 'swamp blues', 'swamp rock', 'swedish folk music', 'swing', 'swing revival', 'swingueira', 'symphonic black metal', 'symphonic metal', 'symphonic prog', 'symphonic rock', 'symphony', 'synth funk', 'synthpop', 'synth punk', 'synthwave', 'syriac chant', 'taarab', 'taiko', 'tajik traditional music', 'takamba', 'talking blues', 'tallava', 'tamborera', 'tamborito', 'tango', 'tango nuevo', 'tape music', 'taquirari', 'tarraxinha', 'tassu', 'tatar folk music', 'tchinkoumé', 'tchink system', 'tech house', 'technical death metal', 'technical thrash metal', 'techno', 'techno kayō', 'techstep', 'tech trance', 'tecnobanda', 'tecnobrega', 'tecnorumba', 'teen pop', 'tejano', 'television music', 'telugu folk music', 'tembang cianjuran', 'terrorcore', 'tex-mex', 'thai classical music', 'third stream', 'third wave ska', 'thrashcore', 'thrash metal', 'throat singing', 'thumri', 'tibetan traditional music', 'tigrinya music', 'timba', 'tishoumaren', 'tizita', 'tonada', 'tondero', 'tone poem', 'tosk polyphony', 'totalism', 'township bubblegum', 'township jive', 'tradi-modern', 'traditional arabic pop', 'traditional black gospel', 'traditional cajun', 'traditional country', 'traditional doom metal', 'traditional folk music', 'traditional maloya', 'traditional pop', 'traditional raï', 'traditional séga', 'tragédie en musique', 'trance', 'trancecore', 'trance metal', 'trancestep', 'trap', 'trap [edm]', 'trap metal', 'trás-os-montes folk music', 'tread', 'tribal ambient', 'tribal guarachero', 'tribal house', 'trinidadian cariso', 'trip hop', 'tropical house', 'tropicália', 'tropipop', 'trot', 'trova', 'trova yucateca', 'truck driving country', 'tsapiky', 'tsonga disco', 'tsugaru shamisen', 'tuareg music', 'tumba', 'tumbélé', 'turbo-folk', 'turkic-mongolic traditional music', 'turkish classical music', 'turkish folk music', 'turkish music', 'turkish pop', 'turkish sufi music', 'turkmen traditional music', 'turntable music', 'turntablism', 'tuvan throat singing', 'twee pop', 'uk82', 'uk bass', 'uk drill', 'uk funky', 'uk garage', 'uk hard house', 'uk hip hop', 'ukrainian folk music', 'unyago', 'uplifting trance', 'upopo', 'urban cowboy', 'urumi melam', 'uyghur traditional music', 'uzbek traditional music', 'uzun hava', 'vallenato', 'vals criollo', 'vanera', 'vanguarda paulista', 'vaportrap', 'vaporwave', 'vaudeville', 'vaudeville blues', 'video game music', 'vietnamese bolero', 'vietnamese classical music', 'vietnamese folk music', 'vietnamese opera', 'viking metal', 'virgin islander cariso', 'visor', 'visual kei', 'vocal group', 'vocal jazz', 'vocal surf', 'vocal trance', 'volkstümliche musik', 'v-pop', 'waka', 'walloon folk music', 'war metal', 'warsaw city folk', 'wassoulou', 'waulking song', 'wave', 'weightless', 'welsh folk music', 'west african music', 'west asian folk music', 'west asian music', 'west coast hip hop', 'western classical music', 'western swing', 'whale song', 'witch house', 'wolof music', 'wonky', 'wonky techno', 'work songs', 'xote', 'yacht rock', 'yass', 'yayue', 'yé-yé', 'yiddish folksong', 'yodeling', 'yoruba music', 'yukar', 'zamba', 'zamrock', 'zarzuela', 'zeuhl', 'zeybek', 'zhabdro gorgom', 'ziglibithy', 'zinli', 'znamenny chant', 'zolo', 'zouglou', 'zouk', 'zouk love', 'zydeco');
 var fFriendAttach = 0;
 var descriptorcurrentSuggestionList = new Array();
 var descriptorcurrentSuggestion = null;
 var descriptorinputEl;
 var showList = false;

 var timer = null;

 function descriptorattachSuggest(id)
 {

    descriptorinputEl = did(id); 
   
    descriptorinputEl.setAttribute('autocomplete', 'off');
   
    descriptorinputEl.onkeydown = function(e) {
        var evx; 
        try { evx = event; } catch (ex) { evx = e; }
        descriptorhandleKeyPress( 0, evx);
        if ( evx.keyCode == 13 ) { return false; } 

    };
   
    descriptorinputEl.onkeyup = function(e) {
        var evx; 
        try { evx = event; } catch (ex) { evx = e; }
        descriptorhandleKeyPress( 1, evx);
        if ( evx.keyCode == 13 ) { return false; } 
    };
   
    descriptorinputEl.onblur = function() {
      if ( timer ) {
         clearTimeout(timer);
         timer = null;
      }
      timer = setTimeout(descriptorhideSuggestions, 200);
      if ( fFriendAttach ) {
         friendAttachFunction(); 
      }
    };
    var ssel = did('searchsuggestions');
    var pos = Position.get(descriptorinputEl);

    ssel.style.top = (pos.top + pos.height) + 'px';
    ssel.style.left = pos.left + 'px';
    if ( showList ) {
      descriptorcalculateSuggestions();
    }
 }

 function descriptorhandleKeyPress ( up, event ) 
 {

   var keycode = event.keyCode;
   if ( descriptorinSuggest )
   {
      if ( gkUp == keycode && !up  )
      {
         descriptorselectPreviousSuggestion();
         return false;
      }
      else if ( gkDown == keycode && !up  )
      {
         descriptorselectNextSuggestion();
         return false;
      }
      else if ( gkEnter == keycode && !up  )
      {
         descriptorchooseSuggestion(descriptorcurrentSuggestion);
         return false;
      }
      else if ( gkEsc == keycode && !up )
      {
         descriptorhideSuggestions();
         return false;
      }
      else if ( !up )
      {
           if ( timer ) {
              clearTimeout(timer);
              timer = null;
           }
           timer = setTimeout(descriptorcalculateSuggestions, 150);
        // setTimeout(descriptorcalculateSuggestions, 50);
//         descriptorcalculateSuggestions();
         return false;
      }
      else
      {
     //    setTimeout(descriptorcalculateSuggestions, 50);
      }

   }
   else 
   {
      if ( up )
      {
           if ( timer ) {
              clearTimeout(timer);
              timer = null;
           }
           timer = setTimeout(descriptorcalculateSuggestions, 150);
      }
      //descriptorcalculateSuggestions();
   }
   
 } 
 function descriptorselectPreviousSuggestion ()
 {
   if ( descriptorcurrentSuggestionList.length == 0 ) 
   {
      return;
   }
   if ( descriptorcurrentSuggestion == null ) 
   {
      descriptorcurrentSuggestion = descriptorcurrentSuggestionList[descriptorcurrentSuggestionList.length-1];
      descriptorcurrentSuggestion.className = 'suggestionsel';
      return;
   }
   var last = null;
   var iLen = descriptorcurrentSuggestionList.length;
   for ( var i = 0 ; i < iLen ; i++  ) 
   {  
      if ( descriptorcurrentSuggestionList[i].className == 'suggestionsel' )
      { 
         if ( last == null ) 
         {
            descriptorcurrentSuggestion.className = 'suggestion';
            descriptorcurrentSuggestion = descriptorcurrentSuggestionList[descriptorcurrentSuggestionList.length-1];
            descriptorcurrentSuggestion.className = 'suggestionsel';
            return;
         }
         else
         {
            descriptorcurrentSuggestion.className = 'suggestion';
            descriptorcurrentSuggestion = last;
            descriptorcurrentSuggestion.className = 'suggestionsel';
            return;
         }
      }
      last = descriptorcurrentSuggestionList[i];
   }
 }

 function descriptorselectNextSuggestion  ()
 {
   if ( descriptorcurrentSuggestionList.length == 0 ) 
   {
      return;
   }
   if ( descriptorcurrentSuggestion == null ) 
   {
      descriptorcurrentSuggestion = descriptorcurrentSuggestionList[0];
      descriptorcurrentSuggestion.className = 'suggestionsel';
      return;
   }
   var last = null;
   for ( var i = descriptorcurrentSuggestionList.length-1; i >= 0; i-- ) 
   {  
      if ( descriptorcurrentSuggestionList[i].className == 'suggestionsel' )
      { 
         if ( last == null ) 
         {
            descriptorcurrentSuggestion.className = 'suggestion';
            descriptorcurrentSuggestion = descriptorcurrentSuggestionList[0];
            descriptorcurrentSuggestion.className = 'suggestionsel';
            return;
         }
         else
         {
            descriptorcurrentSuggestion.className = 'suggestion';
            descriptorcurrentSuggestion = last;
            descriptorcurrentSuggestion.className = 'suggestionsel';
            return;
         }
      }
      last = descriptorcurrentSuggestionList[i];
   }

 }

 function descriptorchooseSuggestion (obj)
 {
   if ( obj )
   {
      var innerTxt; 

      if ( obj.innerText )
      {
        innerTxt = obj.innerText;
      }
      else
      {
        innerTxt = obj.textContent;
      }

      var terms = descriptorinputEl.value.trim().split(',');
      terms[terms.length-1] = innerTxt;
      var iLen = terms.length;
      for ( var i = 0; i < iLen; i++ )
      {
         terms[i] = terms[i].trim();
      }

      descriptorinputEl.value = terms.join(', ') ;
   }
   descriptorhideSuggestions();

 }


 function _isMatch (name, val) {
      // -1 == name.toLowerCase().search(val.toLowerCase()) && val.length
      val = removeDiacritics(val.toLowerCase()).replace(/^\s+|\s+$/g, '');
      name = removeDiacritics(name.toLowerCase());

      if ( name.indexOf(val) == 0 ) {
         return 1
      }
      var names = name.replace(/^\s+|\s+$/g, '').split(' ');
      var vals = val.replace(/^\s+|\s+$/g, '').split(' ');

      var inARow = 0;

      var numMatches = 0;

      var valsMatched = new Array();

      var jLen = names.length;
      for ( var j = 0; j < jLen; j++ ) {
        var valPart = names[j].trim();
        var iLen = vals.length;
        for ( var i = 0; i < iLen; i++ ) {
          var namePart = vals[i].trim();
          if ( namePart.indexOf(valPart) == 0 && namePart.length > 0 && valPart.length > 0 ) {
             if ( valsMatched.indexOf(valPart) == -1 ) {
                numMatches++
                valsMatched.push(valPart);
             }
             //continue
          }
        }
        //return 0
      }

      if ( numMatches >= names.length ) {
         //console.log(numMatches + ' matches for ' + names.length + ' (' + name + ' , ' + val + ')')
         return 1
      }

      return 0

 };
 function descriptorshowAll() {

   descriptorclearSuggestionList();
   var iLen = descriptorsuggestions.length;
   var added = new Array();

   for (var i = 0; i < iLen; i++)
   {  
      var sug = descriptorsuggestions[i].trim()
      descriptoraddSuggestion(descriptorsuggestions[i]);
      added.push(descriptorsuggestions[i])
   }
   if ( iLen > 0 ) {
      descriptorinSuggest = true;
      descriptorshowSuggestions(true);
   }
 }

 function descriptorcalculateSuggestions()
 {
   var terms = descriptorinputEl.value.trim().toLowerCase().split(',');

   var searchterm = terms[terms.length-1].trim();
   
   if ( 0 == searchterm.length )
   {
      if ( !showList ) {
         descriptorhideSuggestions();
      } else {
         descriptorshowAll();
      }
      return;
   }

   var found = 0;
   descriptorclearSuggestionList();

   var added = new Array();
   var iLen = descriptorsuggestions.length;
   for (var i = 0; i < iLen; i++)
   {  
      var sug = descriptorsuggestions[i].trim().toLowerCase()
      if ( sug.indexOf(searchterm) == 0)
      {
         descriptoraddSuggestion(descriptorsuggestions[i]);
         added.push(descriptorsuggestions[i])
         found = 1;         
      }
   }

   var iLen = descriptorsuggestions.length;
   for (var i = 0; i < iLen; i++)
   {  
      var sug = descriptorsuggestions[i].trim().toLowerCase()
      if ( _isMatch(searchterm,sug) && added.indexOf(descriptorsuggestions[i]) == -1 )
      {
         descriptoraddSuggestion(descriptorsuggestions[i]);
         found = 1;         
      }
   }


   if ( descriptorcurrentSuggestionList.length == 1 )
   {
      if ( descriptorcurrentSuggestionList[0].innerHTML == searchterm )
      {
         found = 0;
         descriptorclearSuggestionList();
      }
   }
   descriptorinSuggest = found;
   descriptorshowSuggestions(found);

 }

 function descriptoraddSuggestion(name)
 {
     var elDiv =  document.createElement('div');
     elDiv.className = 'suggestion';
  
     elDiv.appendChild(document.createTextNode(name));
   
    elDiv.onmouseover = function(e) {
        this.className='suggestionsel';
        descriptorcurrentSuggestion = this;
    };
   
    elDiv.onmouseout = function(e) {
        this.className='suggestion';
    };
    elDiv.onclick = function(e) {
        descriptorchooseSuggestion(this);
    };
     descriptorsuggestionEl.appendChild(elDiv);
     descriptorcurrentSuggestionList.push(elDiv);
 }

 function descriptorclearSuggestionList () { 

  while(descriptorsuggestionEl.hasChildNodes())
  {
    descriptorsuggestionEl.removeChild(descriptorsuggestionEl.firstChild);
  }
  descriptorinSuggest = 0;
  descriptorcurrentSuggestion = null;
  descriptorcurrentSuggestionList = new Array();

 }

 function descriptorshowSuggestions(show) {
   did('searchsuggestions').style.visibility=show?'visible':'hidden';
 }

 function descriptorhideSuggestions() {
   did('searchsuggestions').style.visibility='hidden';
   descriptorclearSuggestionList();
 }
