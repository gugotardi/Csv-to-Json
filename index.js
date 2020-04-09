const fs = require('fs');
const path = require('path');
const lerArquivo = require('fs').createReadStream;
const escreverArquivo = require ('fs').createWriteStream;
const csvjson = require('csvjson');
var inspector = require('schema-inspector');

const toObject = csvjson.stream.toObject();
const stringify = csvjson.stream.stringify();

//transforma o arquivo csv em json
lerArquivo('./input.csv','utf-8')
      .pipe(toObject)
      .pipe(stringify)
      .pipe(escreverArquivo('./output.json'));

//Colocar as informações do arquivo json em uma variável

var data = fs.readFileSync(path.join(__dirname, 'output.json'), { encoding : 'utf8'});

//Faz a adequação do arquivo json
var sanitization = {
            type: 'object',
            properties: {
                  fullname: { type: 'string', rules: ['trim', 'title'] },
                  eid: { type: 'string', rules: ['trim', 'title'] },
                  class: {
                        type: 'array',
                        splitWith: ';',
                        items: { type: 'string', rules: ['trim', 'title'] }
                  },
                  email_responsable_father: {
                        type: 'array',
                        splitWith: ';',
                        items: { type: 'string', rules: ['trim', 'title'] }
                  },
                  phone_father: {
                        type: 'array',
                        splitWith: ';',
                        items: { type: 'string', rules: ['trim', 'title'] }
                  },
                  phone_mather: {
                        type: 'array',
                        splitWith: ';',
                        items: { type: 'string', rules: ['trim', 'title'] }
                  },
                  email_responsable_mather: {
                        type: 'array',
                        splitWith: ';',
                        items: { type: 'string', rules: ['trim', 'title'] }
                  },
                  email_student: {
                        type: 'array',
                        splitWith: ';',
                        items: { type: 'string', rules: ['trim', 'title'] }
                  },
                  phone_student: {
                        type: 'array',
                        splitWith: ';',
                        items: { type: 'string', rules: ['trim', 'title'] }
                  },
                  invisible: { type: 'string', rules: ['trim', 'lower'] },
                  see_all: { type: 'string', rules: ['trim', 'lower'] }
            }
};

inspector.sanitize(sanitization, data);

//Faz a adequação do arquivo json
var validation = {
      type: 'object',
      properties: {
            fullname: { type: 'string', minLength: 1 },
            eid: { type: 'string', minLength: 1},
            class: {
                  type: 'array',
                  splitWith: ';',
                  items: { type: 'string', minLength: 1 }
            },
            email_responsable_father: {
                  type: 'array',
                  splitWith: ';',
                  items: { type: 'string', pattern: 'email' }
            },
            phone_father: {
                  type: 'array',
                  splitWith: ';',
                  items: { type: 'string', minLength: 1 }
            },
            phone_mather: {
                  type: 'array',
                  splitWith: ';',
                  items: { type: 'string', minLength: 1 }
            },
            email_responsable_mather: {
                  type: 'array',
                  splitWith: ';',
                  items: { type: 'string', pattern: 'email' }
            },
            email_student: {
                  type: 'array',
                  splitWith: ';',
                  items: { type: 'string', pattern: 'email' }
            },
            phone_student: {
                  type: 'array',
                  splitWith: ';',
                  items: { type: 'string', minLength: 1 }
            },
            invisible: { type: 'string', minLength: 1},
            see_all: { type: 'string', minLength: 1}
      }
};

result = inspector.validate(validation, data);
//Salva o arquivo json tratado em um novo arquivo
fs.writeFileSync('output_organizado.json',result.format());
