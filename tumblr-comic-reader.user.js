// ==UserScript==
// @name         Tumblr Comics
// @namespace    http://www.roborg.co.uk/
// @version      0.1
// @description  Browse comics on Tumblr in a sensible way
// @author       You
// @include      http://*.tumblr.com/*
// @include      https://*.tumblr.com/*
// @grant        GM_xmlhttpRequest
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @run-at       document-end
// ==/UserScript==

(function(window) {
    'use strict';

    // Do not run in iframes
    if (window.top !== window.self)
        return;

    console.log('Running Tumblr Comics UserScript');

    // TODO: preload next/prev page
    // TODO: add icon to tags
    // TODO: jump to?
    // TODO: Save/Load to URL hash
    // TODO: Clean up duplicated code
    // TODO: Load pages as AJAX instead of iframe

    const imageSize = 1280;
    const preloadImages = true;
    const perPage = $('.post').length;
    const loadingSpinner = 'data:image/gif;base64,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';

    const Entry = function(images, text) {
        this.images = images;
        this.text = text;
    };

    Entry.prototype = {
        preload: function() {
            for (let i = 0; i < this.images.length; i++) {
                let img = new Image();

                img.src = this.images[i];
            }
        }
    };

    const PostPhoto = function(container) {
        this.container = container;
    };

    PostPhoto.prototype = {
        getEntry: function() {
            var deferred = $.Deferred();

            $.when(this.getImageUrls(), this.getText()).then(function(imageUrls, text) {
                deferred.resolve(new Entry(imageUrls, text));
            });

            return deferred.promise();
        },
        getImageUrls: function() {
            var deferred = $.Deferred();
            var imageUrls = [];

            this.container.children('a').find('img').each(function() {
                imageUrls.push(this.src.replace(/\d+(?=(\.png|\.gif|\.jpe?g)$)/i, imageSize));
            });

            deferred.resolve(imageUrls);

            return deferred.promise();
        },
        getText: function() {
            var deferred = $. Deferred();

            deferred.resolve(this.container.children('p').wrapAll('<div/>').html());

            return deferred.promise();
        }
    };

    const PostVideo = function(container) {
        this.container = container;
    };

    PostVideo.prototype = {
        getEntry: function() {
            var deferred = $.Deferred();

            $.when(this.getImageUrls(), this.getText()).then(function(imageUrls, text) {
                deferred.resolve(new Entry(imageUrls, text));
            });

            return deferred.promise();
        },
        getImageUrls: function() {
            console.log('Video getImageUrls');
            var deferred = $.Deferred();
            var iframe = this.container.find('iframe').eq(0);
            var onLoaded = function() {
                var imageUrls = [];

                iframe.contents().find('a > img').each(function() {
                    imageUrls.push(this.src.replace(/\d+(?=(\.png|\.gif|\.jpe?g)$)/i, imageSize));
                });

                deferred.resolve(imageUrls);
            };

            if (iframe.contents()[0].readyState == 'loading') {
                iframe.on('load', onLoaded);
            } else {
                onLoaded();
            }

            return deferred.promise();
        },
        getText: function() {
            var deferred = $.Deferred();

            deferred.resolve(this.container.children('p').wrapAll('<div/>').html());

            return deferred.promise();
        }
    };

    const Comic = function(blog, tag, perPage, overlay) {
        this.blog = blog;
        this.tag = tag;
        this.perPage = perPage;
        this.current = 0;
        this.entries = [];
        this.pageStates = [];

        this.overlay = overlay;
        this.pageLoader = new PageLoader(blog, tag);
    };

    Comic.prototype = {
        prev: function() {
            if (this.current > 0) {
                --this.current;
                this.update();
                this.loadPage(this.getPageNumber() - 1);
            }
        },
        next: function() {
            ++this.current;
            this.update();
            this.loadPage(this.getPageNumber() + 1);
        },
        update: function() {
            if (this.entries[this.current]) {
                this.overlay.showEntry(this.entries[this.current]);
            } else {
                var self = this;
                var pageNumber = this.getPageNumber();

                $.when(this.loadPage(pageNumber)).then(function() {
                    self.overlay.showEntry(self.entries[self.current]);
                });
            }
        },
        loadPage: function(pageNumber) {
            var self = this;
            var deferred = $.Deferred();

            if (pageNumber < 1) {
                return true;
            }

            if (this.pageStates[pageNumber] === undefined) {
                this.pageStates[pageNumber] = deferred.promise();

                $.when(this.pageLoader.load(pageNumber)).then(function(entries) {
                    var offset = (pageNumber - 1) * self.perPage;

                    for (let i = 0; i < entries.length; ++i) {
                        self.entries[offset + i] = entries[i];
                    }

                    deferred.resolve();
                });
            } else {
                $.when(this.pageStates[pageNumber]).then(function() {
                    deferred.resolve();
                });
            }

            return deferred.promise();
        },
        getPageNumber: function(entryNumber) {
            if (entryNumber === undefined) {
                entryNumber = this.current;
            }

            // Pages are 1-based
            return Math.floor(entryNumber / this.perPage) + 1;
        }
    };

    const Overlay = function(loadingSpinner) {
        this.lightbox = null;
        this.img = null;
        this.text = null;
        this.loadingSpinner = loadingSpinner;

        this.create();
    };

    Overlay.prototype = {
        create: function() {
            this.lightbox = $('<div class="tmblr-lightbox"/>').appendTo('body');
            this.img = $('<img alt="">').appendTo(this.lightbox);
            this.text = $('<div class="lightbox-caption"/>').appendTo(this.lightbox);

            this.img.attr('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==');
        },
        showEntry: function(entry) {
            var overlay = this;

            this.img.attr('src', this.loadingSpinner)
                .attr('alt', $('<div/>').html(entry.text));

            var img = new Image();
            img.onload = function() {
                overlay.img.attr('src', this.src);
            };
            img.src = entry.images[0];

            this.text.html(entry.text);
        }
    };

    const PageLoader = function(blog, tag) {
        this.blog = blog;
        this.tag = tag;
    };

    PageLoader.prototype = {
        load: function(pageNumber) {
            var self = this;
            var url = 'https://' + this.blog + '.tumblr.com/tagged/' + this.tag + '/chrono';
            var deferred = $.Deferred();

            if (pageNumber != 1) {
                url += '/page/' + pageNumber;
            }

            if (location.href.replace(/^http:/, 'https:') === url) {
                $.when(self.parse($(document))).then(function(entries) {
                    deferred.resolve(entries);
                });
            } else {
                var iframe = $('<iframe/>').attr('src', url).appendTo('body');
                console.log('Loading page');
                iframe.on('load', function() {
                    console.log('Page loaded');
                    $.when(self.parse(iframe.contents())).then(function(entries) {
                        console.log('Page parsed');
                        iframe.remove();
                        deferred.resolve(entries);
                    });
                });
            }

            return deferred.promise();
        },
        parse: function(container) {
            var parser = new PageParser(container);

            return parser.run();
        }
    };

    const PageParser = function(page) {
        this.page = page;
    };

    PageParser.prototype = {
        run: function() {
            var deferred = $.Deferred();
            var entries = [];
            var remaining = 0;
            var posts = this.page.find('.post');

            console.log('Parsing ' + this.page.find('.post').length + ' posts');

            if (posts.length) {
                posts.each(function(index) {
                    var $this = $(this);
                    var postParser;

                    if ($this.is('.post-photo')) {
                        postParser = new PostPhoto($this);
                    } else if ($this.is('.post-video')) {
                        postParser = new PostVideo($this);
                    } else {
                        console.log('Unknown post type: ' + this.className);

                        return;
                    }

                    ++remaining;

                    $.when(postParser.getEntry()).then(function(entry) {
                        if (preloadImages) {
                            entry.preload();
                        }

                        entries[index] = entry;
                        --remaining;
                        console.log(remaining + ' posts remaining');
                        if (!remaining) {
                            deferred.resolve(entries);
                        }
                    });
                });
            } else {
                // ToDo: handle last page / error
                deferred.resolve([]);
            }

            return deferred.promise();
        }
    };

    // TODO: BLOG & TAG
    const comic = new Comic('ask-princesssparkle', 'askblog', perPage, new Overlay(loadingSpinner));

    // todo delete timeout
    setTimeout(function() {
        comic.update();

        $(document).keyup(function(e) {
            switch(e.which) {
                case 37: // Left arrow
                    comic.prev();
                    break;

                case 39: // Right arrow
                    comic.next();
                    break;
            }
        });
    }, 2000);
})(window);