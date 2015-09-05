const Breakpoints = {
  mobile: 768,
  tablet: 992,
  desktop: 1280,
  getDisplay(val) {
    var display = null;

    if (val < Breakpoints.mobile) {
      display = 'mobile';
    } else if (val < Breakpoints.tablet && val >= Breakpoints.mobile) {
      display = 'tablet';
    } else if (val >= Breakpoints.tablet) {
      display = 'desktop';
    }
    return display;
  },
};

export default Breakpoints;
