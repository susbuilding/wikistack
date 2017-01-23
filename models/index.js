var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

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
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },

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
        }
    }
});

module.exports = {
    Page: Page,
    User: User
}



function titleize (title) {
    if (title) {
        return title.replace(/\s+/g, '_').replace(/\W/g, '');
    } else {
        return Math.random().toString(36).slice(2, 7);
    }
};
