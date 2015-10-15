module.exports = {
  mergeStyle: function(style1, style2) {
    return _.extend(_.clone(style1), style2);
  },
};
