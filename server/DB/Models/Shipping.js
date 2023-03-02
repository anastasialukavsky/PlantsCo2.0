const Sequelize = require('sequelize');
const db = require('../database');

const Shipping = db.define('shipping', {
  street1: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
  street2: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [
        [
          'Alabama',
          'Alaska',
          'American Samoa',
          'Arizona',
          'Arkansas',
          'California',
          'Colorado',
          'Connecticut',
          'Delaware',
          'District of Columbia',
          'Florida',
          'Georgia',
          'Guam',
          'Hawaii',
          'Idaho',
          'Illinois',
          'Indiana',
          'Iowa',
          'Kansas',
          'Kentucky',
          'Louisiana',
          'Maine',
          'Maryland',
          'Massachusetts',
          'Michigan',
          'Minnesota',
          'Minor Outlying Islands',
          'Mississippi',
          'Missouri',
          'Montana',
          'Nebraska',
          'Nevada',
          'New Hampshire',
          'New Jersey',
          'New Mexico',
          'New York',
          'North Carolina',
          'North Dakota',
          'Northern Mariana Islands',
          'Ohio',
          'Oklahoma',
          'Oregon',
          'Pennsylvania',
          'Puerto Rico',
          'Rhode Island',
          'South Carolina',
          'South Dakota',
          'Tennessee',
          'Texas',
          'U.S. Virgin Islands',
          'Utah',
          'Vermont',
          'Virginia',
          'Washington',
          'West Virginia',
          'Wisconsin',
          'Wyoming',
        ],
      ],
      notEmpty: true,
      notNull: true,
    },
  },
  zip: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
  address: {
    type: Sequelize.DataTypes.VIRTUAL,
    get() {
      let addressArray = [];
      addressArray.push(this.street1);
      if (this.street2) addressArray.push(this.street2);
      addressArray.push(this.city);
      addressArray.push(this.state);
      addressArray.push(this.zip);
      return addressArray;
    },
    set(value) {
      throw new Error(
        'Field is set automatically, please do not try to change'
      );
    },
  },
  isDefault: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
});

module.exports = Shipping;
