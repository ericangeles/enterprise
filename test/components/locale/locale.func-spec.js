// Import all the locales

require('../../../src/components/locale/cultures/af-ZA.js');
require('../../../src/components/locale/cultures/ar-EG.js');
require('../../../src/components/locale/cultures/ar-SA.js');
require('../../../src/components/locale/cultures/bg-BG.js');
require('../../../src/components/locale/cultures/cs-CZ.js');
require('../../../src/components/locale/cultures/da-DK.js');
require('../../../src/components/locale/cultures/de-DE.js');
require('../../../src/components/locale/cultures/el-GR.js');
require('../../../src/components/locale/cultures/en-AU.js');
require('../../../src/components/locale/cultures/en-GB.js');
require('../../../src/components/locale/cultures/en-IN.js');
require('../../../src/components/locale/cultures/en-NZ.js');
require('../../../src/components/locale/cultures/en-US.js');
require('../../../src/components/locale/cultures/en-ZA.js');
require('../../../src/components/locale/cultures/es-AR.js');
require('../../../src/components/locale/cultures/es-ES.js');
require('../../../src/components/locale/cultures/es-MX.js');
require('../../../src/components/locale/cultures/es-US.js');
require('../../../src/components/locale/cultures/et-EE.js');
require('../../../src/components/locale/cultures/fi-FI.js');
require('../../../src/components/locale/cultures/fr-CA.js');
require('../../../src/components/locale/cultures/fr-FR.js');
require('../../../src/components/locale/cultures/he-IL.js');
require('../../../src/components/locale/cultures/hi-IN.js');
require('../../../src/components/locale/cultures/hr-HR.js');
require('../../../src/components/locale/cultures/hu-HU.js');
require('../../../src/components/locale/cultures/id-ID.js');
require('../../../src/components/locale/cultures/it-IT.js');
require('../../../src/components/locale/cultures/ja-JP.js');
require('../../../src/components/locale/cultures/ko-KR.js');
require('../../../src/components/locale/cultures/lt-LT.js');
require('../../../src/components/locale/cultures/lv-LV.js');
require('../../../src/components/locale/cultures/ms-bn.js');
require('../../../src/components/locale/cultures/ms-my.js');
require('../../../src/components/locale/cultures/nb-NO.js');
require('../../../src/components/locale/cultures/nl-NL.js');
require('../../../src/components/locale/cultures/no-NO.js');
require('../../../src/components/locale/cultures/pl-PL.js');
require('../../../src/components/locale/cultures/pt-BR.js');
require('../../../src/components/locale/cultures/pt-PT.js');
require('../../../src/components/locale/cultures/ro-RO.js');
require('../../../src/components/locale/cultures/ru-RU.js');
require('../../../src/components/locale/cultures/sl-SI.js');
require('../../../src/components/locale/cultures/sv-SE.js');
require('../../../src/components/locale/cultures/th-TH.js');
require('../../../src/components/locale/cultures/tr-TR.js');
require('../../../src/components/locale/cultures/uk-UA.js');
require('../../../src/components/locale/cultures/vi-VN.js');
require('../../../src/components/locale/cultures/zh-CN.js');
require('../../../src/components/locale/cultures/zh-TW.js');

describe('Locale API', () => {
  const Locale = window.Soho.Locale;

  it('Should be possible to preset culturesPath', () => {
    window.SohoConfig = { culturesPath: 'dist/js/cultures/' };

    expect(window.SohoConfig.culturesPath).toEqual('dist/js/cultures/');
    window.SohoConfig.culturesPath = null;
  });

  it('Should be an object', () => {
    expect(Locale).toBeDefined();
  });

  it('Should be possible to set locale', () => {
    Locale.set('en-US');

    expect(Locale.currentLocale.name).toEqual('en-US');
  });

  it('Should be possible to after set locale', () => {
    Locale.culturesPath = 'dist/js/cultures/';

    expect(Locale.culturesPath).toEqual('dist/js/cultures/');
    Locale.culturesPath = null;
  });

  it('Should set the html lang and dir attribute', () => {
    Locale.set('de-DE');

    expect(Locale.currentLocale.name).toEqual('de-DE');

    let html = window.document.getElementsByTagName('html')[0];

    expect(html.getAttribute('lang')).toEqual('de-DE');

    Locale.set('ar-SA');

    expect(Locale.currentLocale.name).toEqual('ar-SA');

    html = window.document.getElementsByTagName('html')[0];

    expect(html.getAttribute('lang')).toEqual('ar-SA');
    expect(html.getAttribute('dir')).toEqual('rtl');
    Locale.set('en-US');
  });

  it('Should map in-ID to id-ID', () => {
    Locale.set('in-ID');

    expect(Locale.currentLocale.name).toEqual('id-ID');
    Locale.set('en-US');
  });

  it('Should map iw and iw-IL to he-IL', () => {
    Locale.set('iw-IL');

    expect(Locale.currentLocale.name).toEqual('he-IL');

    Locale.set('iw');

    expect(Locale.currentLocale.name).toEqual('he-IL');
    Locale.set('en-US');
  });

  it('Should format arabic month format', () => {
    Locale.set('ar-SA');
    // Note date is year, month, day
    expect(Locale.formatDate(new Date(2000, 12, 1), { pattern: Locale.calendar().dateFormat.month })).toEqual('01 محرم');
    expect(Locale.formatDate(new Date(2017, 10, 8), { pattern: Locale.calendar().dateFormat.month })).toEqual('08 ذو القعدة');
    Locale.set('en-US');
  });

  it('Should format en-US dates', () => {
    Locale.set('en-US');
    // Note date is year, month, day
    expect(Locale.formatDate(new Date(2000, 10, 8))).toEqual('11/8/2000');
    expect(Locale.formatDate(new Date(2000, 10, 8), { date: 'short' })).toEqual('11/8/2000');
    expect(Locale.formatDate(new Date(2000, 10, 8), { date: 'medium' })).toEqual('Nov 8, 2000');
    expect(Locale.formatDate(new Date(2000, 10, 8), { date: 'long' })).toEqual('November 8, 2000');
    expect(Locale.formatDate(new Date(2000, 10, 8), { pattern: 'M/d/yyyy' })).toEqual('11/8/2000');

    // Other Cases
    expect(Locale.formatDate('11/8/2000')).toEqual('11/8/2000');
    expect(Locale.formatDate('2018-11-29', { pattern: 'yyyy-MM-dd' })).toEqual('2018-11-29');
    expect(Locale.formatDate(1458054935410, { pattern: 'yyyy-MM-dd' })).toEqual('2016-03-15');

    // Test Can return different values depending on machine timezone.
    expect(['2014-12-31', '2015-01-01']).toContain(Locale.formatDate('2015-01-01T05:00:00.000Z', { pattern: 'yyyy-MM-dd' }));
    expect(['2015-04-10', '2015-05-10']).toContain(Locale.formatDate('2015-05-10T00:00:00', { pattern: 'yyyy-MM-dd' }));
    expect(Locale.formatDate()).toEqual(undefined);
  });

  it('Should format timestamp in Arabic', () => {
    Locale.set('ar-SA');
    // Note date is year, month, day
    expect(Locale.formatDate(new Date(2000, 12, 1), { pattern: Locale.calendar().dateFormat.month })).toEqual('01 محرم');
    expect(Locale.formatDate(new Date(2017, 10, 8), { pattern: Locale.calendar().dateFormat.month })).toEqual('08 ذو القعدة');
    Locale.set('en-US');
  });

  it('Should format timestamp in English', () => {
    Locale.set('en-US');

    expect(Locale.formatDate(new Date(2015, 10, 5, 10, 20, 5), { date: 'timestamp' })).toEqual('10:20:05 AM');
    expect(Locale.formatDate(new Date(2015, 10, 5, 10, 20, 5), { pattern: 'hhmmss' })).toEqual('102005');

    const dt = new Date();
    const h = (dt.getHours() > 12 ? dt.getHours() - 12 : dt.getHours()).toString();
    const h24 = Locale.pad(dt.getHours().toString(), 2);
    const m = Locale.pad(dt.getMinutes(), 2).toString();
    const s = Locale.pad(dt.getSeconds(), 2).toString();

    expect(Locale.formatDate(dt, { pattern: 'hmmss' })).toEqual(h + m + s);
    expect(Locale.formatDate(dt, { pattern: 'HHmmss' })).toEqual(h24 + m + s);
  });

  it('Should format millis', () => {
    Locale.set('en-US');

    expect(Locale.formatDate(new Date(2016, 2, 15, 12, 30, 36, 142), { pattern: 'd/M/yyyy h:mm:ss.SSS a ' })).toEqual('15/3/2016 12:30:36.142 PM');
    expect(Locale.formatDate(new Date(2016, 2, 15, 12, 30, 36, 142), { pattern: 'd/M/yyyy h:mm:ss.SSS ' })).toEqual('15/3/2016 12:30:36.142');
  });

  // Format some random date type cases
  it('Should format other dates', () => {
    Locale.set('de-DE');

    expect(Locale.formatDate(new Date(2000, 10, 8))).toEqual('08.11.2000');
    expect(Locale.formatDate(new Date(2000, 11, 1))).toEqual('01.12.2000');
    expect(Locale.formatDate(new Date(2000, 10, 8), { date: 'short' })).toEqual('08.11.2000');
    expect(Locale.formatDate(new Date(2000, 10, 8), { date: 'medium' })).toEqual('08.11.2000');
    expect(Locale.formatDate(new Date(2000, 10, 8), { date: 'long' })).toEqual('8. November 2000');
    expect(Locale.formatDate(new Date(2000, 10, 8), { pattern: 'M.dd.yyyy' })).toEqual('11.08.2000');

    Locale.set('fi-FI');

    expect(Locale.formatDate(new Date(2000, 11, 1))).toEqual('1.12.2000');
  });

  // Format time in us and europe
  it('Should format time', () => {
    Locale.set('en-US');

    expect(Locale.formatDate(new Date(2000, 10, 8, 13, 40), { date: 'datetime' })).toEqual('11/8/2000 1:40 PM');
    expect(Locale.formatDate(new Date(2000, 10, 8, 13, 0), { date: 'datetime' })).toEqual('11/8/2000 1:00 PM');

    Locale.set('de-DE');

    expect(Locale.formatDate(new Date(2000, 11, 1, 13, 40), { date: 'datetime' })).toEqual('01.12.2000 13:40');
    expect(Locale.formatDate(new Date(2000, 11, 1, 13, 5), { pattern: 'M.dd.yyyy HH:mm' })).toEqual('12.01.2000 13:05');

    const date = new Date(2017, 1, 1, 17, 27, 40);
    const opts = { date: 'datetime' };

    Locale.set('fi-FI');

    expect(Locale.formatDate(date, opts)).toEqual('1.2.2017 17:27');

    Locale.set('cs-CZ');

    expect(Locale.formatDate(date, opts)).toEqual('01.02.2017 17:27');

    Locale.set('hu-HU');

    expect(Locale.formatDate(date, opts)).toEqual('2017. 02. 01. 17:27');

    Locale.set('ja-JP');

    expect(Locale.formatDate(date, opts)).toEqual('2017/02/01 17:27');

    Locale.set('ru-RU');

    expect(Locale.formatDate(date, opts)).toEqual('2/1/2017 17:27');
  });

  // monthYear and yearMonth
  it('Should format a year and month locale', () => {
    Locale.set('en-US');

    expect(Locale.formatDate(new Date(2000, 10, 8, 13, 40), { date: 'month' })).toEqual('November 8');
    expect(Locale.formatDate(new Date(2000, 10, 8, 13, 0), { date: 'year' })).toEqual('November 2000');

    Locale.set('de-DE');

    expect(Locale.formatDate(new Date(2000, 11, 1, 13, 40), { date: 'month' })).toEqual('1. Dezember');
    expect(Locale.formatDate(new Date(2000, 11, 1, 13, 5), { date: 'year' })).toEqual('Dezember 2000');

    Locale.set('sv-SE');

    expect(Locale.formatDate(new Date(2000, 11, 1, 13, 40), { date: 'month' })).toEqual('den 1 december');
    expect(Locale.formatDate(new Date(2000, 11, 1, 13, 5), { date: 'year' })).toEqual('december 2000');
  });

  // monthYear and yearMonth
  it('Should be able to test RTL', () => {
    Locale.set('en-US');

    expect(Locale.isRTL()).toEqual(false);
    Locale.set('ar-SA');

    expect(Locale.isRTL()).toEqual(true);
    Locale.set('en-US');
  });

  // Formating Hours
  it('Should be able to format and parse hours', () => {
    Locale.set('en-US');
    const dt = Locale.parseDate('000100', 'HHmmss', false);

    expect(dt.getTime()).toEqual(new Date((new Date()).getFullYear(), (new Date()).getMonth(), 1, '00', '01', '00').getTime());
    expect(Locale.formatDate(dt, { pattern: 'h:mm a' })).toEqual('12:01 AM');
    expect(Locale.formatDate(dt, { pattern: 'HHmmss' })).toEqual('000100');

    // Test 12:00 specifically
    expect(Locale.parseDate('10/28/2015 12:00:00 AM', 'M/d/yyyy h:mm:ss a').getTime()).toEqual(new Date(2015, 9, 28, 0, 0, 0).getTime());
    expect(Locale.parseDate('25/04/2017 12:00:00 AM', { pattern: 'd/MM/yyyy h:mm:ss a' }).getTime()).toEqual(new Date(2017, 3, 25, 0, 0, 0).getTime());
  });

  it('Should be able to parse 2 and 3 digit years', () => {
    Locale.set('en-US');

    expect(Locale.parseDate('10/10/10', 'M/d/yyyy').getTime()).toEqual(new Date(2010, 9, 10, 0, 0, 0).getTime());
    expect(Locale.parseDate('10/10/010', 'M/d/yyyy')).toEqual(undefined);
  });

  it('Should be able to parse UTC toISOString', () => {
    Locale.set('en-US');

    expect(Locale.parseDate('2000-01-01T00:00:00.000Z', 'yyyy-MM-ddTHH:mm:ss.SSSZ').getTime()).toEqual(new Date(Date.UTC(2000, 0, 1, 0, 0, 0)).getTime());
    expect(Locale.parseDate('2000-01-01T00:00:00.001Z', 'yyyy-MM-DDTHH:mm:ss.SSSZ').toISOString()).toEqual('2000-01-01T00:00:00.001Z');
  });

  // Test Long Formatting
  it('Should format long', () => {
    Locale.set('en-US');
    // Date format is year, month, day, hours, mins , secs
    expect(Locale.formatDate(new Date(2015, 0, 8, 13, 40), { date: 'long' })).toEqual('January 8, 2015');

    Locale.set('de-DE');

    expect(Locale.formatDate(new Date(2015, 0, 1, 13, 40), { date: 'long' })).toEqual('1. Januar 2015');

    Locale.set('es-ES');

    expect(Locale.formatDate(new Date(2015, 0, 1, 13, 40), { date: 'long' })).toEqual('1 de Enero de 2015');

    Locale.set('lt-LT');

    expect(Locale.formatDate(new Date(2015, 0, 1, 13, 40), { date: 'long' })).toEqual('2015 m. sausis 1 d.');

    Locale.set('vi-VN');

    expect(Locale.formatDate(new Date(2015, 0, 1, 13, 40), { date: 'long' })).toEqual('ngày 01 tháng 01 năm 2015');
  });

  it('Should format long with day of week', () => {
    Locale.set('en-US');

    expect(Locale.formatDate(new Date(2015, 0, 8, 13, 40), { date: 'full' })).toEqual('Thursday, January 8, 2015');
    expect(Locale.formatDate(new Date(2015, 2, 7, 13, 40), { date: 'full' })).toEqual('Saturday, March 7, 2015');

    Locale.set('de-DE');

    expect(Locale.formatDate(new Date(2015, 0, 1, 13, 40), { date: 'full' })).toEqual('Donnerstag, 1. Januar 2015');
  });

  it('Should format long days', () => {
    Locale.set('en-US');
    // Date format is year, month, day, hours, mins , secs
    expect(Locale.formatDate(new Date(2015, 0, 8, 13, 40), { date: 'long' })).toEqual('January 8, 2015');

    Locale.set('de-DE');

    expect(Locale.formatDate(new Date(2015, 0, 1, 13, 40), { date: 'long' })).toEqual('1. Januar 2015');

    Locale.set('ar-EG');

    expect(Locale.formatDate(new Date(2015, 0, 1, 13, 40), { date: 'long' })).toEqual('2015 يناير، 1');

    Locale.set('bg-BG');

    expect(Locale.formatDate(new Date(2015, 0, 1, 13, 40), { date: 'long' })).toEqual('1 януари 2015 г.');
    Locale.set('en-US');
  });

  it('Should be able to parse dates', () => {
    Locale.set('en-US');

    expect(Locale.parseDate('11/8/2000').getTime()).toEqual(new Date(2000, 10, 8).getTime());
    expect(Locale.parseDate('11/8/00').getTime()).toEqual(new Date(2000, 10, 8).getTime());
    expect(Locale.parseDate('10 / 15 / 2014').getTime()).toEqual(new Date(2014, 9, 15).getTime());
    Locale.set('de-DE');

    expect(Locale.parseDate('08.11.2000').getTime()).toEqual(new Date(2000, 10, 8).getTime());
  });

  it('Should parse dates with month zero', () => {
    Locale.set('en-US');

    expect(Locale.parseDate('2016-01-01', 'yyyy-MM-dd').getTime()).toEqual(new Date(2016, 0, 1).getTime());
    expect(Locale.parseDate('2016-01-03', 'yyyy-MM-dd').getTime()).toEqual(new Date(2016, 0, 3).getTime());
    expect(Locale.parseDate('2016-01-31', 'yyyy-MM-dd').getTime()).toEqual(new Date(2016, 0, 31).getTime());
  });

  it('Should be able to format with no separator', () => {
    Locale.set('en-US');

    expect(Locale.parseDate('20151028', 'yyyyMMdd').getTime()).toEqual(new Date(2015, 9, 28).getTime());
    expect(Locale.parseDate('28/10/2015', 'dd/MM/yyyy').getTime()).toEqual(new Date(2015, 9, 28).getTime());
    expect(Locale.parseDate('10/28/2015', 'M/d/yyyy').getTime()).toEqual(new Date(2015, 9, 28).getTime());
    expect(Locale.parseDate('10282015', 'Mdyyyy').getTime()).toEqual(new Date(2015, 9, 28).getTime());
    expect(Locale.parseDate('10282015', 'Mdyyyy').getTime()).toEqual(new Date(2015, 9, 28).getTime());
    expect(Locale.parseDate('10/28/99', 'MM/dd/yy').getTime()).toEqual(new Date(1999, 9, 28).getTime());

    // We can parse either 4 or 2 digit month day
    expect(Locale.parseDate('10282015', 'Mdyyyy').getTime()).toEqual(new Date(2015, 9, 28).getTime());
    expect(Locale.parseDate('222015', 'dMyyyy').getTime()).toEqual(new Date(2015, 1, 2).getTime());
  });

  it('Should be able to parse date time', () => {
    Locale.set('en-US');

    expect(Locale.parseDate('10/28/2015 8:12:10', 'M/d/yyyy h:mm:ss').getTime()).toEqual(new Date(2015, 9, 28, 8, 12, 10).getTime());
    expect(Locale.parseDate('10/28/2015 8:12:10 PM', 'M/d/yyyy h:mm:ss a').getTime()).toEqual(new Date(2015, 9, 28, 20, 12, 10).getTime());
    expect(Locale.parseDate('10/28/2015 8:12:10 AM', 'M/d/yyyy h:mm:ss a').getTime()).toEqual(new Date(2015, 9, 28, 8, 12, 10).getTime());
    expect(Locale.parseDate('10/28/2015', 'M/d/yyyy h:mm:ss')).toEqual(undefined);
    expect(Locale.parseDate('10/28/2015 20:12:10', 'M/d/yyyy HH:mm:ss').getTime()).toEqual(new Date(2015, 9, 28, 20, 12, 10).getTime());
    expect(Locale.parseDate('10/28/2015 30:12:10', 'M/d/yyyy HH:mm:ss')).toEqual(undefined);
    expect(Locale.parseDate('10/28/2015 30:30:10 AM', 'M/d/yyyy h:mm:ss a')).toEqual(undefined);
    expect(Locale.parseDate(undefined)).toEqual(undefined);
  });

  it('Should parse incomplete dates', () => {
    Locale.set('en-US');

    expect(Locale.parseDate('10/28/2015 8:12:10', 'M/d/yyyy h:mm:ss').getTime()).toEqual(new Date(2015, 9, 28, 8, 12, 10).getTime());
    const dt = new Date();
    const y = dt.getFullYear();

    expect(Locale.parseDate('1105', 'MMdd').getTime()).toEqual(new Date(y, 10, 5, 0, 0, 0).getTime());
    expect(Locale.parseDate('201511', 'yyyyMM').getTime()).toEqual(new Date(2015, 10, 1, 0, 0, 0).getTime());
  });

  it('Should round minutes to 60 ', () => {
    Locale.set('en-US');

    expect(Locale.parseDate('10/28/2015 8:65:10', 'M/d/yyyy h:mm:ss').getTime()).toEqual(new Date(2015, 9, 28, 8, 0, 10).getTime());
    expect(Locale.parseDate('10/28/2015 8:10:65', 'M/d/yyyy h:mm:ss').getTime()).toEqual(new Date(2015, 9, 28, 8, 10, 0).getTime());
  });

  it('Should should handle leap years', () => {
    Locale.set('en-US');

    expect(Locale.parseDate('02/29/2016', 'M/d/yyyy').getTime()).toEqual(new Date(2016, 1, 29).getTime());
    expect(Locale.parseDate('02/30/2016', 'M/d/yyyy')).toEqual(undefined);
  });

  it('Should cleanly handle non dates', () => {
    Locale.set('en-US');

    expect(Locale.parseDate('111/81/20001')).toEqual(undefined);
    expect(Locale.formatNumber(undefined, { date: 'timestamp' })).toEqual(undefined);
    expect(Locale.parseDate('13/28/2015', 'MM/d/yyyy')).toEqual(undefined);
    expect(Locale.parseDate('10/32/2015', 'MM/dd/yyyy')).toEqual(undefined);
  });

  it('Should parse text months', () => {
    Locale.set('en-US');

    expect(Locale.parseDate('2015 December', 'yyyy MMMM').getTime()).toEqual(new Date(2015, 11, 1, 0, 0, 0).getTime());
    expect(Locale.parseDate('13 Oct 2017 1:00 PM', 'd MMM yyyy H:mm a').getTime()).toEqual(new Date(2017, 9, 13, 13, 0, 0).getTime());

    Locale.set('de-DE');

    expect(Locale.parseDate('Dezember 2015', 'MMMM yyyy').getTime()).toEqual(new Date(2015, 11, 1, 0, 0, 0).getTime());
  });

  it('Should parse Dates with - in them', () => {
    Locale.set('en-US');

    // Test date only
    expect(Locale.parseDate('2015-05-10', 'yyyy-dd-MM').getTime()).toEqual(new Date(2015, 9, 5, 0, 0, 0).getTime());

    // Test date only different format
    expect(Locale.parseDate('05-10-2015', 'dd-MM-yyyy').getTime()).toEqual(new Date(2015, 9, 5, 0, 0, 0).getTime());
  });

  it('Should be able to return time format', () => {
    Locale.set('en-US');

    expect(Locale.formatDate(new Date(2015, 0, 8, 13, 40, 45), { date: 'timestamp' })).toEqual('1:40:45 PM');

    Locale.set('de-DE');

    expect(Locale.formatDate(new Date(2015, 0, 8, 13, 40, 45), { date: 'timestamp' })).toEqual('13:40:45');
  });

  it('Should treat no-NO and nb-NO as the same locale', () => {
    Locale.set('no-NO');

    expect(Locale.translate('Loading')).toEqual('Laster');
    Locale.set('nb-NO');

    expect(Locale.translate('Loading')).toEqual('Laster');
    expect(Locale.calendar().timeFormat).toEqual('HH.mm');
    Locale.set('en-US');
  });

  it('Should translate', () => {
    // Normal
    Locale.set('en-US');

    expect(Locale.translate('Required')).toEqual('Required');

    // With Object Selector
    Locale.set('de-DE');

    expect(Locale.translate('Required')).toEqual('Obligatorisch');
    expect(Locale.translate('Loading')).toEqual('Laden...');

    // Error
    expect(Locale.translate('XYZ')).toEqual('[XYZ]');

    // Non Existant in locale - use EN
    Locale.set('de-DE');

    expect(Locale.translate('Equals')).toEqual('Gleich');

    // Error
    expect(Locale.translate('XYZ')).toEqual('[XYZ]');
  });

  it('Should show undefined keys with [] around', () => {
    // Add due to SOHO-6782
    Locale.set('en-US');

    expect(Locale.translate('TestLocaleDefaults')).toEqual('Test Locale Defaults');
    Locale.set('de-DE');

    expect(Locale.translate('TestLocaleDefaults')).toEqual('Test Locale Defaults');
    Locale.set('ar-EG');

    expect(Locale.translate('XYZ')).toEqual('[XYZ]');
    Locale.set('en-US');
  });

  it('Should be possible to add translations', () => {
    Locale.set('en-US');
    Locale.currentLocale.data.messages.CustomValue = { id: 'CustomValue', value: 'Added Custom Value' };

    expect(Locale.translate('CollapseAppTray')).toEqual('Collapse App Tray');
    expect(Locale.translate('CustomValue')).toEqual('Added Custom Value');
  });

  /*
   *  it('Not error on a non existant locale', () => {
   *    // TODO Fix this test when we add better error handling
   *    Locale.set('en-US');
   *    Locale.set('xx-XX');
   *
   *    expect(Locale.translate('Required')).toEqual('Required');
   *  });
   */

  it('Should format decimals', () => {
    Locale.set('en-US');

    expect(Locale.formatNumber(12345.1234)).toEqual('12,345.123');
    expect(Locale.formatNumber(12345.123, { style: 'decimal', maximumFractionDigits: 2 })).toEqual('12,345.12');
    expect(Locale.formatNumber(12345.123456, { style: 'decimal', maximumFractionDigits: 3 })).toEqual('12,345.123');
    expect(Locale.formatNumber(0.0000004, { style: 'decimal', maximumFractionDigits: 7 })).toEqual('0.0000004');
    expect(Locale.formatNumber(20.1, { style: 'decimal', round: true, minimumFractionDigits: 2 })).toEqual('20.10');
    expect(Locale.formatNumber(20.1, { style: 'decimal', round: true })).toEqual('20.10');
    expect(Locale.formatNumber('12,345.123')).toEqual('12,345.123');
    expect(Locale.formatNumber(12345.1234, { group: '' })).toEqual('12345.123');
    expect(Locale.formatNumber(5.1, { minimumFractionDigits: 2, maximumFractionDigits: 2 })).toEqual('5.10');

    Locale.set('de-DE');

    expect(Locale.formatNumber(12345.1)).toEqual('12.345,10');
    expect(Locale.formatNumber(0.0000004, { style: 'decimal', maximumFractionDigits: 7 })).toEqual('0,0000004');
    expect(Locale.formatNumber(0.000004, { style: 'decimal', maximumFractionDigits: 7 })).toEqual('0,000004');

    Locale.set('ar-EG');

    expect(Locale.formatNumber(12345.1)).toEqual('12٬345٫10');
    Locale.set('bg-BG');

    expect(Locale.formatNumber(12345.1)).toEqual('12 345,10');
    Locale.set('en-US');
  });

  it('Should truncate and not round decimals', () => {
    Locale.set('en-US');

    expect(Locale.formatNumber(123456.123456, { style: 'decimal', maximumFractionDigits: 5 })).toEqual('123,456.12345');
    expect(Locale.formatNumber(123456.123456, { style: 'decimal', maximumFractionDigits: 4 })).toEqual('123,456.1234');
    expect(Locale.formatNumber(1.001, { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 3 })).toEqual('1');
    expect(Locale.formatNumber(1.001, { style: 'decimal', minimumFractionDigits: 3, maximumFractionDigits: 3 })).toEqual('1.001');
    expect(Locale.formatNumber(1.001, { style: 'decimal', minimumFractionDigits: 3, maximumFractionDigits: 3, round: true })).toEqual('1.001');
    expect(Locale.formatNumber(1.0019, { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 3 })).toEqual('1.001');
    expect(Locale.formatNumber(1.0019, { style: 'decimal', minimumFractionDigits: 3, maximumFractionDigits: 3 })).toEqual('1.001');
    expect(Locale.formatNumber(1.0019, { style: 'decimal', minimumFractionDigits: 3, maximumFractionDigits: 3, round: true })).toEqual('1.002');
    expect(Locale.formatNumber(12345.6789, { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 3 })).toEqual('12,345.678');
    expect(Locale.formatNumber(12345.6789, { style: 'decimal', minimumFractionDigits: 3, maximumFractionDigits: 3 })).toEqual('12,345.678');
    expect(Locale.formatNumber(12345.6789, { style: 'decimal', minimumFractionDigits: 3, maximumFractionDigits: 3, round: true })).toEqual('12,345.679');
  });

  it('Should format integers', () => {
    Locale.set('en-US');

    expect(Locale.formatNumber(12345.123, { style: 'integer' })).toEqual('12,345');

    Locale.set('de-DE');

    expect(Locale.formatNumber(12345.123, { style: 'integer' })).toEqual('12.345');
  });

  it('Should be able to parse string numbers into number type', () => {
    Locale.set('en-US');

    expect(Locale.formatNumber('12345', { style: 'integer' })).toEqual('12,345');
  });

  it('Should format currency', () => {
    Locale.set('en-US');

    expect(Locale.formatNumber(12345.129, { style: 'currency' })).toEqual('$12,345.12');

    // Added due to SOHO-5487
    expect(Locale.formatNumber(-2.53, { style: 'percent', minimumFractionDigits: 2 })).toEqual('-253.00 %');
    expect(Locale.formatNumber(-2.53, { style: 'percent' })).toEqual('-253 %');

    Locale.set('de-DE');

    expect(Locale.formatNumber(12345.123, { style: 'currency' })).toEqual('12.345,12 €');
    expect(Locale.formatNumber(-2.53, { style: 'percent', minimumFractionDigits: 2 })).toEqual('-253,00 %');
    expect(Locale.formatNumber(-2.53, { style: 'percent' })).toEqual('-253 %');
  });

  it('Should allow currency override', () => {
    Locale.set('es-ES');

    expect(Locale.formatNumber(12345.12, { style: 'currency', currencySign: '$' })).toEqual('12.345,12 $');
    Locale.set('de-DE');

    expect(Locale.formatNumber(12345.12, {
      style: 'currency',
      decimal: '.',
      group: ',',
      currencyFormat: '¤ #,##0.00',
      currencySign: '$'
    })).toEqual('$ 12,345.12');
  });

  it('Should format percent', () => {
    Locale.set('en-US');

    expect(Locale.formatNumber(0.0500000, { style: 'percent' })).toEqual('5 %');
    expect(Locale.formatNumber(0.050000, { style: 'percent', maximumFractionDigits: 0 })).toEqual('5 %');
    expect(Locale.formatNumber(0.05234, { style: 'percent', minimumFractionDigits: 4, maximumFractionDigits: 4 })).toEqual('5.2340 %');

    expect(Locale.formatNumber(0.57, { style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 0 })).toEqual('57 %');
    expect(Locale.formatNumber(0.57, { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 })).toEqual('57.00 %');
    expect(Locale.formatNumber(0.5700, { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 })).toEqual('57.00 %');
    expect(Locale.formatNumber(0.57010, { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 })).toEqual('57.01 %');
    expect(Locale.formatNumber(0.5755, { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 })).toEqual('57.55 %');

    Locale.set('tr-TR');

    expect(Locale.formatNumber(0.0500000, { style: 'percent' })).toEqual('%5');

    Locale.set('it-IT');

    expect(Locale.formatNumber(0.0500000, { style: 'percent' })).toEqual('5%');
  });

  it('Should parse numbers back', () => {
    Locale.set('en-US');

    expect(Locale.parseNumber('$12,345.13')).toEqual(12345.13);

    Locale.set('de-DE');

    expect(Locale.parseNumber('12.345,12 €')).toEqual(12345.12);
  });

  it('Should return NaN for bad numbers', () => {
    Locale.set('en-US');

    expect(NaN).toEqual(NaN);
    expect(Locale.parseNumber()).toEqual(NaN);
    expect(Locale.parseNumber('')).toEqual(NaN);
    expect(Locale.parseNumber('sdf')).toEqual(NaN);
    expect(Locale.parseNumber(undefined)).toEqual(NaN);
  });

  it('Should parse with multiple group separators', () => {
    Locale.set('en-US');

    expect(Locale.parseNumber('1,234,567,890.12346')).toEqual(1234567890.12346);
  });

  it('Should handle big numbers', () => {
    Locale.set('en-US');

    expect(Locale.parseNumber('1123456789123456.57')).toEqual(1123456789123456.57);
    expect(Locale.parseNumber('1123456789123.57')).toEqual(1123456789123.57);
    expect(Locale.parseNumber('112345678912345.57')).toEqual(112345678912345.57);
    expect(Locale.parseNumber('11234567891.57')).toEqual(11234567891.57);
  });

  it('Should handle AM/PM', () => {
    Locale.set('en-US');

    expect(Locale.formatDate(new Date(2016, 2, 15, 12, 30, 36), { pattern: 'd/M/yyyy h:mm:ss a' })).toEqual('15/3/2016 12:30:36 PM');
    expect(Locale.formatDate(new Date(2016, 2, 15, 0, 30, 36), { pattern: 'd/M/yyyy h:mm:ss a' })).toEqual('15/3/2016 12:30:36 AM');
    expect(Locale.formatDate(new Date(2016, 2, 15, 12, 30, 36), { pattern: 'd/M/yyyy HH:mm:ss' })).toEqual('15/3/2016 12:30:36');
    expect(Locale.formatDate(new Date(2016, 2, 15, 0, 30, 36), { pattern: 'd/M/yyyy HH:mm:ss' })).toEqual('15/3/2016 00:30:36');
  });

  it('Should handle minimumFractionDigits', () => {
    Locale.set('en-US');

    expect(Locale.formatNumber('12345', { minimumFractionDigits: 0, maximumFractionDigits: 2 })).toEqual('12,345');
    expect(Locale.formatNumber('12345.1', { minimumFractionDigits: 0, maximumFractionDigits: 2 })).toEqual('12,345.1');
    expect(Locale.formatNumber('12345.12', { minimumFractionDigits: 0, maximumFractionDigits: 2 })).toEqual('12,345.12');
    expect(Locale.formatNumber('12345.123', { minimumFractionDigits: 0, maximumFractionDigits: 2 })).toEqual('12,345.12');
    expect(Locale.formatNumber('12345.1234', { minimumFractionDigits: 0, maximumFractionDigits: 2 })).toEqual('12,345.12');

    expect(Locale.formatNumber('12345', { minimumFractionDigits: 2, maximumFractionDigits: 4 })).toEqual('12,345.00');
    expect(Locale.formatNumber('12345.1', { minimumFractionDigits: 2, maximumFractionDigits: 4 })).toEqual('12,345.10');
    expect(Locale.formatNumber('12345.12', { minimumFractionDigits: 2, maximumFractionDigits: 4 })).toEqual('12,345.12');
    expect(Locale.formatNumber('12345.123', { minimumFractionDigits: 2, maximumFractionDigits: 4 })).toEqual('12,345.123');
    expect(Locale.formatNumber('12345.12345678', { minimumFractionDigits: 2, maximumFractionDigits: 4 })).toEqual('12,345.1234');

    // Leave out the maximumFractionDigits
    expect(Locale.formatNumber('12345', { minimumFractionDigits: 2 })).toEqual('12,345.00');
    expect(Locale.formatNumber('12345', { minimumFractionDigits: 0 })).toEqual('12,345');
    expect(Locale.formatNumber('12345.1', { minimumFractionDigits: 0 })).toEqual('12,345.1');

    expect(Locale.formatNumber('12345', { minimumFractionDigits: 4 })).toEqual('12,345.0000');
    expect(Locale.formatNumber('12345.1', { minimumFractionDigits: 5 })).toEqual('12,345.10000');
  });

  it('Should format negative numbers', () => {
    Locale.set('en-US');

    expect(Locale.formatNumber(-1000000, { style: 'currency' })).toEqual('-$1,000,000.00');

    Locale.set('de-DE');

    expect(Locale.formatNumber(-1000000, { style: 'currency' })).toEqual('-1.000.000,00 €');

    Locale.set('ar-SA');

    expect(Locale.formatNumber(-1000000, { style: 'currency' })).toEqual('-﷼ 1٬000٬000٫00');
    Locale.set('en-US');
  });

  it('Should round when the round option is used', () => {
    Locale.set('en-US');

    expect(Locale.formatNumber('3.01999', { maximumFractionDigits: 2, round: true })).toEqual('3.02');
    expect(Locale.formatNumber('800.9905673502324', { round: true, minimumFractionDigits: 0, maximumFractionDigits: 0, style: 'currency', currencySign: '$' })).toEqual('$801');
    expect(Locale.formatNumber('4.1', { minimumFractionDigits: 0, maximumFractionDigits: 2 })).toEqual('4.1');
    expect(Locale.formatNumber('5.1', { minimumFractionDigits: 2, maximumFractionDigits: 2 })).toEqual('5.10');
    expect(Locale.formatNumber('12.341', { minimumFractionDigits: 0, maximumFractionDigits: 2, round: true })).toEqual('12.34');
    expect(Locale.formatNumber('12.340', { minimumFractionDigits: 0, maximumFractionDigits: 2, round: true })).toEqual('12.34');
    expect(Locale.formatNumber('12.344', { minimumFractionDigits: 0, maximumFractionDigits: 2, round: true })).toEqual('12.34');
    expect(Locale.formatNumber('12.349', { minimumFractionDigits: 0, maximumFractionDigits: 2, round: true })).toEqual('12.35');
    expect(Locale.formatNumber('12345.12345678', { minimumFractionDigits: 2, maximumFractionDigits: 4, round: true })).toEqual('12,345.1235');
  });

  it('truncate decimals', () => {
    expect(Locale.truncateDecimals('1111111111.11', 2, 2)).toEqual('1111111111.11');
    expect(Locale.truncateDecimals('11111111111.11', 2, 2)).toEqual('11111111111.11');
    expect(Locale.truncateDecimals('1.10', 2, 2)).toEqual('1.10');
    expect(Locale.truncateDecimals('2.10', 2, 2)).toEqual('2.10');
    expect(Locale.truncateDecimals('3.10', 2, 2)).toEqual('3.10');
    expect(Locale.truncateDecimals('4.10', 2, 2)).toEqual('4.10');
    expect(Locale.truncateDecimals('5.10', 2, 2)).toEqual('5.10');
    expect(Locale.truncateDecimals('5.1', 2, 2)).toEqual('5.10');
    expect(Locale.truncateDecimals('6.10', 2, 2)).toEqual('6.10');
  });

  it('Should properly convert character cases in some specific Locales', () => {
    // Related JIRA Ticket: SOHO-5408
    Locale.set('tr-TR');

    expect(Locale.toUpperCase('kodları')).toEqual('KODLARI');
    expect(Locale.toLowerCase('İSTANBUL')).toEqual('istanbul');
    expect(Locale.capitalize('istanbul')).toEqual('İstanbul');
    expect(Locale.capitalizeWords('kodları istanbul')).toEqual('Kodları İstanbul');
  });

  it('Should properly convert from Gregorian to Islamic UmAlQura', () => {
    Locale.set('ar-SA');
    let islamicDate = Locale.calendar().conversions.fromGregorian(new Date(new Date(2017, 4, 31)));

    expect(`${islamicDate[0].toString()} ${islamicDate[1].toString()} ${islamicDate[2].toString()}`).toEqual('1438 8 5');

    islamicDate = Locale.calendar().conversions.fromGregorian(new Date(new Date(2010, 11, 1)));

    expect(`${islamicDate[0].toString()} ${islamicDate[1].toString()} ${islamicDate[2].toString()}`).toEqual('1431 11 25');
    Locale.set('en-US');
  });

  it('Should properly convert from Islamic UmAlQura to Gregorian', () => {
    Locale.set('ar-SA');
    const time = Locale.calendar().conversions.toGregorian(1431, 11, 25).getTime();

    expect(time).toEqual(new Date(2010, 11, 1, 0, 0, 0).getTime());
    Locale.set('en-US');
  });

  it('Should handle numbers passed to parseNumber', () => {
    Locale.set('en-US');

    expect(Locale.parseNumber(4000)).toEqual(4000);
  });

  it('Should have 12 months per locale', () => {
    for (let culture in Locale.cultures) {  //eslint-disable-line
      Locale.set(culture);

      expect(Locale.calendar().months.wide.length).toEqual(12);
      expect(Locale.calendar().months.abbreviated.length).toEqual(12);
    }
  });

  it('Should default bad/missing locales', () => {
    for (let culture in Locale.cultures) {  //eslint-disable-line
      Locale.set('de-AU');

      expect(Locale.currentLocale.name).toEqual('de-DE');

      Locale.set('en-UG');

      expect(Locale.currentLocale.name).toEqual('en-US');

      Locale.set('fi-RU');

      expect(Locale.currentLocale.name).toEqual('fi-FI');

      Locale.set('zz-ZZ');

      expect(Locale.currentLocale.name).toEqual('fi-FI'); // not found so equals last one
    }
  });

  it('Should convert date from Gregorian (if needed) before formatting date (when fromGregorian is true)', () => {
    Locale.set('ar-SA');

    expect(Locale.formatDate(new Date(2018, 5, 20), { pattern: 'yyyy/MM/dd', fromGregorian: true })).toEqual('1439/10/06');
    Locale.set('en-US');
  });

  it('Should convert date to Gregorian (if needed) before formatting date (when toGregorian is true)', () => {
    Locale.set('ar-SA');

    expect(Locale.formatDate(Locale.parseDate('1439/10/06', Locale.calendar().dateFormat.short, false), { pattern: 'yyyyMMdd', toGregorian: true })).toEqual('20180620');
    Locale.set('en-US');
  });

  it('Should parse dates with and without spaces, dash, comma format', () => {
    Locale.set('en-US');

    // Date with spaces, dashes and comma
    expect(Locale.parseDate('2014-12-11', 'yyyy-MM-dd').getTime()).toEqual(new Date(2014, 11, 11, 0, 0, 0).getTime());
    expect(Locale.parseDate('2014/12/11', 'yyyy/MM/dd').getTime()).toEqual(new Date(2014, 11, 11, 0, 0, 0).getTime());
    expect(Locale.parseDate('2014 12 11', 'yyyy MM dd').getTime()).toEqual(new Date(2014, 11, 11, 0, 0, 0).getTime());

    // Date without spaces, dashes and comma
    expect(Locale.parseDate('20141211', 'yyyyMMdd').getTime()).toEqual(new Date(2014, 11, 11, 0, 0, 0).getTime());
  });
});
