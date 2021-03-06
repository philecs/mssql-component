'use strict';
const expect = require('chai').expect;
const insert = require('../lib/actions/insert');

describe('Metadata test', () => {
    const cfg = {
        query: 'INSERT INTO Test2.dbo.Tweets (Lang, Retweeted, Favorited, "Text", id, CreatedAt, Username, ScreenName) '
        + 'VALUES (@lang:string, @retweeted:float, @money:money, @favorited:boolean, '
        + '@text:string, @id:bigint, @created_at:date, @username:string, @screenname:string)'
    };


    it('should generate metadata', (done) => {
        insert.getMetaModel(cfg, (err, result) => {
            expect(err).to.be.null;
            expect(result).to.deep.equal({
                in: {
                    properties: {
                        created_at: {
                            type: 'string'
                        },
                        favorited: {
                            type: 'string'
                        },
                        id: {
                            type: 'number'
                        },
                        lang: {
                            type: 'string'
                        },
                        money: {
                            type: 'number'
                        },
                        retweeted: {
                            type: 'number'
                        },
                        screenname: {
                            type: 'string'
                        },
                        text: {
                            type: 'string'
                        },
                        username: {
                            type: 'string'
                        }
                    },
                    type: 'object'
                },
                out: {}
            }
      );
            done();
        });
    });

    it('should not fail on empty query', (done) => {
        insert.getMetaModel({}, (err, result) => {
            expect(err).to.be.null;
            expect(result).to.deep.equal({
                in: {
                    properties: {},
                    type: 'object'
                },
                out: {}
            }
      );
            done();
        });
    });

    it('should not handle duplicate fields', (done) => {
        insert.getMetaModel({
            query: '@foo:string @foo:string @bar:date'
        }, (err, result) => {
            expect(err).to.be.null;
            expect(result).to.deep.equal({
                in: {
                    type: 'object',
                    properties: {
                        foo: {
                            type: 'string'
                        },
                        bar: {
                            type: 'string'
                        }
                    }
                },
                out: {}
            }
      );
            done();
        });
    });

    it('should assume default metadata as stirng', (done) => {
        insert.getMetaModel({
            query: 'INSERT INTO Test2.dbo.Tweets '
            + '(Lang, Retweeted, Favorited, "Text", id, CreatedAt, Username, ScreenName) '
            + 'VALUES (@lang, @retweeted:float, @money:money, @favorited:boolean, '
            + '@text, @id:bigint, @created_at:date, @username, @screenname)'
        }, (err, result) => {
            expect(err).to.be.null;
            expect(result).to.deep.equal({
                in: {
                    properties: {
                        created_at: {
                            type: 'string'
                        },
                        favorited: {
                            type: 'string'
                        },
                        id: {
                            type: 'number'
                        },
                        lang: {
                            type: 'string'
                        },
                        money: {
                            type: 'number'
                        },
                        retweeted: {
                            type: 'number'
                        },
                        screenname: {
                            type: 'string'
                        },
                        text: {
                            type: 'string'
                        },
                        username: {
                            type: 'string'
                        }
                    },
                    type: 'object'
                },
                out: {}
            }
            );
            done();
        });
    });

});
