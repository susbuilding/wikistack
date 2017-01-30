var Sequelize = require('sequelize');
var marked = require('marked');

var db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

function titleize (title) {
    if (title) {
        return title.replace(/\s+/g, '_').replace(/\W/g, '');
    } else {
        return Math.random().toString(36).slice(2, 7);
    }
};

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: true
    }

});

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
        set: function (tags) {
            tags = tags || [];

            if (typeof tags === 'string') {
                tags = tags.split(',').map(function (str) {
                    return str.trim();
                });
            }
            this.setDataValue('tags', tags);
        }
    }
}, {
    hooks: {
        beforeValidate: function (page) {
            var newTitle = titleize(page.title);
            page.urlTitle = newTitle;
        }
    },
    getterMethods: {
        route: function () {
                return '/wiki/' + this.getDataValue('urlTitle');
        },
        renderedContent: function() {
            return marked(this.content);
        }
    },
    classMethods: {
        findByTag: function (tag) {
            return this.findAll({
                where: {
                    tags: {
                        $contains: [tag]
                    }
                }
            });
        }
    },
    instanceMethods: {
        findSimilar: function () {
            return Page.findAll({
                where: {
                    id: {
                        $ne: this.id
                    },
                    tags: {
                        $overlap: this.tags
                    }
                }
            });
        }
    }
});

//associations
Page.belongsTo(User, { as: 'author' });

module.exports = {
    Page: Page,
    User: User,
    db: db
}


