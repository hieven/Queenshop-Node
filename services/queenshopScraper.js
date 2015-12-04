'use strict';

const cheerio = require('cheerio');
const request = require('request-promise');
const iconv   = require('iconv-lite');
const config  = require('../config');

const PATH_NAMES = {
  hot:    (page) => (`PDList2.asp?item1=pre&item2=&br=01&keyword=&ob=H&pageno=${page}`),
  latest: (page) => (`PDList2.asp?item1=new&item2=&br=01&keyword=&ob=E&pageno=${page}`)
};
const itemParser = '.pditem.pure-u-1-1';

class Scraper {

  constructor() {
    this.options = {
      baseUrl: config.shopHost.queenshop,
      encoding: null,
      transform: body => (cheerio.load(iconv.decode(body, 'Big5'), {
        normalizeWhitespace: true
      }))
    }
  }

  static formatItem($elem) {
    return {
      image: Scraper.formatUri($elem.find('li:nth-child(2) img').attr('src')),
      link:  Scraper.formatUri($elem.find('li:nth-child(2) a').attr('href')),
      name:  $elem.find('p.name').text(),
      sold:  $elem.find('p.sold span').text(),
      price: +$elem.find('p.price span:nth-child(2)').text().match(/\d+/)
    };
  }

  static formatUri(src) {
    return config.shopHost.queenshop + src;
  }

  * _fetch(uri, options) {
    let body, parsed;

    options = Object.assign({}, this.options, options, { uri });
    body    = yield request(options);
    parsed  = this._parser(body);

    return parsed;
  }

  _parser($) {
    let $items = $(Scraper.itemParser);
    let parsed = [];

    $items.map((_, elem) => {
      parsed.push(Scraper.formatItem($(elem)));
    })
    return parsed;
  }

  * fetchHot(page) {
    page = page || 1;
    const uri = Scraper.PATH_NAMES.hot(page);
    return yield this._fetch(uri);
  }

  * fetchLatest(page) {
    page = page || 1;
    const uri = Scraper.PATH_NAMES.latest(page);
    return yield this._fetch(uri);
  }
}

Scraper.PATH_NAMES = PATH_NAMES;
Scraper.itemParser = itemParser;

module.exports = new Scraper();
