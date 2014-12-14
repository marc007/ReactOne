/*!
 * CSV-js: A JavaScript library for parsing CSV-encoded data.
 * Copyright (C) 2009-2013 Christopher Parker <http://www.cparker15.com/>
 *
 * CSV-js is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * CSV-js is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with CSV-js.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

/**
 * Split CSV text into an array of lines.
 */
function splitLines(text, lineEnding) {
    var strLineEnding = lineEnding.toString(),
        bareRegExp    = strLineEnding.substring(1, strLineEnding.lastIndexOf('/')),
        modifiers     = strLineEnding.substring(strLineEnding.lastIndexOf('/') + 1);

    if (modifiers.indexOf('g') === -1) {
        lineEnding = new RegExp(bareRegExp, modifiers + 'g');
    }

    // TODO: fix line splits inside quotes
    return text.split(lineEnding);
}

/**
 * If the line is empty (including all-whitespace lines), returns true. Otherwise, returns false.
 */
function isEmptyLine(line) {
    return (line.replace(/^[\s]*|[\s]*$/g, '') === '');
}

/**
 * Removes all empty lines from the given array of lines.
 */
function removeEmptyLines(lines) {
    var i;

    for (i = 0; i < lines.length; i++) {
        if (isEmptyLine(lines[i])) {
            lines.splice(i--, 1);
        }
    }
}

/**
 * Joins line tokens where the value of a token may include a character that matches the delimiter.
 * For example: "foo, bar", baz
 */
function defragmentLineTokens(lineTokens, delimiter) {
    var i, j,
        token, quote;

    for (i = 0; i < lineTokens.length; i++) {
        token = lineTokens[i].replace(/^[\s]*|[\s]*$/g, '');
        quote = '';

        if (token.charAt(0) === '"' || token.charAt(0) === '\'') {
            quote = token.charAt(0);
        }

        if (quote !== '' && token.slice(-1) !== quote) {
            j = i + 1;

            if (j < lineTokens.length) {
                token = lineTokens[j].replace(/^[\s]*|[\s]*$/g, '');
            }

            while (j < lineTokens.length && token.slice(-1) !== quote) {
                lineTokens[i] += delimiter + (lineTokens.splice(j, 1))[0];
                token = lineTokens[j].replace(/[\s]*$/g, '');
            }

            if (j < lineTokens.length) {
                lineTokens[i] += delimiter + (lineTokens.splice(j, 1))[0];
            }
        }
    }
}

/**
 * Removes leading and trailing whitespace from each token.
 */
function trimWhitespace(lineTokens) {
    var i;

    for (i = 0; i < lineTokens.length; i++) {
        lineTokens[i] = lineTokens[i].replace(/^[\s]*|[\s]*$/g, '');
    }
}

/**
 * Removes leading and trailing quotes from each token.
 */
function trimQuotes(lineTokens) {
    var i;

    // TODO: allow for escaped quotes
    for (i = 0; i < lineTokens.length; i++) {
        if (lineTokens[i].charAt(0) === '"') {
            lineTokens[i] = lineTokens[i].replace(/^"|"$/g, '');
        } else if (lineTokens[i].charAt(0) === '\'') {
            lineTokens[i] = lineTokens[i].replace(/^'|'$/g, '');
        }
    }
}

/**
 * Converts a single line into a list of tokens, separated by the given delimiter.
 */
function tokenizeLine(line, delimiter) {
    var lineTokens = line.split(delimiter);

    defragmentLineTokens(lineTokens, delimiter);
    trimWhitespace(lineTokens);
    trimQuotes(lineTokens);

    return lineTokens;
}

/**
 * Converts an array of lines into an array of tokenized lines.
 */
function tokenizeLines(lines, delimiter) {
    var i,
        tokenizedLines = [];

    for (i = 0; i < lines.length; i++) {
        tokenizedLines[i] = tokenizeLine(lines[i], delimiter);
    }

    return tokenizedLines;
}

/**
 * Converts an array of tokenized lines into an array of object literals, using the header's tokens for each object's keys.
 */
function assembleObjects(tokenizedLines) {
    var i, j,
        tokenizedLine, obj, key,
        objects = [],
        keys = tokenizedLines[0];

    for (i = 1; i < tokenizedLines.length; i++) {
        tokenizedLine = tokenizedLines[i];

        if (tokenizedLine.length > 0) {
            if (tokenizedLine.length > keys.length) {
                throw new SyntaxError('not enough header fields');
            }

            obj = {};

            for (j = 0; j < keys.length; j++) {
                key = keys[j];

                if (j < tokenizedLine.length) {
                    obj[key] = tokenizedLine[j];
                } else {
                    obj[key] = '';
                }
            }

            objects.push(obj);
        }
    }

    return objects;
}

var ExcelTool = {
    listroots : [],
    listobjects : [],
    
    parse: function (text) {
        var config = {
                lineEnding:       /[\r\n]/,
                delimiter:        /[\t]/,
                ignoreEmptyLines: true
            };
        var lines;
        var tokenizedLines;
        var objects;

        // Empty text is a syntax error!
        if (text === '') {
            throw new SyntaxError('empty input');
        }

        // Step 1: Split text into lines based on line ending.
        lines = splitLines(text, config.lineEnding);

        // Step 2: Get rid of empty lines. (Optional)
        if (config.ignoreEmptyLines) {
            removeEmptyLines(lines);
        }

        // Single line is a syntax error!
        if (lines.length < 2) {
            throw new SyntaxError('missing header');
        }

        // Step 3: Tokenize lines using delimiter.
        tokenizedLines = tokenizeLines(lines, config.delimiter);

        // Step 4: Using first line's tokens as a list of object literal keys, assemble remainder of lines into an array of objects.
        objects = assembleObjects(tokenizedLines);

        this.listobjects = objects;
        return objects;
    },
    findroots: function() {
        var roots = [];
        var isroot = false;
        
        for (var property in this.listobjects[0]) {
            if (this.listobjects[0].hasOwnProperty(property)) {
                var vals = [];
                isroot = false;
                for (var j = 0; j < this.listobjects.length; j++) {
                    var obj = this.listobjects[j];
                    var val = obj[property];
                    if (vals.indexOf(val) == -1) {
                        vals.push(val);
                    }
                    else
                    {
                        isroot = true;
                        roots.push(property);
                        break;
                    }
                }
                if(!isroot) {
                    break;
                }
            }
        }
        this.listroots = roots;
        return roots;
    },

    getkey: function (key) {
      var i, len = 0;
      for( i = 0; i<key.length; i++ ) {
        len += key.charCodeAt(i);
      }
      return len;
    },
    getrandom: function () {
      var i = 8, r,
      s = String.fromCharCode( Math.floor( Math.random() * 26 ) + ( Math.random()>0.5 ? 65 : 97 ) );
      while(i--) {
        r = Math.floor( Math.random() * 63 );
        if( r<10 ) {
          r += 48; 
        }
        else if( r<36 ) {
          r += 55; 
        }
        else { 
          r += 61; 
        }
        if( r==123 ) {
          r = 95; 
        }
        s += String.fromCharCode( r );
      }
      return s;
    },
    encrypt: function (txt,key) {
      var result = '';
      if( key.length > 0 && txt.length > 0) {
        var len = this.getkey(key);
        console.log('encrypt(len):'+len);
        var i, s = '', fin = 0;
        
        // txt = this.getversion()+txt;
        for( i=0; i<txt.length; i++ ) {
          fin = txt.charCodeAt(i) + len;
          if( fin>99 ) {
            s += fin;
          } else {
            s += '0' + fin;
          }
        }
        result = s;
      }
      else
      {
        result = txt;
      }
      return result;
    },
    decrypt: function (txt, key) {
      var result = '';
      if( key.length > 0 && txt.length > 0) {
        var len = this.getkey(key);
        var i, t, s = '',  tmp;
        
        for( i=0; i<txt.length; i+=3 ) {
          tmp = txt.substring(i,i+3);
          t = decodeURIComponent( '%' + ( parseInt(tmp,10) - len ).toString(16) );
          if( t=='%9' ) {
            s += '\t';
          } else if( t=='%d' ) {
            s += '\r';
          } else if( t=='%a' ) {
            s += '\n';
          } else {
            s += t;
          }
        }
        result = s;
      }
      else
      {
        result = txt;
      }
    //   if(result.indexOf(this.getversion()) == 0)
    //   {
    //     result = result.replace(this.getversion(),'');
    //   }
    //   else
    //   {
    //     result = '';
    //   }
      return result;
    },
    
    
};

module.exports = ExcelTool;
