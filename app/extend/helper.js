'use strict';

const dayjs = require('dayjs');

const helper = {
  relativeTime: time => dayjs(new Date(time * 1000)).fromNow(),
};


exports.relativeTime = helper;
